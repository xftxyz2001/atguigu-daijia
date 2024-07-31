package com.atguigu.daijia.order.testLock;

import com.atguigu.daijia.common.config.redisson.RedissonConfig;
import org.apache.commons.lang3.StringUtils;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class TestServiceImpl implements TestService{

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private RedissonClient redissonClient;

    //Redisson实现
    @Override
    public void testLock()  {

        //1 通过redisson创建锁对象
        RLock lock = redissonClient.getLock("lock1");

        //2 尝试获取锁
        //(1) 阻塞一直等待直到获取到，获取锁之后，默认过期时间30s
        lock.lock();

        //(2) 获取到锁，锁过期时间10s
       // lock.lock(10,TimeUnit.SECONDS);

        //(3) 第一个参数获取锁等待时间
        //    第二个参数获取到锁，锁过期时间
        //        try {
        //            // true
        //            boolean tryLock = lock.tryLock(30, 10, TimeUnit.SECONDS);
        //        } catch (InterruptedException e) {
        //            throw new RuntimeException(e);
        //        }

        //3 编写业务代码
        //1.先从redis中通过key num获取值  key提前手动设置 num 初始值：0
        String value = redisTemplate.opsForValue().get("num");
        //2.如果值为空则非法直接返回即可
        if (StringUtils.isBlank(value)) {
            return;
        }
        //3.对num值进行自增加一
        int num = Integer.parseInt(value);
        redisTemplate.opsForValue().set("num", String.valueOf(++num));

        //4 释放锁
        lock.unlock();
    }

    //lua脚本保证原子性
//    @Override
//    public void testLock() {
//        //从redis里面获取数据
//        String uuid = UUID.randomUUID().toString();
//        //1 获取当前锁  setnx  + 设置过期时间
//        //        Boolean ifAbsent = redisTemplate.opsForValue().setIfAbsent("lock", "lock");
//        Boolean ifAbsent =
//                redisTemplate.opsForValue()
//                        .setIfAbsent("lock", uuid,3, TimeUnit.SECONDS);
//
//        //2 如果获取到锁，从redis获取数据 数据+1 放回redis里面
//        if(ifAbsent) {
//            //获取锁成功，执行业务代码
//            //1.先从redis中通过key num获取值  key提前手动设置 num 初始值：0
//            String value = redisTemplate.opsForValue().get("num");
//            //2.如果值为空则非法直接返回即可
//            if (StringUtils.isBlank(value)) {
//                return;
//            }
//            //3.对num值进行自增加一
//            int num = Integer.parseInt(value);
//            redisTemplate.opsForValue().set("num", String.valueOf(++num));
//            //出现异常
//
//            //3 释放锁 lua脚本实现
//            DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
//            //lua脚本
//            String script = "if redis.call(\"get\",KEYS[1]) == ARGV[1]\n" +
//                    "then\n" +
//                    "    return redis.call(\"del\",KEYS[1])\n" +
//                    "else\n" +
//                    "    return 0\n" +
//                    "end";
//            redisScript.setScriptText(script);
//            //设置返回结果
//            redisScript.setResultType(Long.class);
//            redisTemplate.execute(redisScript, Arrays.asList("lock"),uuid);
//
//        } else {
//            try {
//                Thread.sleep(100);
//                this.testLock();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//    }

    //uuid防止误删
//    @Override
//    public void testLock() {
//        //从redis里面获取数据
//        String uuid = UUID.randomUUID().toString();
//        //1 获取当前锁  setnx  + 设置过期时间
//        //        Boolean ifAbsent = redisTemplate.opsForValue().setIfAbsent("lock", "lock");
//        Boolean ifAbsent =
//                redisTemplate.opsForValue()
//                        .setIfAbsent("lock", uuid,3, TimeUnit.SECONDS);
//
//        //2 如果获取到锁，从redis获取数据 数据+1 放回redis里面
//        if(ifAbsent) {
//            //获取锁成功，执行业务代码
//            //1.先从redis中通过key num获取值  key提前手动设置 num 初始值：0
//            String value = redisTemplate.opsForValue().get("num");
//            //2.如果值为空则非法直接返回即可
//            if (StringUtils.isBlank(value)) {
//                return;
//            }
//            //3.对num值进行自增加一
//            int num = Integer.parseInt(value);
//            redisTemplate.opsForValue().set("num", String.valueOf(++num));
//            //出现异常
//
//            //3 释放锁
//            String redisUuid = redisTemplate.opsForValue().get("lock");
//            if(uuid.equals(redisUuid)) {
//                redisTemplate.delete("lock");
//            }
//
//        } else {
//            try {
//                Thread.sleep(100);
//                this.testLock();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//    }

    //redis里面setnx实现
//    @Override
//    public void testLock() {
//        //从redis里面获取数据
//       //1 获取当前锁  setnx  + 设置过期时间
//       //        Boolean ifAbsent = redisTemplate.opsForValue().setIfAbsent("lock", "lock");
//        Boolean ifAbsent =
//                redisTemplate.opsForValue()
//                        .setIfAbsent("lock", "lock",3, TimeUnit.SECONDS);
//
//        //2 如果获取到锁，从redis获取数据 数据+1 放回redis里面
//        if(ifAbsent) {
//            //获取锁成功，执行业务代码
//            //1.先从redis中通过key num获取值  key提前手动设置 num 初始值：0
//            String value = redisTemplate.opsForValue().get("num");
//            //2.如果值为空则非法直接返回即可
//            if (StringUtils.isBlank(value)) {
//                return;
//            }
//            //3.对num值进行自增加一
//            int num = Integer.parseInt(value);
//            redisTemplate.opsForValue().set("num", String.valueOf(++num));
//            //出现异常
//
//            //3 释放锁
//            redisTemplate.delete("lock");
//        } else {
//            try {
//                Thread.sleep(100);
//                this.testLock();
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }
//    }

    //本地锁演示
    public synchronized void testLock1() {
        //从redis里面获取数据
        String value = redisTemplate.opsForValue().get("num");

        if(StringUtils.isBlank(value)) {
            return;
        }

        //把从redis获取数据+1
        int num = Integer.parseInt(value);

        //数据+1之后放回到redis里面
        redisTemplate.opsForValue().set("num",String.valueOf(++num));
    }
}
