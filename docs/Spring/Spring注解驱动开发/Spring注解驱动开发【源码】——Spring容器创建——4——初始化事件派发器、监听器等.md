---
title: Spring注解驱动开发【源码】——Spring容器创建——4——初始化事件派发器、监听器等
date: 2022-02-08 22:05:49
tags:
---

## 8、【初始化事件派发器】initApplicationEventMulticaster();



> - 8、【初始化事件派发器】initApplicationEventMulticaster();
>       1、获取BeanFactory
>       2、从BeanFactory中获取applicationEventMulticaster的ApplicationEventMulticaster
>       3、如果上一步没有配置，创建一个SimpleApplicationEventMulticaster
>       4、将创建的ApplicationEventMulticaster添加到BeanFactory中，以后其它组件直接自动注入

