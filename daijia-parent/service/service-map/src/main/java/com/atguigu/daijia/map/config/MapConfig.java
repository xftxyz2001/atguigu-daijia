package com.atguigu.daijia.map.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MapConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
