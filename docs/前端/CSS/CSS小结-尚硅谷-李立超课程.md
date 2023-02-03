---
title: CSS小结(尚硅谷-李立超课程)
date: 2022-01-21 18:03:14
tags:
---

## CSS简介

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>

  <!-- 
    第二种方式（内部样式表）
        将样式编写到head中的style标签里
          然后通过CSS的选择器来选中元素并为其设置各种样式
          可以同时为多个标签设置样式，并且修改时只需要修改一处即可全部应用
        内部样式表更加方便对样式进行复用

        问题
          只能对一个网页起作用，它里边的样式不能跨页面进行复用
    -->
  <!-- <style>
    p {
      color: green;
      font-size: 46px;
    } 
  </style> -->
  <!-- 
    第三种方式（外部样式表）
      将CSS样式编写到一个外部的CSS文件中
        然后通过link标签来引入外部的CSS文件
      将样式编写到外部的CSS文件中，可以使用到浏览器的缓存机制
        从而加快网页的加载速度，提升用户体验
    -->
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <p>落霞与孤鹜齐飞，秋水共长天一色</p>
  <!-- 
    网页分成三个部分：
        结构  HTML
        表现  CSS
        行为  JavaScript

    CSS
        层叠样式表
        网页实际上是一个多层的结构，通过CSS分别为网页的每一个层来设置样式
          而最终我们能看到的只是网页的最上边一层
        总之一句话，CSS用来设置网页中元素的样式
    -->

  <!-- 
      使用CSS来修改元素的样式

      第一种方式(内联样式，行内样式)
        在标签内部通过style属性来设置元素的样式
    -->
  <!-- <p style="color: red; font-size: 60px">少小离家老大回，乡音无改鬓毛衰</p>
  <p style="color: red; font-size: 60px">今天天气真不错</p>
  <p style="color: red; font-size: 60px">落霞与孤鹜齐飞，秋水共长天一色</p> -->
</body>
```

## CSS语法

```html
<style>
  /* 
    CSS基本语法
      选择器 声明块
        通过选择器可以选中页面中的指定元素
          比如 p 的作用就是选中页面中的所有p元素
        通过声明块来指定要为元素设置的样式
          声明块由一个个的声明组成
          声明是一个名值对结构
            一个样式名对应一个样式只，名和值之间以 : 连接，以 ; 结尾
    */

  p {
    color: red;
  }

  h1 {
    color: blue;
  }
</style>
```

## 常用选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        将所有的段落设置为红色

        元素选择器
          作用：根据标签名来选中指定的元素
          语法：标签名{}
          例子：p{}、h1{}、div{}

        id选择器
          作用：根据元素的id属性值选中一个元素
          语法：#id属性值{}
          例子：#red{}

        class是一个标签的属性，它与id类似，不同的是class可以重复使用
          可以通过class属性来为属性分组
        类选择器
          作用：根据元素的class属性值选中一组元素
          语法：.class属性值

        通配选择器
          作用：选中页面中的元素
          语法：*{}


      */
      #red {
        color: red;
      }

      .blue {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1>我是h1</h1>
    <p>111111111111</p>
    <p class="blue">211111111111</p>
    <p class="blue">311111111111</p>
    <p id="red">411111111111</p>
    <p id="red">511111111111</p>
    <p>611111111111</p>
  </body>
</html>
```

## 复合选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        交集选择器
          作用：选中同时复合多个条件的元素
          语法：选择器1选择器2选择器n{}
          注意点：
            交集选择器中如果有元素选择器，必须使用元素选择器开头

        选择器分组（并集选择器）
          作用：同时选择多个选择器对应的元素
          语法：选择器1,选择器2,选择器n{}
      */

      .red {
        color: red;
      }

      div.red {
        font-size: 30px;
        color: blue;
      }
    </style>
  </head>
  <body>
    <div class="red">divdivdiv</div>
    <p class="red">pppppp</p>
  </body>
</html>
```

## 关系选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* class为box的div的span子元素*/
      div.box > span {
        color: red;
      }

      /* div的所有span后代*/
      div span {
        font-size: large;
      }

      /*
        选择下一个兄弟：
          语法：前一个 + 下一个
        选择下面的所有兄弟：
          语法：兄 ~ 弟
      */
    </style>
  </head>
  <body>
    <!-- 
    父元素：
    子元素：
    祖先元素：
    后代元素：
    兄弟元素：
   -->
  </body>
</html>
```

## 属性选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
      [属性名] 选择含有指定属性的元素
      [属性名=属性值]
      [属性名^=属性值] 选择属性值以指定值开头的元素
      [属性名$=属性值] 选择属性值以指定值结尾的元素
      [属性名*=属性值] 选择属性值中含有某值的元素
      */
    </style>
  </head>
  <body></body>
</html>
```

## 伪类选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        伪类（不存在得类，特殊的类）
          伪类用来描述一个元素的特殊状态
            比如：第一个子元素、被点击的元素、鼠标移入的元素
          伪类一般情况下都是使用 : 开头
            :first-child  第一个子元素
            :last-child   最后一个子元素
            :nth-child(n)  选中第n个子元素
              特殊值：
                n   选中所有
                2n 或 even    选中偶数位
                2n+1 或 odd  选中奇数位
            以上这些伪类都是根据所有的子元素进行排序

            :first-of-type
            :last-of-type
            :nth-of-type(n)
            这几个伪类的功能和上述的类似，不同点是他们是在同类型元素中进行排序

            :not() 否定伪类
              将符合条件的元素从选择器中去除
      */
      ul > li:last-child {
        color: red;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>第一个</li>
      <li>第二个</li>
      <li>第三个</li>
      <li>第四个</li>
      <li>第五个</li>
    </ul>
  </body>
</html>
```

## a元素的伪类

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      a:link {
        color: red;
      }

      /*
        由于隐私的原因，visited这个伪类只能修改链接的颜色
      */
      a:visited {
        color: aquamarine;
      }

      /*
        :hover 用来表示鼠标移入的状态
        :active 用来表示鼠标点击
      */
      a:hover {
        color: aqua;
      }

      a:active {
        color: yellowgreen;
      }
    </style>
  </head>
  <body>
    <a href="https://www.atqingke.com">访问过的链接</a>

    <br /><br />

    <a href="https://www.atqingke.com">没有访问过的链接</a>
  </body>
</html>
```

## 伪元素选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        伪元素，表示页面中一些特殊的并不真实存在的元素（特殊的位置）
          伪元素使用 :: 开头

          ::first-letter 表示第一个字母
          ::first-line 表示第一行
          ::selection 表示选中的内容
          ::before 元素的开始
          ::after 元素的结束
      */
      p::first-letter {
        color: red;
        font-size: 20px;
      }

      p::first-line {
        background-color: aqua;
      }

      p::selection {
        color: yellowgreen;
      }

      p::before {
        content: 'aaaa';
        color: burlywood;
      }

      p::after {
        content: 'fsdddfs';
        color: rebeccapurple;
      }
    </style>
  </head>
  <body>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint mollitia
      expedita aspernatur quis impedit ipsum quibusdam rerum magnam nam
      perferendis officia culpa, quod nostrum, iure excepturi veritatis
      explicabo! Corrupti, ex? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Quam tempora velit ducimus molestias assumenda, rem
      accusantium consequuntur praesentium natus adipisci! Doloremque quia
      voluptatibus aliquam, ea officiis quidem explicabo sunt quis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Asperiores laudantium
      perspiciatis dolores aliquid, nisi excepturi quas inventore fugiat optio
      expedita et, fuga sed! Cupiditate voluptatem nam ut. Quis, unde rem? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Ipsa, fugit, porro
      dolor omnis ad quae asperiores molestias magni rem commodi numquam
      perferendis repudiandae voluptas, a facere ducimus? Obcaecati, nulla quae.
    </p>
  </body>
</html>
```

## 样式的继承

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        样式的继承：我们为一个元素设置的样式也会应用到它的后代元素上

        继承是发生在祖先后代之间的

        继承的设计是为了方便我们的开发，利用继承我们可以将一些通用的样式统一设置到共同的祖先元素上，我们只需设置一次即可让所有的元素都具有该样式

        注意：并不是所有的样式都会被继承
          比如：背景相关的，布局相关的这些仰卧时就不会被继承
      */
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>
      我是一个p元素
      <span>我是p元素的span</span>
    </p>
    <span>我是p元素外的span</span>
  </body>
</html>
```

## 选择器的权重

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*
        样式的冲突
          当我们通过不同的选择器，选中相同的元素，并且为相同的样式设置不同的值时，此时就发生了样式的冲突

        发生样式冲突时，应用那个样式由选择器的权重（优先级）决定

        选择器的权重
          内联样式        1000
          id选择器        100
          类和伪类选择器  10
          元素选择器      1
          通配选择器      0
          继承的样式      没有优先级
        
        比较优先级时，需要将所有的选择器的优先级进行相加计算，最后优先级越高，则越优先显示（分组选择器是单独计算的）
          选择器的累加不会超过其最大的数量级，类选择器再高也不会超过id选择器
          如果优先级计算后相同，此时则优先使用靠下的样式

        可以在某一个样式的后边添加 !important 则此时该样式会获取到最高的优先级，甚至超过内联样式
          注意，在开发中要慎重使用！                                                                                                 
      */

      #box1 {
        color: orange;
      }

      div {
        color: yellow;
      }

      .red {
        color: red;
      }
    </style>
  </head>
  <body>
    <div id="box1" class="red">我是一个div</div>
  </body>
</html>
```

## 单位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html {
        font-size: 30px;
      }
      /*
      长度单位
        像素
            屏幕实际上是由一个个的小点点构成的
            不同屏幕的像素大小是不同的，像素越小的屏幕显示的效果越清晰
            所以同样的200px在不同的设备下显示效果不一样

        百分比
            也可以将属性值设置为相对于其父元素属性的百分比

        em
            em是相对于元素的字体大小来计算的
            1em = 1font-size
            em会根据字体大小的改变而改变

        rem
            rem是相对于根元素的字体大小来计算的
    */
      .box1 {
        width: 200px;
        height: 200px;
        background-color: orange;
      }

      .box2 {
        width: 50%;
        height: 50%;
        background-color: aqua;
      }

      .box3 {
        font-size: 10px;
        width: 10em;
        height: 10em;
        background-color: greenyellow;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <div class="box2"></div>
    </div>

    <div class="box3"></div>
  </body>
</html>
```

## 颜色

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box1 {
        width: 100px;
        height: 100px;
        /*
        颜色单位
          在CSS中可以直接使用颜色名来设置各种颜色
            比如：red、blue、yellow......
            但是在CSS中直接使用颜色名是非常不方便的

          RGB值
            RGB通过三种颜色的不同浓度来调配出不同的颜色
            每一种颜色的范围在0~255
            语法：RGB(红色，绿色，蓝色)

          RGBA
            就是在rgb的基础上增加了一个a表示不透明度
            需要四个值，前三个和rgb一样，第四个表示不透明度
              1表示完全不透明，0表示完全透明，.5半透明

          十六进制的RGB值
            语法：#红色绿色蓝色
            颜色浓度通过00~ff
            如果颜色两位两位重复可以进行简写  #aabbcc  #abc

          HSL值 HSLA值
            H 色相（0~360）
            S 饱和度，颜色的浓度（0-100%）
            L 亮度有，颜色的亮度（0-100%）
      */
        background-color: red;
        background-color: rgb(123, 34, 145);
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
  </body>
</html>
```

