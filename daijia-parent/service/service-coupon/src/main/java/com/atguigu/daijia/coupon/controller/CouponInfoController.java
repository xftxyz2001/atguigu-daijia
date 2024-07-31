package com.atguigu.daijia.coupon.controller;

import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.coupon.service.CouponInfoService;
import com.atguigu.daijia.model.entity.coupon.CouponInfo;
import com.atguigu.daijia.model.form.coupon.UseCouponForm;
import com.atguigu.daijia.model.vo.base.PageVo;
import com.atguigu.daijia.model.vo.coupon.AvailableCouponVo;
import com.atguigu.daijia.model.vo.coupon.NoReceiveCouponVo;
import com.atguigu.daijia.model.vo.coupon.NoUseCouponVo;
import com.atguigu.daijia.model.vo.coupon.UsedCouponVo;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@Tag(name = "优惠券活动接口管理")
@RestController
@RequestMapping(value="/coupon/info")
@SuppressWarnings({"unchecked", "rawtypes"})
public class CouponInfoController {

    @Autowired
    private CouponInfoService couponInfoService;

    @Operation(summary = "查询未领取优惠券分页列表")
    @GetMapping("findNoReceivePage/{customerId}/{page}/{limit}")
    public Result<PageVo<NoReceiveCouponVo>> findNoReceivePage(
            @Parameter(name = "customerId", description = "乘客id", required = true)
            @PathVariable Long customerId,

            @Parameter(name = "page", description = "当前页码", required = true)
            @PathVariable Long page,

            @Parameter(name = "limit", description = "每页记录数", required = true)
            @PathVariable Long limit) {
        Page<CouponInfo> pageParam = new Page<>(page, limit);
        PageVo<NoReceiveCouponVo> pageVo = couponInfoService.findNoReceivePage(pageParam, customerId);
        pageVo.setPage(page);
        pageVo.setLimit(limit);
        return Result.ok(pageVo);
    }

    @Operation(summary = "查询未使用优惠券分页列表")
    @GetMapping("findNoUsePage/{customerId}/{page}/{limit}")
    public Result<PageVo<NoUseCouponVo>> findNoUsePage(
            @Parameter(name = "customerId", description = "乘客id", required = true)
            @PathVariable Long customerId,

            @Parameter(name = "page", description = "当前页码", required = true)
            @PathVariable Long page,

            @Parameter(name = "limit", description = "每页记录数", required = true)
            @PathVariable Long limit) {
        Page<CouponInfo> pageParam = new Page<>(page, limit);
        PageVo<NoUseCouponVo> pageVo = couponInfoService.findNoUsePage(pageParam, customerId);
        pageVo.setPage(page);
        pageVo.setLimit(limit);
        return Result.ok(pageVo);
    }

    @Operation(summary = "领取优惠券")
    @GetMapping("/receive/{customerId}/{couponId}")
    public Result<Boolean> receive(@PathVariable Long customerId, @PathVariable Long couponId) {
        return Result.ok(couponInfoService.receive(customerId, couponId));
    }

    @Operation(summary = "获取未使用的最佳优惠券信息")
    @GetMapping("/findAvailableCoupon/{customerId}/{orderAmount}")
    public Result<List<AvailableCouponVo>> findAvailableCoupon(@PathVariable Long customerId, @PathVariable BigDecimal orderAmount) {
        return Result.ok(couponInfoService.findAvailableCoupon(customerId, orderAmount));
    }

    @Operation(summary = "使用优惠券")
    @PostMapping("/useCoupon")
    public Result<BigDecimal> useCoupon(@RequestBody UseCouponForm useCouponForm) {
        return Result.ok(couponInfoService.useCoupon(useCouponForm));
    }

    @Operation(summary = "查询已使用优惠券分页列表")
    @GetMapping("findUsedPage/{customerId}/{page}/{limit}")
    public Result<PageVo<UsedCouponVo>> findUsedPage(
            @Parameter(name = "customerId", description = "乘客id", required = true)
            @PathVariable Long customerId,

            @Parameter(name = "page", description = "当前页码", required = true)
            @PathVariable Long page,

            @Parameter(name = "limit", description = "每页记录数", required = true)
            @PathVariable Long limit) {
        Page<CouponInfo> pageParam = new Page<>(page, limit);
        PageVo<UsedCouponVo> pageVo = couponInfoService.findUsedPage(pageParam, customerId);
        pageVo.setPage(page);
        pageVo.setLimit(limit);
        return Result.ok(pageVo);
    }
}

