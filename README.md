# TechYesSite / 野生技协官网

野生技协于2020年7月20日正式对外开放，是一个自发性的技术协助组织/无门槛的技术交流群（非社团），旨在信息分享、交流与公开。我们先后发布了班级桌面壁纸、自习PPT、电子课本导航站、电子班牌模板、考试时钟、Hclass等等众多项目，并长期志愿协助各班教学一体机维护，为各位技术同好的发展提供交流平台。

## 构建部署

### 安装

使用 Node.js 22 或更高版本，版本要求见 `package.json` 的 `engines`。当前主题为 Stellar 2.0.0。

```sh
pnpm i
```

### 更新依赖

```sh
pnpm update
```

升级 Stellar 时先核对[迁移说明](https://xaoxuu.com/wiki/stellar/migration/v1-to-v2/)，再运行 `pnpm exec hexo stellar doctor` 与 `pnpm build`。主题配置在 `_config.stellar.yml`；文章作者使用 `article.author`，独立页面菜单使用 `active_menu`。页面中的独立脚本依赖完整页面导航，因此关闭了主题的 `partial_navigation`。

站点样式通过 `_config.stellar.yml` 注入：`patch-v3.css` 负责 Stellar 2 的正文、封面渐变叠图与文章样式；`patch-leftbar-v3.css` 调整桌面侧栏透明背景、菜单文字显示、图文间距，并让文字与图标共用交互状态色，控件与移动端抽屉沿用主题原生 Glass 样式；评论区沿用 `patch-twikoo.css`。字体放在 `font.css`。控制台运行 `toggleThemePatch()` 可对比补丁启停效果。

已启用主题原生明暗切换。控制台可运行 `setColorScheme('light')`、`setColorScheme('dark')` 或 `setColorScheme('auto')`，选择会保存到本地。自动模式由 CSS 跟随系统。

### 启动

```sh
pnpm dev
```

### 部署

```sh
# 云 build 时不使用此命令
# hexo deploy
git push
```
