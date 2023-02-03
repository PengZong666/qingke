---
title: 系统错误处理机制之——日志
date: 2021-12-08 21:41:41
tags:
---

每个Java程序员都很熟悉在有问题的代码中插入一些System.out.println方法调用来帮助观察程序运行的操作过程。当然，一旦发现问题的根源，就要将这些语句从代码中删去。如果接下来又出现了问题，就需要再插入几个调用println方法的语句。记录日志API就是为了解决这个问题而设计的。下面先讨论这些API的优点：

- 可以很容易地取消全部日志记录，或者仅仅取消某个级别的日志，而且打开和关闭这个操作也很容易。
- 可以很简单地禁止日志记录的输出，因此，将这些日志代码留在程序中的开销很小。
- 日志记录器和处理器都可以对记录进行过滤。过滤器可以根据过滤实现器指定的标准丢弃那些无用的记录项。
- 日志记录可以采用不同的方式格式化，例如，纯文本或XML。
- 应用程序可以使用多个日志记录器，它们使用类似包名的这种具有层次结构的名字，例如，com.mycompany.myapp。
- 在默认情况下，日志系统的配置由配置文件控制。如果需要的话，应用程序可以替换这个配置。

## 1. 基本日志

要生成简单的日志记录，可以使用全局日志记录器(global logger)并调用其info方法：

```java
import java.util.logging.Logger;

/**
 * @Author pengbin007
 * @Date 2021/12/8 21:57
 */
public class LoggerTest {

    public static void main(String[] args) {
        Logger.getGlobal().info("File->Open menu item selected");
    }
}
```

默认情况下，这条记录将会显示以下内容：

```shell
十二月 08, 2021 9:58:08 下午 com.atqingke.LoggerTest main
信息: File->Open menu item selected

Process finished with exit code 0
```

但是，如果在适当的地方(如main开始)调用：Logger.getGlobal().setLevel(Level.OFF); 将会取消所有日志。

![image-20211208220217166](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211208220217166.png)

## 2. 高级日志

在一个专业的应用程序中，不要将所有的日志都记录到一个全局日志记录器中，而是可以自定义日志记录器。可以调用getLogger方法创建或获取记录器：

```java
private static final Logger myLogger = Logger.getLogger("com.atqingke");
```

> 提示：未被任何变量引用的日志记录器可能会被垃圾回收。为了防止这种情况发生，要像上面的例子中一样，用一个静态变量存储日志记录器的一个引用。

与包名类似，日志记录器名也具有层次结构。事实上，与包名相比，日志记录器的层次性更强。对于包来说，一个包的名字与其父包的名字之间没有语义关系，但是日志记录器的父与子之间将共享某些属性。例如，如果对com.mycompany日志记录器设置了日志级别，它的子记录器也会继承这个级别。

通常，有以下7个日志记录器级别：

- SEVERE
- WARNING
- INFO
- CONFIG
- FINE
- FINER
- FINEST

在默认情况下，只记录前三个级别。也可以设置其他的级别。例如：

```java
logger.setLevel(Level.FINE);
```

现在，FINE和更高级别的记录都可以记录下来。另外，还可以使用Level.ALL开启所有级别的记录，或者使用Level.OFF关闭所有级别的记录。

![image-20211208222156636](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211208222156636.png)

对于所有的级别有下面几种记录方法：

```java
logger.warning(message);
logger.fine(message);
logger.log(Level.FINE, message); // log方法指定级别
```

> 提示：默认的日志配置记录了INFO或更高级别的所有记录，因此，应该使用CONFIG、FINE、FINER和FINEST级别来记录那些有助于诊断，但对于程序员又没有太大意义的调试信息。

> 警告：如果将日志级别设计为INFO或者更低，则需要修改日志处理器的配置。默认的日志处理器不会处理低于INFO级别的信息。

## 3. 修改日志管理器配置

默认情况下，日志的配置文件存在于：jre/lib/loggin.properties。
