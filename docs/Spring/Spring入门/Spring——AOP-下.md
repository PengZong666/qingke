---
title: Spring-AOP(下)
date: 2022-01-01 01:24:21
tags:
---

书接上回

# 细节七：抽取可重用的切入点表达式

我们现在已经了解了四个注解@Before、@After、@AfterReturning和@AfterThrowing。现在我们考虑一个需求，我们的切入点修改了，不是在MyMathCalculator的所有方法下切入，而是MyMathCalculator的add方法中进行切入。我们当然可以对每个注解中的切入点表达式进行修改，但这样过于麻烦。

我们有一个注解@Pointcut，就是专门用来解决这类业务场景的。要使用@Pointcut，首先需要一个空方法，这个方法没有实现，也没有返回值。然后在方法上添加上@Pointcut注解，将切入点表达式写入注解的属性中：

```java
@Pointcut("execution(public int com..MyMathCalculator.*(int, int))")
public void myPoint() {}
```

现在我们就有了一个可以重复使用的切入点表达式，我们可以将其它注解中的切入点表达式换成我们写的这个公共的：

```java
@Before("myPoint()")
@AfterReturning(value = "myPoint()", returning="result")
@AfterThrowing(value = "myPoint()", throwing="exception")
@After("myPoint()")
```

使用这个可重用的切入点表达式就如上面所示的那样简单，只要将切入点表达式换成我们标注有@Pointcut注解的方法名即可。这下，我们要实现这个业务需求就只需要在@Pointcut中修改即可：

```java
@Pointcut("execution(public int com..MyMathCalculator.add(int, int))")
public void myPoint() {}
```

# 细节八：环绕通知

经过前面的介绍，我们就只剩下最后一个注解@Around，顾名思义，这表示的就是环绕通知，我们先来看一下如何使用：

```java
@Around("myPoint()")
public Object myAround(ProceedingJoinPoint pjp) {
    Object[] args = pjp.getArgs();
    String name = pjp.getSignature().getName();
    Object proceed = null;
    try {
        // 就是利用反射调用目标方法即可
        // @Before
        System.out.println("【环绕通知】" + name + "方法开始");
        proceed = pjp.proceed(args);
        // @AfterReturning
        System.out.println("【环绕通知】" + name + "方法返回，返回值" + proceed);
    } catch (Throwable throwable) {
        // @AfterThrowing
        System.out.println("【环绕通知】" + name + "方法出现异常，异常信息" + throwable);
        // 为了让普通通知接收到这个异常，我们需要抛出去；否则，普通通知得到的是没有异常的结果
        throw new RuntimeException();
    } finally {
        // @After
        System.out.println("【环绕通知】" + name + "方法结束");
    }

    // 反射调用后的返回值也一定返回出去
    return proceed;
}
```

可以看到，环绕通知就和我们一开始写的动态代理类似。ProceedingJoinPoint继承了JoinPoint，proceed方法传参利用反射去调用目标方法，反射调用完后会有返回值，这个返回值一定要返回会出去。

![image-20220101162422234](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101162422234.png)

可以看到，如果没有返回出去，普通通知获取不到正确的目标方法返回值。

在这里，我们要注意的是：如果我们在使用环绕通知的同时也开启了普通通知，且发生了异常，为了让普通通知接收到异常信息，我们在环绕通知里需要把这个异常信息抛出去，否则，普通通知得到的是没有异常的结果。

![image-20220101161603373](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101161603373.png)

![image-20220101161754808](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101161754808.png)

# 细节九：环绕通知的执行顺序

加入了环绕通知之后的执行顺序，通过上面的例子也可以看到：

> 环绕前置、普通前置 ----> 目标方法运行 ----> 环绕正常返回/异常 ----> 环绕后置 ----> 普通后置 ----> 普通正常返回/异常

# 细节十：多切面运行顺序

我们现在只有一个切面类，假设我们有另外一个切面类ValidateAspect。它跟LogUtils拥有一样的功能，只是类名不一样，那么这些通知的执行顺序会是什么样的呢？

![image-20220101163845847](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101163845847.png)

为什么是这样的顺序呢？我们来看一张图就明白了！

![image-20220101164313019](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101164313019.png)

程序首先运行到LogUtils，LogUtils的前置通知开始工作；再到达ValidateAspect，ValidateAspect的前置通知开始工作；然后运行目标方法；目标方法运行完后，又到达ValidateAspect，ValidateAspect开始工作；最后来到LogUtils。

那为什么是先到达LogUtils，再经过ValidateAspect呢？你可以简单认为就是字母L排在V前面。

那如果这个顺序并不是我们想要的，我们想让ValidateAspect先运行要怎么做呢？我们可以在切面类上加一个@Order注解，它就是用来控制切面类的执行顺序。@Order注解中属性的值越小，越有执行优先权。

![image-20220101164858386](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101164858386.png)

# 关于环绕通知和普通通知的一些补充

通过上面的介绍，我们知道，环绕通知其实就是一个动态代理，它的 pjp.proceed(args); 就和一开始的动态代理中的 method.invoke(calculator, args); 作用一样。因此，环绕通知是可以影响目标方法的运行的。例如，在调用proceed之前，将传入的参数进行修改。而普通通知我们可以看成最初的在方法前后加输出语句，它只是在目标方法运行前后切入一段代码，但是这段代码并不会影响目标方法的运行。所以，如果我们只是做一些简单的日志记录，使用普通通知就够了；而如果我们想要对目标方法做一些干预，就选择环绕通知。

# AOP的应用

到这里，关于SpringAOP就差不多介绍完了。那么AOP可以在哪里使用呢？就像我们一开始的业务场景需求，AOP可以用于以下几个方面：

- 加日志保存到数据库；
- 做权限验证；
- 做安全检查；
- 做事务控制。

# 基于配置文件的AOP

配合基于注解方式理解食用，这里不做详细解释了！

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="myCalculator" class="com.atqingke.impl.MyMathCalculator"/>
    <bean id="logUtils" class="com.atqingke.utils.LogUtils"/>
    <bean id="validateAspect" class="com.atqingke.utils.ValidateAspect"/>

    <aop:config>
        <aop:pointcut expression="execution(public int com..MyMathCalculator.*(int, int))" id="globalPoint"/>

        <aop:aspect ref="logUtils" order="2">
            <aop:pointcut expression="execution(public int com..MyMathCalculator.*(int, int))" id="myPoint"/>
            <aop:before method="logStart" pointcut="execution(public int com..MyMathCalculator.*(int, int))"/>
            <aop:after-returning method="logReturn" pointcut-ref="myPoint" returning="result"/>
            <aop:after-throwing method="logException" pointcut-ref="myPoint" throwing="exception"/>
            <aop:after method="logEnd" pointcut-ref="myPoint"/>
            <aop:around method="myAround" pointcut-ref="globalPoint"/>
        </aop:aspect>

        <aop:aspect ref="validateAspect" order="1">
            <aop:pointcut expression="execution(public int com..MyMathCalculator.*(int, int))" id="myPoint"/>
            <aop:before method="logStart" pointcut="execution(public int com..MyMathCalculator.*(int, int))"/>
            <aop:after-returning method="logReturn" pointcut-ref="myPoint" returning="result"/>
            <aop:after-throwing method="logException" pointcut-ref="myPoint" throwing="exception"/>
            <aop:after method="logEnd" pointcut-ref="myPoint"/>
            <aop:around method="myAround" pointcut-ref="globalPoint"/>
        </aop:aspect>
    </aop:config>
</beans>
```

# 基于注解的AOP步骤

1. 将目标类和切面类都加入到IOC容器中，@Component
2. 告诉Spring哪个是切面类@Aspect
3. 在切面类中使用五个通知注解来配置切面中的这些通知方法都何时何地运行
4. 开启基于注解的AOP功能，<aop:aspectj-autoproxy/>

