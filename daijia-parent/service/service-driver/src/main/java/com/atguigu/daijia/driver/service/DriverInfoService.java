package com.atguigu.daijia.driver.service;

import com.atguigu.daijia.model.entity.driver.DriverInfo;
import com.atguigu.daijia.model.entity.driver.DriverSet;
import com.atguigu.daijia.model.form.driver.DriverFaceModelForm;
import com.atguigu.daijia.model.form.driver.UpdateDriverAuthInfoForm;
import com.atguigu.daijia.model.vo.driver.DriverAuthInfoVo;
import com.atguigu.daijia.model.vo.driver.DriverInfoVo;
import com.atguigu.daijia.model.vo.driver.DriverLoginVo;
import com.baomidou.mybatisplus.extension.service.IService;

public interface DriverInfoService extends IService<DriverInfo> {

    //小程序授权登录
    Long login(String code);

    //获取司机登录信息
    DriverLoginVo getDriverInfo(Long driverId);

    //获取司机认证信息
    DriverAuthInfoVo getDriverAuthInfo(Long driverId);

    ////更新司机认证信息
    Boolean updateDriverAuthInfo(UpdateDriverAuthInfoForm updateDriverAuthInfoForm);

    //创建司机人脸模型
    Boolean creatDriverFaceModel(DriverFaceModelForm driverFaceModelForm);

    //获取司机设置信息
    DriverSet getDriverSet(Long driverId);

    //判断司机当日是否进行过人脸识别
    Boolean isFaceRecognition(Long driverId);

    //人脸识别
    Boolean verifyDriverFace(DriverFaceModelForm driverFaceModelForm);

    ////更新接单状态
    Boolean updateServiceStatus(Long driverId, Integer status);

    //获取司机基本信息
    DriverInfoVo getDriverInfoOrder(Long driverId);

    String getDriverOpenId(Long driverId);
}
