---
title: 考试时钟 V7 升级公告 (2024)
categories: [项目]
author: zhilu
date: 2024-04-06 22:22:55
updated: 2024-11-06 18:45:18
cover: https://campus.assets.zhilu.cyou/exam/cover_231204.jpg
banner: https://campus.assets.zhilu.cyou/exam/cover_231204.jpg
---

## 更新内容

### [7.4.0 补充修复](https://github.com/L33Z22L11/ExamClock/commit/af5cc53d266b6fafbd68a22ffb0e9d6cbdb45b88)

- 恢复 Microsoft Clarity 的初始化片段，确保统计脚本按原方式排队加载
- 恢复控制台中的考试时钟项目信息输出
- 该提交未单独调整页脚版本号，但包含功能性修复，因此补充记录

### [7.4.0](https://github.com/L33Z22L11/ExamClock/commit/9d63c054c45c84db83c72c08181f01aebfc6ba90)

- 更新页脚内容和页面 HTML 结构
- 将页面语言标记调整为 `zh-CN`
- 更新作者 meta 信息和 favicon 写法
- 将 Microsoft Clarity 加载方式改为 async 脚本
- 更新 Font Awesome 到 7.0.0
- 移除 Genshin65W 字体依赖
- 增加备案号入口
- 将主要脚本改为 defer/async 加载
- 将上次更新时间接口从 GitHub commits API 调整为 ungh.cc
- 将跳转页改为 meta refresh 写法

### [7.3.6](https://github.com/L33Z22L11/ExamClock/commit/c754357c4819d582e85abdd75bc87c850ac808cc)

- 恢复来源提醒相关显示
- 整理考试类型菜单入口

### [7.3.5](https://github.com/L33Z22L11/ExamClock/commit/8f62f1e4f3e6c42c1deddf9be69f8c7527ee400e)

- 修复 [<i class="fa-brands fa-github"></i> Issue #5 编辑科目的样式问题](https://github.com/L33Z22L11/ExamClock/issues/5)
- 调整默认年级入口
- 将主要信息区域从块级元素改为更稳定的行内结构，减少编辑科目时的样式错位

### [7.3.4](https://github.com/L33Z22L11/ExamClock/commit/3ab92fb17a18f54314ac99928dcd9ca08874db28)

- 移除一部分开发人员选项，关闭容易误触的标语、科目、机构修改入口
- 保留时间修正和调试入口
- 风格化 CSS，整理 Cover 动画样式

### [7.3.3](https://github.com/L33Z22L11/ExamClock/commit/6a169a67e5914a94b06bdee0a9c967d6c1061b74)

- 修复正常全屏时仍然报错的问题
- 更新 Font Awesome 图标 CDN
- 将 Cover Badge 改为显示当前日期和月份
- 修正 Cover Badge 的 DOM 标识和样式选择器

### [7.3.2](https://github.com/L33Z22L11/ExamClock/commit/ffa9ba8785e6b542648fb2782923e202a98349c2)

- 隐藏 23 届彩蛋 {% post_link 2023/grade-2020-departure %} 入口
- 保持考试类型菜单更聚焦于当前可用入口

### [7.3.1](https://github.com/L33Z22L11/ExamClock/commit/6dbb2fd55cc9ad6ffbe0c03cbff7a11705856021)

- 修复 IE 浏览器提示相关问题
- 修复页面中不正确闭合的 HTML 标签
- 调整页脚说明文案

### [7.3.0](https://github.com/L33Z22L11/ExamClock/commit/d1f85ef69a1c9c1f2eda1adbc6efce1538bea986)

- 重构背景相关功能
- 更新背景数据结构格式，支持按批次生成背景菜单
- 移除全屏背景菜单和控制中心相关冗余代码
- 改为使用 defer 与 data-dependencies 标记脚本依赖
- 更新 README.md

### [7.2.0](https://github.com/L33Z22L11/ExamClock/commit/d217229d64efae1bc916e67589fe478e1045491a)

- 优化“上次更新时间”的显示方式
- 使用 GitHub commit 时间替代静态 shields 徽章
- 在导航区增加博客入口

### [7.1.0](https://github.com/L33Z22L11/ExamClock/commit/c39344f3817f90bc1a4313ae813e765769e322c4)

- 增加科目调试功能的时间流速 URL 参数
- 修复科目调试功能的重演行为
- 增加“上次更新时间”

### [7.0.5](https://github.com/L33Z22L11/ExamClock/commit/1918393dfdd9356341a4fb268c1f3a3efa446ec0)

- 优化 Cover 动画界面的样式

### [7.0.4](https://github.com/L33Z22L11/ExamClock/commit/f75bacc76a78565e03e6fe8131088aa6566ecda2)

- 移除中文字体加载
- 修复图床相册链接
- 移除部分冗余代码

### [7.0.3](https://github.com/L33Z22L11/ExamClock/commit/804f707bd98f1e80adae74151d759dab5755cdf9)

- 重构科目部分的数据结构和代码
- 优化 Cover 动画样式

### [7.0.2](https://github.com/L33Z22L11/ExamClock/commit/d9a5c4ab51c16816bd944a6683c4d3664258a46e)

- 提升从 exams 获取考试类型的规范性
- 为 Cover 动画增加 Loading 效果
- 更换主题颜色

### [7.0.1](https://github.com/L33Z22L11/ExamClock/commit/ca57f3f25aaff546bc8dcb8c159d420cbc778615)

- 增加初次启动的白屏动画

### [7.0.0](https://github.com/L33Z22L11/ExamClock/commit/74adecad0c893f97845f71e306dcbc4e4030da76)

- 更换切换考试类型的过渡动画样式
