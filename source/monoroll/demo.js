const status = document.querySelector("#monoroll-status");
const batches = document.querySelector("#monoroll-batches");
const button = document.querySelector("#monoroll-next");
const preview = document.querySelector("#monoroll-preview");
const original = document.querySelector("#monoroll-original");
const credit = document.querySelector("#monoroll-credit");
let gallery;
let request = 0;

async function showImage(item) {
  const currentRequest = ++request;
  let timeout;
  status.textContent = "正在加载图片…";
  preview.setAttribute("aria-busy", "true");
  try {
    const image = new Image();
    image.src = item.url;
    await Promise.race([
      image.decode(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error("图片加载超时")), 15_000);
      }),
    ]);
    if (currentRequest !== request) return;
    preview.src = item.url;
    preview.alt = `${item.author}的作品《${item.name}》`;
    credit.querySelector("span").textContent = `${item.name} (${item.collection})`;
    credit.querySelector("small").textContent = `@${item.author}`;
    original.href = item.url;
    original.dataset.caption = `${credit.querySelector("span").innerHTML} ${credit.querySelector("small").outerHTML}`;
    status.textContent = "";
  } catch (error) {
    if (currentRequest !== request) return;
    status.textContent = "图片暂时无法加载，已保留原图。请换一张或选择其他批次。";
    console.warn("一卷图库：", error);
  } finally {
    clearTimeout(timeout);
    if (currentRequest === request) preview.setAttribute("aria-busy", "false");
  }
}

button.addEventListener("click", () => {
  if (gallery) showImage(gallery.pickImage());
  else location.reload();
});

try {
  gallery = await import("https://exam.thisis.host/monoroll.js");
  document.querySelector("#monoroll-summary").textContent =
    `${Object.keys(gallery.collections).length} 个批次，${gallery.images.length} 张图片。点击图片可放大查看，随机按钮更新顶部图片。`;
  Object.entries(gallery.collections).reverse().forEach(([collection, images]) => {
    const batch = document.createElement("details");
    const summary = document.createElement("summary");
    summary.append(collection);
    const count = document.createElement("span");
    count.className = "gallery-count";
    count.textContent = `${images.length} 张`;
    const random = document.createElement("button");
    random.type = "button";
    random.textContent = "随机";
    random.setAttribute("aria-label", `${collection} 批次随机图片`);
    random.addEventListener("click", (event) => {
      event.preventDefault();
      showImage(gallery.pickImage(collection));
    });
    summary.append(count, random);
    batch.append(summary);
    batch.addEventListener("toggle", () => {
      if (!batch.open || batch.querySelector(".gallery-images")) return;
      const list = document.createElement("div");
      list.className = "gallery-images";
      images.forEach((item) => {
        const link = document.createElement("a");
        link.className = "gallery-image";
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.dataset.fancybox = `monoroll-${collection}`;
        const thumbnail = document.createElement("img");
        thumbnail.loading = "lazy";
        thumbnail.alt = "";
        thumbnail.src = item.url.replace(/\.jpg$/, ".th.jpg");
        thumbnail.addEventListener("error", () => thumbnail.remove(), { once: true });
        const caption = document.createElement("span");
        caption.className = "gallery-caption";
        const title = document.createElement("span");
        title.textContent = item.name;
        const author = document.createElement("small");
        author.textContent = `@${item.author}`;
        caption.append(title, author);
        link.dataset.caption = `${title.innerHTML} ${author.outerHTML}`;
        link.append(thumbnail, caption);
        list.append(link);
      });
      batch.append(list);
    });
    batches.append(batch);
  });
  button.disabled = false;
  status.textContent = "";
} catch (error) {
  status.textContent = "图库暂时无法加载。你可以继续阅读接入文档，或稍后重新加载。";
  button.disabled = false;
  button.textContent = "重新加载图库";
  console.warn("一卷图库：", error);
}
