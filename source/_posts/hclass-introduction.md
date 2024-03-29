---
title: Hclass 的前世今生
categories: [项目]
author: tengkong
date: 2024-02-09 00:11:00
updated: 2024-02-09 13:25:42
---

## 写在前面

### 它有没有前身？
那它必然是有的啊，刚刚开始写的时候，它叫做ClassHelper，可以说是非常简陋了，连**能用**的程度都达不到。

### 从什么时候开始正式开发的？
这个小东西的开发是从**2022年03月17日**开始的，那时候发布了第一个测试版`Betav20220317a`，那时候只有四个有用的功能，随机数生成，北京时间显示，中考倒计时之类的。**致于为什么是这个时候**，因为那个时候~~在上网课~~。
(小声：直到今天，Hclass**随机叫人**这个工具的代码还是两年前第一个测试版的代码)

### 为什么叫作 Hclass 呢？
今天在这里可以把这个命名问题说明咯， Hclass 其实全称叫做 **HFENG Class toolbox**，其中的 HFENG 是来自于我初中的数学老师，他人很有意思，我们也都非常喜欢他，他的名字是海锋，这就很好理解了吧，我们当时也有一个小团队，搞搞黑板报之类的东西，那时候我开始写 Hclass 的，所以就用了 **Haifeng** 简易版：HFENG 来命名了，直到今天，简化为了 Hclass。而且 H 也可以取义**更高更快乐**，这也是我的初衷所在。

正如我**两年前**在 Hclass 的关于中写的：
> Hclass是一个大屏教学辅助软件，本意仅为方便课堂教学和使教学更丰富多彩。

时隔两年，我想这个想法至今未曾改变。

## Hclass 的工具们

### 随机叫人

> 这是一个随机数生成器，您可以通过这个方式随机抽取学生的学号来回答问题

它是 Hclass 全系工具里最古老的工具了，其实也只是来源于上课时候的一句调侃，老师说：“**我随机叫人来回答问题**” 这时候就会有人说：“**哪里是随机？明明是随你。**”于是这个工具就诞生了。

### 投票系统

> 这是一个简单的投票系统，您可以使用它来替代在黑板上画正字

这个东西可以说是我当时觉得写过的最~~有技术含量~~的东西了，那时候老师们都会在黑板上画正字来投票，但是这样计数又不方便，写起来又慢，灰尘又大，于是就写了这么一个东西给它代替掉了。
当时我自己研究了一个进度条，虽然现在知道有更好的解决办法了，但是想来还是很开心的。

```javascript
if(tiaoLength <= basketLength) {
    document.getElementById("tiao").style.width = tiaoLength + "px";
    tiaoLength = tiaoLength + 1;
    // console.log("条长：" + tiaoLength);console.log("框长：" + basketLength);
}
```

{% link https://hclass.thisis.host/toupiao.html Hclass投票系统  %}

### 展示屏幕

>这是一个展示界面，您可以在班会课或上课时使用它来代替PPT

灵感来源于极域电子教室的那个**保持安静**功能，我觉得不只能显示这四个字（

### 一九班历

>这是一个为班级开发的有许多有用功能和摸鱼功能的时钟和日历工具

这个东西在发布的时候已经是**2023年01月01日**了。这个时候我的技术相较于之前已经有很大进步了，尤其是学会了**flex**布局和新的相对单位**vh、vw**之类的，让他最后出出来的效果也不算差。在开发这个比较大的东西的时候，我也面临着许多的问题，更学会了许多东西。**在实践中不断进步！**

## 日志里的小趣味

在**2022年12月10日**的时候，v1.2

>由于不明原因，高考倒计时程序在学校白板上运行时间超过一定时间（挺短的时间）会导致崩溃，程序无响应，在家里测试则没有这种情况，正在努力修复，请大家暂停使用（虽然没人用）

后来我发现，其实只是我不断让总功能函数自己调用自己。于是我把它独立了出来

```javascript
function stTime(grade){
    var intervals = setInterval(function(){show(grade)}, 1000);
}
```

而这一天已经是**2023年6月22日**。`v1.3.3`

>1、修复了上面提到过的高考倒计时卡电脑的bug

一个小bug，修复了六个月（

## 未来的展望？

1. 统一Hclass全系工具的设计风格：
	1. 大按钮，大显示，方便的大屏操作
	2. 下半部分是给老师点的，上半部分是给学生看的。
	3. 降低操作门槛
2. 这样的设计理念已经在Hclass大部分工具上采用了，只是他们很不统一，看起来不是一个时代的产物。你会发现，Hclass大部分的**设置**按钮都是在页面的**中部**或者**下部**（除了投票系统那个玩意儿），大家都能很轻松的点到，主题色 #FF5050 的**大按钮**贯穿了全系工具，在新加入的**孟德尔豌豆实验**工具中，这样的设计理念更为透彻，摆在页面上直接点，其他交给程序来，降低操作门槛，提升大屏使用体验。