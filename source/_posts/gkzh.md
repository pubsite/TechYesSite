---
title: 2022高考理化生各科成绩计算器
categories: [项目]
date: 2022-06-24
updated: 2022-06-24
permalink: gkzh/
---

> 仅适用于2022年陕西理科高考，请仔细核对信息。
>
> 我们不会存储任何个人信息，如有需要请联系QQ:2399052066(纸鹿)。

请先到[陕西招生考试信息网](http://sneac.com/ksfw/lqcx.htm)查询你的高考各科各题得分，然后填写以下信息：
<!-- <select id="subjectType" onchange="setType(+this.value)" style="font-size:1em">
  <option value="0">文科</option>
  <option value="1">理科</option>
</select> -->

### 选择题答案序列

请在下面的文本框中输入你的选择题答案序列，使用英文逗号分隔各选项，例如：A,B,C,D,A,B,C,D,A,B,C,D。
<p contenteditable id="str1" style="padding:.5em;border:1px solid #3af;border-radius:.5em"></p>

### 非选择题得分序列

请在下面的文本框中输入你的非选择题得分序列，使用英文逗号分隔各题得分，例如：10.0,9.0,8.0,7.0,6.0,5.0。
<p contenteditable id="str2" style="padding:.5em;border:1px solid #3af;border-radius:.5em"></p>

### 计算结果

[<i class="fa-solid fa-calculator"></i>点击计算各科得分](javascript:resolve();)

<strong id="result"></strong>

<!-- ### 相关信息

<p class="dim" id="typeInfo"></p> -->

<script src="/static/gkzh-calc.js"></script>