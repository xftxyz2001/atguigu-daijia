package com.atguigu.daijia.driver.controller;

import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.driver.service.DriverAccountService;
import com.atguigu.daijia.model.form.driver.TransferForm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "司机账户API接口管理")
@RestController
@RequestMapping(value="/driver/account")
@SuppressWarnings({"unchecked", "rawtypes"})
public class DriverAccountController {

    @Autowired
    private DriverAccountService driverAccountService;

    @Operation(summary = "转账")
    @PostMapping("/transfer")
    public Result<Boolean> transfer(@RequestBody TransferForm transferForm) {
        return Result.ok(driverAccountService.transfer(transferForm));
    }
}

