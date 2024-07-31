package com.atguigu.daijia.mgr.service;

import com.atguigu.daijia.model.entity.system.SysPost;
import com.atguigu.daijia.model.query.system.SysPostQuery;
import com.atguigu.daijia.model.vo.base.PageVo;

import java.util.List;

public interface SysPostService {

    SysPost getById(Long id);

    void save(SysPost sysPost);

    void update(SysPost sysPost);

    void remove(Long id);

    PageVo<SysPost> findPage(Long page, Long limit, SysPostQuery sysPostQuery);

    void updateStatus(Long id, Integer status);

    List<SysPost> findAll();
}
