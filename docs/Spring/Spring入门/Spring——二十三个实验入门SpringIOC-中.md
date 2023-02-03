---
title: 二十三个实验入门SpringIOC(中)
date: 2021-12-25 16:27:50
tags:
---

> - 实验5：配置通过静态工厂方法创建的bean、实例工厂方法创建的bean、FactoryBean★
>
> - 实验6：通过继承实现bean配置信息的重用
> - 实验7：通过abstract属性创建一个模板bean
> - 实验8：bean之间的依赖
> - 实验9：测试bean的作用域，分别创建单实例和多实例的bean★
> - 实验10：创建带有生命周期方法的bean
> - 实验11：测试bean的后置处理器
> - 实验12：引用外部属性文件★
> - 实验13：基于XML的自动装配
> - 实验14：[SpEL测试I]
>   -  在SpEL中使用字面量、
>   -  引用其他bean、
>   -  引用其他bean的某个属性值、
>   -  调用非静态方法
>   -  调用静态方法、
>   -  使用运算符

ioc2.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!--实验14：[SpEL测试I]
        在SpEL中使用字面量、
        引用其他bean、
        引用其他bean的某个属性值、
        调用非静态方法
        调用静态方法、
        使用运算符
    -->
    <bean id="person14" class="com.atqingke.bean.Person">
        <!--字面量：${};    #{} -->
        <property name="age" value="#{12*2}"/>
        <!--引用其他bean-->
        <property name="car" value="#{car}"/>
        <!--引用其他bean的某个属性值-->
        <property name="lastName" value="#{car.carName}"/>
        <!--调用非静态方法  #{对象.方法名}-->
        <property name="gender" value="#{car.getCarName()}"/>
        <!--调用静态方法  #{T(全类名).静态方法名(参数)}-->
        <property name="email" value="#{T(java.util.UUID).randomUUID().toString().substring(0,5)}"/>
        <!--使用运算符-->

    </bean>

    <!--实验13：基于XML的自动装配-->
    <bean id="car" class="com.atqingke.bean.Car">
        <property name="carName" value="宝宝"/>
    </bean>
    <!--
        为Person里面的自定义类型的属性赋值
            property：手动赋值 ===== <property name="car" ref="car13"/>
            autowire="default"：不自动装配，（不自动为car属性赋值）
            autowire="byName"：以属性名作为id去容器中找到这个组件，给它赋值
            autowire="byType"：以属性类型作为查找依据找到这个组件，给它赋值
            autowire="constructor"：先按照有参构造器参数的类型进行装配（成功就赋值），没有就直接为组件装配null即可。
                                    如果按照类型找到了多个，参数的名作为id继续匹配，找到就装配，找不到就null
                                    不会报错
            autowire="no"：同default
    -->
    <bean id="person13" class="com.atqingke.bean.Person" autowire="byName">

    </bean>

    <!--实验12：引用外部属性文件 ★ 依赖context名称空间-->
    <!--
        数据库连接池作为单实例最好：一个项目就一个连接池，连接池里管理很多连接。连接是直接从连接池中拿
        可以让Spring帮我们创建连接池对象（管理连接池）
        加载外部配置文件 固定写法classpath:文件名称；表示引用类路径下的一个资源
        通过${key}动态取出配置文件中某个key对应的值
    -->
    <context:property-placeholder location="classpath:dbconfig.properties"/>
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <!--username是Spring的key中的一个关键字，为了防止配置文件中的key与Spring自己的关键字冲突，我们通常在配置文件中加一个前缀-->
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"/>
        <property name="driverClass" value="${jdbc.driverClass}"/>
    </bean>

    <!--实验11：测试bean的后置处理器-->
    <!--
        Spring有一个接口：后置处理器，可以在bean初始化前后调用方法
            （容器启动）构造器=====>后置处理器before=====>初始化方法=====>后置处理器after=====>（容器关闭）销毁方法
        无论bean是否有初始化方法，后置处理器都会默认其有，还会继续工作
    -->
    <bean id="beanPostProcessor" class="com.atqingke.bean.MyBeanPostProcessor"/>

    <!--实验10：创建带有生命周期方法的bean-->
    <!--
        生命周期：bean的创建到销毁
            ioc容器中注册的bean：
                1、单例bean，容器启动的时候就会创建好，容器关闭也会销毁创建的bean
                2、多实例bean，获取的时候才创建
            我们可以为bean自定义一些生命周期方法：Spring在创建或销毁的时候就会调用指定方法

        单例bean的生命周期：
            构造器  》  初始化方法   》   （容器关闭）销毁方法
        多实例
            获取bean    》    容器关闭不会调用bean的销毁方法
    -->
    <bean id="book10" class="com.atqingke.bean.Book"
          destroy-method="myDestory" init-method="myInit" scope="prototype"/>

    <!--实验9：测试bean的作用域，分别创建单实例和多实例的bean★-->
    <!--
        scope：指定bean是否是单实例，默认单实例
            prototype：多实例的
                1)、容器启动默认不会去创建多实例
                2)、获取的时候创建这个bean
                3)、每次获取都会创建一个新的对象
            singleton：单实例的，默认的
                1)、在容器启动完成之前就已经创建好了对象，保存在容器中了
                2)、任何获取都是获取之前创建好的那个对象
    -->
    <bean id="person09" class="com.atqingke.bean.Person" scope="prototype" />

    <!--原来是按照配置的顺序创建bean-->
    <!--实验8：bean之间的依赖（只是改变创建顺序）-->
    <!--
        没有配置depends-on之前的bean创建顺序为person08、car、book
        配置之后为book、car、person08
        注意depends-on里面的顺序也会影响创建顺序
    -->
    <bean id="person08" class="com.atqingke.bean.Person" depends-on="book,car"/>
    <bean id="car08" class="com.atqingke.bean.Car"/>
    <bean id="book" class="com.atqingke.bean.Book"/>

    <!--实验7：通过abstract属性创建一个模板bean-->
    <!--abstract="true"：通过这个属性，说明这个bean配置是一个抽象的，不能获取它的实例，只能被别人用来继承-->
    <bean id="person07" class="com.atqingke.bean.Person" abstract="true">
        <property name="lastName" value="张三"/>
    </bean>

    <!--实验6：通过继承实现bean配置信息的重用-->
    <bean id="person061" class="com.atqingke.bean.Person">
        <property name="lastName" value="张三"/>
        <property name="age" value="23"/>
        <property name="gender" value="男"/>
        <property name="email" value="www.atqingke.com"/>
    </bean>

    <!--我们可以通过parent属性：指定当前bean的配置信息继承于哪个-->
    <bean id="person062" class="com.atqingke.bean.Person" parent="person061">
        <property name="lastName" value="李四"/>
    </bean>

    <!--实验5：配置通过静态工厂方法创建的bean、实例工厂方法创建的bean、FactoryBean★-->
    <!--bean的创建默认都是框架利用反射new出来的bean实例-->
    <!--
        工厂模式：工厂帮我们创建对象：
        AirPlane ap = AirPlaneFactory.getAirPlane(String jzName);

        静态工厂：工厂本身不用创建对象；通过静态方法调用，对象 = 工厂类.工厂方法名()
        实例工厂：工厂本身需要创建对象；
            工厂类 工厂对象 = new 工厂类();
            工厂对象.getAirPlane("zs");
    -->
    <!--静态工厂
            class：指定静态工厂全类名
            factory-method：指定工厂方法
            constructor-arg：为方法传参
    -->
    <bean id="airPlaneStaticFactory" class="com.atqingke.factory.AirPlaneStaticFactory" factory-method="getAirPlane">
        <constructor-arg value="李思思"/>
    </bean>

    <!--实例工厂
            先配置出实例工厂
            配置我们要创建的AirPlane使用哪个工厂创建
                factory-bean：指定指定当前对象创建使用哪个工厂
                factory-method：指定使用工厂方法
    -->
    <bean id="airPlaneInstanceFactory" class="com.atqingke.factory.AirPlaneInstanceFactory"/>
    <bean id="airPlane" class="com.atqingke.bean.AirPlane"
          factory-bean="airPlaneInstanceFactory" factory-method="getAirPlane">
        <constructor-arg value="张三三"/>
    </bean>

    <!--
        FactoryBean（是Spring规定的一个接口），
    -->
    <bean id="myFactoryBeanImpl" class="com.atqingke.factory.MyFactoryBeanImpl"/>
</beans>
```

dbconfig.properties:

```properties
jdbc.username=root
jdbc.password=123456
jdbc.jdbcUrl=jdbc:mysql://localhost:3306/book
jdbc.driverClass=com.mysql.jdbc.Driver
```

MyBeanPostProcessor:

```java
package com.atqingke.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

/**
 * @Author pengbin007
 * @Date 2021/12/27 19:54
 */
public class MyBeanPostProcessor implements BeanPostProcessor {

    /**
     * 初始化之前调用
     * Object bean：将要初始化的bean
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("【" + beanName + "】bean将要调用初始化方法了。。。BeforeInitialization。。。这个bean是这样【" + bean + "】");
        // 返回传入的bean
        return bean;
    }

    /**
     * 初始化方法之后调用
     *      String beanName：bean在xml中配置的id
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("【" + beanName + "】bean初始化方法调用完了。。。AfterInitialization。。。这个bean是这样【" + bean + "】");
        return bean;
    }
}
```

AirPlaneInstanceFactory:

```java
package com.atqingke.factory;

import com.atqingke.bean.AirPlane;

/**
 * @Author pengbin007
 * @Date 2021/12/27 12:50
 */
public class AirPlaneInstanceFactory {

    /**
     * new AirPlaneInstanceFactory.getAirPlane();
     */
    public AirPlane getAirPlane(String jzName) {
        System.out.println("实例工厂调用了......");
        AirPlane airPlane = new AirPlane();
        airPlane.setFdj("太行");
        airPlane.setFjsName("pb");
        airPlane.setJzName(jzName);
        airPlane.setPersonNum(300);
        airPlane.setYc("198.56m");
        return airPlane;
    }
}
```

AirPlane:

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2021/12/27 12:43
 */
public class AirPlane {

    /** 发动机 */
    private String fdj;
    /** 机翼长度 */
    private String yc;
    /** 乘客 */
    private Integer personNum;
    /** 机长 */
    private String jzName;
    /** 副驾驶 */
    private String fjsName;

    public AirPlane() {
    }

    public AirPlane(String fdj, String yc, Integer personNum, String jzName, String fjsName) {
        this.fdj = fdj;
        this.yc = yc;
        this.personNum = personNum;
        this.jzName = jzName;
        this.fjsName = fjsName;
    }

    public String getFdj() {
        return fdj;
    }

    public void setFdj(String fdj) {
        this.fdj = fdj;
    }

    public String getYc() {
        return yc;
    }

    public void setYc(String yc) {
        this.yc = yc;
    }

    public Integer getPersonNum() {
        return personNum;
    }

    public void setPersonNum(Integer personNum) {
        this.personNum = personNum;
    }

    public String getJzName() {
        return jzName;
    }

    public void setJzName(String jzName) {
        this.jzName = jzName;
    }

    public String getFjsName() {
        return fjsName;
    }

    public void setFjsName(String fjsName) {
        this.fjsName = fjsName;
    }

    @Override
    public String toString() {
        return "AirPlane{" +
                "fdj='" + fdj + '\'' +
                ", yc='" + yc + '\'' +
                ", personNum=" + personNum +
                ", jzName='" + jzName + '\'' +
                ", fjsName='" + fjsName + '\'' +
                '}';
    }
}

```

AirPlaneStaticFactory:

```java
package com.atqingke.factory;

import com.atqingke.bean.AirPlane;

/**
 * @Author pengbin007
 * @Date 2021/12/27 12:50
 */
public class AirPlaneStaticFactory {

    /**
     * AirPlaneStaticFactory.getAirPlane();
     */
    public static AirPlane getAirPlane(String jzName) {
        System.out.println("静态工厂调用了......");
        AirPlane airPlane = new AirPlane();
        airPlane.setFdj("太行");
        airPlane.setFjsName("pb");
        airPlane.setJzName(jzName);
        airPlane.setPersonNum(300);
        airPlane.setYc("198.56m");
        return airPlane;
    }
}

```

MyFactoryBeanImpl:

```java
package com.atqingke.factory;

import com.atqingke.bean.Book;
import org.springframework.beans.factory.FactoryBean;

import java.util.UUID;

/**
 * 实现了FactoryBean接口的类是Spring可以认识的工厂类
 * Spring会自动调用工厂方法创建实例
 *
 * 1、编写一个FactoryBean的实现类
 * @Author pengbin007
 * @Date 2021/12/27 13:09
 */
public class MyFactoryBeanImpl implements FactoryBean<Book> {

    /**
     * 工厂方法，返回创建对象
     */
    @Override
    public Book getObject() throws Exception {
        Book book = new Book();
        book.setBookName(UUID.randomUUID().toString());
        return book;
    }

    /**
     * 返回创建的对象类型，Spring会自动调用这个方法来确认创建的对象是什么类型
     */
    @Override
    public Class<?> getObjectType() {
        return Book.class;
    }

    /**
     * 是否为单例
     * @return true,单例；false,不是单例
     */
    @Override
    public boolean isSingleton() {
        return false;
    }
}

```

IOCTest:

```java
package com.atqingke.test;

import com.atqingke.bean.Book;
import com.atqingke.bean.Person;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * @Author pengbin007
 * @Date 2021/12/26 15:26
 */
public class IOCTest {
    
    private ApplicationContext context = new ClassPathXmlApplicationContext("ioc2.xml");
    private ConfigurableApplicationContext ioc = new ClassPathXmlApplicationContext("ioc2.xml");

    @Test
    public void test14() {
        Person person14 = ioc.getBean("person14", Person.class);
        System.out.println(person14);
    }

    @Test
    public void test13() {
        Person person13 = ioc.getBean("person13", Person.class);
        System.out.println(person13);
    }

    @Test
    public void test11() throws SQLException {
        DataSource dataSource = ioc.getBean(DataSource.class);
        System.out.println(dataSource.getConnection());
    }

    @Test
    public void test10() {
        Book book10 = ioc.getBean("book10", Book.class);
        System.out.println(book10);
        ioc.close();
    }

    @Test
    public void test01() {
        Person person = context.getBean("person07",Person.class);
        System.out.println(person);
    }
}
```

