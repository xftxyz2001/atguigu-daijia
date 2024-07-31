package com.atguigu.daijia.mgr.service.impl;

import com.atguigu.daijia.mgr.service.SysLoginLogService;
import com.atguigu.daijia.model.entity.system.SysLoginLog;
import com.atguigu.daijia.model.query.system.SysLoginLogQuery;
import com.atguigu.daijia.model.vo.base.PageVo;
import com.atguigu.daijia.system.client.SysLoginLogFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@SuppressWarnings({"unchecked", "rawtypes"})
public class SysLoginLogServiceImpl implements SysLoginLogService {

    @Autowired
    private SysLoginLogFeignClient sysLoginLogFeignClient;

    @Override
    public PageVo<SysLoginLog> findPage(Long page, Long limit, SysLoginLogQuery sysLoginLogQuery) {
        return sysLoginLogFeignClient.findPage(page, limit, sysLoginLogQuery).getData();
    }

    @Override
    public void recordLoginLog(SysLoginLog sysLoginLog) {
        sysLoginLogFeignClient.recordLoginLog(sysLoginLog);
    }

    @Override
    public SysLoginLog getById(Long id) {
        return sysLoginLogFeignClient.getById(id).getData();
    }
}
