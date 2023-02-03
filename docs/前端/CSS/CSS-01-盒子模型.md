---
title: CSS-01-盒子模型
date: 2022-02-19 18:47:26
tags:
---

## 文档流

网页是一个多层的结构，一层摞着一层。我们通过CSS可以分别为每一层来设置样式，而作为用户来讲他们只能看到最顶上的一层。在所有这些层中，最底下的一层称为“**文档流**”。文档流是网页的基础，我们所创建的元素默认都是在文档流中进行排列。对于我们来讲，元素主要有两个状态：在文档流中和不在文档流中(脱离文档流)。

### 元素在文档流中特点

- 块元素
  - 块元素会在页面中独占一行（自上而下垂直排列）。
  - 默认宽度是父元素的全部（会把父元素撑满）。
  - 默认高度是被内容撑开（子元素）。
- 行内元素
  - 行内元素不会独占页面的一行，只占自身的大小。
  - 行内元素在页面中自左向右水平排列，如果一行之中不能容纳下所有的行内元素，则元素会换到第二行继续自左向右排列（与书写习惯一致）。
  - 行内元素的默认宽度和高度都是被内容撑开。

## 盒模型(box model)

盒模型，也叫盒子模型、框模型。CSS将页面中的所有元素都设置为了一个矩形的盒子，从而将我们对页面的布局变成了将不同的盒子摆放到不同的位置。每一个盒子都由以下几部分组成：

- 内容区(content)

- 外边距(padding)

- 边框(border)

- 内边距(margin)

  ![image-20220220052638085](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220220052638085.png)

## 内容区(content)

元素中的所有的子元素和文本内容都在内容区中排列，内容区的大小由 width 和 height 两个属性来设置。其中，width设置内容区的宽度；height设置内容区的高度。

## 边框(border)

边框属于盒子边缘，边框里面属于盒子内容，出了边框都是盒子的外部，而边框的大小会影响到整个盒子的大小。

如果要设置边框，至少需要设置三个样式：

- 边框的宽度 border-width
- 边框的颜色 border-color
- 边框的样式 border-style

### border-width

默认值：一般都是3个像素。

通过四个值来指定四个方向的边框的宽度，这四个值的指定有四种情况：

- 四个值：上 右 下 左
- 三个值：上 左右 下
- 两个值：上下 左右
- 一个值：上下左右

eg：

```css
/* 代码仅作实例使用 */
.box1 {
    /* 说明边框的上边宽度是10px、右边宽度是20px、下边宽度是30px、左边宽度是40px，下面以此类推 */
	border: 10px 20px 30px 40px;
    border: 10px 20px 30px;
    border: 10px 20px;
    border: 10px;
}
```

除了用border-width，还可以使用border-xxx-width来单独指定一个边的宽度，xxx可以是top、right、bottom、left。

eg：

```css
.box1 {
    border-top-width: 10px;
    border-right-width: 20px;
    border-bottom-width: 30px;
    border-left-width: 40px;
}
```

### border-color

默认使用color的颜色值。同border-color一样可以分别指定四个边，也可以使用border-xxx-color。

eg

```css
/* 没写border-color，就和color的颜色一样，color默认是黑色 */
.box1 {
    color: red;
    border: 10px;
    border-style: solid
}
```

### border-style

默认值none，表示没有边框。

- solid 表示实线
- dotted 点状虚线
- dashed 虚线
- double 双线

同样的也可以分别指定四个边，和使用border-xxx-style。

> 虽然我们之前说要使用边框，至少需要设置三个样式，但实际上这三个样式都有默认值，因此也可以省略不写。但不写默认的border-style是none，也就是没有边框。也就是说，我们可以省略width和color，但不能省略style。

### border

边框的简写属性，通过该属性可以同时设置边框所有的相关样式，并且没有顺序要求。

eg：

```css
.box1 {
	border: 10px solid red;
}
```

同样的，它也有border-xxx。

## 内边距(padding)

内边距就是内容区和边框之间的距离。一共有四个方向的内边距：

- padding-top
- padding-right
- padding-bottom
- padding-left

内边距的设置会影响到盒子的大小，背景颜色也会延伸到内边距上。

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
        width: 200px;
        height: 200px;
        background-color: #bfa;
        border: 10px orange solid;
        /* 内边距的简写属性padding，规则同border-width */
        padding: 10px 20px 30px 40px;
      }

      .inner {
        width: 100%;
        height: 100%;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <div class="inner"></div>
    </div>
  </body>
</html>

```

![image-20220219232031045](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220219232031045.png)

可以看到，一个盒子的可见框的大小，有内容区、内边距和边框共同决定，所以在计算盒子大小时，需要将这三个区域加到一起计算。

## 外边距(margin)

外边距不会影响盒子可见框的大小，但是外边距会影响盒子的位置以及盒子实际占用空间。一共有四个方向的外边距：

- margin-top 上外边距，设置一个正值，元素会向下移动。
- margin-right 默认情况下设置margin-right不会产生任何效果。
- margin-bottom 下外边距，设置一个正值，其下边的元素会向下移动。
- margin-left 左外边距，设置一个正值，元素会向右移动。

元素在页面中是按照自左向右的顺序排列的，所以默认情况下如果我们设置的左和上外边距会移动元素自身，而设置下和右外边距会移动其它元素。

简写属性margin，同时设置四个方向的外边距，用法和padding一样。

## 盒子的水平布局

```css
.inner {
	/* 表示width的值默认是auto */
	width: auto
}
```

元素在其父元素中水平方向的位置由以下几个元素共同决定：

- margin-left
- border-left
- padding-left
- width
- padding-right
- border-right
- margin-right

并且，一个元素在其父元素中，水平布局必须要满足以下等式：

```
margin-left+border-left+padding-left+width+padding-right+border-right+margin-right = 其父元素内容区的宽度 （必须满足）
```

如果相加的结果使等式不成立，则称为过度约束，并且等式会自动调整。调整的情况为：如果这七个值中没有为auto的情况，则浏览器会自动调整margin-right的值以使等式成立。

这七个值中有三个值的和设置为auto：width、margin-left、margin-right。

1. 如果将一个宽度和一个外边距设置为auto，则宽度会调整到最大，设置为auto的外边距会自动为0。
2. 如果将三个值都设置为auto，则外边距都是0，宽度最大。
3. 如果将两个外边距值设置为auto，宽度固定值，则会将外边距设置为相同的值。

所有我们经常利用第三个特点来使一个元素在其父元素中水平居中，eg：

```css
.inner {
	width: 500px;
	margin: 0 auto;
}
```

## 垂直方向的布局

在文档流中介绍了：默认情况下父元素的高度是被内容撑开的。子元素是在父元素的内容区中排列的，如果子元素的大小超过了父元素，则子元素会从父元素中溢出。我们可以使用 overflow 属性来设置父元素如何处理溢出的子元素，可选值有：

- visible 默认值，子元素从父元素中溢出，在父元素外部的位置显示
- hidden 移除内容会被裁剪不显示
- scroll 生成两个滚动条，通过滚动条来查看完整内容
- auto 根据需要生成滚动条

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
        width: 200px;
        height: 200px;
        background-color: #bfa;
        overflow-y: scroll;
      }
    </style>
  </head>
  <body>
    <div class="box1">
      在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。
      这上面的夜的天空，奇怪而高，我生平没有见过这样奇怪而高的天空。他仿佛要离开人间而去，使人们仰面不再看见。然而现在却非常之蓝，闪闪地䀹着几十个星星的眼，冷眼。他的口角上现出微笑，似乎自以为大有深意，而将繁霜洒在我的园里的野花草上。
      我不知道那些花草真叫什么名字，人们叫他们什么名字。我记得有一种开过极细小的粉红花，现在还开着，但是更极细小了，她在冷的夜气中，瑟缩地做梦，梦见春的到来，梦见秋的到来，梦见瘦的诗人将眼泪擦在她最末的花瓣上，告诉她秋虽然来，冬虽然来，而此后接着还是春，蝴蝶乱飞，蜜蜂都唱起春词来了。她于是一笑，虽然颜色冻得红惨惨地，仍然瑟缩着。
      枣树，他们简直落尽了叶子。先前，还有一两个孩子来打他们，别人打剩的枣子，现在是一个也不剩了，连叶子也落尽了。他知道小粉红花的梦，秋后要有春；他也知道落叶的梦，春后还是秋。他简直落尽叶子，单剩干子，然而脱了当初满树是果实和叶子时候的弧形，欠伸得很舒服。但是，有几枝还低亚着，护定他从打枣的竿梢所得的皮伤，而最直最长的几枝，却已默默地铁似的直刺着奇怪而高的天空，使天空闪闪地鬼䀹眼；直刺着天空中圆满的月亮，使月亮窘得发白。
      鬼䀹眼的天空越加非常之蓝，不安了，仿佛想离去人间，避开枣树，只将月亮剩下。然而月亮也暗暗地躲到东边去了。而一无所有的干子，却仍然默默地铁似的直刺着奇怪而高的天空，一意要制他的死命，不管他各式各样地䀹着许多蛊惑的眼睛。
      哇的一声，夜游的恶鸟飞过了。
      我忽而听到夜半的笑声，吃吃地，似乎不愿意惊动睡着的人，然而四围的空气都应和着笑。夜半，没有别的人，我即刻听出这声音就在我嘴里，我也即刻被这笑声所驱逐，回进自己的房。灯火的带子也即刻被我旋高了。
      后窗的玻璃上丁丁地响，还有许多小飞虫乱撞。不多久，几个进来了，许是从窗纸的破孔进来的。他们一进来，又在玻璃的灯罩上撞得丁丁地响。一个从上面撞进去了，他于是遇到火，而且我以为这火是真的。两三个却休息在灯的纸罩上喘气。那罩是昨晚新换的罩，雪白的纸，折出波浪纹的叠痕，一角还画出一枝猩红色的栀子。
      猩红的栀子开花时，枣树又要做小粉红花的梦，青葱地弯成弧形了……我又听到夜半的笑声；我赶紧砍断我的心绪，看那老在白纸罩上的小青虫，头大尾小，向日葵子似的，只有半粒小麦那么大，遍身的颜色苍翠得可爱，可怜。
      我打一个呵欠，点起一支纸烟，喷出烟来，对着灯默默地敬奠这些苍翠精致的英雄们。
      一九二四年九月十五日。
    </div>
  </body>
</html>

```

> 可以使用overflow-x和overflow-y来分别设置横向和纵向的效果。

## 外边距的折叠

相邻的垂直方向的外边距会发生重叠现象，分为兄弟元素和父子元素。

兄弟元素间的相邻外边距会取两者之间的较大值（两者都是正值），特殊情况：

- 如果相邻的外边距一正一负，则取两者的和。
- 如果相邻的外边距都是负值，则取两者中绝对值较大的。

兄弟元素之间的外边距的重叠，对于开发是有利的，所以我们不需要进行处理。

父子元素间的相邻外边距，子元素会传递给父元素（上外边距）。父子外边距的折叠会影响到页面的布局，必须要进行处理。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .box1,
      .box2 {
        width: 200px;
        height: 200px;
        font-size: 10px;
      }
      .box1 {
        background-color: #bfa;

        /* 设置一个下外边距 */
        margin-bottom: 200px;
      }

      .box2 {
        background-color: orange;

        /* 设置一个上外边距 */
        margin-top: 100px;
      }

      .box3 {
        width: 200px;
        height: 200px;
        background-color: #bfa;
      }

      .box4 {
        width: 100px;
        height: 100px;
        background-color: orange;
        margin-top: 100px;
      }
    </style>
  </head>
  <body>
    <div class="box1">box1兄弟元素有一个下外边距200px</div>
    <div class="box2">box2兄弟元素有一个上外边距100px</div>

    <div class="box3">
      box3父元素
      <div class="box4">box4子元素有一个上外边距，自身往上移100px</div>
    </div>
  </body>
</html>

```

## 行内元素的盒模型

行内元素不支持设置宽度和高度，可以设置padding、border、margin，但是垂直方向padding、border、margin不会影响页面的布局。

display 用来设置元素显示的类型，可选值：

- inline 将元素设置为行内元素
- block 将元素设置为块元素
- inline-block 将元素设置为行内块元素（既可以设置宽度和高度又不会独占一行）
- table 将元素设置为一个表格
- none 元素不在页面中显示

visibility 用来设置元素的显示状态，可选值：

- visible 默认值，在页面中正常显示
- hidden 在页面中隐藏不显示，但是依然占据页面的位置

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .s1{
            background-color: yellow;
             margin: 100px;
        }

        .box1{
            width: 200px;
            height: 200px;
            background-color: #bfa;
        }

        a{
            display: block;
            visibility: hidden;
            width: 100px;
            height: 100px;
            background-color: orange;
        }
    </style>
</head>
<body>

    <a href="javascript:;">超链接</a>
    <a href="javascript:;">超链接</a>


    <span class="s1">我是span</span>
    <span class="s1">我是span</span>
    
    <div class="box1"></div>
</body>
</html>
```

![image-20220220001511145](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220220001511145.png)

## 默认样式

通常情况下，浏览器都会为元素设置一些默认样式，但是这些默认的样式会影响到页面的布局，因此编写网页时必须去除浏览器的默认样式（PC端的页面）。

重置样式表就是专门用来对浏览器的样式进行重置的。其中：

- reset.css 是直接去除了浏览器的默认样式
- normalize.css 是对默认样式进行了统一

要是用着两个样式表，在head中使用link标签引入即可，例如使用reset.css：

```html
<link rel="stylesheet" href="./css/reset.css" />
```

reset.css

```css
/* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

## 盒子的尺寸

默认情况下，盒子可见框的大小由内容区、内边距和边框共同决定。而 box-sizing 是用来设置盒子尺寸的计算方式（设置width和height的作用），可选值有：

- content-box 默认值，宽度和高度用来设置内容区的大小。
- border-box 宽度和高度用来设置整个盒子可见框的大小，这时候，width和height指的就是内容区、内边距和边框的总大小。

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
            width: 100px;
            height: 100px;
            background-color: #bfa;
            padding: 10px;
            border: 10px red solid;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
</body>
</html>
```

## 轮廓和圆角

box-shadow 用来设置元素的阴影效果（阴影不会影响页面布局）：

- 第一个值，水平偏移量，设置阴影的水平位置，正值向右移动，负值向左移动。
- 第二个值，垂直偏移量，设置阴影的水平位置，正值向下移动，负值向上移动。
- 第三个值，阴影的模糊半径。
- 第四个值，阴影的颜色。

outline 用来设置元素的轮廓线，用法和border一模一样，和边框不同在于：轮廓不会影响可见框的大小。

border-radius 用来设置圆角，圆角设置的是圆的半径大小。

- border-top-left-radius
- border-top-right-radius
- border-bottom-left-radius
- border-bottom-right-radius

border-radius可以分别指定四个角的圆角：

- 四个值：左上 右上 右下 左下
- 三个值：左上 右上/左下 右下
- 两个值：左上/右下 右上/左下

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
        width: 200px;
        height: 200px;
        background-color: #bfa;
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
      }

      .box1:hover {
        outline: 10px red solid;
      }

      .box2 {
        width: 200px;
        height: 200px;
        background-color: orange;
        /* border-radius: 20px 400px; */

        /* 将元素设置为一个圆形 */
        border-radius: 50%;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>

    <div class="box2"></div>
  </body>
</html>
```

![image-20220220004222713](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220220004222713.png)

