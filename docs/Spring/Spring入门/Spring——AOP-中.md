---
title: Spring-AOP(中)
date: 2022-01-01 01:23:35
tags:
---

下面我们来讨论一些AOP的细节问题！

# 细节一：IOC容器中保存的是组件的代理对象

在上一节中如果注意到最后的测试会发现，我们获取的组件是Calculator接口类型的，而不是具体的实现类MyMathCalculator。我们可以在测试中取出这个代理对象来看一下：

![image-20220101141637841](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101141637841.png)

可以看到AOP的底层就是动态代理，容器中保存的组件是它的代理对象$Proxy16，而不是本类的类型。

那之前说过，AOP可以解决没有接口实现这个问题。我们来看一下，将接口实现取消，获取MyMathCalculator组件能否运行。

![image-20220101141912362](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101141912362.png)

![image-20220101142021797](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101142021797.png)

可以看到，没有接口实现的时候，就是本类类型，并且cglib帮我们创建好了代理对象。

# 细节二：切入点表达式写法

切入点表达式的固定格式是：execution(权限修饰符 返回类型 方法全类名(方法参数))

这这里也有通配符，常用的有两种，一种是“*”号，一种是“.”号。下面我们通过几个具体例子来了解这两种通配符在这里的用法。

- 匹配一个或多个字符：匹配以MyMath开头r结尾的类的所有方法

```java
execution(public int com.atqingke.impl.MyMath*r.*(int, int))
```

- 匹配任意一个参数：匹配两个参数，第一个int类型，第二个任意类型

```java
execution(public int com.atqingke.impl.MyMath*r.*(int, *))
```

- *号在路径中，只能匹配一层路径

```java
execution(public int com.*.impl.MyMathCalculator.*(int, int))
```

- 权限位置不能使用*；权限位置不写就行；public【可选的】

- 匹配任意多个、任意类型参数

```java
execution(public int com.atqingke.impl.MyMathCalculator.*(..))
```

- 匹配任意多层路径

```java
execution(public int com..impl.MyMathCalculator.*(int, int))
```

在这里我们记住两种就行：

最精确的：execution(public int com.atqingke.impl.MyMathCalculator.add(int, int))

最模糊的：execution(* *(..))：千万别写

当然，还有一些其它的通配符，比如：&&、||、!

* &&：我们要切入的位置满足这两个表达式

```java
execution(public int com.atqingke.impl.MyMathCalculator.*(int, int)) 
&& 
execution(public int com.atqingke.impl.MyMathCalculator.*(int, *))
```

* ||：满足任意一个表达式即可
* !：不满足即可

# 细节三：通知方法的执行顺序

从前面的例子中我们也可以发现一些关于通知方法的执行顺序，这些通知方法相当于一开始我们写的动态代理的位置如下：

```java
try {
     @Before
     method.invoke(obj, args);
     @AfterReturning
} catch (e) {
     @AfterThrowing
} finally {
     @After
}
```

当横切关注点正常执行的时候，通知方法的执行顺序为：正常执行：@Before -----> @After -----> @AfterReturning

而如果出现异常执行：@Before -----> @After -----> @AfterThrowing

# 细节四：JoinPoint获取目标方法的信息

现在的通知方法打印的日志跟我们最初想要的效果还差一点东西——打印的日志中没有目标方法名、目标方法参数、目标方法返回值以及出现异常时的异常信息。我们都是用“xxx”来代替这些信息的，下面我们就来说一下如何获取这些信息。

在org.aspectj.lang包下有一个类JoinPoint，它就是AOP提供给我的用来获取目标方法执行时候的相关信息。其中有一个getArgs()方法，用来**获取目标方法运行时使用的参数**；getSignature()方法用来获取目标方法的签名，通过获取到的签名signature，我们可以通过signature.getName()**获取目标方法名**。关于JoinPoint以及Signature的更多方法，大家可以查看它们的源码。

```java
    @Before("execution(public int com..MyMathCalculator.*(int, int))")
    public static void logStart(JoinPoint joinPoint) {
        // 获取到目标方法运行的时候使用的参数
        Object[] args = joinPoint.getArgs();        
        Object aThis = joinPoint.getThis();        
        Object target = joinPoint.getTarget();        
        SourceLocation sourceLocation = joinPoint.getSourceLocation();     
        String kind = joinPoint.getKind();
        System.out.println("joinPoint.getThis() = " + aThis + "\njoinPoint.getTarget() = " + target + "\njoinPoint.getSourceLocation() = " + sourceLocation + "\njoinPoint.getKind() = " + kind);
        // 获取到方法签名
        Signature signature = joinPoint.getSignature();
        // 获取方法名
        String name = signature.getName();
        int modifiers = signature.getModifiers();
        Class declaringType = signature.getDeclaringType();
        String declaringTypeName = signature.getDeclaringTypeName();
        System.out.println("【" + name + "】方法开始了，它使用的参数是【" + Arrays.toString(args) + "】");
        System.out.println("signature.getName() = " + name + "\nsignature.getModifiers() = " + modifiers + "\nsignature.getDeclaringType() = " + declaringType + "\nsignature.getDeclaringTypeName() = " + declaringTypeName);
    }
```

![image-20220101153721043](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20220101153721043.png)

# 细节五：throwing & returning

既然可以在通知方法上加参数，那么我们是不是也可以多加两个参数表示返回值和异常信息？答案是肯定的，只不过我们需要**告诉Spring这是目标方法的返回值和异常信息**，这就通过在注解中添加returning和throwing属性来解决。

```java
@AfterReturning(value = "execution(public int com..MyMathCalculator.*(int, int))", returning="result")
public static void logReturn(JoinPoint joinPoint, Object result) {
    Signature signature = joinPoint.getSignature();
    String name = signature.getName();
    System.out.println("【" + name + "】方法执行完成，计算结果是：" + result);
}

@AfterThrowing(value = "execution(public int com..MyMathCalculator.*(int, int))", throwing="exception")
public static void logException(JoinPoint joinPoint, Exception exception) {
    Signature signature = joinPoint.getSignature();
    String name = signature.getName();
    System.out.println("【" + name + "】方法执行出现异常了，异常信息是：" + exception + "；这个异常已经通知测试小组进行排查！");
}
```

# 细节六：Spring对通知方法的约束

Spring对通知方法的要求并不是很严格，唯一要求的就是方法的参数列表一定不能乱写。通知方法是Spring利用反射调用的，每次都用都需要先确定这个方法的参数的值。也就是说，我们的告诉Spring每一个参数是什么意思。

前面我们使用的joinPoint我们没有在注解的属性中说明，是因为JoinPoint是Spring自己认识的。而我们写的result和exception，Spring并不认识，因此，我们必须在注解的属性中显式的说明。
