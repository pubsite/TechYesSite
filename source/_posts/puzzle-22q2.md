---
title: 野生技协22Q2解密
categories: [日常]
date: 2022-03-17 20:39:00
updated: 2022-04-01 19:45:00
---

从考试时钟exam.cooo.site出发，在每个页面内寻找前往下一站的网址，根据userid生成的appkey，在给定页面提交最终的flag（基本不需要网安知识）。

预计用时：3 ~ 30min
活动时间：2022年3月17日19:45~4月1日19:45
复盘讲解：2022年4月1日19:45（内容简单，可以对比看看自己是否用了更高级的思路）

[野生技协22Q2解密复盘 - 哔哩哔哩](https://www.bilibili.com/video/BV1bT4y1U7gH/)

{% video bilibili:BV1bT4y1U7gH %}

{% folding 野生技协22Q2解密活动复盘 %}

0x00 exam.cooo.site 右下角提示“22q2.这是.主机”

0x01 22q2.thisis.host 按照提示操作，拿到搜索引擎查询字符串，打开第一个搜索结果

0x02 exam.thisis.host 右下角提示“事不过三”，点击三次“考试时钟按钮”，进入解密页面

0x03 exam.cooo.site/?type=sp-22q2 显示“科目3”，进入调试模式查找前两个科目

发现appkey入口(22q2.thisis.host/whatsyourname)和flag入口(22q2.thisis.host/heresurflag)

0x04 22q2.thisis.host/whatsyourname 页面显示Base64编码，解密内容为“./generate.html”，打开

0x05 22q2.thisis.host/whatsyourname/generate.html 自己起一个userid(不支持中文)，拿到appkey

0x06 22q2.thisis.host/heresurflag 按提示输入appkey，解答网页提出的数学计算题，拿到flag

注：由于调整电脑时间后无法访问https页面，所以另辟他径进入“去年愚人节这天的考试时钟”

0x07 exam.cooo.site/?type=2021-04-01 进入后点击“提交flag”，提交flag即完成22Q2解密活动

{% endfolding %}

> 注意：此处的链接信息已经过期，相关页面可以去 https://demo.zhilu.cyou/22q2/ 查看。
