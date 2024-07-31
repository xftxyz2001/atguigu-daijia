package com.atguigu.daijia.driver.service;

import com.atguigu.daijia.model.entity.driver.DriverAccount;
import com.atguigu.daijia.model.form.driver.TransferForm;
import com.baomidou.mybatisplus.extension.service.IService;

public interface DriverAccountService extends IService<DriverAccount> {

    Boolean transfer(TransferForm transferForm);
}
