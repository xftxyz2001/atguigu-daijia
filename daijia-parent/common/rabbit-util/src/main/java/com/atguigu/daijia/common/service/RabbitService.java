package com.atguigu.daijia.common.service;


import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    //发送消息
    public boolean sendMessage(String exchange,
                               String routingkey,
                               Object message) {
        rabbitTemplate.convertAndSend(exchange,routingkey,message);
        return true;
    }
}
