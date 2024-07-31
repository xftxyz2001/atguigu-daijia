package com.atguigu.daijia.driver.client;

import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.model.entity.driver.DriverSet;
import com.atguigu.daijia.model.form.driver.DriverFaceModelForm;
import com.atguigu.daijia.model.form.driver.UpdateDriverAuthInfoForm;
import com.atguigu.daijia.model.vo.driver.DriverAuthInfoVo;
import com.atguigu.daijia.model.vo.driver.DriverInfoVo;
import com.atguigu.daijia.model.vo.driver.DriverLoginVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "service-driver")
public interface DriverInfoFeignClient {

    /**
     * 获取司机设置信息
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/getDriverSet/{driverId}")
    Result<DriverSet> getDriverSet(@PathVariable("driverId") Long driverId);

    /**
     * 小程序授权登录
     * @param code
     * @return
     */
    @GetMapping("/driver/info/login/{code}")
    Result<Long> login(@PathVariable("code") String code);

    /**
     * 获取司机登录信息
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/getDriverLoginInfo/{driverId}")
    Result<DriverLoginVo> getDriverLoginInfo(@PathVariable("driverId") Long driverId);

    /**
     * 获取司机认证信息
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/getDriverAuthInfo/{driverId}")
    Result<DriverAuthInfoVo> getDriverAuthInfo(@PathVariable("driverId") Long driverId);

    /**
     * 更新司机认证信息
     * @param updateDriverAuthInfoForm
     * @return
     */
    @PostMapping("/driver/info/updateDriverAuthInfo")
    Result<Boolean> UpdateDriverAuthInfo(@RequestBody UpdateDriverAuthInfoForm updateDriverAuthInfoForm);

    /**
     * 创建司机人脸模型
     * @param driverFaceModelForm
     * @return
     */
    @PostMapping("/driver/info/creatDriverFaceModel")
    Result<Boolean> creatDriverFaceModel(@RequestBody DriverFaceModelForm driverFaceModelForm);

    /**
     * 判断司机当日是否进行过人脸识别
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/isFaceRecognition/{driverId}")
    Result<Boolean> isFaceRecognition(@PathVariable("driverId") Long driverId);

    /**
     * 验证司机人脸
     * @param driverFaceModelForm
     * @return
     */
    @PostMapping("/driver/info/verifyDriverFace")
    Result<Boolean> verifyDriverFace(@RequestBody DriverFaceModelForm driverFaceModelForm);

    /**
     * 更新接单状态
     * @param driverId
     * @param status
     * @return
     */
    @GetMapping("/driver/info/updateServiceStatus/{driverId}/{status}")
    Result<Boolean> updateServiceStatus(@PathVariable("driverId") Long driverId, @PathVariable("status") Integer status);

    /**
     * 获取司机基本信息
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/getDriverInfo/{driverId}")
    Result<DriverInfoVo> getDriverInfo(@PathVariable("driverId") Long driverId);

    /**
     * 获取司机OpenId
     * @param driverId
     * @return
     */
    @GetMapping("/driver/info/getDriverOpenId/{driverId}")
    Result<String> getDriverOpenId(@PathVariable("driverId") Long driverId);

}