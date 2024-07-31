package com.atguigu.daijia.driver.service;

import com.atguigu.daijia.model.vo.driver.DriverLicenseOcrVo;
import com.atguigu.daijia.model.vo.driver.IdCardOcrVo;
import org.springframework.web.multipart.MultipartFile;

public interface OcrService {

    //身份证识别
    IdCardOcrVo idCardOcr(MultipartFile file);

    //驾驶证识别
    DriverLicenseOcrVo driverLicenseOcr(MultipartFile file);
}
