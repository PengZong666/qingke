---
title: Spring注解驱动开发【源码】——Spring容器创建——2——注册BeanPostProcessors
date: 2022-02-08 22:04:28
tags:
---

## 6、registerBeanPostProcessors(beanFactory); 注册BeanPostProcessor（Bean的后置处理器）【intercept bean creation.】



> - 6、registerBeanPostProcessors(beanFactory); 注册BeanPostProcessor（Bean的后置处理器）【intercept bean creation.】
>       不同接口类型的BeanPostProcessor在Bean创建前后的执行时机是不一样的
>           BeanPostProcessor、
>           DestructionAwareBeanPostProcessor、
>           InstantiationAwareBeanPostProcessor、
>           SmartInstantiationAwareBeanPostProcessor、
>           MergedBeanDefinitionPostProcessor
>       1、获取所有的BeanPostProcessor，后置处理器都默认可以通过PriorityOrdered、Ordered接口来指定优先级
>       2、先注册PriorityOrdered优先级接口的BeanPostProcessor
>           把每一个BeanPostProcessor添加到BeanFactory中
>           beanFactory.addBeanPostProcessor(postProcessor);
>       3、再注册Ordered接口的
>       4、注册一些剩下的
>       5、最终注册MergedBeanDefinitionPostProcessor
>       6、beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext)); 注册一个ApplicationListenerDetector来在Bean创建完成后检查是否是ApplicationListener，
>           如果是this.applicationContext.addApplicationListener((ApplicationListener<?>) bean);

