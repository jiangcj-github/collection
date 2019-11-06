
const weekTerm = ["日", "一", "二", "三", "四", "五", "六"];

const holidayTerm = {
    d0101: "元旦节",
    d0214: "情人节",
    d0308: "妇女节",
    d0312: "植树节",
    d0401: "愚人节",
    d0501: "劳动节",
    d0504: "青年节",
    d0512: "护士节",
    d0601: "儿童节",
    d0701: "建党节",
    d0801: "建军节",
    d0910: "教师节",
    d1001: "国庆节",
    d1006: "老人节",
    d1224: "平安夜",
    d1225: "圣诞节"
}

const lunHolidayTerm = {
    d0101: "春节",
    d0115: "元宵节",
    d0505: "端午节",
    d0707: "七夕",
    d0715: "中元节",
    d0815: "中秋节",
    d0909: "重阳节",
    d1015: "下元节",
    d1208: "腊八节",
    d1223: "小年",
    d0100: "除夕"
}

function getjq(y, m, d){
    m = m-1;

    let sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
    let solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];

    let solarTerms = "";
    let tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    let tmp2 = tmp1.getUTCDate();
    if (tmp2 == d) {
        solarTerms = solarTerm[m * 2 + 1];
    } 
    tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    tmp2= tmp1.getUTCDate();
    if (tmp2 == d) {
        solarTerms = solarTerm[m * 2];
    }
    return solarTerms;
}

function dateInfo(y, m, d) {
    let week = weekTerm[new Date(y, m - 1, d).getDay()];

    let m2 = (m + "").padStart(2, "0");
    let d2 = (d + "").padStart(2, "0");
    let holiday =  holidayTerm[`d${m2}${d2}`] || "";
    
    let lunarDate = Lunar.toLunar(y, m, d);
    
    let lm2 = (lunarDate[1] + "").padStart(2, "0");
    let ld2 = (lunarDate[2] + "").padStart(2, "0");
    let lunHoliday = lunHolidayTerm[`d${lm2}${ld2}`] || "";

    let lunDStr = lunarDate[6];
    let lunJq = getjq(y, m, d);

    return {
        year:               y,
        month:              m,
        day:                d,
        week:               week,
        holiday:            holiday,
        lunarDate:          lunarDate,
        lunarHoliday:       lunHoliday, 
        lunDStr:            lunDStr,
        lunJq:              lunJq,
    };
}

function increment(y, m, d) {
    let n30 = Lunar.solarMonthDays(y, m);
    if(d < n30) {
        return [y, m, d + 1];
    }
    return m < 12 ? [y, m + 1, 1] : [y + 1, 1, 1];
}

let start = [2019, 10, 1];


increment(...start);










