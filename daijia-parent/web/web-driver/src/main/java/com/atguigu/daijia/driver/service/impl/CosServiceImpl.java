package com.atguigu.daijia.driver.service.impl;

import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.driver.client.CosFeignClient;
import com.atguigu.daijia.driver.service.CosService;
import com.atguigu.daijia.model.vo.driver.CosUploadVo;
import com.atguigu.daijia.model.vo.driver.DriverLoginVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@SuppressWarnings({"unchecked", "rawtypes"})
public class CosServiceImpl implements CosService {

    @Autowired
    private CosFeignClient cosFeignClient;

    //文件上传接口
    @Override
    public CosUploadVo uploadFile(MultipartFile file, String path) {
        //远程调用
        Result<CosUploadVo> cosUploadVoResult = cosFeignClient.upload(file,path);
        CosUploadVo cosUploadVo = cosUploadVoResult.getData();
        return cosUploadVo;
    }
}
