---
title: 一卷图库使用手册
categories: [项目]
date: 2023-01-20 16:48:01
updated: 2026-10-17 16:00:00
description: 预览一卷图库的校园照片，获取图片与作者信息，并将图库接入网页背景。
cover: https://ooo.0x0.ooo/2022/04/04/kB11g.jpg
permalink: monoroll/
article:
  author: zhilu
---

一卷图库（MonoRoll）收录了校友投稿的校园照片，也是[考试时钟](https://exam.thisis.host/)的背景图库。你可以在这里浏览照片，或将图库接入自己的网页。

图片按照 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh) 授权：使用时请注明作者与来源、附上许可链接；如有修改，请说明，并遵守非商业性使用与相同方式共享要求。受图片服务限制，目前暂停接收新投稿。

原投稿联系人：QQ 2399052066（纸鹿）。[在线预览（由 Imgtg 托管）](https://img.tg/album/54wL)。

## 图片预览

<p id="monoroll-summary">展开批次可点选图片，也可随机浏览。</p>

{% raw %}
<link rel="stylesheet" href="/monoroll/demo.css">
<div class="monoroll-demo with-fancybox">
  <div class="monoroll-cover">
    <a id="monoroll-original" href="https://ooo.0x0.ooo/2022/04/04/kB11g.jpg" data-fancybox="monoroll-preview" data-caption="书堆 <small>@绩笑</small>" target="_blank" rel="noopener">
      <img id="monoroll-preview" no-lazy src="https://ooo.0x0.ooo/2022/04/04/kB11g.jpg" alt="绩笑的作品《书堆》" width="960" height="540">
      <span id="monoroll-credit"><span>书堆 (Nov21)</span> <small>@绩笑</small></span>
    </a>
    <button id="monoroll-next" type="button" disabled>随机换图</button>
    <p id="monoroll-status" role="status">正在加载图库…</p>
  </div>
  <div id="monoroll-batches" aria-label="图库批次"></div>
  <noscript><p>开启 JavaScript 后可以浏览图库。下方接入文档可直接阅读。</p></noscript>
</div>
<script type="module" src="/monoroll/demo.js"></script>
{% endraw %}

## 在网页中显示图片

将下面的代码放入 HTML，即可随机显示一张图片及其署名。代码使用浏览器原生模块，无需安装依赖；本地预览时请通过 HTTP 服务器访问页面。

```html
<figure>
  <img id="photo" alt="校园摄影" style="max-width: 100%">
  <figcaption>
    <span id="credit">正在加载…</span> <small id="author"></small>
  </figcaption>
</figure>
<p>图片来自<a href="https://thisis.host/monoroll/">一卷图库</a>，
  按 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">CC BY-NC-SA 4.0</a> 授权。</p>

<script type="module">
  const credit = document.querySelector("#credit");
  try {
    const { pickImage } = await import("https://exam.thisis.host/monoroll.js");
    const image = pickImage();
    const photo = document.querySelector("#photo");
    photo.src = image.url;
    await photo.decode();
    photo.alt = `${image.author}的作品《${image.name}》`;
    credit.textContent = `${image.name} (${image.collection})`;
    document.querySelector("#author").textContent = `@${image.author}`;
  } catch (error) {
    credit.textContent = "图片暂时无法加载，请稍后重试。";
    console.warn(error);
  }
</script>
```

`pickImage()` 随机选取一张照片，返回地址、标题、作者和批次。示例在图片加载完成后显示署名，加载失败时显示提示。

## 选择图片

```js
import { collections, images, pickImage }
  from "https://exam.thisis.host/monoroll.js";
```

| 导出 | 用法 |
| --- | --- |
| `collections` | 按原始批次名组织的图片数组，例如 `collections.Nov21`。 |
| `images` | 全部图片组成的数组，可按下标读取。 |
| `pickImage(collection?)` | 不传参数时从全库均匀随机选图；传批次名时只从该批次选图。 |

每张图片具有相同的字段：

```js
{
  collection: "Nov21",
  author: "绩笑",
  name: "窗边",
  url: "https://ooo.0x0.ooo/2022/04/04/kBiwl.jpg"
}
```

```js
const anyImage = pickImage();                 // 全库随机
const novemberImage = pickImage("Nov21");     // 指定批次随机
const firstImage = collections.Nov21[0];      // 批次中的第一张
const lastImage = images.at(-1);              // 全库中的最后一张
const collectionNames = Object.keys(collections); // 所有批次名
```

批次名区分大小写，例如 `Nov21`、`End22`，请从 `collectionNames` 中选择。传入未知或没有图片的批次会抛出 `RangeError`。随机选择时每张图片的概率相同，也可能连续选到同一张。

请将返回的数据作为只读数据使用。数组顺序可能随图库更新而变化；需要保存某张图片时，请记录其 URL 和署名，不要把下标作为永久 ID。

## 用作背景

导入模块不会自动更换背景。可以先加载图片，再更新背景与署名；加载失败时保留原图。

在页面中添加 `<p id="background-credit"></p>`，并在已导入 `pickImage` 的模块中使用：

```js
async function changeBackground(collection) {
  const image = pickImage(collection);
  const preload = new Image();
  preload.src = image.url;
  await preload.decode();

  document.body.style.backgroundImage = `url("${image.url}")`;
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "cover";
  document.querySelector("#background-credit").textContent =
    `《${image.name}》由 ${image.author} 拍摄，收录于 ${image.collection} 批次。`;
}

changeBackground().catch(console.warn);
```

将 `changeBackground()` 绑定到按钮即可手动换图；传入批次名，如 `changeBackground("Nov21")`，则只从该批次选择。展示时请保留作者署名、图库来源与许可链接。

## 加载失败时

示例需要支持 ES Modules 的现代浏览器。确认脚本带有 `type="module"`，并通过 HTTP 或 HTTPS 访问页面，不要直接双击 HTML 文件。

图库入口已配置跨域访问，接入方无需添加代理或 JSONP。若模块导入失败，检查浏览器网络面板中的 `monoroll.js` 和 `config/gallery.js` 请求；若已取得图片信息却无法显示，则检查对应的图片 URL。图片由图床提供，个别图片不可用时可以换一张。

## 从旧版 MG 迁移

如果你的网页仍引用 `https://thisis.host/monoroll/load.js` 并使用全局 `MG` 对象，需要改为本页的模块接口。旧的 `MGLoad()` 回调改为放在 `await import(...)` 之后执行：

| 旧接口 | 新方式 |
| --- | --- |
| `MG.pic` | `images`；图片地址字段由 `src` 改为 `url`。 |
| `MG.bgBind()` / `MG.infoBind()` | 页面自行选择元素并写入背景、署名。 |
| `MG.setBg(index)` | 读取 `images.at(index)` 后由页面展示。 |
| `MG.setRandBg()` | `pickImage()`；不再支持旧版 `alpha` 权重。 |
| `MG.setBgByIssue(yyMM)` | 从 `collections` 选择真实批次名，再调用 `pickImage(name)`。 |
| `MG.setBgByPicId(yyMMNN)` | 新数据不提供旧数字 ID；先从旧记录找到图片 URL，再在 `images` 中匹配。 |

更新数据后数组顺序可能变化，不能把旧数字 ID 按新数组下标重新生成。旧版作者联络表也不属于新公共接口；作品署名使用每张图片的 `author` 字段。

图库数据与模块源码见 [ExamClock 仓库](https://github.com/L33Z22L11/ExamClock)。
