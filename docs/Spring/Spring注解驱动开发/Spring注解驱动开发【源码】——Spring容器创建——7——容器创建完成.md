---
title: Spring注解驱动开发【源码】——Spring容器创建——7——容器创建完成
date: 2022-02-08 22:06:51
tags:
---

## 12、【完成BeanFactory的初始化创建工作，IOC容器就创建完成】finishRefresh();

> - 12、【完成BeanFactory的初始化创建工作，IOC容器就创建完成】finishRefresh();
>       1、【初始化和生命周期有关的后置处理器】initLifecycleProcessor();   LifecycleProcessor
>           默认从容器中找是否有LifecycleProcessor的组件，如果没有new DefaultLifecycleProcessor();加入到容器中
>           写一个LifecycleProcessor的实现类，可以在BeanFactory刷新完成以及关闭的时候做一些事情
>               void onRefresh();   void onClose();
>       2、【拿到前面定义的生命周期处理器（BeanFactory），回调onRefresh()】getLifecycleProcessor().onRefresh();
>       3、【发布容器刷新完成事件】publishEvent(new ContextRefreshedEvent(this));
>       4、【最后一步】LiveBeansView.registerApplicationContext(this);

