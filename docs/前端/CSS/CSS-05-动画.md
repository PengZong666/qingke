---
title: CSS-05-动画
date: 2022-02-22 09:44:22
tags:
---

## 1、过渡(transition)

通过过渡可以指定一个属性发生变化时的切换方式。

- transition-property 指定要执行过渡的属性

  多个属性间使用 , 隔开，如果所有属性都需要过渡，则使用all关键字。大部分属性都支持过渡效果，注意过渡时必须是从一个有效数值向另外一个有效数值进行过渡。

- transition-duration 指定过渡效果的持续时间

- transition-timing-function 过渡的时序函数，指定过渡的执行的方式，可选值有：

  - ease 默认，慢速开始，先加速，再减速
  - linear 匀速
  - ease-in 加速
  - ease-out 减速
  - ease-in-out 先加速，后减速
  - cubic-bezier() 指定时序函数(https://cubic-bezier.com)
  - steps() 分步执行过渡效果，可以设置一个第二个值
    - end 在时间结束时执行过渡(默认值)
    - start 在时间开始时执行过渡
  
- transition-delay 过渡效果的延迟，等待一段时间后再执行过渡

**transition** 可以同时设置过渡相关的所有属性，只有一个要求，如果要写延迟，则两个时间中第一个是持续时间，第二个是延迟时间。

##  2、动画

动画和过渡类似，都是可以实现一些动态的效果，与过渡需要在某个属性发生变化时才会触发不同的是，动画可以自动触发动态效果。要设置动画效果，必须先要设置一个关键帧，关键帧设置了动画执行的每一个步骤。

```css
@keyframes test {
    /* from表示动画的开始位置 也可以使用 0% */
    from{
        margin-left: 0;
        background-color: orange;
    } 

    /* to动画的结束位置 也可以使用100%*/
    to{
        background-color: red;
        margin-left: 700px;
    }
}
```

设置标签的动画的属性有：

- animation-name 要对当前元素生效的关键帧的名字(eg：animation-name: test)
- animation-duration 动画的执行时间
- animation-delay 动画的延时
- animation-iteration-count 动画执行的次数，可选值有：
  - 一个整数表示次数
  - infinite 无限执行
- animation-direction 指定动画运行的方向，可选值有：
  - normal 默认值 从from向to运行，每次都是这样
  - reverse 从to向from运行，每次都是这样
  - alternate 从from向to运行，重复执行动画时反向执行
  - alternate-reverse 从to向from运行，重复执行动画时反向执行
- animation-play-state 设置动画的执行状态，可选值有：
  - running 默认值，动画执行
  - paused 动画暂停
- animation-fill-mode 动画的填充模式，可选值有：
  - none 默认值，动画执行完毕元素回到原来位置
  - forwards 动画执行完毕元素会停止在动画结束的位置
  - backwards 动画延时等待时，元素就会处于开始位置
  - both 结合了forwards 和backwards

## 3、变形

变形就是指通过CSS来改变元素的形状或位置，变形不会影响到页面的布局。

- transform 用来设置元素的变形效果。eg：平移

  - translateX() 沿着x轴方向平移

  - translateY() 沿着y轴方向平移

  - translateZ() 沿着z轴方向平移

    注意，平移元素，百分比是相对于自身计算的。

## 4、z轴平移

调整元素在z轴的位置，正常情况就是调整元素和人眼之间的距离。距离越大，元素离人越近。

z轴平移属于立体效果(近大远小)，默认情况下网页是不支持透视，如果需要看见效果，必须要设置网页的视距。

```css
html {
    /* 设置当前网页的视距为800px，人眼距离网页的距离 */
    perspective: 800px;
}
```

## 5、旋转

通过旋转可以使元素沿着x、y或z轴旋转指定的角度。

- rotateX()
- rotateY()
- rotateZ()

## 6、缩放

- scaleX()
- scaleY()
- scale() 双方向的缩放

> 变形的原点，默认是center，可以通过transform-origin来改变，eg：*transform-origin:20px 20px;*
