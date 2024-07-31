package com.atguigu.daijia.driver.client;

import com.atguigu.daijia.common.result.Result;
import com.atguigu.daijia.model.vo.order.TextAuditingVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "service-driver")
public interface CiFeignClient {

    /**
     * 文本审核
     * @param content
     * @return
     */
    @PostMapping("/ci/textAuditing")
    Result<TextAuditingVo> textAuditing(@RequestBody String content);
}