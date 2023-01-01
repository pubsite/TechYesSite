var arr1, arr2, phy, che, bio;
var key = ["D", "D", "B", "C", "A", "C", "B", "D", "A", "C", "D", "C", "B", "C", "A", "C", "B", "BC", "AB", "AD", "BD"];
function resolve() {
    arr1 = document.getElementById("str1").value.split(",");
    arr2 = document.getElementById("str2").value.split(",");
    phy = 0, che = 0, bio = 0;
    for (i = 0; i < 21; i++) {
        if (key[i] == arr1[i]) {
            if (i < 6) { bio += 6; }
            else if (i < 13) { che += 6; }
            else { phy += 6; }
        } else if (arr1[i] && key[i].match(arr1[i])) {
            phy += 3;
        }
        console.log(i + 1, phy, che, bio);
    }
    console.log("选择题得分", phy + che + bio);
    for (i = 0; i < 19; i++) {
        if (i < 4) { phy -= -arr2[i]; }
        else if (i < 7) { che -= -arr2[i]; }
        else if (i < 11) { bio -= -arr2[i]; }
        else if (i < 15) { phy -= -arr2[i]; }
        else if (i < 17) { che -= -arr2[i]; }
        else { bio -= -arr2[i]; }
        console.log(i + 1, phy, che, bio);
    }
    document.getElementById("result").innerHTML = isNaN(phy) ? "你一定填错了什么信息，仔细阅读一下要求。" : "物理：" + phy + "，化学：" + che + "，生物：" + bio + "，理综总分：" + (phy + che + bio) + "。<br>请核对总分，多打空格/回车都会导致结果不准确！";
}
