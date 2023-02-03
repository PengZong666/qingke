---
title: meta标签
date: 2021-12-20 11:11:52
tags:
---

我们只需要在我们的[第一个网页](https://atqingke.com/index.php/archives/122/)的基础上加一点东西，它就变成了我们的标准的HTML5网页：

```html
<!-- 文档声明，声明当前网页的版本 -->
<!DOCTYPE html>

<!-- html的根标签（元素），网页中的所有内容都要写在根元素里面 -->
<html>
    <!-- head是网页的头部，head中的内容不会在网页中直接出现，主要用来帮助浏览器或搜索引擎来解析网页 -->
    <head>
        <!-- meta标签用来设置网页的元数据，这里meta用来设置网页的字符集，避免乱码问题 -->
        <meta charset="utf-8">
        
        <!-- title中的内容会显示在浏览器的标题栏，搜索引擎会主要根据title中的内容来判断网页的主要内容 -->
        <title>网页的标题</title>
    </head>
    
    <!-- body是html的子元素，表示网页的主题，网页中所有的课件内容都应该写在body里面 -->
    <body>
        <!-- 网页的一级标题 -->
        <h1>网页的大标题</h1>
    </body>
</html>
```

在这里，我们详细解释一下这个meta标签。从它的文档解释中我们可以看到：这是一个用来表示元数据的标签。

![image-20211220144716530](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211220144716530.png)

那么，什么是元数据呢？在[百度百科](https://baike.baidu.com/item/%E5%85%83%E6%95%B0%E6%8D%AE/1946090?fr=aladdin)上给出的解释是“元数据是关于数据的[组织](https://baike.baidu.com/item/组织/10200)、数据域及其关系的[信息](https://baike.baidu.com/item/信息/111163)，简言之，元数据就是关于数据的[数据](https://baike.baidu.com/item/数据)”。这样说，可能不太好理解，举个栗子：

![image-20211220145548852](https://gitee.com/pengzong888/imageSource/raw/master/img/2022/2/image-20211220145548852.png)

这是电脑上一个很普通的txt文件，我们可以看到这里有banner.txt的文件类型、打开方式、位置、大小...等等信息。而元数据指的就是方框中所圈出来的数据，因为它们是用来描述具体数据的。类似的，还有我们在淘宝上购买电脑的时候，可以查看它的内存大小、显存、硬盘等等，而这些就是元数据，用来描述电脑具体信息的数据。

回到我们的meta标签，它主要用于设置网页中的一些元数据，而这些元数据并不是给用户看的。在上面的标准网页中，我们看到有“\<meta charset="utf-8">”，我们用charset来指定网页的字符集为utf-8。

我们还可以在meta标签里面用name指定数据的名称，用content指定数据的内容。

- author

  ```html
  <meta name="author" content="pengbin">
  ```

  给出页面作者的姓名。

- keywords

  ```html
  <meta name="keywords" content="HTML5,前端,CSS3">
  ```

  表示网站的关键字，可以同时指定多个关键字，关键字之间用 , 隔开。

- description

  ```html
  <meta name="description" content="pengbin的网站">
  ```

  description用于指定网站的描述，网站的描述会显示在搜索引擎的搜索结果中。

