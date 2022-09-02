/* L33Z22L11
 * 
 * 网页让人眼前一黑，代码也是。
 */

// 生成初始日期，用来获取当前年份，计算高考年份
var initDate = new Date();
// 绑定网页内的年级列表
var eleGrades = document.getElementById("grades");
// 在年级列表内生成年级
!/* 立即执行 */function generateGrades() {
    // 自定义的年级列表，按高考时间从近到远排序，每个年级间隔一年高考
    var arrGrade = ["高三", "高二", "高一", "初三", "初二", "初一", "六年级", "五年级", "四年级", "三年级", "二年级", "一年级", "大班", "中班", "小班",];
    // 依次向年级列表中生成年级
    for (i = 0; i < arrGrade.length; i++) {
        // 按照数组顺序输出年级名称和年级内部值（与高三年级的年份差）
        eleGrades.add(new Option(arrGrade[i], i))
    }
}();
// 定义“设置年级”功能
function setRelYear(relYear) {
    // 先假定高考日期的年份为初始年份，即假定高考日期为当年高考日期
    ceeDate = new Date(initDate.getFullYear(), 5, 7);
    // 高考年份再增加年级内部值，如果本年高考过期则高考年份再加一
    ceeDate.setFullYear(ceeDate.getFullYear() + relYear + (ceeDate < initDate ? 1 : 0));
    // 在年级列表内选中本年级
    eleGrades.options[relYear].selected = true;
    // 在网页内更新高考年份
    document.getElementById("ceeYear").innerHTML = ceeDate.getFullYear();
    // 在设置年级后立即更新一次高考倒计时，避免定时更新导致观感上的延迟
    updateCd();
}

// 绑定页面上倒计时的天、时、分、秒元素到一个数组
var arrDetail = document.getElementsByClassName("cdDetail");
// 定义“更新页面倒计时”功能
function updateCd() {
    // 计算当前时间到高考时间的毫秒差
    var ms = ceeDate - Date.now();
    // 计算天、时、分、秒（均未取整）并导出为一个数组
    var arrCd = [ms / 864e5, ms % 864e5 / 36e5, ms % 36e5 / 6e4, ms % 6e4 / 1000];
    // 依次将倒计时的天、时、分、秒数据输出到页面的天、时、分、秒元素
    for (i = 0; i < arrDetail.length; i++) {
        // 将天、时、分、秒取整，并且当十位没有数字时补“0”再输出
        arrDetail[i].innerHTML = arrCd[i] < 10 ? "0" + ~~arrCd[i] : ~~arrCd[i];
    }
}

// 设置初始年级
setRelYear(0);
// 设置每半秒更新页面倒计时，避免切换年级时由于每秒更新导致部分秒数在屏时间接近两秒而影响观感
updateCd.interval = setInterval(updateCd, 500);
