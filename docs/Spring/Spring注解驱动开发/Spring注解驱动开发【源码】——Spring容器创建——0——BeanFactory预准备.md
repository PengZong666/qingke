---
title: Spring注解驱动开发【源码】——Spring容器创建——0——BeanFactory预准备
date: 2022-02-08 22:03:38
tags:
---

# 研究refresh(创建刷新)方法

## 1、prepareRefresh(); 刷新前的预处理

![image-20220219175310600](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220219175310600.png)

> 1、initPropertySources(); 初始化一些属性设置，子类自定义个性化的属性设置方法
>
> 2、getEnvironment().validateRequiredProperties(); 校验属性的合法等
>
> 3、this.earlyApplicationEvents = new LinkedHashSet<ApplicationEvent>(); 保存容器中的一些早期的事件

## 2、ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory(); 获取BeanFactory

![image-20220219175551019](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220219175551019.png)

> 1、refreshBeanFactory(); 刷新【创建】BeanFactory
>
> ```java
> @Override
> protected final void refreshBeanFactory() throws IllegalStateException {
>    if (!this.refreshed.compareAndSet(false, true)) {
>       throw new IllegalStateException(
>             "GenericApplicationContext does not support multiple refresh attempts: just call 'refresh' once");
>    }
>    this.beanFactory.setSerializationId(getId());
> }
> ```
>
> ​    创建一个 this.beanFactory = new DefaultListableBeanFactory(); 设置id
>
> 2、ConfigurableListableBeanFactory beanFactory = getBeanFactory();
>
> ```java
> @Override
> public final ConfigurableListableBeanFactory getBeanFactory() {
>     // 返回GenericApplicationContext刚才创建的BeanFactory
>    	return this.beanFactory;
> }
> ```
>
> 3、return beanFactory; 将创建好的BeanFactory【DefaultListableBeanFactory】返回

## 3、prepareBeanFactory(beanFactory); BeanFactory的预准备工作（对BeanFactory进行一些设置）

```java
protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    // 1、设置BeanFactory的类加载器、支持表达式解析器......
    // Tell the internal bean factory to use the context's class loader etc.
    beanFactory.setBeanClassLoader(getClassLoader());
    beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));
    beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));

    // 2、添加部分BeanPostProcessor【ApplicationContextAwareProcessor】
    // Configure the bean factory with context callbacks.
    beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
    // 3、设置忽略的自动装配的接口【EnvironmentAware、EmbeddedValueResolverAware、......】
    beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
    beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
    beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
    beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);

    // 4、注册可以解析的自动装配，我们能够在任何组件中自动注入：BeanFactory、ResourceLoader、ApplicationEventPublisher、ApplicationContext
    // BeanFactory interface not registered as resolvable type in a plain factory.
    // MessageSource registered (and found for autowiring) as a bean.
    beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
    beanFactory.registerResolvableDependency(ResourceLoader.class, this);
    beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
    beanFactory.registerResolvableDependency(ApplicationContext.class, this);

    // 5、添加BeanPostProcessor【ApplicationListenerDetector】
    // Register early post-processor for detecting inner beans as ApplicationListeners.
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));

    // 6、添加编译时的AspectJ
    // Detect a LoadTimeWeaver and prepare for weaving, if found.
    if (beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        // Set a temporary ClassLoader for type matching.
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }

    // 7、给BeanFactory中注册一些能用的组件 environment【ConfigurableEnvironment】、systemProperties【Map<String, Object>】、systemEnvironment【Map<String, Object>】
    // Register default environment beans.
    if (!beanFactory.containsLocalBean(ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
    }
    if (!beanFactory.containsLocalBean(SYSTEM_PROPERTIES_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_PROPERTIES_BEAN_NAME, getEnvironment().getSystemProperties());
    }
    if (!beanFactory.containsLocalBean(SYSTEM_ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_ENVIRONMENT_BEAN_NAME, getEnvironment().getSystemEnvironment());
    }
}
```

## 4、postProcessBeanFactory(beanFactory); BeanFactory准备工作完成后进行的后置处理工作

**空方法**

1、子类通过重写这个方法来在BeanFactory创建并预准备完成以后做进一步设置

