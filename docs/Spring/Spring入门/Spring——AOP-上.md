---
title: Spring-AOP(上)
date: 2021-12-31 22:34:36
tags:
---

我们都知道，Java是一种OOP语言，也就是Object Oriented Programming，面向对象编程。而Spring中的AOP，则是Aspect Oriented Programming，面向切面编程——基于OOP的新的编程思想。那么什么是面向切面编程呢？我们用一句话来说就是：**指在程序运行期间，将某段代码动态的切入到指定方法的指定位置进行运行的这种编程方式**，就是面向切面编程。

下面我们通过一个具体的业务场景来认识它！

假设我们有一个计算器类MyMathCalculator，它继承于Calculator接口。MyMathCalculator实现了Calculator中的4个方法add、sub、mul和div。

![image-20220101000232218](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101000232218.png)

现在我们想要在每个方法运行之前打印一条日志记录，日志内容为“【什么方法】开始运行了，参数为：”。在每个方法运行结束之前打印一条日志记录，日志内容为“【什么方法】结束运行了，运算结果是：”。

要实现这个业务功能也很简单，我们可以简单的在这四个实现方法中的开始和结束分别加上一条System输出语句。

![image-20220101000905342](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101000905342.png)

但是如果这是我们的需求又发生改变，我们把日志内容进行修改了，或者开始运行这条日志记录我们不需要了。这时候，我们就需要对每一个方法进行修改，而我们现在仅仅是只有四个方法，那如果有四十个、四百个方法呢？这样修改过于复杂、且没有什么实际意义。

所以我们真正想要实现的目标是：业务逻辑当中，不要出现日志记录这种辅助功能。我们写一个日志模块，在核心功能运行期间，它可以自己动态地加上。

# 动态代理？？？

我们能想到的一种办法是可以使用动态代理来解决这个在方法运行前以及运行结束时添加日志，我们可以新建一个代理类CalculatorProxy帮助Calculator类生成代理对象：

```java
package com.atqingke.proxy;

import com.atqingke.inter.Calculator;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

/**
 * 帮Calculator.java生成代理对象的类
 * @Author pengbin007
 * @Date 2021/12/29 22:36
 */
public class CalculatorProxy {

    /**
     * 为传入的参数创建一个动态代理对象
     * @param calculator 被代理对象 内部类要使用参数必须将参数设置为final的
     * @return
     */
    public static Calculator getProxy(final Calculator calculator) {

        // 方法执行器，帮我们目标对象执行目标方法
        InvocationHandler h = new InvocationHandler() {
            /**
             * 利用反射执行目标方法
             * @param proxy 代理对象，给JDK使用，任何时候都不要动这个对象
             * @param method 当前将要执行的目标对象的方法
             * @param args 这个方法调用时外界传入的参数值
             * @return 返回值必须返回出去外界才能拿到真正执行后的返回值
             */
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                Object result = null;
                try {
                    System.out.println("【" + method + "】方法开始了，它使用的参数是【" + Arrays.toString(args) + "】");
                    result = method.invoke(calculator, args);
                    System.out.println("【" + method + "】方法执行完成，计算结果是：" + result);
                } catch (Exception exception) {
                    System.out.println("【" + method + "】方法执行出现异常了，异常信息是：" + exception + "；这个异常已经通知测试小组进行排查！");
                } finally {
                    System.out.println("【" + method + "】方法最终结束了!!!");
                }

                return result;
            }
        };

        ClassLoader loader = calculator.getClass().getClassLoader();
        Class<?>[] interfaces = calculator.getClass().getInterfaces();
        Object proxy = Proxy.newProxyInstance(loader, interfaces, h);
        return (Calculator) proxy;
    }
}
```

这里我们讨论的是SpringAOP，关于这个代理类的具体细节就不做讨论了！

这样做看起来很方便，也很好用，但是实际中还是由两个问题：

- 第一个问题就是这个代理类写起来难。
- 第二个问题是JDK默认的动态代理，如果目标对象没有实现任何接口，是无法为它创建代理对象的。

关于第一个问题我们不做详细探讨，我们来看第二个问题。我们将MyMathCalculator类取消对Calculator的实现

![image-20220101002841522](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101002841522.png)

这是我们再进行测试，可以看到没有任何日志打印

![image-20220101002920130](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101002920130.png)

因此，使用动态代理也不能很好的解决我们所遇到的问题。

接下来我们看使用Spring的AOP！

# AOP！！！

首先，我们先在配置文件中开启基于注解的AOP功能：

![image-20220101003206313](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101003206313.png)

接下来，我们来看一下AOP中有哪些注解：

> @Before 在目标方法之前运行                          		 	  前置通知
>
> @After 在目标方法结束之后运行                        			 后置通知
>
> @AfterReturning 在目标方法正常返回之后运行           返回通知
>
> @AfterThrowing 在目标方法抛出异常之后运行            异常通知
>
> @Around                                          								环绕通知

现在，我们就来写一个类LogUtils来使用AOP：

```java
package com.atqingke.utils;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * @Author pengbin007
 * @Date 2021/12/31 16:40
 */
@Aspect	// 告诉Spring这是一个切面类
@Component
public class LogUtils {

    @Before("execution(public int com.atqingke.impl.MyMathCalculator.*(int, int))")
    public static void logStart() {
        System.out.println("【xxx】方法开始了，它使用的参数是【xxx】");
    }

    @AfterReturning("execution(public int com.atqingke.impl.MyMathCalculator.*(int, int))")
    public static void logReturn() {
        System.out.println("【xxx】方法执行完成，计算结果是：【xxx】");
    }

    @AfterThrowing("execution(public int com.atqingke.impl.MyMathCalculator.*(int, int))")
    public static void logException() {
        System.out.println("【xxx】方法执行出现异常了，异常信息是：【xxx】；这个异常已经通知测试小组进行排查！");
    }

    @After("execution(public int com.atqingke.impl.MyMathCalculator.*(int, int))")
    public static void logEnd() {
        System.out.println("【xxx】方法最终结束了!!!");
    }
}
```

![image-20220101010756196](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101010756196.png)

在这里，我们先不讨论关于参数的问题。我们可以看到，通过这几个注解，我们得到了我们想要的效果！

下面我们来看几个关于AOP的术语：

![image-20220101005534247](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101005534247.png)

- **横切关注点**。在图中，我们可以清楚的看到，所谓的横切关注点，就是指从每个方法中抽取出来的同一类非核心业务。在这里，有四个抽取出来的业务，分别是方法开始时、方法返回时、方法出现异常时、方法结束时需要执行的一系列操作。
- **通知方法**。实现横切关注点的方法。
- **切入点**。假设我们只需要在add方法结束时、mul方法返回时、div方法异常时打印日志，其它位置或者其它方法我们不进行任何操作。那么这三个点就是我们需要执行操作的地方，也就是我们的切入点。
- **连接点**。见图。
- **切入点表达式**。通过一个表达式，告诉通知方法需要对业务中的哪些方法进行切入。
- **切面类**。横切关注点 + 通知方法 = 切面类。

