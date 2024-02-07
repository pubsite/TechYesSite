let uptime = ~~((new Date() - new Date("2019-09-12")) / 864E5);
let uptimeTags = Array.from(document.getElementsByTagName("uptime"));
uptimeTags.forEach(ele => { ele.textContent = `${uptime}天` });