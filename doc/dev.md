
// 文档生成
yarn add @nestjs/swagger swagger-ui-express

## 概念

### VO(View Object)
视图对象，用于展示层，它的作用是把某个指定页面或组件的所有数据封装起来

### DTO(Data Transfer Object)
数据传输对象，这个概念来源于J2EE的设计模式，原来的目的是为了EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分布式调用的性能和降低网络负载
这里泛指用于展示层与服务层之间的数据传输对象。
即Data Transfer Object，数据传输对象, 在Java中就是一个简单的POJO对象(Plain Ordinary Java Object), 就是我们平常所见的属性，提供getter和setter的JavaBean。

### DO(Domain Object)
领域对象，就是从现实世界中抽象出来的有形或无形的业务实体。

### PO(Persistent Object)
持久化对象，它跟持久层（通常是关系型数据库）的数据结构形成一一对应的映射关系，如果持久层是关系型数据库，那么，数据表中的每个字段（或若干个）就对应PO的一个（或若干个）属性。


## 开发

node_modules\.bin\nest g resource users

### mysql

MySQL数据库的字符集不仅包括字符集CHARACTER，还包括校对规则COLLATION
utf8mb4_0900_ai_ci则是新版本--MySQL 8.0
字符集
- ci case insensitive 大小写不敏感
- cs case sensitive
- ai accent insensitivity 不区分音调
- bin 将字符串的每个字符二进制存储，区分大小写
- 0900 表示UTF8基于unicode规范9.0的版本，发布于2016年6月


### redis

- [按照WSL2上](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
- sudo service redis-server start 启动服务
- ip addr show eth0 | grep 'inet\b' | awk '{print $2}' | cut -d/ -f1 查看wsl中的IP

## 微服务

- [Microservices a definition of this new architectural term](https://martinfowler.com/articles/microservices.html)
