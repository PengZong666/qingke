---
title: Spring注解驱动开发【源码】——Spring容器创建——1——执行BeanFactoryPostProcessor
date: 2022-02-08 22:04:09
tags:
---

## 5、invokeBeanFactoryPostProcessors(beanFactory); 执行BeanFactoryPostProcessor

> BeanFactoryPostProcessor：BeanFactory的后置处理器，在BeanFactory标准初始化之后执行的
>
> 两个接口：BeanFactoryPostProcessor、BeanDefinitionRegistryPostProcessor
>
> - 1、先执行BeanDefinitionRegistryPostProcessor的方法：
>       1、获取所有的BeanDefinitionRegistryPostProcessor
>       2、先执行实现了PriorityOrdered优先级接口的BeanDefinitionRegistryPostProcessor
>           postProcessor.postProcessBeanDefinitionRegistry(registry);
>       3、在执行实现了Ordered顺序接口的BeanDefinitionRegistryPostProcessor
>           postProcessor.postProcessBeanDefinitionRegistry(registry);
>       4、最后执行没有实现任何优先级或者是顺序接口的BeanDefinitionRegistryPostProcessor
>           postProcessor.postProcessBeanDefinitionRegistry(registry);
> - 2、再执行BeanFactoryPostProcessor的方法：
>       1、获取所有的BeanFactoryPostProcessor
>       2、先执行实现了PriorityOrdered优先级接口的BeanFactoryPostProcessor
>           postProcessor.postProcessBeanFactory(beanFactory);
>       3、在执行实现了Ordered顺序接口的BeanFactoryPostProcessor
>           postProcessor.postProcessBeanFactory(beanFactory);
>       4、最后执行没有实现任何优先级或者是顺序接口的BeanFactoryPostProcessor
>           postProcessor.postProcessBeanFactory(beanFactory);

