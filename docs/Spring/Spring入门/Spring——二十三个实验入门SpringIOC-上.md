---
title: 二十三个实验入门SpringIOC(上)
date: 2021-12-25 16:26:35
tags:
---

# 搭建实验环境

新建普通Java工程：

![image-20211225163705634](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225163705634.png)

![image-20211225163912669](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225163912669.png)

![image-20211225163750396](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225163750396.png)

创建项目包结构如图所示：

![image-20211225164253162](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225164253162.png)

lib目录下引入SpringIOC所需jar包：

![image-20211225164356096](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225164356096.png)

![](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/idea64_CVGsLXEMFL.png)

![image-20211225165523791](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225165523791.png)

![image-20211225165711714](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225165711714.png)

![image-20211225165753740](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225165753740.png)

bean目录下新建Person类：

![image-20211225165846399](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225165846399.png)

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2021/12/25 16:58
 */
public class Person {

    private String lastName;
    private Integer age;
    private String email;
    private String gender;

    public Person() {
    }

    public Person(String lastName, Integer age, String email, String gender) {
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.gender = gender;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Person{" +
                "lastName='" + lastName + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}

```

conf目录下新建一个Spring的配置文件，ioc.xml：

![image-20211225170136906](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225170136906.png)

![image-20211225170255175](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225170255175.png)

![image-20211225170350958](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225170350958.png)

OK，大功告成！

![image-20211225170430871](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211225170430871.png)



# 实验1：通过IOC容器创建对象，并为属性赋值 ★

 IOC，Spring官网给出的英文释义是：Inversion of control，中文翻译过来就是**控制反转**。那什么是控制反转呢？

我们知道，在没有引入Spring框架之前，我们如果需要使用一个资源，我们需要自己去创建、管理、销毁等等，这是一种主动式的获取资源。而SpringIOC所做的就是控制我们的资源获取方式，将主动式反转成被动式——资源的获取不是我们自己创建，而是交由容器来创建和设置。而所谓**容器**就是：管理所有组件（有功能的类）；简单来说，容器做的就是让主动的new资源变成了被动的接受资源。

而说到容器，就离不开另一个概念——DI（Dependency Injection）依赖注入，通过这个依赖注入，容器能知道哪个组件运行的时候，需要另外的组件。并通过反射的形式，将容器中准备好的对象注入进来。

我们先看没有引入SpringIOC之前，我们的对象创建以及属性赋值操作：

```java
package com.atqingke.test;

import com.atqingke.bean.Person;
import org.junit.Test;

/**
 * @Author pengbin007
 * @Date 2021/12/26 15:16
 */
public class BeforeIOCTest {

    @Test
    public void test() {
        Person person = new Person();
        person.setLastName("引入Spring之前为属性赋值");
        person.setAge(21);
        person.setEmail("fff");
        person.setGender("ddd");
        System.out.println(person);
    }
}
```

现在我们来看实验1！

首先在之前创建的ioc.xml文件中加入以下内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 注册一个Person对象，Spring会自动创建这个Person对象 -->
    <!--
        一个Bean标签可以注册一个组件
        class：写要注册的组件的全类名
        id：这个对象的唯一标识
     -->
    <bean id="person01" class="com.atqingke.bean.Person">
        <!--
              使用property标签为Person对象的属性赋值
              name指定属性名
              value指定属性值
           -->
        <property name="lastName" value="引入IOC之后的属性赋值"/>
        <property name="age" value="23"/>
        <property name="email" value="ddd"/>
        <property name="gender" value="ddd"/>
    </bean>
</beans>
```

我们在容器中添加一个bean标签，就相当于创建了一个对象，class属性指明了我们创建的对象类型，id就是我们创建的对象名称。在bean标签里有property子标签，property表示的就是对象的属性，我们通过property给对象的属性赋值。property的name属性指明要赋值的属性名称，value属性指明要赋的值。

接下来，我们就可以获取这个由容器管理的组件了。

# 实验2：根据bean的类型从IOC容器中获取bean的实例 ★

```java
ackage com.atqingke.test;

import com.atqingke.bean.Person;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Author pengbin007
 * @Date 2021/12/26 15:26
 */
public class IOCTest {

    private ApplicationContext context = new ClassPathXmlApplicationContext("ioc.xml");

    @Test
    public void test01() {
        Person person = context.getBean(Person.class);
        System.out.println(person);
    }
}
```

ApplicationContext是Spring提供给我们的IOC容器的接口，通过这个接口，我们可以读取我们在配置文件中配置的组件。ClassPathXmlApplicationContext表示的就是在类路径下读取配置文件。而getBean方法就是根据bean的类型从IOC容器中获取bean的实例方法。我们来看运行效果：

![image-20211226153911719](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211226153911719.png)

可以看到报错了，为什么呢？我们知道，ClassPathXmlApplicationContext是从类路径下读取配置文件，而我们的ioc.xml是在conf目录下，所以我们需要将conf目录设为我们工程的资源目录。

![image-20211226154259269](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211226154259269.png)

成功之后，conf目录图标就变成了Resource资源的图标了：

![image-20211226154340666](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211226154340666.png)

现在再运行，不报错了！

![image-20211226154423157](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211226154423157.png)

现在，我们来看一些细节。

> 1. 给容器中注册一个组件，我们也从容器中按照id拿到了这个组件的对象，组件的创建工作，是由容器完成的。容器中的对象在容器创建完成的时候就已经创建好了。
> 2. 同一个组件在IOC容器中是单实例的，容器启动完成之前已经创建好了。
> 3. 容器中如果没有这个组件，获取组件，报异常：org.springframework.beans.factory.NoSuchBeanDefinitionException:No bean named 'person2' available
> 4. IOC容器在创建这个组件对象的时候，property标签会利用setter方法为JavaBean的属性进行赋值。

我们除了可以通过ClassPathXmlApplicationContext获取配置文件，还可以通过FileSystemXmlApplicationContext在系统文件路径下获取配置文件。

# 实验3：通过构造器为bean的属性赋值（index,type属性介绍）

 实验2的赋值是通过setter方法赋值的，我们也可以通过构造器为bean的属性赋值：

```xml
    <bean id="person031" class="com.atqingke.bean.Person">
        <!-- 调用有参构造器进行创建对象并赋值 -->
        <constructor-arg name="lastName" value="小行星"/>
        <constructor-arg name="email" value="4564654@ddd.com"/>
        <constructor-arg name="gender" value="男"/>
        <constructor-arg name="age" value="55"/>
    </bean>
```

现在，我们有两个由容器管理的bean对象了，在获取bean对象的时候，我们可以通过在类型前面加一个参数指明要获取的bean的id就可以成功获取了：

```java
context.getBean("person031", Person.class);
// 也可以直接省略后面的bean类型
```

我们也可以省略name参数，但这是我们要严格按照构造器中的顺序来赋值，如果没有按顺序，可以通过index属性来指明顺序：

```xml
    <!--
    	可以省略name属性，严格按照构造器参数位置赋值
    	也可以通过index指定对应参数位置
	-->
    <bean id="person032" class="com.atqingke.bean.Person">
        <constructor-arg value="xixi"/>
        <constructor-arg value="123" index="3"/>
        <constructor-arg value="xixi"/>
        <constructor-arg value="456" index="1"/>
    </bean>
```

在构造器有重载的情况下，我们可以用type属性来指明要赋值的属性的类型：

```xml
    <!--
        public Person(String lastName, String gender, String email)
        public Person(String lastName, Integer age, String email)
        在重载情况下，可以通过type指定参数的类型
    -->
    <bean id="person033" class="com.atqingke.bean.Person">
        <constructor-arg value="ddd"/>
        <constructor-arg value="100" type="java.lang.Integer"/>
        <constructor-arg value="ddd"/>
    </bean>
```

 当我们为一个JavaBean的属性赋值时，如果这个JavaBean出现与其它属性同名的情况，为了区分，我们可以通过p名称空间为bean赋值。要使用新的名称空间，我们需要在配置文件的beans标签中加入该名称空间：

![image-20211226161151185](https://raw.githubusercontent.com/PengZong888/tuchuang/main/img/image-20211226161151185.png)

```xml
    <!--
        通过p名称空间为bean赋值
        名称空间：在xml中名称空间是用来防止标签重复的
        <book>
            <name>西游记</name>
            <price>155</price>
            <author>
                <a:name>吴承恩<a:/name>
                <gender>男</gender>
            </author>
        </book>

        带前缀的标签<c:forEach> <jsp:forEach>
    -->
    <bean id="person034" class="com.atqingke.bean.Person" p:age="15" p:lastName="www" p:email="fff" p:gender="ddd" />
```

# 实验4：正确的为各种属性赋值

在进行实验4之前，我们要对现在的工程进行改造一下：

添加两个类Car和Book：

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2021/12/26 16:27
 */
public class Car {

    private String carName;
    private Integer price;
    private String color;

    public Car() {
    }

    public Car(String carName, Integer price, String color) {
        this.carName = carName;
        this.price = price;
        this.color = color;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "Car{" +
                "carName='" + carName + '\'' +
                ", price=" + price +
                ", color='" + color + '\'' +
                '}';
    }
}
```

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2021/12/26 16:27
 */
public class Book {

    private String bookName;
    private String author;

    public Book() {
    }

    public Book(String bookName, String author) {
        this.bookName = bookName;
        this.author = author;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookName='" + bookName + '\'' +
                ", author='" + author + '\'' +
                '}';
    }
}
```

修改Person类：

```java
    private Car car;
    private List<Book> books;
    private Map<String, Object> maps;
    private Properties properties;
```

添加四个属性，并重新生成getter、setter方法和toString以及Constructor。

> -  测试使用null值 
> -  引用类型赋值（引用其他bean、引用内部bean）
> -  集合类型赋值（List、Map、Properties）、
> -  util名称空间创建集合类型的bean
> -  级联属性赋值

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">

    <!--级联属性赋值-->
    <bean id="person045" class="com.atqingke.bean.Person">
        <property name="car" ref="car01"/>
        <property name="car.price" value="123456798"/>
    </bean>

    <!--util名称空间创建集合类型的bean-->
    <!--util名称空间创建集合类型的bean，方便别人引用-->
    <bean id="person044" class="com.atqingke.bean.Person">
        <property name="maps" ref="myMap"/>
    </bean>
    <util:map id="myMap">
        <entry key="key01" value="张三"/>
        <entry key="key02" value="18"/>
        <entry key="key03" value-ref="book01"/>
        <entry key="key04">
            <bean class="com.atqingke.bean.Car">
                <property name="carName" value="ddd"/>
            </bean>
        </entry>
        <entry key="key05">
            <map>

            </map>
        </entry>
    </util:map>

    <!--集合类型赋值（List、Map、Properties）-->
    <bean id="person043" class="com.atqingke.bean.Person">
        <property name="books">
            <!--list 标签相当于 books = new ArrayList<Book>();-->
            <list>
                <bean id="book000x" class="com.atqingke.bean.Book" p:bookName="西游记"/>
                <ref bean="book01"/>
            </list>
        </property>

        <property name="maps">
            <!--map 标签相当于 maps = new LinkedHashMap<>();-->
            <map>
                <entry key="key01" value="张三"/>
                <entry key="key02" value="18"/>
                <entry key="key03" value-ref="book01"/>
                <entry key="key04">
                    <bean class="com.atqingke.bean.Car">
                        <property name="carName" value="ddd"/>
                    </bean>
                </entry>
                <entry key="key05">
                    <map>

                    </map>
                </entry>
            </map>
        </property>

        <property name="properties">
            <!--props 标签相当于 properties = new Properties();-->
            <props>
                <prop key="username">root</prop>
                <prop key="password">123456</prop>
            </props>
        </property>
    </bean>

    <bean id="book01" class="com.atqingke.bean.Book">
        <property name="bookName" value="水浒传"/>
    </bean>

    <!--引用类型赋值（引用其他bean、引用内部bean）-->
    <bean id="person042" class="com.atqingke.bean.Person">
        <!--ref标签就是用来引用外部其它bean-->
        <property name="car" ref="car01"/>
    </bean>

    <bean id="car01" class="com.atqingke.bean.Car">
        <property name="carName" value="五零"/>
    </bean>

    <!--测试使用null值-->
    <bean id="person041" class="com.atqingke.bean.Person">
       <property name="lastName" value="测试null值"/>
    </bean>

    <!--
        通过p名称空间为bean赋值
        名称空间：在xml中名称空间是用来防止标签重复的
        <book>
            <name>西游记</name>
            <price>155</price>
            <author>
                <a:name>吴承恩<a:/name>
                <gender>男</gender>
            </author>
        </book>

        带前缀的标签<c:forEach> <jsp:forEach>
    -->
    <bean id="person034" class="com.atqingke.bean.Person" p:age="15" p:lastName="www" p:email="fff" p:gender="ddd" />

    <!--
        public Person(String lastName, String gender, String email)
        public Person(String lastName, Integer age, String email)
        在重载情况下，可以通过type指定参数的类型
    -->
    <bean id="person033" class="com.atqingke.bean.Person">
        <constructor-arg value="ddd"/>
        <constructor-arg value="100" type="java.lang.Integer"/>
        <constructor-arg value="ddd"/>
    </bean>

    <!--
        可以省略name属性，严格按照构造器参数位置赋值
        也可以通过index指定对应参数位置
    -->
    <bean id="person032" class="com.atqingke.bean.Person">
        <constructor-arg value="xixi"/>
        <constructor-arg value="123" index="3"/>
        <constructor-arg value="xixi"/>
        <constructor-arg value="456" index="1"/>
    </bean>

    <bean id="person031" class="com.atqingke.bean.Person">
        <!-- 调用有参构造器进行创建对象并赋值 -->
        <constructor-arg name="lastName" value="小行星"/>
        <constructor-arg name="email" value="4564654@ddd.com"/>
        <constructor-arg name="gender" value="男"/>
        <constructor-arg name="age" value="55"/>
    </bean>

    <!-- 注册一个Person对象，Spring会自动创建这个Person对象 -->
    <!--
        一个Bean标签可以注册一个组件
        class：写要注册的组件的全类名
        id：这个对象的唯一标识
     -->
    <bean id="person01" class="com.atqingke.bean.Person">
        <!--
              使用property标签为Person对象的属性赋值
              name指定属性名
              value指定属性值
           -->
        <property name="lastName" value="引入IOC之后的属性赋值"/>
        <property name="age" value="23"/>
        <property name="email" value="ddd"/>
        <property name="gender" value="ddd"/>
    </bean>
</beans>
```
