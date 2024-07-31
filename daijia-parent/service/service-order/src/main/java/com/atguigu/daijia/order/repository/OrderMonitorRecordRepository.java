package com.atguigu.daijia.order.repository;


import com.atguigu.daijia.model.entity.order.OrderMonitorRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMonitorRecordRepository extends MongoRepository<OrderMonitorRecord, String> {

}
