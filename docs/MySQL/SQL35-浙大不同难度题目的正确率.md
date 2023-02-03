[题目来源：《牛客网-在线编程-SQL篇(35)》](https://www.nowcoder.com/practice/d8a4f7b1ded04948b5435a45f03ead8c?tpId=199&tags=&title=&difficulty=0&judgeStatus=0&rp=0&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3DSQL%25E7%25AF%2587%26topicId%3D199)

### 明确题意

首先“浙江大学的用户”，通过`WHERE university = '浙江大学'`限定。

接下来“用户在不同难度题目下答题的正确率”，在这里，又可以分解成三个问题：

- “用户在不同题目下答题的正确率”，也就是将 `user_profile` 和 `question_practice_detail`关联得到，将用户和题目关联起来。

```mysql
SELECT 
  * 
FROM
  user_profile up 
  RIGHT JOIN question_practice_detail qpd 
    ON up.`device_id` = qpd.`device_id` 
WHERE university = '浙江大学'
```

![image-20220504111106191](https://gitee.com/PengZong888/imageSource/raw/master/img/2022/5/image-20220504111106191.png)

- “不同难度的题目”，再将关联得到的表和 `question_detail` 关联即可

```mysql
SELECT 
  * 
FROM
  user_profile up 
  RIGHT JOIN question_practice_detail qpd 
    ON up.`device_id` = qpd.`device_id` 
  LEFT JOIN question_detail qd 
    ON qpd.`question_id` = qd.`question_id` 
WHERE university = '浙江大学' 
```

![image-20220504111141160](https://gitee.com/PengZong888/imageSource/raw/master/img/2022/5/image-20220504111141160.png)

然后注意结果要的是不同难度，所以要对结果进行分组，即`GROUP BY difficult_level`，最后升序排列`ORDER BY correct_rate`

再从得到的最终表取出需要的列：

- difficult_level 不变
- 正确率，通过`SUM(IF(result = 'right', 1, 0)) / COUNT(1) AS correct_rate`得到

### 代码

```mysql
SELECT 
  difficult_level,
  SUM(IF(result = 'right', 1, 0)) / COUNT(1) AS correct_rate 
FROM
  user_profile up 
  LEFT JOIN question_practice_detail qpd 
    ON up.`device_id` = qpd.`device_id` 
  LEFT JOIN question_detail qd 
    ON qpd.`question_id` = qd.`question_id` 
WHERE university = '浙江大学' 
GROUP BY difficult_level 
ORDER BY correct_rate 
```

![image-20220504111332367](https://gitee.com/PengZong888/imageSource/raw/master/img/2022/5/image-20220504111332367.png)

