---
title: Spring注解驱动开发【源码】——Spring容器创建——5——创建Bean准备
date: 2022-02-08 22:06:13
tags:
---

> - 9、【留给子容器的（子类）】onRefresh();
>       1、子类重写这个方法，在容器刷新的时候，可以自定义逻辑
> - 10、【给容器中将所有项目中的ApplicationListener注册进来】registerListeners();
>       1、从容器中拿到所有的ApplicationListener
>       2、将每个监听器添加到事件派发器中
>           getApplicationEventMulticaster().addApplicationListenerBean(listenerBeanName);
>       3、getApplicationEventMulticaster().multicastEvent(earlyEvent); 派发之前步骤产生的事件

