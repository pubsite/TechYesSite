---
title: 考试时钟的升级打怪攻略
categories: [项目]
author: zhilu
date: 2021-10-01
---

> 文中图片较多，建议[查看原文](https://mp.weixin.qq.com/s/5yjgVwLOTYRhmXWOmBalOA)

> 考试时钟是宝鸡中学各年级相互借鉴学习的产物。2021年3月19日，为照顾看不清挂钟的学生，2020级要求在考试时在班级一体机上展示时间。2021年3月23日。2019级年级张主任询问我是否可以为考试制作科目倒计时。历经几天时间，考试时钟在2019级的大型考试上与大家见面了，随后它又经过了几次升级、界面变化，如2021年4月26日使用了卡片排版。2021年6月25日，考试时钟受到2020级几名电教管理员的推荐，开始在2020级大型考试上使用。2021年8月1日，考试时钟被外部机构“借用”一次。2021年9月18日，考试时钟支持手动添加一场科目。在这期间，我学到了许多知识，也十分感谢各位的支持。
>
> 野生技协TECHYES群公告

（感谢田雨杉宝中分杉对本栏目的大力支持。）

我没有JS基础，但我上路了。

{% link https://exam.thisis.host 考试时钟 icon:https://exam.thisis.host/favicon.ico %}

## 01 “沉着冷静 诚信考试”

曾经有学生使用开发者工具修改了这行字。

当我得知这个消息时，很难说清楚是什么滋味。考试时钟剩下的主体部分都是自动更新的，使用一般的方法修改过也能自动恢复。

后来，我禁用了右键和键盘，勉强不让学生调出开发者工具。

```js
oncontextmenu = onkeydown = onselectstart = function () {
    return false;
}
```

## 02 “高一”

文理分科，同时考试，但是生物的考试时间减到了90分钟。原本我是使用两个网页的，但我还想把它们整合在一起。

```
图片：下拉菜单中选择不同年级文/理科的考试
```

对于我一个技术小白来说，需要一定的时间，后来索性高二高三文科理科全部都上了，反正功能写好，添加其他年级类型都是一行代码的事，造好轮子就能好好玩了。

```js
function change(totype) {
    // 切换类型时需要重新初始化的内容
    now = new Date();
    end = 0, progress = 0, order = 0;
    today = fixDigit(now.getMonth() + 1) + "-" + fixDigit(now.getDate());

    type = totype;
    // console.log(type);
    output("type", type);

    // 切换类型的对焦动画
    eleMain.style.filter = "blur(.5em)";
    setTimeout(function () {
        eleMain.style.filter = "blur(0)";
        updateTime();
    }, 500);
}
```

当高一入学时，我去了一趟高一年级部，向他们推荐了这个作品。

他们的反应不很正常。先是问我是不是学生会的，又问我属于哪个社团，最后还问考试时钟的控制中心在哪。

从属？是那只有百来人的学校技术交流群，还是2019级年级直属？都和考试时钟不太相属。

在哪？是我那装有系统的移动硬盘里，或是大洋之外GitHub的机房里？听起来都很不合理。

高一年级主任来了，他问：“考试时为什么要用这个？”

我如实回答：“这是年级之间相互借鉴学习的产物，2020级最先安排考试时屏幕上展示时间，随后……”

说明白了，不就是内卷嘛。
切换到“高一”时，考试时钟上还是那行字，“高一暂未启用考试时钟”。

## 03 “+ 临时”

```
图片：网页操作，临时添加一门考试
```

这个功能的出现，来源于8月份的一个需求。

```yaml
Z: 您好，我这边有人想借用一下您的考试时钟（https://exam.thisis.host）做一个自我测验，想问一下您可以帮忙调试一下吗，或者给我说一下调试的方法，可以吗？谢谢
我: 有无时间数据
Z: 稍等一下，我问问
Z: 物理，12:00~1:00
Z: 您看可以吗？
我: 提前20分钟入场，提前10分钟发答题卡，提前5分钟发卷已经写死到程序里了，不影响吧
Z: 不影响，感谢
我: 多刷新几次就好了
```

调试的路已经被堵得差不多了，不好操作，当然我得亲自在后台添加科目了。

9月份，考试时钟终于支持添加临时科目了。这当然只是在尝试与学习技术而已。

```js
function setTemp(sh, sm, eh, em) {
    sh = prompt("考试开始时间所在的小时", 17);
    sm = prompt("考试开始时间所在的分钟", 0);
    eh = prompt("考试结束时间所在的小时", 18);
    em = prompt("考试结束时间所在的分钟", 0);
    $(prompt("考试科目名称", "临时"),
        today + "T" + fixDigit(sh) + ":" + fixDigit(sm),
        today + "T" + fixDigit(eh) + ":" + fixDigit(em));
    alert("考试科目：" + subject + "\n起止时间："
        + getClock(start) + "~" + getClock(end));
}
```

## 04 “设置”

```
图片：文字缩放设置，文字亮度设置
```

出于美观，时钟没有采用等宽字体，曾经出现过晚上“20:00”卡片膨胀到两行的情况；考试时有人觉得字体白色过于亮眼，有人喊反光看不清时间。最后也是为尝试与学习技术，做出了这个功能。

```html
<div><i class="bi bi-aspect-ratio-fill"></i>缩放
    <div class="selectbar">
        <a onclick="relStyle('fontSize',-0.05,'em',0.75,1.25)">－</a>
        <span id="fontSize">1</span>
        <a onclick="relStyle('fontSize',+0.05,'em',0.75,1.25)">＋</a>
    </div>
</div>
<p class="dim">非必要情况请勿修改缩放</p>
<div><i class="bi bi-circle-half"></i>对比度
    <div class="selectbar">
        <a onclick="relStyle('opacity',-0.05,'',0.5,1)">－</a>
        <span id="opacity">0.75</span>
        <a onclick="relStyle('opacity',+0.05,'',0.5,1)">＋</a>
    </div>
</div>
<p class="dim">减少光干扰，视环境光设置</p>
```
你没有看错，一个function可以同时改变两种样式。

```js
function relStyle(prop, delta, unit, minVal, maxVal) {
    propVal = Number(eleMain.style[prop].replace(unit, "")) + delta;
    propVal = Math.max(propVal, minVal);
    propVal = Math.min(propVal, maxVal);
    eleMain.style[prop] = propVal + unit;
    // 保留两位小数
    output(prop, Math.round(propVal * 1E2) / 1E2);
}
```

## 05 “调试”

```
图片：进入调试模式（时间加速以进行考试科目检查）的提醒
```

只是为了测试考试时间轮换是否正常而写出来的功能。

```js
if (String(location).indexOf("debug") == -1) {
    updateTime = function () {
        now = new Date();
        // 铃声校准
        // now.setMinutes(now.getMinutes() + 1);
        output("clock", getClock(now));
        updateExam();
    }
    setInterval(updateTime, 2000);
} else {
    alert("已进入调试模式，关闭本页面可返回正常模式。")
    // 调试模式初始时间
    now = new Date("2021-09-18T15:00+08:00");
    updateTime = function () {
        // 最晚结束时间
        now > new Date("2021-09-20T19:00+08:00") ? change(type) : null;
        // 调试模式跳过夜晚
        if (now.getHours() == 19) {
            now.setHours(31);
            today = fixDigit(now.getMonth() + 1)
                + "-" + fixDigit(now.getDate());
        }
        // 调试模式速度设置
        // now.setMinutes(now.getMinutes() + 1);
        now.setSeconds(now.getSeconds() + 30);
        output("clock", getClock(now));
        updateExam();
    }
    setInterval(updateTime, 20);
}
updateTime();
```

## 06 “屏保预警已关闭”

```
图片：提醒“希沃管家可能在 x 分钟后弹出屏保（含古诗词、政史知识）”，带有“点击暂时关闭45分钟”的按钮。
```

屏保嘛，这种东西在考试时蹦出来让人很不舒服。

```js
onload = function () {
    // 希沃屏保剩余时间
    SCREENSAVER_TIME = 45;
    String(location).indexOf("noscreensaver") == -1 ?
        setInterval(updateSST, 60000) : null;
}

onmousemove = onmousedown = onkeydown
    = function () { SCREENSAVER_TIME = 45; }

// 希沃屏保预警，2021-09屏保已经更换内容且被信息中心关闭
function updateSST() {
    eleSST = document.getElementById("SSTBubble");
    SCREENSAVER_TIME -= 1;
    if (SCREENSAVER_TIME < 0) {
        eleSST.style.backgroundColor = "rgba(255,255,255,.2)";
        output("SST", "已经");
    } else if (SCREENSAVER_TIME < 10) {
        eleSST.style.display = "flex";
        eleSST.style.backgroundColor = "#f52";
        output("SST", "在" + SCREENSAVER_TIME + "分钟后");
    } else {
        eleSST.style.display = "";
    }
}
```

## 07 “帮助”

> ……
>（不需要加任何前后缀）
> 鬼才案例：某考场访问http//exam.thisis.host(错误的协议头拼写)、www.exam.thisis.host(错误的主机名)显示网站无法访问，后用其他网站代替了考试>时钟。
> ……
> 鬼才案例：某班下载了此网页的快照到本地，并向其他班推荐此方法，考试时离线打开了快照而不是真正的考试时钟，错过在线升级，导致几个考场发生时间显示错误的事故，该班电教负全责。（相当于使用几天前的天气预报截图查询今日天气）
> ……

如图，遇到的一些意想不到的事情。

## 08 鸣谢

> 图片：页脚：
> 开发：纸鹿 × 野生技协
> 特邀合作：……
> 友好社团：……
> GitHub项目：……

在接下任务，学习技术的过程中，我也认识了很多朋友，与许多社团建立了沟通与联系，这大约是我高中十分宝贵的经历。

当然了，点击“阅读原文”，你也可以访问到它如今的模样。也许就在一个小时后，某个角落还有一场考试呢。

[原文章内的“阅读原文”按钮](https://exam.thisis.host)