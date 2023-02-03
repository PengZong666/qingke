---
title: 二十三个实验入门SpringIOC(下)
date: 2021-12-25 16:27:58
tags:
---

> 实验15：通过注解分别创建Dao、Service、Controller★
>
> 实验16：使用context:include-filter指定扫描包时要包含的类
>
> 实验17：使用context:exclude-filter指定扫描包时不包含的类
>
> 实验18：使用@Autowired注解实现根据类型实现自动装配★
>
> 实验19：如果资源类型的bean不止一个，默认根据@Autowired注解标记的成员变量名作为id查找bean，进行装配★
>
> 实验20：如果根据成员变量名作为id还是找不到bean，可以使用@Qualifier注解明确指定目标bean的id★
>
> 实验21：在方法的形参位置使用@Qualifier注解
>
> 实验22：@Autowired注解的required属性指定某个属性允许不被设置
>
> 实验23：测试泛型依赖注入★

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!--实验23：测试泛型依赖注入★-->

    <!--
        @Autowired、@Resource、@Inject；都是自动装配的意思
        @Autowired：最强大，Spring自己的注解
        @Resource：j2ee：Java的标准

        @Resource：扩展性更强，如果我们切换成另外一个容器框架，@Resource还是可以使用的，@Autowired就不行了
    -->

    <!--实验21：在方法的形参位置使用@Qualifier注解-->
    <!--
        @Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.METHOD, ElementType.ANNOTATION_TYPE})
        @Retention(RetentionPolicy.RUNTIME)
        @Documented
        public @interface Autowired {
        可以在方法上使用@Autowired注解(@Qualifier也可以)，而这个方法也会在bean创建的时候自动运行，并且这个方法的每一个参数都会自动注入值
    -->

    <!--实验22：@Autowired注解的required属性指定某个属性允许不被设置-->
    <!--实验20：如果根据成员变量名作为id还是找不到bean，可以使用@Qualifier注解明确指定目标bean的id★-->
    <!--实验19：如果资源类型的bean不止一个，默认根据@Autowired注解标记的成员变量名作为id查找bean，进行装配★-->
    <!--实验18：使用@Autowired注解实现根据类型实现自动装配★-->
    <!--
        使用@Autowired注解，Spring会自动的为这个属性赋值，它一定是去容器中找到对应的组件
        @Autowired
        private BookService bookService;
        @Autowired原理：
            ① 先按照类型去容器中找到对应的组件：bookService = ioc.getBean(BookService.class);
                1)找到一个，就赋值
                2)没找到，抛异常
                3)找到多个
                    ① 按照变量名作为id继续匹配
                        1)匹配上
                        2)没有匹配上
                          没有匹配上是因为我们按照变量名作为id继续匹配的
                          因此我们可以使用@Qualifier("bookServiceExt")指定一个新的id
                            找到，装配
                            找不到，报错
        @Autowired标注的自动装配的属性默认是一定装配上的
            找到就装配，找不到就祭了
        我们可以设置@Autowired(required=false)来指定属性可以没有，这是找不到就装配null
    -->

    <!--实验17：使用context:exclude-filter指定扫描包时不包含的类-->
    <context:component-scan base-package="com.atqingke">
        <!--
            扫描的时候可以排除一些不要的组件
             ★ type="annotation"：指定排除规则，按照注解进行排除，标注了指定注解的组件不要
                    expression=""：注解的全类名
             ★ type="assignable"：指定排除某个具体的类，按照类排除
                    expression=""：类的全类名
                type="aspectj"：aspectj表达式
                type="custom"：自定义一个TypeFilter；自己写代码决定哪些使用
                type="regex"：正则表达式
        -->
        <!--<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>-->
    </context:component-scan>

    <!--实验16：使用context:include-filter指定扫描包时要包含的类-->
    <context:component-scan base-package="com.atqingke" use-default-filters="false">
        <!--
            只扫描哪些组件，默认全部扫描进来
            使用时一定要禁用默认扫描规则：use-default-filters="false"
        -->
        <!--<context:include-filter type="assignable" expression="com.atqingke.servlet.BookServlet"/>-->
    </context:component-scan>

    <!--实验15：通过注解分别创建Dao、Service、Controller（控制器：控制网站跳转逻辑）★-->
    <!--
        通过给bean上添加某些注解，可以快速的将bean加入到ioc容器中
        Ⅰ 某个类上添加上任何一个注解都能快速的将这个组件加入到ioc容器的管理中
        Ⅱ Spring有四个注解：
            @Controller：控制器；我们推荐给控制器层（servlet包下的这些）的组件加这个注解
            @Service：业务逻辑；我们推荐业务逻辑层的组件添加这个注解
            @Repository：给数据库层（持久化层，dao层）的组件添加这个注解
            @Component：给不属于以上几层的组件添加这个注解
        Ⅲ 注解可以随便加，Spring底层不会去验证你的这个组件，时候如你注解所说的就是一个dao层的或者就是一个servlet层的组件
            我们推荐给各层这样加，是为了给程序员看的
        Ⅳ 使用解将组件快速的加入到容器中需要几步：
            ① 给要添加的组件上标四个注解的任何一个
            ② 告诉Spring，自动扫描加了注解的组件；依赖context名称空间
            ③ 一定要导入aop包，支持加注解模式的
        Ⅴ 使用注解加入到容器中的组件，和使用配置加入到容器中的组件行为都是默认一样的
            ① 组件的id，默认就是组件的类名首字母小写
            ② 组件的作用域，默认就是单例的
        Ⅵ 组件的默认行为调整
            ① 在主键中添加默认的value属性值可以修改组件的id    @Controller("bookservletcontroller")
            ② 在组件上添加@scope注解，可以修改作用域
    -->
    <!--
        context:component-scan：自动组件扫描
        base-package：指定扫描的基础包；把基础包及它下面所有的包的所有加了注解的类，自动的扫描进IOC容器
    -->
    <!--<context:component-scan base-package="com.atqingke"/>-->

</beans>
```

