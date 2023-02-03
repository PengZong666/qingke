---
title: 深入Java集合系列之——HashMap
date: 2021-12-04 09:32:40
tags: [Java, 集合]
---

## 1. 传统HashMap的缺点

HashMap是基于哈希表的Map接口的非同步实现。此实现提供所有可选的映射操作，并允许使用null值和null键。此类不保证映射的顺序，特别是它不保证该顺序恒久不变。

1. JDK1.8以前HashMap的实现是 数组 + 链表，即使哈希函数取得再好，也很难达到元素百分百均与分布。

2. 当HashMap中有大量的元素都存放到同一个桶中时，这个桶下由一条长长的链表，这个时候HashMap就相当于一个单链表，加入单链表有n个元素，遍历的时间复杂度就是O(n)，完全失去了它的优势。

3. 针对这种情况，JDK1.8中引入了红黑树(查找时间复杂度为O(logn))来优化这个问题。

   <!-- more -->

## 2. JDK1.8中HashMap的数据结构

### 2.1 HashMap是数组 + 链表 + 红黑树实现的

![image-20211204101623944](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211204101623944.png)

新增红黑树：

```java
/**
     * Entry for Tree bins. Extends LinkedHashMap.Entry (which in turn
     * extends Node) so can be used as extension of either regular or
     * linked node.
     */
static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
    TreeNode<K,V> parent;  // red-black tree links
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // needed to unlink next upon deletion
    boolean red;
    ...
}
```

### 2.2 HashMap中关于红黑树的三个关键参数

```java
/**
     * The bin count threshold for using a tree rather than list for a
     * bin.  Bins are converted to trees when adding an element to a
     * bin with at least this many nodes. The value must be greater
     * than 2 and should be at least 8 to mesh with assumptions in
     * tree removal about conversion back to plain bins upon
     * shrinkage.
     */
static final int TREEIFY_THRESHOLD = 8;

/**
     * The bin count threshold for untreeifying a (split) bin during a
     * resize operation. Should be less than TREEIFY_THRESHOLD, and at
     * most 6 to mesh with shrinkage detection under removal.
     */
static final int UNTREEIFY_THRESHOLD = 6;

/**
     * The smallest table capacity for which bins may be treeified.
     * (Otherwise the table is resized if too many nodes in a bin.)
     * Should be at least 4 * TREEIFY_THRESHOLD to avoid conflicts
     * between resizing and treeification thresholds.
     */
static final int MIN_TREEIFY_CAPACITY = 64;
```

1. **TREEIFY_THRESHOLD	     一个桶的树化阈值**

   当桶中元素个数超过这个值时，需要使用红黑树节点替换链表节点。

2. **UNTREEIFY_THRESHOLD   一个树的链表还原阈值**

   当扩容时，桶中元素个数小于这个值时，就会把树形的桶元素还原（切分）为链表结构。

3. **MIN_TREEIFY_CAPACITY     哈希表的最小树形化容量**

   当哈希表中的容量大于这个值时，表中的桶才能进行树形化，否则桶内元素太多时会扩容，而不是树形化。为了避免进行扩容、树形化选择的冲突，这个值不能小于 4 * TREEIFY_THRESHOLD。

### 2.3 HashMap在JDK1.8中新增的操作：桶的树形化treeifyBin()

在Java8中，如果一个桶中的元素个数超过TREEIFY_THRESHOLD（默认是8），就使用红黑树来替换链表，从而提高速度。这个替换的方法叫treeifyBin()，即树形化。

```java
/**
     * Replaces all linked nodes in bin at index for given hash unless
     * table is too small, in which case resizes instead.
     */
// 将桶内所有的链表节点替换成红黑树节点
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    // 如果当前哈希表为空，或者哈希表中元素的个数小于进行树形化的阈值（默认64），就去新建/扩容
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        resize();
    // 如果哈希表中的元素个数超过了树形化阈值，进行树形化
    // e 是哈希表中指定位置桶里的链表节点，从第一个开始
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        TreeNode<K,V> hd = null, tl = null;
        do {
            // 新建一个树形节点，内容和当前链表节点 e 一致
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null) // 确定树的头节点
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        // 让桶的第一个元素指向新建的红黑树头节点，以后这个桶里的元素就是红黑树而不是链表了
        if ((tab[index] = hd) != null)
            hd.treeify(tab);
    }
}

// For treeifyBin
TreeNode<K,V> replacementTreeNode(Node<K,V> p, Node<K,V> next) {
    return new TreeNode<>(p.hash, p.key, p.value, next);
}
```

通过分析源码我们可以看到，treeifyBin方法主要做了三件事：

1. 根据哈希表中元素个数确定是扩容还是树形化。
2. 如果是树形化遍历桶中的元素，创建相同个数的树形节点，复制内容，建立起联系。
3. 然后让桶第一个元素指向新建的树头节点，替换桶的链表内容为树形内容。

## 3. hash方法

在get方法和put方法中都需要先计算key映射到哪个桶上，然后才进行之后的操作，计算的主要代码如下：

```java
(n - 1) & hash
```

上面的代码中，n指的是哈希表的大小，hash指的是key的哈希值，hash值是通过下面这段源码算出来的，采用了二次哈希的方式，其中key的hashCode方法是一个native方法：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

这个hash方法先通过key的hashCode方法获取一个哈希值，再拿这个哈希值与它的高16位的哈希值做一个异或操作来得到最后的哈希值，计算过程可以参考下图：

![image-20211205182507237](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205182507237.png)

为什么这样做？

```java
/**
     * Computes key.hashCode() and spreads (XORs) higher bits of hash
     * to lower.  Because the table uses power-of-two masking, sets of
     * hashes that vary only in bits above the current mask will
     * always collide. (Among known examples are sets of Float keys
     * holding consecutive whole numbers in small tables.)  So we
     * apply a transform that spreads the impact of higher bits
     * downward. There is a tradeoff between speed, utility, and
     * quality of bit-spreading. Because many common sets of hashes
     * are already reasonably distributed (so don't benefit from
     * spreading), and because we use trees to handle large sets of
     * collisions in bins, we just XOR some shifted bits in the
     * cheapest possible way to reduce systematic lossage, as well as
     * to incorporate impact of the highest bits that would otherwise
     * never be used in index calculations because of table bounds.
     */
```

这是hash方法上的注释，大致意思就是通过这种最便捷的方式对一些移位位进行异或，这样可以减少系统损失，以及合并最高位的影响，否则，由于table bounds，最高位将用于不会用于索引计算。我们可以假设这样一种场景，如果n很小，假设为64，那么n - 1就是63(0x111111)，这样的值跟hashCode直接做与操作，实际上只使用了哈希值的后六位。当哈希值的高位变化很大，低位变化很小，这样就很容易造成冲突了，所以这里把高低位都利用起来，从而解决了这个问题。

也正是因为与的这个操作，决定了HashMap的大小只能是2的幂次方。如果不是2的幂次方，会发生什么？

![image-20211205184539044](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205184539044.png)

即使你在创建HashMap的时候指定了初始大小，HashMap在创建的时候也会调用下面这个方法来调整大小：

```java
/**
     * Returns a power of two size for the given target capacity.
     */
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

这个方法的作用看起来不是很直观，它的实际作用就是把cap变成第一个大于等于2的幂次方的数。例如：16还是16，13就会调整为16，17就会调整为32。

## 4. resize方法（rehash）

当HashMap中的元素越来越多的时候，hash冲突的几率也越来越高，因为数组长度是固定的。所以为了提高查询的效率，就要对HashMap的数组进行扩容，数组扩容这个操作也会出现在ArrayList中，这是一个常用的操作，而在HashMap数组扩容之后，最消耗性能的点就出现了：原数组中的数据必须重新计算其在新数组中的位置，并放进去，这就是resize。

HashMap在进行扩容时，使用的rehash方式非常巧妙，因为每次扩容都是翻倍，与原来计算(n - 1) & hash的结果相比，只是多了一个bit位，所以节点要么就在原来的位置，要么倍分配到”原位置 + 旧容量“这个位置。也正是因为这样巧妙的rehash方式，保证了rehash之后每个桶上的节点数必定小于等于原来桶上的节点数，即保证了rehash之后不会出现更严重的冲突。

```java
/**
     * Initializes or doubles table size.  If null, allocates in
     * accord with initial capacity target held in field threshold.
     * Otherwise, because we are using power-of-two expansion, the
     * elements from each bin must either stay at same index, or move
     * with a power of two offset in the new table.
     *
     * @return the table
     */
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    // 计算扩容后的大小
    if (oldCap > 0) {
        // 如果当前容量超过最大容量，则无法进行扩容
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 没超过，扩为两倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else {               // zero initial threshold signifies using defaults
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    // 新的resize阈值
    threshold = newThr;
    // 创建新的哈希表
    @SuppressWarnings({"rawtypes","unchecked"})
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    if (oldTab != null) {
        // 遍历旧哈希表的每个桶，重新计算桶里元素的新位置
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                // 如果桶上只有一个键值对，直接插入即可
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                // 红黑树处理冲突
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                // 链式处理冲突
                else { // preserve order
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    // 计算节点新位置
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

这里有一个需要注意的地方，有些文章指出当哈希表的**<u>桶占用</u>**超过阈值时就进行扩容，这是不对的；实际上是当哈希表中的**<u>键值对个数</u>**超过阈值时，才进行扩容的。

## 5. 分析HashMap的put方法

### 5.1 HashMap的put方法执行过程

看图说话：

![image-20211204125204443](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211204125204443.png)

源码分析（JDK1.8）：

```java
/**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for the key, the old
     * value is replaced.
     *
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return the previous value associated with <tt>key</tt>, or
     *         <tt>null</tt> if there was no mapping for <tt>key</tt>.
     *         (A <tt>null</tt> return can also indicate that the map
     *         previously associated <tt>null</tt> with <tt>key</tt>.)
     */
public V put(K key, V value) {
    // hash(key)：对key的hashCode()做hash
    return putVal(hash(key), key, value, false, true);
}

/**
     * Implements Map.put and related methods.
     *
     * @param hash hash for key
     * @param key the key
     * @param value the value to put
     * @param onlyIfAbsent if true, don't change existing value
     * @param evict if false, the table is in creation mode.
     * @return previous value, or null if none
     */
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // 步骤① tab为空则创建
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 步骤② 计算index，并对null做处理
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        // 步骤③ 节点key存在，直接覆盖value
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 步骤④ 判断该链为红黑树
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 步骤⑤ 该链为链表
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    // 链表长度大于8，转换成红黑树处理
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                // key已经存在直接覆盖value
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    // 步骤⑥ 超过最大容量，扩容
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

源码分析（JDK1.7）：

```java
/**
     * Associates the specified value with the specified key in this map.
     * If the map previously contained a mapping for the key, the old
     * value is replaced.
     *
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return the previous value associated with <tt>key</tt>, or
     *         <tt>null</tt> if there was no mapping for <tt>key</tt>.
     *         (A <tt>null</tt> return can also indicate that the map
     *         previously associated <tt>null</tt> with <tt>key</tt>.)
     */
public V put(K key, V value) {
    if (key == null)
        return putForNullKey(value);
    // 计算出hash值
    int hash = hash(key);
    // 根据hash值计算插入位置
    int i = indexFor(hash, table.length);
    // 遍历当前索引的冲突链，判断是否存在对应key
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        // 先判断hash值是否相同，再进行equals判断，存在对应key，则替换oldValue并返回oldValue
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }

    // 哈希值不同并且equals判断返回false，将新添加的entry指向原有的entry
    modCount++;
    addEntry(hash, key, value, i);
    return null;
}
```

步骤小总结（JDK1.8）：

> 1. 判断键值对数组table[i]是否为空或为null，否则执行resize进行扩容。
> 2. 根据键值key计算hash值得到插入的数组索引i，如果table[i] == null，直接新建节点添加，转向第六步；如果table[i]不为空，继续下一步。
> 3. 判断table[i]的首个元素是否和key一样，如果相同直接覆盖value，转向第六步；否则继续下一步。（这里的相同指的是hashCode以及equals）
> 4. 判断table[i]是否为treeNode，即table[i]是否为红黑树，如果是，直接在树中插入键值对，转向第六步；否则继续下一步。
> 5. 遍历table[i]，判断链表长度是否大于8，大于8的话把链表转换成红黑树，在红黑树中执行插入操作，否则进行链表插入操作；遍历过程中若发现key已经存在直接覆盖value即可。
> 6. 插入成功后，判断实际存在的键值对数量size是否超过了最大容量threshold。如果超过，进行扩容。

### 5.2 HashMap在JDK1.8中新增的操作：红黑树中查找元素 getNode()

底层源码：

```java
/**
     * Implements Map.get and related methods.
     *
     * @param hash hash for key
     * @param key the key
     * @return the node, or null if none
     */
final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

HashMap的查找方法是get，它通过计算指定key的哈希值后，调用内部方法getNode。而这个getNode方法就是根据哈希表元素个数与哈希值求模（使用(n - 1) & hash）得到key所在的桶的头节点，如果头节点恰好是红黑树节点，就调用红黑树节点的getTreeNode方法，否则就遍历链表节点。

getTreeNode方法是通过调用树形节点的find方法进行查找：

```java
/**
         * Calls find for root node.
         */
final TreeNode<K,V> getTreeNode(int h, Object k) {
    return ((parent != null) ? root() : this).find(h, k, null);
}
```

继续查看find方法可以发现，因为添加时已经保证这个树是有序的，所以使用的是折半查找，效率很高。

和插入时一样的是，如果对比节点的哈希值和要查找的哈希值相等，就会判断key是否相等，相等就直接返回；不想等就从子树中递归查找。

### 5.3 JDK1.8 VS JDK1.7 扩容机制

举个例子说明一下扩容过程。假设我们的hash算法就是简单的用“key mod table.size”。其中的哈希桶数组的table的size = 2。现在我们执行下面三条语句：

```java
map.put(3, "A");
map.put(7, "B");
map.put(5, "C");
```

key = 3、7、5在mod 2 以后都冲突在table[1]这里了。这里假设负载因子loadFactor = 1，即当键值对的实际大小size大于table的实际大小时进行扩容。接下来的三个步骤是哈希桶数组resize成4，然后所有的Node重新rehash的过程。

![image-20211205141209269](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205141209269.png)

下面我们看一下JDK1.8做了哪些优化。经过观测可以发现，我们使用的是2次幂的扩展，所以，元素的位置要么是在原来的位置，要么是在原位置再移动2次幂的位置。看下面这张图，n为table的长度，图(a)表示扩容前的key1和key2两种key确定索引位置的示例，图(b)表示扩容后key1和key2两种key确定索引位置的示例，其中hash1是key1对应的哈希与高位运算结果。

![image-20211205145249684](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205145249684.png)

元素在重新计算hash之后，因为n变为2倍，那么n-1的mask范围在高位多1bit（红色），因此新的index就会发生这样的变化：

![image-20211205145957298](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205145957298.png)

因此，我们在扩充HashMap的时候，不需要像JDK1.7的实现那样重新计算hash，只需要看看原来的hash值新增的那个bit是0还是1就好了，是0的话索引没变，是1的话索引变成“原索引 + oldCap”，下图为16扩充为32的resize示意图：

![image-20211205152506574](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205152506574.png)

这个设计确实非常巧妙，既省去了重新计算hash值的时间，同时由于新增的1bit是0还是1可以认为是随机的，因此resize的过程，均匀的把之前的冲突的节点分散到新的bucket了。这一块就是JDK1.8新增的优化点。

## 6. Fail-Fast机制

我们知道java.util.HashMap不是线程安全的，因此如果在使用迭代器的过程中有其它线程修改了map，那么将抛出ConcurrentModificationException，这就是所谓的fail-fast策略。

![image-20211205205315564](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211205205315564.png)

这一策略在源码中的实现是通过modCount域，modCount顾名思义就是修改次数，对HashMap内容的修改都将增加这个值，那么在迭代器初始化过程中会将这个值赋给迭代器的expectedModCount。

```java
HashIterator() {
    expectedModCount = modCount;
    Node<K,V>[] t = table;
    current = next = null;
    index = 0;
    if (t != null && size > 0) { // advance to first entry
        do {} while (index < t.length && (next = t[index++]) == null);
    }
}
```

在迭代过程中，判断modCount跟expectedModCount是否相等，如果不相等就表示已经有其它线程修改了map。

在HashMap中的API指出：由所有HashMap类的”collection视图方法“所返回的迭代器都是快速失败的。在迭代器创建之后，如果从结构上对映射进行修改，除非通过迭代器本身的remove方法，其它任何时间任何方式的修改，迭代器将抛出ConcurrentModificationException。因此，面对并发的修改，迭代器很快就会完全失败，而不冒在将来不确定的时间发生任意不确定行为的风险。

注意，迭代的快速失败行为不能得到保证，一般来说，存在非同步的并发修改时，不可能做出任何坚决的保证。快速失败迭代器尽最大的努力抛出ConcurrentModificationException。因此，编写依赖于此异常的程序的做法是错误的，正确的做法是：迭代器的快速失败行为应该仅用于检测程序错误。

## 7. JDK1.7 VS JDK1.8的性能

### 7.1 put操作

1. hash比较均匀的时候（负载因子 = 0.75）

   | 次数             | 10   | 100  | 1000 | 10000 | 100000 |
   | ---------------- | ---- | ---- | ---- | ----- | ------ |
   | JDK1.7时间（ns） | 1100 | 720  | 832  | 914   | 912    |
   | JDK1.8时间（ns） | 1019 | 1023 | 1188 | 267   | 115    |

2. hash不均匀的时候

   | 次数             | 10   | 100   | 1000  | 10000 | 100000 |
   | ---------------- | ---- | ----- | ----- | ----- | ------ |
   | JDK1.7时间（ns） | 2500 | 14310 | 8151  | 14137 | 154319 |
   | JDK1.8时间（ns） | 3765 | 38144 | 60707 | 1182  | 373    |

### 7.2 get操作

1. hash比较均匀的时候

   | 次数             | 10   | 100  | 1000 | 10000 | 100000 |
   | ---------------- | ---- | ---- | ---- | ----- | ------ |
   | JDK1.7时间（ns） | 900  | 550  | 627  | 302   | 626    |
   | JDK1.8时间（ns） | 2773 | 1047 | 318  | 94    | 13     |

2. hash不均匀的时候

   | 次数             | 10   | 100   | 1000 | 10000 | 100000 |
   | ---------------- | ---- | ----- | ---- | ----- | ------ |
   | JDK1.7时间（ns） | 2000 | 14950 | 4294 | 2167  | 16447  |
   | JDK1.8时间（ns） | 3430 | 3932  | 2028 | 767   | 19     |

