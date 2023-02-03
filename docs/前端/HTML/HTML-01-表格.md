---
title: HTML-01-表格
date: 2022-02-20 07:11:26
tags:
---

现实中，我们经常需要使用表格来表示一些格式化的数据，比如：课程表、成绩单、......同样的，这些需求在网页中也需要。在网页中，我们通过table标签来创建一个表格；在table中使用tr表示表格中的一行，有几个tr就有几行；在tr中使用td表示一个单元格，有几个td就有几个单元格。其中，可以使用rowspan属性来纵向(向下)的合并单元格，colspan属性横向(向右)合并单元格。

```html
<body>
    <table border="1" width="50%" align="center">
        <tr>
            <td>A1</td>
            <td colspan="2">B1</td>
            <td>C1</td>
            <td>D1</td>
        </tr>
        <tr>
            <td>A2</td>
            <td rowspan="2">B2</td>
            <td>C2</td>
            <td>D2</td>
        </tr>
        <tr>
            <td>A3</td>
            <td>B3</td>
            <td>C3</td>
        </tr>
        <tr>
            <td>A4</td>
            <td>B4</td>
            <td>C4</td>
        </tr>
    </table>
</body>
```

## 长表格

我们可以将一个表格分成三部分：

- 头部 thead
- 主体 tbody
- 底部 tfoot

在头部里面，我们使用th标签表示头部的单元格(而不是td)：

```html
<body>
    <table border="1" width='50%' align="center">
        <thead>
            <tr>
                <th>日期</th>
                <th>收入</th>
                <th>支出</th>
                <th>合计</th>
            </tr>
        </thead>
        
        <tbody>
            <tr>
                <td>2000.1.1</td>
                <td>500</td>
                <td>200</td>
                <td>300</td>
            </tr>
            <tr>
                <td>2000.1.1</td>
                <td>500</td>
                <td>200</td>
                <td>300</td>
            </tr>
            <tr>
                <td>2000.1.1</td>
                <td>500</td>
                <td>200</td>
                <td>300</td>
            </tr>
            <tr>
                <td>2000.1.1</td>
                <td>500</td>
                <td>200</td>
                <td>300</td>
            </tr>
        </tbody>
        
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td>合计</td>
                <td>300</td>
            </tr>
        </tfoot>
    </table>
</body>
```

![image-20220222091308996](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220222091308996.png)

## 表格的样式

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            table{
                width: 50%;
                border: 1px solid black;
                margin: 0 auto;

                /* border-spacing: 指定边框之间的距离 */
                /* border-spacing: 0px; */

                /* border-collapse: collapse; 设置边框的合并 */
                border-collapse: collapse;
            }

            td{
                border: 1px solid black;
                height: 100px;
                /* 默认情况下元素在td中是垂直居中的 可以通过 vertical-align 来修改*/
                vertical-align:middle;
                text-align: center; 
            }

            /* 
            如果表格中没有使用tbody而是直接使用tr，
            那么浏览器会自动创建一个tbody，并且将tr全都放到tbody中
            tr不是table的子元素
            */
            tbody > tr:nth-child(odd){
                background-color: #bfa;
            }

            .box1{
                width: 300px;
                height: 300px;
                background-color: orange;

                /* 将元素设置为单元格 td  */
                display: table-cell;
                vertical-align: middle;

            }

            .box2{
                width: 100px;
                height: 100px;
                background-color: yellow;
                margin: 0 auto;

            }
        </style>
    </head>

    <body>

        <div class="box1">
            <div class="box2"></div>
        </div>
        <table>
            <tr>
                <td>学号</td>
                <td>姓名</td>
                <td>性别</td>
                <td>年龄</td>
                <td>地址</td>
            </tr>
            <tr>
                <td>1</td>
                <td>孙悟空</td>
                <td>男</td>
                <td>18</td>
                <td>花果山</td>
            </tr>
            <tr>
                <td>2</td>
                <td>猪八戒</td>
                <td>男</td>
                <td>28</td>
                <td>高老庄</td>
            </tr>
            <tr>
                <td>3</td>
                <td>沙和尚</td>
                <td>男</td>
                <td>38</td>
                <td>流沙河</td>
            </tr>
            <tr>
                <td>4</td>
                <td>唐僧</td>
                <td>男</td>
                <td>16</td>
                <td>女儿国</td>
            </tr>
            <tr>
                <td>1</td>
                <td>孙悟空</td>
                <td>男</td>
                <td>18</td>
                <td>花果山</td>
            </tr>
            <tr>
                <td>2</td>
                <td>猪八戒</td>
                <td>男</td>
                <td>28</td>
                <td>高老庄</td>
            </tr>
            <tr>
                <td>3</td>
                <td>沙和尚</td>
                <td>男</td>
                <td>38</td>
                <td>流沙河</td>
            </tr>
            <tr>
                <td>4</td>
                <td>唐僧</td>
                <td>男</td>
                <td>16</td>
                <td>女儿国</td>
            </tr>
            <tr>
                <td>1</td>
                <td>孙悟空</td>
                <td>男</td>
                <td>18</td>
                <td>花果山</td>
            </tr>
            <tr>
                <td>2</td>
                <td>猪八戒</td>
                <td>男</td>
                <td>28</td>
                <td>高老庄</td>
            </tr>
            <tr>
                <td>3</td>
                <td>沙和尚</td>
                <td>男</td>
                <td>38</td>
                <td>流沙河</td>
            </tr>
            <tr>
                <td>4</td>
                <td>唐僧</td>
                <td>男</td>
                <td>16</td>
                <td>女儿国</td>
            </tr>
        </table>
    </body>

</html>
```

## 表单

在现实生活中，表单用于提交数据。网页中的表单用于将本地的数据提交到远程服务器，我们使用form标签来创建一个表单。

#### action

表单要提交的服务器的地址

#### 文本框(text)

数据要提交到服务器中，必须要为元素指定一个name属性值

#### 密码框(password)

#### 单选按钮(radio)

像这种选择框，必须要指定一个value属性，value属性最终会作为用户填写的值传递给服务器。

#### 多选框(checkbox)

#### 下拉列表(select)

#### 提交按钮(submit)

```html
<body>
    <form action="target.html">
        文本框 <input type="text" name="username">
        <br><br>
        密码框 <input type="password" name="password">
        <br><br>
        单选按钮 <input type="radio" name="hello" value="a">
        <input type="radio" name="hello" value="b" checked>
        <br><br>
        多选框 <input type="checkbox" name="test" value="1">
        <input type="checkbox" name="test" value="2">
        <input type="checkbox" name="test" value="3" checked>
        <br><br>
        <select name="haha">
            <option value="i">选项一</option>
            <option selected value="ii">选项二</option>
            <option value="iii">选项三</option>
        </select>
        <br><br>
        <input type="submit" value="注册">
    </form>
</body>
```

#### readonly 将表单项设置为只读，数据不会提交

#### disabled 将表单项设置为禁用，数据不会提交

#### autofocus 设置表单项自动获取焦点

![image-20220222093840570](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220222093840570.png)

#### autocomplete = "off" 关闭自动补全

![image-20220222093923816](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20220222093923816.png)

没有关闭自动补全，浏览器会自动列出曾经输入的相关数据。

```html
<body>
    <form action="target.html">
        <input type="text" name="username" value="hello" readonly />
        <br /><br />
        <input type="text" name="username" autofocus />
        <br /><br />
        <input type="text" name="b" />
        <br /><br />
        <input type="submit" />
        <!-- 重置按钮 -->
        <input type="reset" />
        <!-- 普通的按钮 -->
        <input type="button" value="按钮" />
        <br /><br />
        <button type="submit">提交</button>
        <button type="reset">重置</button>
        <button type="button">按钮</button>
    </form>
</body>
```

