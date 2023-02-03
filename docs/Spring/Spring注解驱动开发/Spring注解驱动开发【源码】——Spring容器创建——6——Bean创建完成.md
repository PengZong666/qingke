---
title: Spring注解驱动开发【源码】——Spring容器创建——6——Bean创建完成
date: 2022-02-08 22:06:32
tags:
---



> 11、【初始化所有剩下的单实例bean】finishBeanFactoryInitialization(beanFactory);
>     1、【初始化剩下的单实例bean】beanFactory.preInstantiateSingletons();
>         1、获取容器中的所有bean，依次进行初始化和创建对象
>         2、获取Bean的定义信息：RootBeanDefinition
>         3、Bean不是抽象的、是单实例的、不是懒加载的
>             1、判断是否是FactoryBean，是否是实现FactoryBean接口的Bean
>             2、不是工厂Bean，利用getBean(beanName);创建对象
>                 1、getBean(beanName); IOC.getBean(beanName);
>                 2、doGetBean(name, null, null, false);
>                 3、getSingleton(beanName); 先获取缓存中保存的单实例Bean，如果能获取到说明这个Bean之前被创建过（所有创建过的单实例Bean都会被缓存起来）
>                     private final Map<String, Object> singletonObjects = new ConcurrentHashMap<String, Object>(256);
>                 4、缓存中获取不到，开始Bean的创建对象流程
>                 5、【标记当前bean已经被创建了】markBeanAsCreated(beanName);
>                 6、【获取Bean的定义信息】getMergedLocalBeanDefinition(beanName);
>                 7、【获取当前Bean依赖的其它Bean，如果有按照getBean()把依赖的Bean先创建出来】mbd.getDependsOn();
>                 8、启动单实例Bean的创建流程
>                     1、createBean(beanName, mbd, args);
>                     2、Object bean = resolveBeforeInstantiation(beanName, mbdToUse);
>                         InstantiationAwareBeanPostProcessor提前执行
>                         先触发postProcessBeforeInstantiation
>                         如果有返回值，触发postProcessAfterInstantiation
>                     3、如果前面的InstantiationAwareBeanPostProcessor没有返回代理对象
>                     4、【创建Bean】Object beanInstance = doCreateBean(beanName, mbdToUse, args);
>                         1、【创建Bean实例】instanceWrapper = createBeanInstance(beanName, mbd, args);
>                             利用工厂方法或者对象的构造器创建出Bean实例
>                         2、applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
>                             调用MergedBeanDefinitionPostProcessor的postProcessMergedBeanDefinition(mbd, beanType, beanName);
>                         3、【对Bean的属性赋值】populateBean(beanName, mbd, instanceWrapper);
>                             1、拿到InstantiationAwareBeanPostProcessor后置处理器，执行postProcessAfterInstantiation
>                             2、拿到InstantiationAwareBeanPostProcessor后置处理器，执行postProcessPropertyValues
>                             ====================赋值之前====================
>                             3、applyPropertyValues(beanName, mbd, bw, pvs); 应用Bean属性的值，为属性利用setter方法等进行赋值
>                         4、【Bean初始化】exposedObject = initializeBean(beanName, exposedObject, mbd);
>                             1、【执行Aware接口的方法】invokeAwareMethods(beanName, bean);
>                                 BeanNameAware、BeanClassLoaderAware、BeanFactoryAware
>                             2、【执行后置处理器初始化之前】applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
>                                 beanProcessor.postProcessBeforeInitialization(result, beanName);
>                             3、【执行初始化方法】invokeInitMethods(beanName, wrappedBean, mbd);
>                                 1、是否是InitializingBean接口的实现，执行接口规定的初始化
>                                 2、是否自定义初始化方法
>                             4、【执行后置处理器初始化之后】applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
>                                 beanProcessor.postProcessAfterInitialization(result, beanName);
>                         5、【注册Bean的销毁方法】registerDisposableBeanIfNecessary(beanName, bean, mbd);
>                     5、将创建的Bean添加到缓存中singletonObjects
>                 IOC容器就是这些Map，很多的Map里面保存了单实例Bean、环境信息...
>         4、所有Bean都利用getBean创建完成以后
>             检查所有Bean是否是SmartInitializingSingleton接口的，如果是，就执行smartSingleton.afterSingletonsInstantiated();
