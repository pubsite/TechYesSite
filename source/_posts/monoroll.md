---
title: 一卷图库使用手册
categories: [项目]
author: zhilu
date: 2023-01-20
permalink: monoroll/
---

> 这是一卷图库的开发者文档/教程。一卷图库内的图片均采用[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)</a>许可进行授权。

<script src="./load.js" onload="console.log(MG)"></script>

<pre id="MGInfo"></pre>
<script>document.getElementById("MGInfo").textContent = `name: ${MG.name}\ndescription: ${MG.description}\nlicense: ${MG.license}`</script>

投稿QQ: 2399052066 (纸鹿)
[在线预览(由Imgtg托管)](https://img.tg/album/54wL)

## 引入

在HTML中插入如下代码,随后便可以执行图库相关功能。
```html
<script src="https://thisis.host/monoroll/load.js" onload="//你的功能"></script>
```
将需要执行的函数声明在`MGLoad()`中。

## 绑定要应用背景的元素
```js
MG.bgBind(ele)
```
`ele`为DOM元素，如`document.documentElement、document.getElementById("main")`等。
绑定要应用背景的元素时，会自动给该元素设置背景居中、背景自适应缩放属性，如果不需要，请传入一个非真的值作为第二个参数，例如：`MG.bgBind(ele, false)`。

## 绑定要输出图片信息的元素
```js
MG.infoBind(ele)
```
`ele`为DOM元素，如`document.getElementById("bgInfo")`等。被绑定的元素用于输出图片信息。

## 设置背景的几种方式
绑定应用背景的元素、要输出图片信息的元素后，就可以设置背景了。

### 根据索引位置（数组下标）设置
```js
MG.setBg(index)
```
特别地，`index`为负时，索引会从末端倒数。

### 随机设置
```js
MG.setRandBg()
```
函数的唯一参数`alpha`默认为1，表示随机是均匀的。它应该是大于零的实数，推荐范围在0.1 ~ 2，值越小则越倾向于较小的索引（老图），反之则越倾向于较大的索引（新图）。

### 通过图片唯一标识符（图片ID）设置
```js
MG.setBgByPicId(yyMMNN)
```
参数`yyMMNN`是格式为yyMMNN的图片唯一标识符（图片ID），其中yy为两位数的年份，MM为两位数的月份，NN为月份内图片索引。例如，`211101`指2021年11月的第1张图片。

### 通过图片期数设置
```js
MG.setBgByIssue(yyMM)
```
参数`yyMM`是格式为yyMM的图片期数（即图片ID前四位，格式参见上一项），这样会随机设置此期内的一张图片作为背景。

## 技术细节

<pre id="MGTechDetails"><a onclick="this.parentElement.textContent=`\/\/ 压缩的gallery.json源文件索引0样例\n${JSON.stringify(Object.values(MG.pic[0]))}\n\/\/ load.js引入后MG.pic[0]样例\n${JSON.stringify(MG.pic[0])}`">点击加载样例</a></pre>
