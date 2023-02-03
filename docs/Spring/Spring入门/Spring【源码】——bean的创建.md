---
title: 一探Spring源码——bean的创建
date: 2022-01-02 16:34:27
tags:
---

w我们知道，IOC是一个容器，在这个容器启动的时候会创建所有单实例对象，我们可以直接从容器中获取到这个对象。在这里，我们将解决以下问题：

- IOC容器的启动过程？启动期间都做了什么（什么时候创建所有单实例bean）？
- IOC是如何创建这些单实例bean，并如何管理的？到底保存在了哪里？

# 环境准备

新建普通Java工程，引入jar包：

![image-20220111103132395](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111103132395.png)

创建JavaBean，Person：

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2022/1/3 15:24
 */
public class Person {

    private String name;
    private Integer age;

    public Person() {
    }

    public Person(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

xml注入bean，application.xml：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.atqingke"/>

    <bean id="person01" class="com.atqingke.bean.Person">
        <property name="name" value="张三"/>
        <property name="age" value="21"/>
    </bean>

    <bean id="person02" class="com.atqingke.bean.Person">
        <property name="name" value="李四"/>
        <property name="age" value="22"/>
    </bean>

    <bean id="person03" class="com.atqingke.bean.Person">
        <property name="name" value="王五"/>
        <property name="age" value="23"/>
    </bean>

</beans>
```

编写测试类，SourceTest：

```java
package com.atqingke.test;

import com.atqingke.bean.Person;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Author pengbin007
 * @Date 2022/1/3 15:25
 */
public class SourceTest {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Person person01 = context.getBean("person01", Person.class);
        System.out.println(person01);
    }
}
```

# 思路

从最简单的HelloWorld开始，单步调试。

首先我们从第一行代码开始，Step Into进入

![image-20220103221340624](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220103221340624.png)

接下来我们来到AbstractApplicationContext：

![image-20220103221608551](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220103221608551.png)

这里的注释告诉我们：如果没有提供工厂中ApplicationEventMulticaster的bean的名称，则使用默认的名称，也就是这个“applicationEventMulticaster”。这里不是我们关注的重点，我们Step Over跳过这里！发现它又回到了我们的main方法，这时候我们再Step Over的话，可以看到，我们在配置文件中注入的bean对象，就已经创建好了。所以我们当我们回到main方法的时候，需要再次Step Into进入new ClassPathXmlApplicationContext。

![image-20220103222233024](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220103222233024.png)

可以发现，这次我们来到的是ClassPathXmlApplicationContext。也就是说，程序从开始运行到现在，有两次进入

```java
ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
```

第一次是进入ApplicationContext，第二次进入ClassPathXmlApplicationContext。而目的也很显然，就是创建一个ClassPathXmlApplicationContext对象，加载我们给定的XML配置文件。

这时候如果我们Step Over跳过这个构造器方法的话，肯定又是回到了main函数，然后结束bean的创建。因此我们继续Step Into查看它是如何创建bean的(也可以在refresh方法上打上断点，再F9 Resume Program，使程序运行到这个断点)。

![image-20220103223116959](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220103223116959.png)

我们可以看到，构造器的注释中告诉我们refresh就是“**loading all bean definitions and creating all singletons**”。因此我们进入一路Step Over来到refresh并Step Into进入里面。我们来详细看一下refresh方法：

```java
@Override
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");

        // Prepare this context for refreshing.
        prepareRefresh();

// 这里是Spring解析xml配置文件，将要创建的所有bean的配置信息保存起来，所以想要看Spring对xml的解析可以Step Into里面
        // Tell the subclass to refresh the internal bean factory.
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        // Prepare the bean factory for use in this context.
        prepareBeanFactory(beanFactory);

        try {
            // Allows post-processing of the bean factory in context subclasses.
            postProcessBeanFactory(beanFactory);

            StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
            // Invoke factory processors registered as beans in the context.
            invokeBeanFactoryPostProcessors(beanFactory);

            // Register bean processors that intercept bean creation.
            registerBeanPostProcessors(beanFactory);
            beanPostProcess.end();
            
// 支持国际化功能的
            // Initialize message source for this context.
            initMessageSource();

            // Initialize event multicaster for this context.
            initApplicationEventMulticaster();
            
// 空方法，留给子类使用的
            // Initialize other special beans in specific context subclasses.
            onRefresh();

            // Check for listener beans and register them.
            registerListeners();
            
// 从名字就可以知道，这里是初始化所有单实例bean的地方
            // Instantiate all remaining (non-lazy-init) singletons.
            finishBeanFactoryInitialization(beanFactory);

            // Last step: publish corresponding event.
            finishRefresh();
        }

        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                            "cancelling refresh attempt: " + ex);
            }

// 销毁已经创建的单例bean
            // Destroy already created singletons to avoid dangling resources.
            destroyBeans();

            // Reset 'active' flag.
            cancelRefresh(ex);

            // Propagate exception to caller.
            throw ex;
        }

        finally {
            // Reset common introspection caches in Spring's core, since we
            // might not ever need metadata for singleton beans anymore...
            resetCommonCaches();
            contextRefresh.end();
        }
    }
}
```

程序运行到finishBeanFactoryInitialization方法的时候，就结束了bean的初始化。

![image-20220111103916936](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111103916936.png)

```java
/**
	 * Finish the initialization of this context's bean factory,
	 * initializing all remaining singleton beans.
	 */
protected void finishBeanFactoryInitialization(ConfigurableListableBeanFactory beanFactory) {

// 自动类型转换，不用管
    // Initialize conversion service for this context.
    if (beanFactory.containsBean(CONVERSION_SERVICE_BEAN_NAME) &&
        beanFactory.isTypeMatch(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class)) {
        beanFactory.setConversionService(
            beanFactory.getBean(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class));
    }

// 处理前置处理器
    // Register a default embedded value resolver if no bean post-processor
    // (such as a PropertyPlaceholderConfigurer bean) registered any before:
    // at this point, primarily for resolution in annotation attribute values.
    if (!beanFactory.hasEmbeddedValueResolver()) {
        beanFactory.addEmbeddedValueResolver(strVal -> getEnvironment().resolvePlaceholders(strVal));
    }

// @Autowired相关
    // Initialize LoadTimeWeaverAware beans early to allow for registering their transformers early.
    String[] weaverAwareNames = beanFactory.getBeanNamesForType(LoadTimeWeaverAware.class, false, false);
    for (String weaverAwareName : weaverAwareNames) {
        getBean(weaverAwareName);
    }

    // Stop using the temporary ClassLoader for type matching.
    beanFactory.setTempClassLoader(null);

    // Allow for caching all bean definition metadata, not expecting further changes.
    beanFactory.freezeConfiguration();

// bean初始化
    // Instantiate all remaining (non-lazy-init) singletons.
    beanFactory.preInstantiateSingletons();
}
```

Step Into进入preInstantiateSingletons方法：

![image-20220111105120658](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111105120658.png)

```java
@Override
public void preInstantiateSingletons() throws BeansException {
    if (logger.isTraceEnabled()) {
        logger.trace("Pre-instantiating singletons in " + this);
    }

    // Iterate over a copy to allow for init methods which in turn register new bean definitions.
    // While this may not be part of the regular factory bootstrap, it does otherwise work fine.
    List<String> beanNames = new ArrayList<>(this.beanDefinitionNames);

// bean实例真正初始化的地方
    // Trigger initialization of all non-lazy singleton beans...
    for (String beanName : beanNames) {
        
// 根据bean的id获取到bean的定义信息
        RootBeanDefinition bd = getMergedLocalBeanDefinition(beanName);
        
// 如果这个bean不是抽象并且是单例的，也不是懒加载的，我们就在容器中注册这个bean
        if (!bd.isAbstract() && bd.isSingleton() && !bd.isLazyInit()) {
            
// 是否是一个实现了FactoryBean接口的bean
            if (isFactoryBean(beanName)) {
                Object bean = getBean(FACTORY_BEAN_PREFIX + beanName);
                if (bean instanceof FactoryBean) {
                    final FactoryBean<?> factory = (FactoryBean<?>) bean;
                    boolean isEagerInit;
                    if (System.getSecurityManager() != null && factory instanceof SmartFactoryBean) {
                        isEagerInit = AccessController.doPrivileged((PrivilegedAction<Boolean>)
                                                                    ((SmartFactoryBean<?>) factory)::isEagerInit,
                                                                    getAccessControlContext());
                    }
                    else {
                        isEagerInit = (factory instanceof SmartFactoryBean &&
                                       ((SmartFactoryBean<?>) factory).isEagerInit());
                    }
                    if (isEagerInit) {
                        getBean(beanName);
                    }
                }
            }
            
// 否则，根据beanName直接获取
            else {
                getBean(beanName);
            }
        }
    }

// bean初始化之后的回调函数
    // Trigger post-initialization callback for all applicable beans...
    for (String beanName : beanNames) {
        Object singletonInstance = getSingleton(beanName);
        if (singletonInstance instanceof SmartInitializingSingleton) {
            final SmartInitializingSingleton smartSingleton = (SmartInitializingSingleton) singletonInstance;
            if (System.getSecurityManager() != null) {
                AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
                    smartSingleton.afterSingletonsInstantiated();
                    return null;
                }, getAccessControlContext());
            }
            else {
                smartSingleton.afterSingletonsInstantiated();
            }
        }
    }
}
```

Step Into进入getBean方法：

![image-20220111105740064](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111105740064.png)

再Step Into进入doGetBean方法：通过方法上的注释可以知道，这个方法会返回一个bean实例。

```java
/**
	 * Return an instance, which may be shared or independent, of the specified bean.
	 * @param name the name of the bean to retrieve
	 * @param requiredType the required type of the bean to retrieve
	 * @param args arguments to use when creating a bean instance using explicit arguments
	 * (only applied when creating a new instance as opposed to retrieving an existing one)
	 * @param typeCheckOnly whether the instance is obtained for a type check,
	 * not for actual use
	 * @return an instance of the bean
	 * @throws BeansException if the bean could not be created
	 */
@SuppressWarnings("unchecked")
protected <T> T doGetBean(final String name, @Nullable final Class<T> requiredType,
                          @Nullable final Object[] args, boolean typeCheckOnly) throws BeansException {

    final String beanName = transformedBeanName(name);
    Object bean;

    // Eagerly check singleton cache for manually registered singletons.
    Object sharedInstance = getSingleton(beanName);
    
// context.getBean("person01", Person.class)的执行流程
    if (sharedInstance != null && args == null) {
        if (logger.isTraceEnabled()) {
            if (isSingletonCurrentlyInCreation(beanName)) {
                logger.trace("Returning eagerly cached instance of singleton bean '" + beanName +
                             "' that is not fully initialized yet - a consequence of a circular reference");
            }
            else {
                logger.trace("Returning cached instance of singleton bean '" + beanName + "'");
            }
        }
        bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
    }

    else {
        // Fail if we're already creating this bean instance:
        // We're assumably within a circular reference.
        if (isPrototypeCurrentlyInCreation(beanName)) {
            throw new BeanCurrentlyInCreationException(beanName);
        }

// 先检查bean准备初始化的bean实例是否已经存在了
        // Check if bean definition exists in this factory.
        BeanFactory parentBeanFactory = getParentBeanFactory();

// 要初始化的bean实例没有父类bean并且不在已经初始化的bean队列中
        if (parentBeanFactory != null && !containsBeanDefinition(beanName)) {
            // Not found -> check parent.
            String nameToLookup = originalBeanName(name);
            if (parentBeanFactory instanceof AbstractBeanFactory) {
                return ((AbstractBeanFactory) parentBeanFactory).doGetBean(
                    nameToLookup, requiredType, args, typeCheckOnly);
            }
            else if (args != null) {
                // Delegation to parent with explicit args.
                return (T) parentBeanFactory.getBean(nameToLookup, args);
            }
            else if (requiredType != null) {
                // No args -> delegate to standard getBean method.
                return parentBeanFactory.getBean(nameToLookup, requiredType);
            }
            else {
                return (T) parentBeanFactory.getBean(nameToLookup);
            }
        }

// 标记这个bean已经被创建了，用于多线程使用
        if (!typeCheckOnly) {
            markBeanAsCreated(beanName);
        }

        try {
            final RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
            checkMergedBeanDefinition(mbd, beanName, args);

// 拿到创建当前bean需要提前创建的bean，dependsOn属性：如果有，就循环创建
            // Guarantee initialization of beans that the current bean depends on.
            String[] dependsOn = mbd.getDependsOn();
            if (dependsOn != null) {
                for (String dep : dependsOn) {
                    if (isDependent(beanName, dep)) {
                        throw new BeanCreationException(mbd.getResourceDescription(), beanName,
                                                        "Circular depends-on relationship between '" + beanName + "' and '" + dep + "'");
                    }
                    registerDependentBean(dep, beanName);
                    try {
                        getBean(dep);
                    }
                    catch (NoSuchBeanDefinitionException ex) {
                        throw new BeanCreationException(mbd.getResourceDescription(), beanName,
                                                        "'" + beanName + "' depends on missing bean '" + dep + "'", ex);
                    }
                }
            }

// 单实例bean真正初始化的地方
            // Create bean instance.
            if (mbd.isSingleton()) {
                sharedInstance = getSingleton(beanName, () -> {
                    try {
                        return createBean(beanName, mbd, args);
                    }
                    catch (BeansException ex) {
                        // Explicitly remove instance from singleton cache: It might have been put there
                        // eagerly by the creation process, to allow for circular reference resolution.
                        // Also remove any beans that received a temporary reference to the bean.
                        destroySingleton(beanName);
                        throw ex;
                    }
                });
                bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
            }

            else if (mbd.isPrototype()) {
                // It's a prototype -> create a new instance.
                Object prototypeInstance = null;
                try {
                    beforePrototypeCreation(beanName);
                    prototypeInstance = createBean(beanName, mbd, args);
                }
                finally {
                    afterPrototypeCreation(beanName);
                }
                bean = getObjectForBeanInstance(prototypeInstance, name, beanName, mbd);
            }

            else {
                String scopeName = mbd.getScope();
                final Scope scope = this.scopes.get(scopeName);
                if (scope == null) {
                    throw new IllegalStateException("No Scope registered for scope name '" + scopeName + "'");
                }
                try {
                    Object scopedInstance = scope.get(beanName, () -> {
                        beforePrototypeCreation(beanName);
                        try {
                            return createBean(beanName, mbd, args);
                        }
                        finally {
                            afterPrototypeCreation(beanName);
                        }
                    });
                    bean = getObjectForBeanInstance(scopedInstance, name, beanName, mbd);
                }
                catch (IllegalStateException ex) {
                    throw new BeanCreationException(beanName,
                                                    "Scope '" + scopeName + "' is not active for the current thread; consider " +
                                                    "defining a scoped proxy for this bean if you intend to refer to it from a singleton",
                                                    ex);
                }
            }
        }
        catch (BeansException ex) {
            cleanupAfterBeanCreationFailure(beanName);
            throw ex;
        }
    }

    // Check if required type matches the type of the actual bean instance.
    if (requiredType != null && !requiredType.isInstance(bean)) {
        try {
            T convertedBean = getTypeConverter().convertIfNecessary(bean, requiredType);
            if (convertedBean == null) {
                throw new BeanNotOfRequiredTypeException(name, requiredType, bean.getClass());
            }
            return convertedBean;
        }
        catch (TypeMismatchException ex) {
            if (logger.isTraceEnabled()) {
                logger.trace("Failed to convert bean '" + name + "' to required type '" +
                             ClassUtils.getQualifiedName(requiredType) + "'", ex);
            }
            throw new BeanNotOfRequiredTypeException(name, requiredType, bean.getClass());
        }
    }
    
// 返回已经初始化好的单实例bean
    return (T) bean;
}
```

![image-20220111110623595](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111110623595.png)

![image-20220111110701303](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111110701303.png)

如此，循环执行doGetBean方法将所有的bean进行初始化

![image-20220111110804538](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111110804538.png)

---

下面来看创建好的bean实例保存在哪里？？？

在preInstantiateSingletons里面有一个回调函数：

```java
// Trigger post-initialization callback for all applicable beans...
for (String beanName : beanNames) {
    Object singletonInstance = getSingleton(beanName);
    if (singletonInstance instanceof SmartInitializingSingleton) {
        final SmartInitializingSingleton smartSingleton = (SmartInitializingSingleton) singletonInstance;
        if (System.getSecurityManager() != null) {
            AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
                smartSingleton.afterSingletonsInstantiated();
                return null;
            }, getAccessControlContext());
        }
        else {
            smartSingleton.afterSingletonsInstantiated();
        }
    }
}
```

我们进入getSingleton方法，它是获取bean实例的方法：

```java
/**
	 * Return the (raw) singleton object registered under the given name.
	 * <p>Checks already instantiated singletons and also allows for an early
	 * reference to a currently created singleton (resolving a circular reference).
	 * @param beanName the name of the bean to look for
	 * @param allowEarlyReference whether early references should be created or not
	 * @return the registered singleton object, or {@code null} if none found
	 */
@Nullable
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
    Object singletonObject = this.singletonObjects.get(beanName);
    if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
        synchronized (this.singletonObjects) {
            singletonObject = this.earlySingletonObjects.get(beanName);
            if (singletonObject == null && allowEarlyReference) {
                ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                if (singletonFactory != null) {
                    
// 创建bean
                    singletonObject = singletonFactory.getObject();
                    this.earlySingletonObjects.put(beanName, singletonObject);
                    this.singletonFactories.remove(beanName);
                }
            }
        }
    }
    return singletonObject;
}
```

在getSingleton方法里面，可以看到，先从一个地方获取到bean。我们按住Ctrl再鼠标左键点击11行的singletonObjects跳转到它的定义：

```java
/** Cache of singleton objects: bean name to bean instance. */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
```

可以看到这是一个Map集合，集合的Map就是bean实例的id，value就是bean实例的属性值。

![image-20220111114114235](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220111114114235.png)

因此，通过这里，我们可以知道：创建好的bean实例就保存在这个map集合当中（DefaultSingletonBeanRegistry---->singletonObjects）！

# 总结

**打断点的几处地方：**

> - ```java
>   ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");	// SourTest.java	14行
>   ```
>
> - ```java
>   refresh();		// ClassPathXmlApplicationContext	144行
>   ```
>
> - ```java
>   finishBeanFactoryInitialization(beanFactory);	// AbstractApplicationContext	550行
>   ```
>
> - ```java
>   beanFactory.preInstantiateSingletons();		// AbstractApplicationContext	878行
>   ```
>
> - ```java
>   getBean(beanName);	// DefaultListableBeanFactory	895行
>   ```
>
> - ```java
>   final String beanName = transformedBeanName(name);	// AbstractBeanFactory	245行
>   ```
>
> - ```java
>   Object singletonInstance = getSingleton(beanName);	// DefaultListableBeanFactory	902行
>   ```

**关于BeanFactory和ApplicationContext的区别：**

> - ApplicationContext是BeanFactory的子接口
>
>   - BeanFactory：bean工厂接口，负责创建bean实例；容器里面保存的所有单例bean其实是一个map；也是Spring最底层的接口。
>
>   - ApplicationContext：是容器接口，更多的是负责容器功能的实现（可以基于BeanFactory创建好的对象之上完成强大的容器）。
>
>     容器可以从map获取这个bean，并且AOP、DI在ApplicationContext接口下的这些类里面。
>
>     ApplicationContext是留给程序员使用的IOC容器接口。
>
> - Spring里面最大的模式就是工厂模式。

