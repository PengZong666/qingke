---
title: Spring注解驱动开发【源码】——Spring源码总结
date: 2022-02-08 22:07:17
tags:
---

> Spring容器的refresh() 【创建刷新】
> 1、prepareRefresh(); 刷新前的预处理
>     1、initPropertySources(); 初始化一些属性设置，子类自定义个性化的属性设置方法
>     2、getEnvironment().validateRequiredProperties(); 校验属性的合法等
>     3、this.earlyApplicationEvents = new LinkedHashSet<ApplicationEvent>(); 保存容器中的一些早期的事件
> 2、ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory(); 获取BeanFactory
>     1、refreshBeanFactory(); 刷新【创建】BeanFactory
>         创建一个 this.beanFactory = new DefaultListableBeanFactory();
>         设置id
>     2、ConfigurableListableBeanFactory beanFactory = getBeanFactory();
>         return this.beanFactory; 返回GenericApplicationContext刚才创建的BeanFactory
>     3、return beanFactory; 将创建好的BeanFactory【DefaultListableBeanFactory】返回
> 3、prepareBeanFactory(beanFactory); BeanFactory的预准备工作（对BeanFactory进行一些设置）
>     1、设置BeanFactory的类加载器、支持表达式解析器......
>     2、添加部分BeanPostProcessor【ApplicationContextAwareProcessor】
>     3、设置忽略的自动装配的接口【EnvironmentAware、EmbeddedValueResolverAware、......】
>     4、注册可以解析的自动装配，我们能够在任何组件中自动注入：BeanFactory、ResourceLoader、ApplicationEventPublisher、ApplicationContext
>     5、添加BeanPostProcessor【ApplicationListenerDetector】
>     6、添加编译时的AspectJ
>     7、给BeanFactory中注册一些能用的组件
>         environment【ConfigurableEnvironment】、
>         systemProperties【Map<String, Object>】、
>         systemEnvironment【Map<String, Object>】
> 4、postProcessBeanFactory(beanFactory); BeanFactory准备工作完成后进行的后置处理工作
>     1、子类通过重写这个方法来在BeanFactory创建并预准备完成以后做进一步设置
>
> ================================以上是BeanFactory的创建并预准备工作================================
>
> 5、invokeBeanFactoryPostProcessors(beanFactory); 执行BeanFactoryPostProcessor
>     BeanFactoryPostProcessor：BeanFactory的后置处理器，在BeanFactory标准初始化之后执行的
>     两个接口：BeanFactoryPostProcessor、BeanDefinitionRegistryPostProcessor
>     1、先执行BeanDefinitionRegistryPostProcessor的方法：
>         1、获取所有的BeanDefinitionRegistryPostProcessor
>         2、先执行实现了PriorityOrdered优先级接口的BeanDefinitionRegistryPostProcessor
>             postProcessor.postProcessBeanDefinitionRegistry(registry);
>         3、在执行实现了Ordered顺序接口的BeanDefinitionRegistryPostProcessor
>             postProcessor.postProcessBeanDefinitionRegistry(registry);
>         4、最后执行没有实现任何优先级或者是顺序接口的BeanDefinitionRegistryPostProcessor
>             postProcessor.postProcessBeanDefinitionRegistry(registry);
>     2、再执行BeanFactoryPostProcessor的方法：
>         1、获取所有的BeanFactoryPostProcessor
>         2、先执行实现了PriorityOrdered优先级接口的BeanFactoryPostProcessor
>             postProcessor.postProcessBeanFactory(beanFactory);
>         3、在执行实现了Ordered顺序接口的BeanFactoryPostProcessor
>             postProcessor.postProcessBeanFactory(beanFactory);
>         4、最后执行没有实现任何优先级或者是顺序接口的BeanFactoryPostProcessor
>             postProcessor.postProcessBeanFactory(beanFactory);
> 6、registerBeanPostProcessors(beanFactory); 注册BeanPostProcessor（Bean的后置处理器）【intercept bean creation.】
>     不同接口类型的BeanPostProcessor在Bean创建前后的执行时机是不一样的
>         BeanPostProcessor、
>         DestructionAwareBeanPostProcessor、
>         InstantiationAwareBeanPostProcessor、
>         SmartInstantiationAwareBeanPostProcessor、
>         MergedBeanDefinitionPostProcessor
>     1、获取所有的BeanPostProcessor，后置处理器都默认可以通过PriorityOrdered、Ordered接口来指定优先级
>     2、先注册PriorityOrdered优先级接口的BeanPostProcessor
>         把每一个BeanPostProcessor添加到BeanFactory中
>         beanFactory.addBeanPostProcessor(postProcessor);
>     3、再注册Ordered接口的
>     4、注册一些剩下的
>     5、最终注册MergedBeanDefinitionPostProcessor
>     6、beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext)); 注册一个ApplicationListenerDetector来在Bean创建完成后检查是否是ApplicationListener，
>         如果是this.applicationContext.addApplicationListener((ApplicationListener<?>) bean);
> 7、【初始化MessageSource组件（做国际化功能：消息绑定、消息解析）】initMessageSource();
>     1、ConfigurableListableBeanFactory beanFactory = getBeanFactory(); 获取BeanFactory
>     2、看容器中是否有id为messageSource的组件
>         如果有，赋值给messageSource属性；如果没有，自己创建一个DelegatingMessageSource
>             MessageSource：取出国际化配置文件中某个key的值，能按照区域信息获取
>     3、把创建好的MessageSource注册到容器中，以后获取国际化配置文件的时候，可以自动注入MessageSource
>         beanFactory.registerSingleton(MESSAGE_SOURCE_BEAN_NAME, this.messageSource);
>         MessageSource.String getMessage(String code, Object[] args, String defaultMessage, Locale locale);
> 8、【初始化事件派发器】initApplicationEventMulticaster();
>     1、获取BeanFactory
>     2、从BeanFactory中获取applicationEventMulticaster的ApplicationEventMulticaster
>     3、如果上一步没有配置，创建一个SimpleApplicationEventMulticaster
>     4、将创建的ApplicationEventMulticaster添加到BeanFactory中，以后其它组件直接自动注入
> 9、【留给子容器的（子类）】onRefresh();
>     1、子类重写这个方法，在容器刷新的时候，可以自定义逻辑
> 10、【给容器中将所有项目中的ApplicationListener注册进来】registerListeners();
>     1、从容器中拿到所有的ApplicationListener
>     2、将每个监听器添加到事件派发器中
>         getApplicationEventMulticaster().addApplicationListenerBean(listenerBeanName);
>     3、getApplicationEventMulticaster().multicastEvent(earlyEvent); 派发之前步骤产生的事件
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
> 12、【完成BeanFactory的初始化创建工作，IOC容器就创建完成】finishRefresh();
>     1、【初始化和生命周期有关的后置处理器】initLifecycleProcessor();   LifecycleProcessor
>         默认从容器中找是否有LifecycleProcessor的组件，如果没有new DefaultLifecycleProcessor();加入到容器中
>         写一个LifecycleProcessor的实现类，可以在BeanFactory刷新完成以及关闭的时候做一些事情
>             void onRefresh();   void onClose();
>     2、【拿到前面定义的生命周期处理器（BeanFactory），回调onRefresh()】getLifecycleProcessor().onRefresh();
>     3、【发布容器刷新完成事件】publishEvent(new ContextRefreshedEvent(this));
>     4、【最后一步】LiveBeansView.registerApplicationContext(this);
>
> ===================================总结===================================
> 1、Spring在容器启动的时候，先会保存所有注册进来的Bean的定义信息
>     1、XML注册Bean：<bean>
>     2、注解注册Bean：@Service、@Component、@Bean、xxx
> 2、Spring容器会在合适的时机创建这些Bean
>     1、用到这个Bean的时候，利用getBean创建Bean，创建好以后保存在容器中
>     2、统一创建剩下的Bean的时候：finishBeanFactoryInitialization(beanFactory);
> 3、后置处理器
>     每一个bean创建完成，都会使用各种后置处理器进行处理，来增强bean的功能
>         AutowiredAnnotationBeanPostProcessor：处理自动注入
>         AnnotationAwareAspectJAutoProxyCreator：来做AOP功能
>         xxx...
>         增强的功能注解
>         AsyncAnnotationBeanPostProcessor
>         ....
> 4、事件驱动模型
>     ApplicationListener：事件监听

