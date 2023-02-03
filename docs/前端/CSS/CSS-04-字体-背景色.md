---
title: CSS-04-字体&背景色
date: 2022-02-20 07:10:57
tags:
---

## 字体

- color 设置字体颜色

- font-size 字体的大小

  和font-size相关的单位有：em(相当于当前元素的一个font-size)、rem(相当于根元素的一个font-size)。

- font-family 字体族（字体的格式），可选值有：

  - serif 衬线字体
  - sans-serif 非衬线字体
  - monospace 等宽字体

  指定字体的类别，浏览器会自动使用该类别下的字体。font-family可以同时指定多个字体，多个字体间使用 , 隔开，字体生效时优先使用第一个，第一个无法使用则使用第二个，以此类推。

- font-face 可以将服务器中的字体直接提供给用户去使用，但是存在一些问题，比如：加载速度、版权、字体格式等。

```css
@font-face {
    /* 指定字体的名字，要使用时填写这个名字 */
	font-family: 'myfont';
    /* 服务器中字体的路径 */
    src: url('./font/ZCOOLKuaiLe-Regular.ttf').format("truetype");
}
```

## 图标字体(iconfont)

在网页中，我们经常需要使用一些图标，这些图标可以通过图片来引入，但是图片本身比较大，并且非常不灵活。所以在使用图标时，我们还可以将图标直接设置为字体，然后通过font-face的形式来对字体进行引入，这样我们就可以通过使用字体的形式来使用图标。

#### fontawesome 使用步骤

1. 下载 https://fontawesome.com/
2. 解压
3. 将css和webfonts移动到项目中
4. 将all.css引入到网页中
5. 使用图标字体，直接通过类名使用图标字体，比如：class="fas fa-bell"

#### 通过伪元素嘞设置图标字体

1. 找到要设置图标的元素通过before或after选中
2. 在content中设置字体的编码
3. 设置字体的样式

```css
li::before {
    content: '/f1b0';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: blue;
    margin-right: 10px;
}
```

#### 通过实体嘞使用图标字体

```html
<span class="fas">&#xf0f3;</span>
```

## 阿里的字体库



## 行高(line height)

行高指的是文字占有的实际高度，可以通过 line-height 来设置行高。它可以直接指定一个大小(px em)，也可以直接为行高设置一个整数(行高将会是字体的指定的倍数)。

行高经常还用来设置文字的行间距，行间距 = 行高 - 字体大小。

可以将行高设置为和高度一样的值，使单行文字在一个元素中垂直居中。

#### 字体框

就是字体存在的格子，设置font-size实际上就是在设置字体框的高度，而行高会在字体框的上下平均分配。

## 字体的简写属性(font)

语法：字体大小/行高 字体族

```css
div {
    /* font: 50px/2  微软雅黑, 'Times New Roman', Times, serif; */
    font: bold italic 50px/2 微软雅黑, 'Times New Roman', Times, serif;
}
```

行高可以省略不写，有默认值。

font-weight 字重 字体的加粗，可选值有：

- normal 默认值，不加粗
- bold 加粗
- 100-900 九个级别(没什么用)

font-style 字体的风格

- normal 正常的
- italic 斜体

## 文本的样式

text-align 文本的水平对齐

- left
- right
- center
- justify 两端对齐

vertical-align 设置元素垂直对齐的方式

- baseline 默认，基线对齐
- top 顶部对齐
- bottom 底部对齐
- middle 居中对齐

text-decoration 设置文本修饰

- none 
- underline 下划线
- line-through 删除线
- overline 上划线

white-space 设置网页如何处理空白

- normal 正常
- nowrap 不换行
- pre 保留空白

## 背景

background-color 设置背景颜色

background-image 设置背景图片

- 可以同时设置背景图片和颜色，这样背景颜色将会成为图片的背景色
- 如果背景的图片小于元素，则背景图片会自动在元素中平铺，将元素铺满
- 如果背景的图片大于元素，将有一部分背景无法完全显示
- 如果背景图片和元素一样大，则会直接正常显示

background-repeat 设置背景的重复方式

- repeat 默认值，背景会沿着x轴、y轴双方向重复
- repeat-x 沿着x轴方向重复
- repeat-y
- no-repeat

background-position 设置背景图片的位置

- 通过top、left、right、bottom、center几个表示方位的词来设置背景图片的位置，使用方位词时必须要同时指定两个值，如果只写一个则第二个默认就是center。
- 通过偏移量来指定背景图片的位置：水平方向的偏移量 垂直方向偏移量。

background-clip 设置背景范围

- border-box 默认，背景会出现在边框的下边
- padding-box 背景不会出现在边框，只出现在内容区和内边距
- content-box 背景只会出现在内容区

background-origin 背景图片的偏移量计算的原点

- padding-box 默认，background-position从内边距处开始计算
- content-box 
- border-box 

background-size 设置背景图片大小

- 第一个值表示宽度

- 第二个值表示高度

  只写一个，默认第二个是auto

- cover 图片的比例不变，将元素铺满

- contain 图片比例不变，将图片在元素中完整显示

background-attachment 设置背景图片是否跟随元素移动

- scroll 默认，移动
- fixed 背景固定

background 背景相关的简写属性，所有背景相关的样式都可以通过该样式来设置，并且没有顺序要求，也没有哪个属性是必须写的。只是要注意：

- background-size必须写在background-position的后边，并且使用 / 隔开

  background-position/background-size

- background-origin、background-clip两个样式，origin要在clip前边

## 渐变

通过渐变可以设置一些复杂的背景颜色，可以实现从一个颜色向其它颜色的过渡效果。

> 渐变是图片，需要通过background-image来设置

linear-gradient() 线性渐变，颜色沿着一条直线发生变化

```css
/* 红色开头在左边，黄色结尾在右边，to right指明的方向向右 */
linear-gradient(to right, red, yellow);
```

除了to right，还有to left、to bottom、to top、deg(表示度数)、turn(表示圈)。渐变可以同时指定多个颜色，多个颜色默认情况平均分配，也可以手动指定渐变的分布情况。

> repeating-linear-gradient() 可以平铺的线性渐变
>
> ```css
> background-image: repeating-linear-gradient(to right ,red, yellow 50px);
> ```

## 径向渐变

radial-gradient() 径向渐变(放射性的效果)

默认情况下径向渐变的形状根据元素的形状来计算，比如：正方形 ---> 圆形， 长方形 ---> 椭圆形。我们也可以手动指定径向渐变的大小：circle、ellipse。

还可以指定渐变的位置：radial-gradient(大小 at 位置, 颜色 位置, 颜色 位置, 颜色 位置)

大小：

- circle 圆形
- ellipse 椭圆形
- closest-side 近边
- closest-corner 近角
- farthest-side 远边
- farthest-corner 远角

位置

- top right left center bottom

```css
background-image: radial-gradient(farthest-corner at 100px 100px, red , #bfa)
```

