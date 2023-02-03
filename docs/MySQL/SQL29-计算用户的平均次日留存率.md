[题目来源：《牛客网-在线编程-SQL篇》](https://www.nowcoder.com/practice/126083961ae0415fbde061d7ebbde453?tpId=199&tags=&title=&difficulty=0&judgeStatus=0&rp=0&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3DSQL%25E7%25AF%2587%26topicId%3D199)

### 1. 明确题意

计算用户在当天答题后第二天仍然答题的平均概率！

### 2. 解法思路

#### a> 解法一

我们可以将表中的数据全部视为是第一天答题，剩下的，我们需要将第二天也答题的数据构建出来。再将两张表进行左连接，就得到了“当天答题后第二天仍然答题的用户记录”。

接下来就是算平均概率了！

分母可以用左表中的记录数量，分子用左连接得到的记录数量即可算出平均概率。

上面的重点就是将第二天的数据构建出来，可以用`date_add(date1, interval 1 day)=date2`筛选，并用device_id限定是同一个用户。

#### b> 解法二

用lead函数将同一用户连续两天的记录拼接起来：先按用户分组`partition by device_id`，再按日期升序排序`order by date`，再两两拼接（最后一个默认和null拼接），即`lead(date) over (partition by device_id order by date)`。

求平均概率：检查date2和date1的日期差是不是为1，是则为1（次日留存了），否则为0（次日未留存），取avg即可得平均概率。

### 3. 代码

#### a> 解法一

```mysql
SELECT 
  COUNT(date_right) / COUNT(date_left) AS avg_ret 
FROM
  (SELECT DISTINCT 
    qpd_left.`device_id`,
    qpd_left.`date` AS date_left,
    qpd_right.`date` AS date_right 
  FROM
    question_practice_detail AS qpd_left 
    LEFT JOIN 
      (SELECT DISTINCT 
        `device_id`,
        `date` 
      FROM
        question_practice_detail) AS qpd_right 
      ON qpd_left.`device_id` = qpd_right.`device_id` 
      AND DATE_ADD(qpd_left.`date`, INTERVAL 1 DAY) = qpd_right.`date`) AS res ;
```

##### question_practice_detail 数据

![image-20220503092941453](https://gitee.com/PengZong888/imageSource/raw/master/img/2022/4/image-20220503092941453.png)

##### 左连接得到的数据

![image-20220503093018466](https://gitee.com/PengZong888/imageSource/raw/master/img/2022/4/image-20220503093018466.png)

> ps：要注意，要对device_id进行去重，因为一个人一天可以来多次。另外，要对表起别名，尤其是最后的结果res，否则会报错`错误代码： 1248 Every derived table must have its own alias`

#### b> 解法二

```mysql
SELECT AVG(IF(DATEDIFF(date2, date1)=1, 1, 0)) AS avg_ret
FROM (
    SELECT
        DISTINCT device_id,
        `date` AS date1,
        lead(DATE, 1) over (PARTITION BY device_id ORDER BY `date`) AS date2
    FROM (
        SELECT DISTINCT device_id, `date`
        FROM question_practice_detail
    ) AS qpd
) AS res
```

> 在我的机器上没有跑通，但是牛客提交可以通过，一直报错`错误代码： 1064
> You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near`。网上说是符号问题，但是找了半天没找到。