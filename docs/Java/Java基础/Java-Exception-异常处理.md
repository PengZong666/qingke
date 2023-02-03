---
title: 异常处理
date: 2021-12-05 22:55:25
tags: [Java, 异常]
---

> 世界上最遥远的距离，是我在if里你在else里，似乎一直相伴又永远分离； 
>
> 世界上最痴心的等待，是我当case你是switch，或许永远都选不上自己； 
>
> 世界上最真情的相依，是你在try我在catch。无论你发神马脾气，我都默 默承受，静静处理。到那时，再来期待我们的finally。

<!-- more -->

人们在遇到错误时会感觉不爽。如果一个用户在运行程序期间，由于程序的错误或一些外部环境的影响造成用户数据的丢失，用户就有可能不再使用这个程序了。为了避免这类事情发生，至少应该做到以下几点：

- 向用户通告错误；

- 保存所有的工作错误；

- 允许用户以妥善的形式退出程序。


## 1. 异常概述与体系结构

异常处理的任务就是<u>**将控制权从错误产生的地方转移给能够处理这种情况的错误处理器**</u>（异常处理器）。而为了能够在程序中处理异常情况，必须研究程序中可能会出现的错误和问题，以及哪类问题需要关注。

1. 用户输入错误
2. 设备错误
3. 物理限制
4. 代码错误

### 1.1 异常分类

在Java程序设计语言中，异常对象都是派生于Throwable类的一个实例。在执行过程中所发生的异常事件可分为两类：

- Error：Java运行时系统的内部错误和资源耗尽错误。应用程序不应该抛出这种类型的对象。如果出现了这样的内部错误，除了通告给用户，并尽力使程序安全地终止之外，再也无能为力了。这种情况很少出现。
- Exception：其它因编程错误或偶然的外在因素导致的一般性问题，可以使用针对性的代码进行处理。例如：
  - 错误的类型转换
  - 数组访问越界
  - 访问null指针
  - 试图打开一个不存在的文件

对于这些错误，一般有两种解决办法：一是遇到错误就终止程序的运行。另一种方法是由程序员在编写程序时，就考虑到错误的检测、错误消息的提示，以及错误的处理。而捕获这些错误最理想的是在编译期间，但有的错误只有在运行时才会发生。比如：除数为0，数组下标越界等。因此，在Exception这一层次结构上，我们又可以分为两大分支：编译时异常和运行时异常（RuntimeException）。

![image-20211205234925125.png](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/2156788699.png)

- 运行时异常

  指编译器不要求强制处置的异常。一般是指编程时的逻辑错误，是程序员应该积极避免其出现的异常。java.lang.RuntimeException类及它的子类都是运行时异常。

  对于这类异常，可以不做处理，因为这类异常很普遍，若全部处理可能会对程序的可读性和运行效率产生影响。

- 编译时异常

  指编译器要求必须处理的异常。即程序在运行时由于外界因素造成的一般性异常。**<u>编译器要求Java程序必须捕获或声明所有编译时异常。</u>**

  对于这类异常，如果程序不处理，可能会带来意想不到的结果。

> Java语言规范将派生于Error类或RuntimeException类的所有异常称为非受查异常，所有其它的异常称为受查异常。编译器将核查是否为所有的受查异常提供了异常处理器。

### 1.2 声明受查异常

如果遇到了无法处理的情况，那么Java的方法可以抛出一个异常。这个道理很简单：一个方法不仅需要告诉编译器将要返回什么值，还要告诉编译器有可能发生什么错误。在自己编写方法时，不必将所有可能抛出的异常都进行声明。我们需要记住以下4种情况应该抛出异常：

1. 调用一个抛出受查异常的方法，例如，FileInputStream构造器。
2. 程序运行过程中发现错误，并且利用throw语句抛出一个受查异常。
3. 程序出现错误，例如，a[-1] = 0会抛出一个ArrayIndexOutOfBoundsException这样的非受查异常。
4. Java虚拟机和运行时库出现的内部错误。

对于那些可能被他人使用的Java方法，应该根据异常规范，在方法的首部声明这个方法可能抛出的异常。如果一个方法有可能抛出多个受查异常类型，那么就必须在方法的首部列出所有的异常类。每个异常类之间用逗号隔开。

> 如果在子类中覆盖率父类的一个方法，子类方法中声明的受查异常不能比父类方法中声明的异常更通用（也就是说，子类方法中可以抛出更特定的异常，或者根本不抛出任何异常）。特别的，如果父类方法没有抛出任何受查异常，子类也不能抛出任何受查异常。

### 1.3 如何抛出异常

对于一个已经存在的异常类，将其抛出非常容易。在这种情况下：

1. 找到一个合适的异常类。
2. 创建这个类的一个对象。
3. 将对象抛出。

```java
String readData(Scanner in) throws EOFException {
    ...
    while(...) {
        ...
        if(n < len)
            throw new EOFException();
        ...
    }
    ...
    return s;
}
```

### 1.4 创建异常类

定义的类应该派生于Exception类或Exception的子类，其中包含两个构造器，一个是默认的构造器，另一个是带有详细信息的构造器（父类的Throwable的toString方法会打印这些信息，在调试中非常有用）。

```java
class FileFormatException extends IOException{
    public FileFormatException() {}
    public FileFormatException(String gripe) {	super(gripe);	}
}
```

这样，我们就可以抛出我们自定义的异常了！

## 2. 捕获异常

要想捕获一个异常，必须设置try/catch语句块。

```java
try {
    ...
} catch(ExceptionType e) {
    ...
}
```

如果在try语句块中的任何代码抛出了一个在catch子句中说明的异常类，那么：

1. 程序将跳过try语句块剩余的代码。
2. 程序将执行catch子句中的处理器代码。

如果在try中没有抛出任何异常，那么程序将跳过catch语句。

另外一种异常处理方式是：什么都不做，而是将异常传递给调用者。

```java
public void read(String filename) throws IOException {
	InputStream in = new FileInputStream(filename);
	...
}
```

编译器严格地执行throws说明符。如果调用了一个抛出受查异常的方法，就必须对它进行处理，或者继续传递。

哪种方法更好呢？通常，应该捕获那些知道如何处理的异常，而将那些不知道怎么处理的异常继续进行传递。如果想传递一个异常，就必须在方法的首部添加一个throws说明符，以便告知调用者这个方法可能会抛出异常。但是，在选择处理方式中也有一个例外：如果编写一个覆盖父类的方法，而这个方法又没有抛出异常，那么这个方法就必须捕获方法代码中的每一个受查异常。不允许在子类的throws说明符中出现超过父类方法所列出的异常范围。

### 2.1 捕获多个异常

在一个try语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理。

```java
try {

} catch(FileNotFoundException e) {

} catch(UnkownHostException e) {

} catch(IOException e) {

}
```

在JavaSE7中，同一个catch子句中可以捕获多个异常类型。例如，假设对应缺少文件和未知主机异常的动作是一样的，就可以合并catch子句：

```java
try {

} catch(FileNotFoundException | UnkownHostException e) {

} catch(IOException e) {

}
```

只有当捕获的异常类型彼此之间不存在子类关系时才需要这个特性。

> 捕获多个异常时，异常变量隐含为final变量。

### 2.2 finally子句

当代码抛出一个异常时，就会终止方法中剩余代码的处理，并退出这个方法的执行。如果方法获得了一些本地资源，并且只有这个方法自己知道，又如果这些资源在退出方法之前必须被回收，那么就会产生资源回收问题。一种解决方案是捕获并重新抛出所有异常。但是，这种解决方案比较乏味，这是因为需要在两个地方清楚所分配的资源。一个在正常的代码中；另一个在异常代码中。

Java有一种很好的解决方案，这就是finally子句。不管是否有异常被捕获，finally子句中的代码都被执行。

```java
InputStream in = new FileInputStream(...);
try {
    
} catch(IOException e) {
    
} finally {
    in.close();
}
```

在上面这段代码中，有下面三种情况会执行finally子句：

1. 代码中没有抛异常。
2. 抛出一个在catch子句中捕获的异常。
3. 代码抛出了一个异常，但这个异常不是由catch子句捕获的。在这种情况下，程序将执行try语句块中所有语句，知道有异常被抛出为止。此时，将跳过try语句块中剩余的代码，然后执行finally子句中的语句，并将异常抛给这个方法的调用者。

> 提示：这里，强烈建议解耦合try/catch和try/finally语句块。这样可以提高代码的清晰度。例如：
>
> ```java
> InputStream in = ...;
> try {
>     try {
>         ...
>     } finally {
>         in.close();
>     }
> } catch (IOException) {
>     show error message
> }
> ```
>
> 内层的try语句块只有一个职责，就是确保关闭输入流。外层的try语句块也只有一个职责，就是确保报告出现的问题。这种设计方式不仅清楚，而且还具有一个功能，就是会报告finally子句中出现的错误。

> 警告：当finally子句包含return语句时，将会出现一种意想不到的结果。假设利用return语句从try语句块中退出。在方法返回前，finally子句的内容将被执行。如果finally子句中也有一个return语句，这个返回值将会覆盖原始的返回值。
>
> ```java
> public static int f(int n) {
>     try {
>         int r = n * n;
>         return r;
>     } finally {
>         if(n == 2) return 0;
>     }
> }
> ```
>
> 如果调用f(2)，那么try语句块的计算结果r=4，并执行return。然而，在方法真正返回之前，还要执行finally。finally将使得方法返回0，这个返回值覆盖了原始的返回值4。

有时候，finally也会带来麻烦。例如，清理资源的方法也有可能抛出异常。解决这些麻烦，我们可以使用带资源的try语句。

### 2.3 带资源的try语句

```java
open a resource
try {
    work with the resource
} finally {
    close the resource
}
```

假设资源属于一个实现了AutoCloseable接口的类，JavaSE7为这种代码模式提供了一个很有用的快捷方式。AutoCloseable接口有一个方法：

![image-20211206185835797.png](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/2896810133.png)

> 注释：另外，还有一个Closeable接口。这是AutoCloseable的子接口，也包含一个close方法。不过，这个方法声明为抛出一个IOException。

带资源的try语句的最简形式为：

```java
try(Resource res = ...) {
    work with res
}
```

try块退出时，会自动调用res.close()。下面给出一个典型的例子，这里要读取一个文件中的所有单词：

```java
try(Scanner in = new Scanner(new FileInputStream("/usr/share/dict/words"), "UTF-8")) {
    while(in.hasNext())
        System.out.println(in.next());
}
```

这个块正常退出时，或者存在一个异常时，都会调用in.close()方法，就好像使用了finally块一样。

还可以指定多个资源。例如：

```java
try(Scanner in = new Scanner(new FileInputStream("/usr/share/dict/words"), "UTF-8");
   	PrintWriter out = new PrintWriter("out.txt")) {
    while(in.hasNext())
        out.println(in.next().toUpperCase());
}
```

不论这个块如何退出，in和out都会关闭。如果你用常规方式手动编程，就需要嵌套的try/finally语句。

> 注释：带资源的try语句本身也可以有catch子句和一个finally子句。这些子句会在关闭资源之后执行。不过在实际中，一个try语句中加入这么多内容可能不是一个好主意。

### 2.4 分析堆栈轨迹元素

堆栈轨迹（stack trace）是一个方法调用过程的列表，它包含了程序执行过程中方法调用的特定位置。当Java程序正常终止，而没有捕获异常时，这个列表就会显示出来。可以调用Throwable类的printStackTrace方法访问堆栈轨迹的文本描述信息。而一种更灵活的方法是使用getStackTrace方法，它会得到StackTraceElement对象的一个数组，可以在你的程序中分析这个对象数组。例如：

```java
Throwable t = new Throwable();
StackTraceElement[] frames = t.getStackTrace();
for(StackTraceElement frame : frames)
    analyze frame
```

StackTraceElement类含有能够获得文件名和当前执行的代码行号的方法，同时，还含有能够获得类名和方法名的方法。toString方法将产生一个格式化的字符串，其中包含所获得的信息。

静态的Thread.getAllStackTraces方法，它可以产生所有线程的堆栈轨迹。下面给出使用这个方法的具体方式：

``` java
Map<Thread, StackTraceElement[]> map = Thread.getAllStackTraces();
for(Thread t : map.keySet()) {
    StackTraceElement[] frames = map.get(t);
    analyze frames
}
```

下面我们看一个打印递归阶乘函数的堆栈情况示例：

```java
package com.atqingke;

import java.util.Scanner;

/**
 * @Author pengbin007
 * @Date 2021/12/6 19:14
 */
public class StackTraceTest {
    
    public static int factorial(int n) {
        System.out.println("factorial(" + n + "):");
        Throwable t = new Throwable();
        StackTraceElement[] frames = t.getStackTrace();
        for(StackTraceElement f : frames)
            System.out.println(f);
        int r;
        if(n <= 1)  r = 1;
        else r = n * factorial(n - 1);
        System.out.println("return " + r);
        return r;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.println("Enter n: ");
        int n = in.nextInt();
        factorial(n);
    }
}
```

控制台输出结果为：

```shell
Enter n: 3
factorial(3):
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:13)
com.atqingke.StackTraceTest.main(StackTraceTest.java:28)
factorial(2):
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:13)
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:19)
com.atqingke.StackTraceTest.main(StackTraceTest.java:28)
factorial(1):
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:13)
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:19)
com.atqingke.StackTraceTest.factorial(StackTraceTest.java:19)
com.atqingke.StackTraceTest.main(StackTraceTest.java:28)
return 1
return 2
return 6

Process finished with exit code 0
```

## 3. 使用异常机制的技巧

- 异常处理不能代替简单的测试
- 不要过分地细化异常
- 利用异常层次结构
- 不要压制异常
- 在检测错误时，”苛刻“要比放任更好
- 不要羞于传递异常

![image-20211206193013278.png](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/3017759996.png)

