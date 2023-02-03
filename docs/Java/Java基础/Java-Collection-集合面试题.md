---
title: 集合面试题
date: 2021-12-02 22:11:55
tags: [Java, 集合, 面经]
---

### 

### 请问ArrayList/LinkedList/Vector的异同？谈谈你的理解？ArrayList底层是什么？扩容机制？Vector和ArrayList的最大区别？

<!-- more -->

- ArrayList和LinkedList的异同

  > 二者都是线程不安全的，相对线程安全的Vector，执行效率高。
  >
  > ArrayList是实现了基于动态数组的数据结构，LinkedList基于链表的数据结构。对于随机访问get和set，ArrayList优于LinkedList，因为LinkedList要移动指针。对于新增和删除操作以及add和remove，LinkedList比较占优势，因为ArrayList要移动数据。

- ArrayList和Vector的区别

  > Vector和ArrayList几乎是完全相同的，唯一的区别在于Vector是同步类(synchronized)，属于强同步类。因此开销就比ArrayList要大，访问要慢。正常情况下，大多数的Java程序员使用ArrayList而不是Vector，因为同步完全可以由程序员自己来控制。Vector每次扩容请求其大小的2倍空间，而ArrayList是1.5倍。Vector还有一个子类Stack。

### 负载因子值的大小，对HashMap有什么影响

> - 负载因子的大小决定了HashMap的数据密度。
> - 负载因子越大密度越大，发生碰撞的几率越高，数组中的链表越容易长，造成查询或插入时的比较次数增多，性能会下降。
> - 负载因子越小，就越容易触发扩容，数据密度也越小，意味着发射如果碰撞的几率越小，数组中的链表也就越短，查询和插入时比较的次数也越小，性能会更高。但是会浪费一定的内存空间。而且经常扩容也会影响性能，建议初始化预设大一点的空间。
> - 按照其它语言的参考及研究经验，会考虑将负载因子设置为0.7~0.75，此时平均检索长度接近于常数。

