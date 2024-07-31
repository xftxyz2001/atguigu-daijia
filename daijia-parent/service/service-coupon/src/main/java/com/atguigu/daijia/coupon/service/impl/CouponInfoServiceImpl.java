package com.atguigu.daijia.coupon.service.impl;

import com.atguigu.daijia.common.constant.RedisConstant;
import com.atguigu.daijia.common.execption.GuiguException;
import com.atguigu.daijia.common.result.ResultCodeEnum;
import com.atguigu.daijia.coupon.mapper.CouponInfoMapper;
import com.atguigu.daijia.coupon.mapper.CustomerCouponMapper;
import com.atguigu.daijia.coupon.service.CouponInfoService;
import com.atguigu.daijia.model.entity.coupon.CouponInfo;
import com.atguigu.daijia.model.entity.coupon.CustomerCoupon;
import com.atguigu.daijia.model.form.coupon.UseCouponForm;
import com.atguigu.daijia.model.vo.base.PageVo;
import com.atguigu.daijia.model.vo.coupon.AvailableCouponVo;
import com.atguigu.daijia.model.vo.coupon.NoReceiveCouponVo;
import com.atguigu.daijia.model.vo.coupon.NoUseCouponVo;
import com.atguigu.daijia.model.vo.coupon.UsedCouponVo;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@SuppressWarnings({"unchecked", "rawtypes"})
public class CouponInfoServiceImpl extends ServiceImpl<CouponInfoMapper, CouponInfo> implements CouponInfoService {

    @Autowired
    private CouponInfoMapper couponInfoMapper;

    @Autowired
    private CustomerCouponMapper customerCouponMapper;

    @Autowired
    private RedissonClient redissonClient;

    @Override
    public PageVo<UsedCouponVo> findUsedPage(Page<CouponInfo> pageParam, Long customerId) {
        IPage<UsedCouponVo> pageInfo = couponInfoMapper.findUsedPage(pageParam, customerId);
        return new PageVo(pageInfo.getRecords(), pageInfo.getPages(), pageInfo.getTotal());
    }

    @Override
    public PageVo<NoReceiveCouponVo> findNoReceivePage(Page<CouponInfo> pageParam, Long customerId) {
        IPage<NoReceiveCouponVo> pageInfo = couponInfoMapper.findNoReceivePage(pageParam, customerId);
        return new PageVo(pageInfo.getRecords(), pageInfo.getPages(), pageInfo.getTotal());
    }

    @Override
    public PageVo<NoUseCouponVo> findNoUsePage(Page<CouponInfo> pageParam, Long customerId) {
        IPage<NoUseCouponVo> pageInfo = couponInfoMapper.findNoUsePage(pageParam, customerId);
        return new PageVo(pageInfo.getRecords(), pageInfo.getPages(), pageInfo.getTotal());
    }

    //领取优惠卷
    @Override
    public Boolean receive(Long customerId, Long couponId) {
        //1 couponId查询优惠卷信息
        //判断如果优惠卷不存在
        CouponInfo couponInfo = couponInfoMapper.selectById(couponId);
        if(couponInfo == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        //2 判断优惠卷是否过期
        if(couponInfo.getExpireTime().before(new Date())) {
            throw new GuiguException(ResultCodeEnum.COUPON_EXPIRE);
        }

        //3 检查库存，发行数量 和 领取数量
        if(couponInfo.getPublishCount() != 0 &&
                couponInfo.getReceiveCount() == couponInfo.getPublishCount()) {
            throw new GuiguException(ResultCodeEnum.COUPON_LESS);
        }
        RLock lock = null;
        try {
            lock = redissonClient.getLock(RedisConstant.COUPON_LOCK + customerId);
            boolean flag = lock.tryLock(RedisConstant.COUPON_LOCK_WAIT_TIME,
                    RedisConstant.COUPON_LOCK_LEASE_TIME, TimeUnit.SECONDS);
            if(flag) {
                //4 检查每个人限制领取数量
                if(couponInfo.getPerLimit() > 0) {
                    //统计当前客户已经领取优惠卷数量
                    LambdaQueryWrapper<CustomerCoupon> wrapper = new LambdaQueryWrapper<>();
                    wrapper.eq(CustomerCoupon::getCouponId,couponId);
                    wrapper.eq(CustomerCoupon::getCustomerId,customerId);
                    Long count = customerCouponMapper.selectCount(wrapper);
                    //判断
                    if(count >= couponInfo.getPerLimit()) {
                        throw new GuiguException(ResultCodeEnum.COUPON_USER_LIMIT);
                    }
                }

                //5 领取优惠卷
                //5.1 更新领取数量
                int row = couponInfoMapper.updateReceiveCount(couponId);

                //5.2 添加领取记录
                this.saveCustomerCoupon(customerId,couponId,couponInfo.getExpireTime());

                return true;
            }
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            if(lock != null) {
                lock.unlock();
            }
        }
        return true;
    }

    //获取未使用的最佳优惠卷信息
    @Override
    public List<AvailableCouponVo> findAvailableCoupon(Long customerId, BigDecimal orderAmount) {

        //1 创建list集合，存储最终返回数据
        List<AvailableCouponVo> availableCouponVoList = new ArrayList<>();

        //2 根据乘客id，获取乘客已经领取但是没有使用的优惠卷列表
        //返回list集合
        List<NoUseCouponVo> list = couponInfoMapper.findNoUseList(customerId);

        //3 遍历乘客未使用优惠卷列表，得到每个优惠卷
        //3.1 判断优惠卷类型：现金卷 和 折扣卷
        List<NoUseCouponVo> typeList =
                list.stream().filter(item -> item.getCouponType() == 1).collect(Collectors.toList());

        //3.2 是现金券
        //判断现金卷是否满足条件
        for(NoUseCouponVo noUseCouponVo:typeList) {
            //判断使用门槛
            //减免金额
            BigDecimal reduceAmount = noUseCouponVo.getAmount();
            //1 没有门槛  == 0，订单金额必须大于优惠减免金额
            if(noUseCouponVo.getConditionAmount().doubleValue()==0
                && orderAmount.subtract(reduceAmount).doubleValue()>0) {
                availableCouponVoList.add(this.buildBestNoUseCouponVo(noUseCouponVo,reduceAmount));
            }

            //2 有门槛  ，订单金额大于优惠门槛金额
            if(noUseCouponVo.getConditionAmount().doubleValue() > 0
                && orderAmount.subtract(noUseCouponVo.getConditionAmount()).doubleValue()>0) {
                availableCouponVoList.add(this.buildBestNoUseCouponVo(noUseCouponVo,reduceAmount));
            }
        }

        //3.3 折扣卷
        //判断折扣卷是否满足条件
        List<NoUseCouponVo> typeList2 =
                list.stream().filter(item -> item.getCouponType() == 2).collect(Collectors.toList());
        for (NoUseCouponVo noUseCouponVo : typeList2) {
            //折扣之后金额
            // 100 打8折  = 100 * 8 /10= 80
            BigDecimal discountAmount = orderAmount.multiply(noUseCouponVo.getDiscount())
                    .divide(new BigDecimal("10")).setScale(2, RoundingMode.HALF_UP);

            BigDecimal reduceAmount = orderAmount.subtract(discountAmount);
            //2.2.1.没门槛
            if (noUseCouponVo.getConditionAmount().doubleValue() == 0) {
                availableCouponVoList.add(this.buildBestNoUseCouponVo(noUseCouponVo, reduceAmount));
            }
            //2.2.2.有门槛，订单折扣后金额大于优惠券门槛金额
            if (noUseCouponVo.getConditionAmount().doubleValue() > 0
                    && discountAmount.subtract(noUseCouponVo.getConditionAmount()).doubleValue() > 0) {
                availableCouponVoList.add(this.buildBestNoUseCouponVo(noUseCouponVo, reduceAmount));
            }
        }

        //4 把满足条件优惠卷放到最终list集合
        //根据金额排序
        if (!CollectionUtils.isEmpty(availableCouponVoList)) {
            Collections.sort(availableCouponVoList, new Comparator<AvailableCouponVo>() {
                @Override
                public int compare(AvailableCouponVo o1, AvailableCouponVo o2) {
                    return o1.getReduceAmount().compareTo(o2.getReduceAmount());
                }
            });
        }

        return availableCouponVoList;
    }

    //使用优惠卷
    @Override
    public BigDecimal useCoupon(UseCouponForm useCouponForm) {
        //1 根据乘客优惠券id获取乘客优惠卷信息
        CustomerCoupon customerCoupon =
                customerCouponMapper.selectById(useCouponForm.getCustomerCouponId());
        if(customerCoupon == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }
        //2 根据优惠卷id获取优惠卷信息
        CouponInfo couponInfo =
                couponInfoMapper.selectById(customerCoupon.getCouponId());
        if(couponInfo == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        //3 判断优惠卷是否是当前乘客所持有的
        if(customerCoupon.getCustomerId() != useCouponForm.getCustomerId()) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        //4 判断是否具备优惠卷使用条件
        //现金和折扣卷，根据使用门槛判断
        BigDecimal reduceAmount = null;
        //1 现金券
        if(couponInfo.getCouponType() == 1) {
            //没有门槛，订单金额大于优惠减免金额
            if(couponInfo.getConditionAmount().doubleValue()==0
                && useCouponForm.getOrderAmount().subtract(couponInfo.getAmount()).doubleValue()>0) {
                reduceAmount = couponInfo.getAmount();
            }

            //有门槛，订单金额大于优惠卷门槛金额
            if(couponInfo.getConditionAmount().doubleValue()>0
                && useCouponForm.getOrderAmount().subtract(couponInfo.getConditionAmount()).doubleValue()>0) {
                reduceAmount = couponInfo.getAmount();
            }
        } else {//2 折扣
            //折扣后金额
            BigDecimal discountOrderAmount = useCouponForm.getOrderAmount().multiply(couponInfo.getDiscount())
                    .divide(new BigDecimal("10")).setScale(2, RoundingMode.HALF_UP);
            //订单优惠金额
            //2.2.1.没门槛
            if (couponInfo.getConditionAmount().doubleValue() == 0) {
                //减免金额
                reduceAmount = useCouponForm.getOrderAmount().subtract(discountOrderAmount);
            }
            //2.2.2.有门槛，订单折扣后金额大于优惠券门槛金额
            if (couponInfo.getConditionAmount().doubleValue() > 0 && discountOrderAmount.subtract(couponInfo.getConditionAmount()).doubleValue() > 0) {
                //减免金额
                reduceAmount = useCouponForm.getOrderAmount().subtract(discountOrderAmount);
            }
        }

        //5 如果满足条件，更新两张表数据
        if(reduceAmount.doubleValue()>0) {
            //更新coupon_info使用数量
            //根据id查询优惠卷对象
            Integer useCount_old = couponInfo.getUseCount();
            couponInfo.setUseCount(useCount_old+1);
            couponInfoMapper.updateById(couponInfo);

            //更新customer_coupon
            CustomerCoupon updateCustomerCoupon = new CustomerCoupon();
            updateCustomerCoupon.setId(customerCoupon.getId());
            updateCustomerCoupon.setUsedTime(new Date());
            updateCustomerCoupon.setOrderId(useCouponForm.getOrderId());
            customerCouponMapper.updateById(updateCustomerCoupon);

            return reduceAmount;
        }
        return null;
    }

    private AvailableCouponVo buildBestNoUseCouponVo(NoUseCouponVo noUseCouponVo, BigDecimal reduceAmount) {
        AvailableCouponVo bestNoUseCouponVo = new AvailableCouponVo();
        BeanUtils.copyProperties(noUseCouponVo, bestNoUseCouponVo);
        bestNoUseCouponVo.setCouponId(noUseCouponVo.getId());
        bestNoUseCouponVo.setReduceAmount(reduceAmount);
        return bestNoUseCouponVo;
    }

    private void saveCustomerCoupon(Long customerId, Long couponId, Date expireTime) {
        CustomerCoupon customerCoupon = new CustomerCoupon();
        customerCoupon.setCouponId(couponId);
        customerCoupon.setCustomerId(customerId);
        customerCoupon.setExpireTime(expireTime);
        customerCoupon.setReceiveTime(new Date());
        customerCoupon.setStatus(1);
        customerCouponMapper.insert(customerCoupon);
    }
}
