// 复制传入元素的data-sub属性
function copyDS(ele) {
    navigator.clipboard.writeText(ele.dataset.sub);
    setTimeout(alert, 0, ele.dataset.sub + " 已复制到剪贴板。")
}