package com.atguigu.daijia.rules.service;

import com.atguigu.daijia.model.form.rules.FeeRuleRequestForm;
import com.atguigu.daijia.model.vo.rules.FeeRuleResponseVo;

public interface FeeRuleService {

    //计算订单费用
    FeeRuleResponseVo calculateOrderFee(FeeRuleRequestForm calculateOrderFeeForm);
}
