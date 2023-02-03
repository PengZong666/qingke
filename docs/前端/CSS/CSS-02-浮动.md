---
title: CSS-02-浮动
date: 2022-02-20 05:27:32
tags:
---

## 浮动简介

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .box1 {
        width: 400px;
        height: 200px;
        background-color: #bfa;
      }

      .box2 {
        width: 500px;
        height: 200px;
        background-color: orange;
      }

      .box3 {
        width: 200px;
        height: 200px;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
  </body>
</html>
```

这是三个div，效果如图：

![image-20220220054247956](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220220054247956.png)

通过浮动可以使一个元素向其父元素的左侧或右侧移动，我们使用 float 属性来设置子元素的浮动，可选值有：

- none 默认值，不浮动
- left 元素向左浮动
- right 元素向右浮动

注意，元素设置浮动以后，水平布局的等式便不需要强制成立了。因为设置浮动以后，元素会完全从文档流中脱离，不再占用文档流的位置，所以元素下边的还在文档流中的元素会自动向上移动。

我们给每个div的样式加上对应的浮动之后，例如：

```css
.box1 {
    width: 400px;
    height: 200px;
    background-color: #bfa;
    float: left;
}
.box2 {
    width: 500px;
    height: 200px;
    background-color: orange;
    float: left; 
}

.box3 {
    width: 200px;
    height: 200px;
    background-color: yellow;
    float: right;
}
```

它就变成下面这个样子，三个div都在水平方向上排列了：

![image-20220220054514054](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220220054514054.png)

## 浮动的特点

1. 浮动元素会完全脱离文档流，不再占据文档流中的位置。
2. 设置浮动以后元素会向父元素的左侧或右侧移动。
3. 浮动元素默认不会从父元素中移出。
4. 浮动元素向左或向右移动时，不会超过它前边的其它浮动元素。
5. 如果浮动元素的上边是一个没有浮动的块元素，则浮动元素无法上移。
6. 浮动元素不会超过它上边的浮动的兄弟元素，最多最多就是和它一样高。
7. 浮动元素不会盖住文字，文字会自动环绕在浮动元素的周围，所以我们可以利用浮动来设置文字环绕图片的效果。
8. 元素设置浮动以后，将会从文档流中脱离，元素的一些特点也会发生变化：
   - 块元素
     - 块元素不再独占页面的一行。
     - 宽度和高度默认都被内容撑开。
   - 行内元素
     - 脱离文档流以后会变成块元素，特点和块元素一样（也就是说，脱离文档流以后，不需要再区分块和行内了）。

## 网页的布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>

        header, main, footer{
            width: 1000px;
            margin: 0 auto;
        }

        /* 设置头部 */
        header{
            height: 150px;
            background-color: silver;
        }

        /* 设置主体 */
        main{
            height: 500px;
            background-color: #bfa;
            margin: 10px auto;
        }

        nav, article, aside{
            float: left;
            height: 100%;
        }

        /* 设置左侧的导航 */
        nav{
            width: 200px;
            background-color: yellow;
        }

        /* 设置中间的内容 */
        article{
            width: 580px;
            background-color: orange;
            margin: 0 10px;
        }

        /* 设置右侧的内容 */
        aside{
            width: 200px;
            background-color: pink;
        }

        /* 设置底部 */
        footer{
            height: 150px;
            background-color: tomato;
        }
    </style>
</head>
<body>

    <!-- 创建头部 -->
    <header></header>

    <!-- 创建网页的主体 -->
    <main>
        <!-- 左侧导航 -->
       <nav></nav>

       <!-- 中间的内容 -->
       <article></article>

       <!-- 右边的边栏 -->
       <aside></aside>

    </main>
    
    <!-- 网页的底部 -->
    <footer></footer>
</body>
</html>
```

## 高度塌陷的问题

在浮动布局中，父元素的高度默认是被子元素撑开的。但是当子元素浮动后，它会完全脱离文档流，而子元素从文档流中脱离意味着将会无法撑起父元素的高度，这也就导致了父元素的高度丢失。

父元素高度丢失以后，其下的元素会自动上移，导致页面布局混乱。所以高度塌陷是浮动布局中比较常见的一个问题，这个问题我们必须要进行处理！

## BFC(Block Formatting Context)

块级格式化环境。BFC是一个CSS中的一个隐含属性，可以为一个元素开启BFC，开启后该元素会变成一个独立的布局区域。

元素开启BFC后的特点：

- 不会被浮动元素所覆盖。
- 子元素和父元素外边距不会重叠。
- 可以包含浮动的子元素。

可以通过一些特殊方式来开启元素的BFC：

- 设置元素的浮动（不推荐）。
- 将元素设置为行内块元素（不推荐）。
- 将元素的overflow设置为一个非visible的值（常用方式：为元素设置overflow: hidden 开启其BFC，以使其可以包含浮动元素）。

## clear

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      div {
        font-size: 50px;
      }

      .box1 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
        float: left;
      }

      .box2 {
        width: 400px;
        height: 150px;
        background-color: #ff0;
        float: right;
      }

      .box3 {
        width: 300px;
        height: 300px;
        background-color: orange;
        /* clear: both; */
      }
    </style>
  </head>
  <body>
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
  </body>
</html>
```

从上面的例子中可以看到，由于box1的浮动，导致box3的位置上移了，也就是box3受到了浮动的影响，位置发生了改变。但有时，我们并不希望某个元素因为其它元素浮动的影响而改变位置。这时，我们就可以通过 clear 属性来清楚浮动元素对当前元素所产生的影响，可选值有：

- left 清楚左侧浮动元素对当前元素的影响
- right 清楚右侧浮动元素对当前元素的影响
- both 清楚两侧中最大影响的那侧

原理：设置清楚浮动以后，浏览器会自动为元素添加一个上外边距，以使其位置不受其它元素的影响。

## 高度塌陷的最终解决方案

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .box1 {
        border: 10px red solid;

        /* overflow: hidden; */
      }

      .box2 {
        width: 100px;
        height: 100px;
        background-color: #bfa;
        float: left;
      }

      .box3 {
        width: 200px;
        height: 200px;
        background-color: aqua;
        clear: both;
      }

      .box1::after {
        content: '';
        display: block;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      box1
      <div class="box2">box2</div>
      <div class="box3">box3</div>
    </div>
  </body>
</html>
```

## clearfix

这个样式可以同时解决高度塌陷和外边距重叠的问题，当你在遇到这些问题时，直接使用clearfix这个类即可。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box1{
            width: 200px;
            height: 200px;
            background-color: #bfa;
        }

        /* .box1::before{
            content: '';
            display: table;
        } */

        .box2{
            width: 100px;
            height: 100px;
            background-color: orange;
            margin-top: 100px;
        }

        .clearfix::before,
        .clearfix::after{
            content: '';
            display: table;
            clear: both;
        }
    </style>
</head>
<body>

    <div class="box1 clearfix">
        <div class="box2"></div>
    </div>
    
</body>
</html>
```

