---
title: Spring注解驱动开发【源码】——Spring容器创建——3——执行MessageSource
date: 2022-02-08 22:04:50
tags:
---

## 7、【初始化MessageSource组件（做国际化功能：消息绑定、消息解析）】initMessageSource();



> - 1、ConfigurableListableBeanFactory beanFactory = getBeanFactory(); 获取BeanFactory
> - 2、看容器中是否有id为messageSource的组件
>       如果有，赋值给messageSource属性；如果没有，自己创建一个DelegatingMessageSource
>           MessageSource：取出国际化配置文件中某个key的值，能按照区域信息获取
> - 3、把创建好的MessageSource注册到容器中，以后获取国际化配置文件的时候，可以自动注入MessageSource
>       beanFactory.registerSingleton(MESSAGE_SOURCE_BEAN_NAME, this.messageSource);
>       MessageSource.String getMessage(String code, Object[] args, String defaultMessage, Locale locale);

