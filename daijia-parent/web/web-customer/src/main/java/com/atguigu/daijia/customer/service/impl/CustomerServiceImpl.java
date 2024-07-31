package com.atguigu.daijia.customer.service.impl;

import com.atguigu.daijia.common.constant.RedisConstant;
import com.atguigu.daijia.common.execption.GuiguException;
import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.common.result.ResultCodeEnum;
import com.atguigu.daijia.customer.client.CustomerInfoFeignClient;
import com.atguigu.daijia.customer.service.CustomerService;
import com.atguigu.daijia.model.form.customer.UpdateWxPhoneForm;
import com.atguigu.daijia.model.vo.customer.CustomerLoginVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@SuppressWarnings({"unchecked", "rawtypes"})
public class CustomerServiceImpl implements CustomerService {

    //注入远程调用接口
    @Autowired
    private CustomerInfoFeignClient client;

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private CustomerInfoFeignClient customerInfoFeignClient;

    @Override
    public String login(String code) {
        //1 拿着code进行远程调用，返回用户id
        Result<Long> loginResult = client.login(code);

        //2 判断如果返回失败了，返回错误提示
        Integer codeResult = loginResult.getCode();
        if(codeResult != 200) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        //3 获取远程调用返回用户id
        Long customerId = loginResult.getData();

        //4 判断返回用户id是否为空，如果为空，返回错误提示
        if(customerId == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        //5 生成token字符串
        String token = UUID.randomUUID().toString().replaceAll("-","");

        //6 把用户id放到Redis，设置过期时间
        // key:token  value:customerId
        //redisTemplate.opsForValue().set(token,customerId.toString(),30, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(RedisConstant.USER_LOGIN_KEY_PREFIX+token,
                                     customerId.toString(),
                                     RedisConstant.USER_LOGIN_KEY_TIMEOUT,
                                     TimeUnit.SECONDS);

        //7 返回token
        return token;
    }

    @Override
    public CustomerLoginVo getCustomerLoginInfo(String token) {
        //2 根据token查询redis
        //3 查询token在redis里面对应用户id
        String customerId =
                (String)redisTemplate.opsForValue()
                        .get(RedisConstant.USER_LOGIN_KEY_PREFIX + token);

        if(StringUtils.isEmpty(customerId)) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }
//        if(!StringUtils.hasText(customerId)) {
//            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
//        }

        //4 根据用户id进行远程调用 得到用户信息
        Result<CustomerLoginVo> customerLoginVoResult =
                customerInfoFeignClient.getCustomerLoginInfo(Long.parseLong(customerId));

        Integer code = customerLoginVoResult.getCode();
        if(code != 200) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        CustomerLoginVo customerLoginVo = customerLoginVoResult.getData();
        if(customerLoginVo == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }
        //5 返回用户信息
        return customerLoginVo;
    }

    //获取用户信息
    @Override
    public CustomerLoginVo getCustomerInfo(Long customerId) {

        //根据用户id进行远程调用 得到用户信息
        Result<CustomerLoginVo> customerLoginVoResult =
                customerInfoFeignClient.getCustomerLoginInfo(customerId);

        Integer code = customerLoginVoResult.getCode();
        if(code != 200) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }

        CustomerLoginVo customerLoginVo = customerLoginVoResult.getData();
        if(customerLoginVo == null) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }
        //5 返回用户信息
        return customerLoginVo;
    }

    //更新用户微信手机号
    @Override
    public Boolean updateWxPhoneNumber(UpdateWxPhoneForm updateWxPhoneForm) {
        Result<Boolean> booleanResult = customerInfoFeignClient.updateWxPhoneNumber(updateWxPhoneForm);
        return true;
    }

}
