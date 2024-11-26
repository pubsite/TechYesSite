let MG = {
    name: "一卷图库 - Monoroll Galllery",
    description: "纸鹿收集、校友投稿的图库。",
    license: "CC BY-NC-SA 4.0",
    acknowledgment: { 绩笑: "3175773751_2312张峻嘉", 純粋な: "378655447_2222王一苇", 齐天: "1494487199_2215史晓芳", 云山: "2252855301_2205康亦菲", Echo: "3488370785_2203袁瑜彤", 凌球: "3488370785_2216赵凌玥", 北盼城南烟花繁: "3488370785_2210龚泽城", 小佗: "2187987707_2203张家云", 姚小瑶: "2187987707_2211魏欣瑶", 暮草兮: "1715335021_2204郑笑然", Stars: "912530809_2201李欣源", 靖靖子: "376672446_2215刘辰靖", 秤砣: "376672446_2203郑小雨", 东隅: "3376525002_2225安睿琦", SuperR1SE: "3376525002_2210李维钒", 亦: "3376525002_2205董家亦", 泡泡: "3530370245_2219郎国璇", 吴鸭鸭: "1807542795_2216吴滢羽", 纸某鹿: "2399052066_2216刘子璐", 木鱼: "2432903524_2219杜碧涵", 派小星: "3159033231_2226刘一可", 古怪: "3159033231_2221王楷超", 一棵果树: "2862310233_2314郭姝含", 抓旭: "2874354323_2226?张若旭", 太阳: "2684666792_2216孙子萱", Telsaの的折耳猫: "2684666792_2125吴子建", Ivana: "2660462236_2309李羽凡", 梦颜: "1317204109_2226何欣怡", 酸子: "670514480_2309孙瑄梓", 夜枯: "2275513050_2215?", "℃": "1301997661_?冯朝阳", 即兴: "1227206874_2216肖文琪", William: "2360458152_2216王晟乾", ttgz: "1501738229_2424郭丙康", Yurosan: "2948473506_24?毛璇", ALPEISN: "2113378939_24?吕沛锡", 小雨到处跑: "1642153427_2221强奕恒", 程程: "1307550785_2216蒋鹏程", 头: "2186766183_2202葛铭哲", 沉积岩: "1324188015_2303陈佳怡", Bittersweet: "2968963839_2302徐萤", 寒香: "61145713_2308董仰儒", 四郎: "2644299157_2024黄怡涵", 33: "3122924835_2321田雨杉", 无情小明: "2022217461_2311杨周明", 糸守: "3192873785_20?孟子皓", 硫酸锌不要酸: "2635113282_24?段昊悦", 风吹不过江川: "1402394037_2301亢艺璇", 拾汘: "393501440_2201赵琰华", Dolores: "190175830_2408李诗哲", 鱼柾: "1375301973_23?刘岩", 伪装孤独: "2329401521_2328张鹏铖", KT: "1821419284_24?王艺珈", prlgrim: "2781871481_2306史雨晖", 呱唧: "3196893235_2413任子祺", 猴墩: "1871429430_24?" },
    contactAuthor: author => "QQ: " + MG.acknowledgment[author].replace("_", " "),
};

console.time("Fetch");
fetch("./gallery.json")
    .then(res => res.text())
    .then(str => JSON.parse(str))
    .then(arr => {
        MG.pic = [];
        MG.index = {};
        for (each in arr) {
            MG.pic[each] = {
                id: arr[each][0],
                author: arr[each][1],
                name: arr[each][2],
                src: `https://ooo.0x0.ooo/202${arr[each][3]}.jpg`,
            };
            let issue = ~~(arr[each][0] / 100);
            if (!MG.index[issue]) MG.index[issue] = [];
            MG.index[issue].push(each);
        }
        console.group(MG.name + "\n" + MG.description);
        console.timeEnd("Fetch");
        console.log(MG.pic.length + " pics loaded.");
        console.groupEnd();
    });

MG.bgBind = (ele, needFit = true) => {
    MG.eleBg = ele;
    if (needFit) {
        ele.style.backgroundPosition = "center";
        ele.style.backgroundSize = "cover";
    }
    return ele;
}

MG.infoBind = ele => MG.eleInfo = ele;

MG.setBg = index => {
    if (!MG.eleBg) throw "Use MG.bgBind(ele) first";
    if (!MG.eleInfo) throw "Use MG.infoBind(ele) first";
    let objPic = MG.pic.at(index);
    MG.eleBg.style.backgroundImage = `url(${objPic.src})`;
    MG.eleInfo.textContent = `${objPic.id}_${objPic.author}_${objPic.name}`;
    return MG.pic.at(index);
};

// alpha -> 0.1(+): tend to be newer
// alpha = 1: uniform random / evenly distribution
// alpha -> 2(-): tend to be older
MG.setRandBg = (alpha = 1) => {
    if (alpha <= 0) throw "Expected alpha > 0";
    let index = ~~(Math.pow(Math.random(), alpha) * MG.pic.length);
    return MG.setBg(index);
};

MG.setBgByPicId = yyMMNN => {
    let index = MG.pic.map(each => each.id).indexOf(+yyMMNN);
    if (index == -1) throw "Invaild picId";
    return MG.setBg(index);
}

MG.setBgByIssue = yyMM => {
    if (!MG.index[yyMM]) throw "Invaild [yyMM] issue";
    let index = MG.index[yyMM][~~(Math.random() * MG.index[yyMM].length)];
    return MG.setBg(index);
};
