---
title: Spring-JdbcTemplate
date: 2022-01-01 20:59:38
tags:
---

了解即可！！！！！！！！！！！！

sql文件：

```mysql
/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.7.32 : Database - jdbc_template
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jdbc_template` /*!40100 DEFAULT CHARACTER SET gb2312 */;

USE `jdbc_template`;

/*Table structure for table `employee` */

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_name` char(100) DEFAULT NULL,
  `salary` double DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=gb2312;

/*Data for the table `employee` */

insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (1,'Susan',5000.23);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (2,'Julian',4234.77);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (3,'Papu',9034.51);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (4,'Babala',8054.33);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (5,'Kasier',1300);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (6,'Owen',7714.11);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (7,'zhangsan',9999.99);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (8,'lisi',8999.99);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (9,'wangwu',7999.99);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (10,'zhaoliu',6999.99);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (11,'田七',8848.88);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (12,'哈哈',5555.55);
insert  into `employee`(`emp_id`,`emp_name`,`salary`) values (13,'哈哈2',5555.55);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
```

applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder location="classpath:dbConfig.properties"/>
    <context:component-scan base-package="com.atqingke"/>


    <!--实验9：创建BookDao，自动装配JdbcTemplate对象-->
    <!--实验8：重复实验7，以SqlParameterSource形式传入参数值-->
    <!--实验7：使用带有具名参数的SQL语句插入一条员工记录，并以Map形式传入参数值-->
    <!--配置一个具有具名参数功能的jdbcTemplate-->
    <bean id="namedParameterJdbcTemplate" class="org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate">
        <!--使用构造器方式注入一个数据源-->
        <constructor-arg name="dataSource" ref="dataSource"/>
    </bean>

    <!--实验6：查询最大salary-->
    <!--实验5：查询salary>4000的数据库记录，封装为List集合返回-->
    <!--实验4：查询emp_id=5的数据库记录，封装为一个Java对象返回-->
    <!--实验3：批量插入-->
    <!--实验2：将emp_id=5的记录的salary字段更新为1300.00-->
    <!--Spring提供了一个类JdbcTemplate，我们用它来操作数据库-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <constructor-arg name="dataSource" ref="dataSource"/>
    </bean>

    <!--实验1：测试数据源-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="user" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"/>
        <property name="driverClass" value="${jdbc.driverClass}"/>
    </bean>
</beans>
```

dbConfig.properties

```properties
jdbc.user=root
jdbc.password=123456
jdbc.jdbcUrl=jdbc:mysql://localhost:3306/jdbc_template
jdbc.driverClass=com.mysql.jdbc.Driver
```

Employee

```java
package com.atqingke.bean;

/**
 * @Author pengbin007
 * @Date 2022/1/1 20:24
 */
public class Employee {

    private Integer empId;
    private String empName;
    private Double Salary;

    public Employee() {
    }

    public Employee(Integer empId, String empName, Double salary) {
        this.empId = empId;
        this.empName = empName;
        Salary = salary;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public Double getSalary() {
        return Salary;
    }

    public void setSalary(Double salary) {
        Salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId=" + empId +
                ", empName='" + empName + '\'' +
                ", Salary=" + Salary +
                '}';
    }
}
```

EmployeeDao

```java
package com.atqingke.dao;

import com.atqingke.bean.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * @Author pengbin007
 * @Date 2022/1/1 20:52
 */
@Repository
public class EmployeeDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public void saveEmployee(Employee employee) {
        String sql = "INSERT INTO employee(emp_name, salary) VALUES(?, ?)";
        jdbcTemplate.update(sql, employee.getEmpName(), employee.getSalary());
    }
}
```

TxTest

```java
package com.atqingke.test;

import com.atqingke.bean.Employee;
import com.atqingke.dao.EmployeeDao;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author pengbin007
 * @Date 2022/1/1 20:02
 */
public class TxTest {

    ApplicationContext ioc = new ClassPathXmlApplicationContext("applicationContext.xml");
    JdbcTemplate jdbcTemplate = ioc.getBean(JdbcTemplate.class);
    NamedParameterJdbcTemplate namedJdbcTemplate = ioc.getBean(NamedParameterJdbcTemplate.class);

    /**
     * 创建EmployeeDao，自动装配JdbcTemplate对象
     */
    @Test
    public void test09() {
        EmployeeDao employeeDao = ioc.getBean(EmployeeDao.class);
        Employee employee = new Employee();
        employee.setEmpName("哈哈2");
        employee.setSalary(5555.55);
        employeeDao.saveEmployee(employee);
    }

    /**
     * 实验8：重复实验7，以SqlParameterSource形式传入参数值
     */
    @Test
    public void test08() {
        String sql = "INSERT INTO employee(emp_name, salary) VALUES(:empName, :salary)";
        Employee employee = new Employee();
        employee.setEmpName("哈哈");
        employee.setSalary(5555.55);

        int update = namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(employee));
        System.out.println(update);
    }

    /**
     * 实验7：使用带有具名参数的SQL语句插入一条员工记录，并以Map形式传入参数值
     * 具名参数：具有名字的参数，参数不是占位符了，而是一个变量名
     *      语法格式：   :参数名
     * Spring有一个支持具名参数功能的JdbcTemplate
     *
     * 占位符参数：?的顺序千万不能乱，传参的时候一定注意
     */
    @Test
    public void test07() {
        String sql = "INSERT INTO employee(emp_name, salary) VALUES(:empName, :salary)";
        Map<String, Object> paramMap = new HashMap<>();
        // 将所有具名参数的值都放在map中
        paramMap.put("empName", "田七");
        paramMap.put("salary", 8848.88);
        int update = namedJdbcTemplate.update(sql, paramMap);
        System.out.println(update);
    }

    /**
     * 实验6：查询最大salary
     */
    @Test
    public void test06() {
        String sql = "SELECT MAX(salary) FROM employee";
        // 无论是返回单个数据还是单个对象，都是调用queryForObject
        Double aDouble = jdbcTemplate.queryForObject(sql, Double.class);
        System.out.println(aDouble);
    }

    /**
     * 实验5：查询salary>4000的数据库记录，封装为List集合返回
     */
    @Test
    public void test05() {
        String sql = "SELECT emp_id empId, emp_name empName, salary FROM employee WHERE salary > ?";
        // 封装List
        List<Employee> employees = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Employee.class), 4000);
        for(Employee employee : employees) {
            System.out.println(employee);
        }
    }

    /**
     * 实验4：查询emp_id=5的数据库记录，封装为一个Java对象返回
     * JavaBean需要和数据库中字段名一致，否则无法完成封装
     * jdbcTemplate在方法级别进行了区分
     * 查询结合：jdbcTemplate.query()
     * 查询单个对象：jdbcTemplate.queryForObject()
     *      如果查询没结果就报错
     */
    @Test
    public void test04() {
        String sql = "SELECT emp_id empId, emp_name empName, salary FROM employee WHERE emp_id = ?";
        // 中间这个参数为每一行记录和JavaBean的属性如何映射
        Employee employee = null;
        try {
            employee = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Employee.class), 5);
            System.out.println(employee);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
    }

    /**
     * 实验3：批量插入
     */
    @Test
    public void test03() {
        String sql = "INSERT INTO employee(emp_name, salary) VALUES(?, ?)";
        // List的长度就是sql语句要执行的次数
        // Object[]：每次执行要用的参数
        List<Object[]> batchArgs = new ArrayList<Object[]>();
        batchArgs.add(new Object[]{"zhangsan", 9999.99});
        batchArgs.add(new Object[]{"lisi", 8999.99});
        batchArgs.add(new Object[]{"wangwu", 7999.99});
        batchArgs.add(new Object[]{"zhaoliu", 6999.99});
        int[] batchUpdate = jdbcTemplate.batchUpdate(sql, batchArgs);
        for(int update : batchUpdate) {
            System.out.println(update);
        }
    }

    /**
     * 实验2：将emp_id=5的记录的salary字段更新为1300.00
     */
    @Test
    public void test02() {
        String sql = "UPDATE employee SET salary = ? WHERE emp_id = ?";
        int update = jdbcTemplate.update(sql, 1300.00, 5);
        System.out.println("更新员工：" + update);
    }

    /**
     * 实验1：测试数据源
     */
    @Test
    public void test01() throws SQLException {
        DataSource dataSource = ioc.getBean(DataSource.class);
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();
    }
}
```

