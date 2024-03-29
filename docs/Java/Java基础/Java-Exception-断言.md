---
title: 断言
date: 2021-12-06 10:17:34
tags: [Java, 异常]
---

在一个具有自我保护能力的程序中，断言很常用。

<!--more-->

## 1. 断言的概念

假设确信某个属性符合要求，并且代码的执行依赖于这个属性。例如，需要计算

```java
double y = Math.sqrt(x);
```

这里的x我们可以确定它是一个非负数，但是，我们还是希望进行检查，以避免让“不是一个数”的数值参与计算操作。当然，也可以抛出一个异常：

```java
if(x < 0) throw new IllegalArgumentException("x < 0");
```

但是这段代码会一直保留在程序中，即使测试完毕也不会自动删除。如果在程序中含有大量这种检查，程序会运行相当慢。

断言机制运行在测试期间向代码中插入一些检查语句。当代码发布时，这些插入的检测语句将会被自动移除。

Java引入了关键字assert。这个关键字有两种形式：

```java
assert 条件;
assert 条件 : 表达式;
```

这两种形式都会对条件进行检测，如果结果为false，则抛出一个AssertionError异常。在第二种形式中，表达式将被传入AssertionError的构造器，并转换成一个消息字符串。

## 2. 启用和禁用断言

在默认情况下，断言被禁用。可以在程序运行时用 -enableassertions 或 -ea选项启用：

```java
java -enableassertions MyApp
```

需要注意的是，在其启用或禁用断言时不必重新编译程序。启用或禁用断言是类加载器的功能。当断言被禁用时，类加载器将跳过断言代码，因此，不会降低程序运行速度。也可以在某个类或整个包中使用断言，例如：

```java
java -ea:MyClass -ea:com.mycompany.mylib... MyApp
```

这条命令将开启MyClass类以及在com.mycompany.mylib包和它的子包中的所有类的断言。同样的，也可以用选项 -disableassertions 或 -da 禁用某个特定类和包的断言。

然而，启用和禁用所有断言的-ea和-da开关不能应用到那些没有类加载器的“系统类”上。对于这些系统类来说，需要使用 -enablesystemassertions / -esa 开关启用断言。

![image-20211208212844926](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211208212844926.png)

![image-20211208212949101](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211208212949101.png)

## 3. 使用断言完成参数检查

什么时候应该选择使用断言呢？请记住以下几点：

- 断言失败是致命的，不可恢复的错误。
- 断言检查只用于开发和测试阶段（这种做法有时候被戏称为“在靠近海岸时穿上救生衣，但在海中央时就把救生衣抛掉”）。

因此，不应该使用断言向程序的其它部分通告发生了可恢复性的错误，或者，不应该作为程序向用户通告问题的手段。断言只应该用于在测试阶段确定程序内部的错误位置。

![image-20211208213148950](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211208213148950.png)

## 4. 为文档假设使用断言

很多程序员使用注释说明假设条件：

```java
if(i % 3 == 0)	
    ...
else if(i % 3 == 1)	
    ...
else // (i % 3 == 2)
    ...
```

在这个示例中，使用断言会更好一些：

```java
if(i % 3 == 0)	
    ...
else if(i % 3 == 1)	
    ...
else {
    assert i % 3 == 2;
    ...
}
```

当然，如果再仔细地考虑一下这个问题会发现一个更有意思的内容。i%3也可能产生负值，然而，实际上都认为i是非负值，因此，最好在if语句之前使用下列断言：

```java
assert i >= 0;
```

