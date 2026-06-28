/* 首爾 2026 — 隨身旅遊手冊 PWA
   All trip content + rendering + offline-friendly interactivity. */

"use strict";

/* ---------- map link helpers ---------- */
const M = {
  hotel: "https://maps.google.com/?cid=17390463230268383660",
  gyeongbok: "https://maps.google.com/?cid=10029593693201569270",
  gwangjang: "https://maps.google.com/?cid=15444711502569316164",
  bukchon: "https://maps.google.com/?cid=14824929312700491162",
  bluebottle: "https://maps.google.com/?cid=12626354569779134648",
  ikseon: "https://maps.google.com/?cid=10117955504964711899",
  ddp: "https://maps.google.com/?cid=6639054745590107100",
  nseoul: "https://maps.google.com/?cid=6699200636580889253",
  garosu: "https://maps.google.com/?cid=9446918834213037435",
  apgujeong: "https://maps.google.com/?cid=10200501045434051900",
  daelim: "https://maps.google.com/?cid=8793465796045987589",
  ttukseom: "https://maps.google.com/?cid=9887225714262480147",
  yeonnam: "https://maps.google.com/?cid=819283971572061565",
  cathedral: "https://maps.google.com/?cid=4950632065917241491",
};
const S = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const SP = (q, pid) => S(q) + "&query_place_id=" + pid;

/* ---------- trip data ---------- */
const TRIP = {
  startISO: "2026-06-30",
  endISO: "2026-07-05",
  title: "首爾 2026",
  subtitle: "6 天 5 夜 · 四人行",
  flights: {
    out: { route: "台中 → 首爾", dep: "6/30（二）17:00 · 台中 T2", arr: "6/30 20:45 · 仁川 T1", airline: "德威航空 TW670" },
    back: { route: "首爾 → 台中", dep: "7/5（日）14:50 · 仁川 T2", arr: "7/5 16:30 · 台中 T1", airline: "真航空 LJ737", warn: "回程在仁川「第二航廈 T2」報到，勿到 T1（接駁要 15–20 分）" },
  },
  hotel: {
    name: "Stayrak Hotel", area: "明洞 · 忠武路", addr: "211-5 Toegye-ro, Jung-gu, Seoul 04557",
    checkin: "6/30 15:00 後", checkout: "7/5 12:00 前", rooms: "1 間",
    phone: "+82-2-1811-1811", email: "stayrak@naver.com", map: M.hotel,
    warn: "訂房為 1 間房、全程 4 人——出發前先 email 確認可住 4 人（家庭房），避免 check-in 出包",
  },
  predeparture: [
    { id: "pd1", t: "回程到仁川「第二航廈 T2」（非 T1）", d: "出發前 24 小時用 App／簡訊再複查一次" },
    { id: "pd2", t: "email 飯店確認 1 房可住 4 人", d: "stayrak@naver.com，問家庭房／床型與最大入住" },
    { id: "pd3", t: "4 人各填 e-Arrival Card 電子入境卡", d: "入境前 72 小時內線上填；台灣護照免 K-ETA（至 2026 底）" },
    { id: "pd4", t: "行動電源改隨身（不可託運、機上禁用）", d: "韓航系含真航空全面禁止機上使用" },
    { id: "pd5", t: "不攜帶任何含肉製品入韓", d: "肉鬆、含肉泡麵調理包等，違規重罰" },
    { id: "pd6", t: "Kakao T 先註冊、綁信用卡", d: "可用台灣 +886 門號註冊，落地即可叫車" },
    { id: "pd7", t: "買好 eSIM／網路分享器", d: "KKday／tripcom 約 NT$150 起／5 天，落地開通" },
    { id: "pd8", t: "備 T-money／WOWPASS 與少量現金", d: "WOWPASS 可機場取件，換匯＋付款＋交通一卡搞定" },
    { id: "pd9", t: "帶護照正本（漢江租腳踏車用）", d: "Day 4 臨櫃租車需護照正本＋現金" },
  ],
  weather: {
    intro: "正逢梅雨季（장마）。7 月是全年最多雨月份，午間體感可逼近 34℃、濕度約 80%＋，幾乎每天需帶傘。",
    days: [
      { d: "6/30", w: "🌧", t: "有雨 · 悶熱" },
      { d: "7/1", w: "🌧", t: "多雨 · 27℃" },
      { d: "7/2", w: "⛅", t: "午後雷陣雨" },
      { d: "7/3", w: "🌦", t: "稍緩不穩" },
      { d: "7/4", w: "🌦", t: "25℃ 短陣雨" },
      { d: "7/5", w: "⛅", t: "多雲" },
    ],
    tips: "每天備輕便雨傘／雨衣＋防滑鞋；上午衝戶外、午後留室內彈性。Day 2 大量步行、Day 4 漢江騎車＋草地泡麵最易受雨影響，務必備替代方案。",
  },
  days: [
    {
      id: "d1", n: 1, date: "6/30", dow: "二", label: "抵達日", wx: "🌧 有雨悶熱",
      note: "晚到，先安頓；當晚餐廳多打烊，超商解決即可",
      items: [
        { t: "17:00", a: "台中國際機場 T2 起飛", n: "德威航空 TW670" },
        { t: "20:45", a: "抵達仁川國際機場 T1", n: "入境（先填好 e-Arrival Card 可加速）" },
        { t: "~21:30", a: "出關 → 前往飯店", n: "Kakao T 計程車約 60–70 分（4 人分攤划算）；或飯店門口機場巴士" },
        { t: "~23:00", a: "入住 Stayrak Hotel", n: "超商買宵夜", m: M.hotel, mp: "Stayrak Hotel" },
      ],
      rain: "落地即可能下雨，計程車門到門最省事；行李重時尤其建議。",
    },
    {
      id: "d2", n: 2, date: "7/1", dow: "三", label: "歷史文化巡禮", wx: "🌧 多雨悶熱 ~27℃",
      note: "景福宮週二休（週三 OK）；這天步行量大，多用計程車短程接駁",
      items: [
        { t: "08:30", a: "早餐 Isaac Toast 明洞聖堂店", n: "步行（草莓汁／奇異果汁）", m: S("Isaac Toast Myeongdong Cathedral"), mp: "Isaac Toast" },
        { t: "09:15", a: "忠武路站 → 3 號線 → 景福宮站", n: "約 15 分" },
        { t: "09:40", a: "韓服體驗 ＋ 景福宮", n: "穿韓服免費入場；11:00 守門將換崗", m: M.gyeongbok, mp: "景福宮" },
        { t: "12:15", a: "廣藏市場（午餐）", n: "富村生牛肉 · 順熙家綠豆煎餅 · 故鄉刀削麵 · 母女麻藥飯捲 · 糯米麻花（室內可避雨）", m: M.gwangjang, mp: "廣藏市場" },
        { t: "14:00", a: "北村韓屋村", n: "17:00 後居民休息，請降低音量", m: M.bukchon, mp: "北村韓屋村" },
        { t: "14:45", a: "Blue Bottle 三清洞店", n: "沿石階下坡（雨天防滑），手沖休息", m: M.bluebottle, mp: "Blue Bottle 三清洞" },
        { t: "16:00", a: "益善洞韓屋村", n: "傍晚點燈最美", m: M.ikseon, mp: "益善洞" },
        { t: "17:30", a: "→ 明洞", n: "★建議計程車／地鐵，取代步行 1.4 km", flag: true },
        { t: "19:00", a: "晚餐 王妃家 明洞本店", n: "晚餐擇一（原稿另列「溫泉家」請刪）", m: S("왕비집 명동"), mp: "王妃家 明洞" },
        { t: "21:00", a: "步行回飯店", n: "" },
      ],
      rain: "北村／三清洞為戶外石階，雨大時改室內咖啡廳延長、縮短戶外段；廣藏市場室內可避雨。",
    },
    {
      id: "d3", n: 3, date: "7/2", dow: "四", label: "地標與購物", wx: "⛅ 午後雷陣雨機率",
      note: "行程多室內，受雨影響小",
      items: [
        { t: "09:00", a: "早餐 EGG DROP 明洞店", n: "步行約 7 分", m: S("에그드랍 명동"), mp: "EGG DROP 明洞" },
        { t: "10:00", a: "忠武路 → 4 號線 → 東大門 DDP", n: "1 站；採光好、室內冷氣、可看特展", m: M.ddp, mp: "東大門 DDP" },
        { t: "12:00", a: "東大門歷史文化公園散步", n: "古城牆遺跡、水門" },
        { t: "13:00", a: "午餐 Shake Shack（Doota Mall 1F）", n: "有中文菜單" },
        { t: "14:15", a: "→ 南山纜車乘車處", n: "Kakao T 計程車約 12–15 分", m: S("남산케이블카"), mp: "南山纜車" },
        { t: "14:45", a: "N 首爾塔 ＋ 愛情鎖牆", n: "買來回票", m: M.nseoul, mp: "N 首爾塔" },
        { t: "17:30", a: "纜車下山 → 南山電梯 → 明洞站", n: "下山聯同一張票" },
        { t: "18:00", a: "明洞站著吃韓牛", n: "進店前超商買微波白飯＋泡菜帶入" },
        { t: "19:30", a: "明洞血拼", n: "LINE FRIENDS · Olive Young 旗艦（現場退稅）· ABC-MART" },
        { t: "21:30", a: "步行回飯店", n: "" },
      ],
      rain: "DDP／Doota／纜車／明洞商場多為室內，雨天影響小；南山視野雨天打折，可彈性取捨。",
    },
    {
      id: "d4", n: 4, date: "7/3", dow: "五", label: "潮流雙商圈 ＋ 漢江", wx: "🌦 稍緩仍不穩",
      note: "★含一處路線修正（狎鷗亭→計程車→聖水）＋一處時間修正",
      items: [
        { t: "09:30", a: "早餐 瑞源粥（鮑魚粥）", n: "步行約 500 m", m: S("Seowon Porridge Seoul"), mp: "瑞源粥" },
        { t: "10:30", a: "忠武路 → 3 號線 → 新沙站", n: "6 站約 15 分，8 號出口" },
        { t: "10:40", a: "新沙洞林蔭道", n: "Gentle Monster／Tamburins、Maison Kitsuné", m: M.garosu, mp: "新沙洞林蔭道" },
        { t: "12:15", a: "→ 狎鷗亭羅德奧", n: "計程車約 5–8 分；Wiggle Wiggle、London Bagel 外帶、K-Star Road", m: M.apgujeong, mp: "狎鷗亭羅德奧" },
        { t: "13:40", a: "→ 聖水洞", n: "★計程車約 15 分（過漢江）。原稿誤寫「從弘大」已修正", m: M.daelim, mp: "聖水洞 大林倉庫", flag: true },
        { t: "14:30", a: "午餐 祖傳三代馬鈴薯排骨湯", n: "避開中午尖峰排隊", m: S("소문난성수감자탕"), mp: "祖傳三代감자탕" },
        { t: "16:00", a: "聖水洞品牌補貨", n: "Dior 聖水、Mardi Mercredi、Amore 聖水" },
        { t: "17:30", a: "大林倉庫（紅磚倉庫咖啡廳）下午茶", n: "草莓蛋糕、現烤可頌", m: M.daelim, mp: "大林倉庫" },
        { t: "18:30", a: "自然島鹽麵包 聖水店（外帶）", n: "帶去漢江當宵夜", m: S("자연도소금빵 성수"), mp: "自然島鹽麵包 聖水" },
        { t: "18:40", a: "→ 纛島漢江公園", n: "Kakao T 約 7 分（約 ₩5,000）", m: M.ttukseom, mp: "纛島漢江公園" },
        { t: "19:00", a: "騎腳踏車（19:00 借 / 20:00 還）", n: "★護照正本＋現金臨櫃；原稿誤寫 7:00 已修正", flag: true },
        { t: "20:00", a: "GS25 自助煮泡麵 ＋ 漢江夜景", n: "加蛋加起司，草地享用" },
        { t: "21:10", a: "計程車回飯店", n: "約 ₩11,000–13,000" },
      ],
      rain: "★騎車／草地泡麵最怕雨。雨天改：聖水室內店＋大林倉庫延長；或去 The Hyundai Seoul（汝矣島）室內逛街看夜景。",
    },
    {
      id: "d5", n: 5, date: "7/4", dow: "六", label: "弘大 ＋ 明洞補貨", wx: "🌦 ~25℃ 局部短陣雨",
      note: "站著吃烤肉、馬鈴薯排骨湯與前兩日重複，可換口味",
      items: [
        { t: "08:30", a: "忠武路 → 3 號線 → 乙支路三街轉 2 號線 → 弘大入口站", n: "約 6 站" },
        { t: "10:30", a: "弘大／延南洞逛街散步", n: "9 號出口主街", m: M.yeonnam, mp: "延南洞" },
        { t: "13:30", a: "午餐 延南站著吃食堂（韓牛）", n: "或延南洞烤腸／401 烤肉", m: S("연남서식당"), mp: "延南站著吃食堂" },
        { t: "15:00", a: "回飯店休息　或　直接明洞補貨", n: "2 號線 → 乙支路入口站（即達明洞）" },
        { t: "17:00", a: "PAGE 明洞 3F「PINES」休息", n: "" },
        { t: "19:00", a: "明洞聖堂拍照", n: "哥德式紅磚教堂；避開 12–13:00 午休，夜拍更美", m: M.cathedral, mp: "明洞聖堂" },
        { t: "20:00", a: "晚餐 元堂馬鈴薯排骨湯（明洞 1 號店）", n: "", m: S("원당감자탕 명동"), mp: "元堂감자탕 明洞" },
        { t: "21:30", a: "步行回飯店", n: "約 1 km" },
      ],
      rain: "弘大商圈室內店家多；雨天把逛街重心放在明洞商場與聖堂地下街。",
    },
    {
      id: "d6", n: 6, date: "7/5", dow: "日", label: "回程", wx: "⛅ 多雲",
      note: "★時間最緊：LJ737 14:50 從仁川 T2 起飛",
      items: [
        { t: "—", a: "最晚 10:00–10:15 離開飯店", n: "門到門到 T2 約 80–100 分；梅雨季＋週日預留 buffer", flag: true },
        { t: "08:20", a: "早餐（擇一，建議外帶從簡）", n: "Isaac Toast 外帶／LUCKY SEOUL／Beansbins（草莓鬆餅）" },
        { t: "09:45", a: "退房", n: "飯店門口可搭機場巴士；或 Kakao T／AREX（經首爾站）", m: M.hotel, mp: "Stayrak Hotel" },
        { t: "10:00", a: "出發 → 仁川 第二航廈 T2", n: "★務必到 T2，勿去 T1", m: S("Incheon International Airport Terminal 2"), mp: "仁川機場 T2", flag: true },
        { t: "~11:45", a: "抵 T2：退稅 ＋ 報到", n: "LJ737 託運額度 15 kg，掃貨注意超重" },
        { t: "14:50", a: "真航空 LJ737 起飛", n: "→ 16:30 抵台中 T1" },
      ],
      rain: "",
    },
  ],
  tickets: [
    { id: "tk1", name: "韓服體驗", day: "Day 2", onsite: "依方案", online: "KKday／Klook 有折扣", note: "景福宮站附近（西花／韓服男／Oneday）。穿韓服免費入宮；週三開放。連北村選 4 小時以上方案；熱門店先預約避免久等。" },
    { id: "tk2", name: "南山纜車 來回", day: "Day 3", onsite: "₩15,000", online: "線上較便宜", note: "與首爾塔合買最划算。★線上纜車票多為週一～五，週四 7/2 剛好可用。", flag: true },
    { id: "tk3", name: "N 首爾塔 觀景台", day: "Day 3", onsite: "₩26,000", online: "線上較便宜（Klook 官方夥伴）", note: "塔內 5F 自助機掃 QR 換票免排隊；想拍愛情鎖可選「觀景台＋愛情鎖」組合。" },
    { id: "tk4", name: "網路 eSIM", day: "全程", onsite: "—", online: "約 NT$150 起／5 天", note: "KKday／tripcom 半價方案，落地開通。4 人各一張，或 1 張＋熱點分享。" },
    { id: "tk5", name: "機場交通", day: "Day 1／6", onsite: "—", online: "AREX／接送線上有折扣", note: "去程晚到建議 Kakao T 計程車或包車接送；回程 AREX 直達或機場巴士到 ★T2。", flag: true },
    { id: "tk6", name: "交通卡 T-money／WOWPASS", day: "全程", onsite: "空卡 ₩3,000", online: "WOWPASS 可機場取件", note: "可付地鐵／公車／計程車／超商。行程計程車多，一卡到底最省心（氣候同行卡不能搭機場線、不能付計程車）。" },
  ],
  ticketNotes: [
    { k: "不必預訂", c: "danger0", v: "漢江腳踏車（現場 ₩3,000/小時，帶護照正本＋現金）；廣藏市場、站著吃烤肉、咖啡廳等餐飲現場處理即可。" },
    { k: "不建議", c: "danger", v: "Discover Seoul Pass（首爾轉轉卡）——整趟付費景點只有首爾塔，用不回本。" },
    { k: "順帶省錢", c: "ok", v: "退稅單筆滿 ₩15,000、帶護照；明洞 Olive Young／大型超市可現場退稅；結帳前查兩平台全站折扣碼。" },
  ],
  subway: [
    { seg: "景福宮（D2 早）", line: "3 號線 · 往大化(Daehwa)方向", stops: "約 4 站 · 15 分", exit: "景福宮站 4 號出口" },
    { seg: "廣藏市場（D2 午）", line: "1 號線 · 往清涼里方向", stops: "至鐘路 5 街站", exit: "或景福宮直接計程車更快" },
    { seg: "東大門 DDP（D3）", line: "4 號線 · 往堂嶺(당고개)方向", stops: "1 站 · 3 分", exit: "東大門歷史文化公園站" },
    { seg: "新沙林蔭道（D4）", line: "3 號線 · 往梧琴(Ogeum)方向", stops: "6 站 · 15 分", exit: "新沙站 8 號出口" },
    { seg: "弘大（D5 去）", line: "3 號線→乙支路3街轉 2 號線 · 往市廳", stops: "約 6 站", exit: "弘大入口站 9 號出口" },
    { seg: "明洞補貨（D5 回）", line: "2 號線 · 往乙支路入口方向", stops: "約 5 站", exit: "乙支路入口站即明洞商圈" },
    { seg: "回飯店（通用）", line: "2 號線→乙支路3街轉 3 號線", stops: "1 站到忠武路", exit: "忠武路站 8 號出口" },
  ],
  taxi: [
    { seg: "仁川 T1 → 明洞飯店（D1）", time: "60–70 分", fare: "₩70,000–100,000", note: "＋過路費；晚到注意加成" },
    { seg: "明洞飯店 → 仁川 T2（D6）", time: "60–70 分", fare: "₩70,000–100,000", note: "＋過路費；或改 AREX 省錢" },
    { seg: "益善洞 → 明洞（D2）", time: "約 15 分", fare: "₩7,000–9,000", note: "取代步行 1.4 km" },
    { seg: "DDP → 南山纜車（D3）", time: "12–15 分", fare: "₩8,000–10,000", note: "Kakao T" },
    { seg: "新沙 → 狎鷗亭羅德奧（D4）", time: "5–8 分", fare: "₩5,000–6,000", note: "" },
    { seg: "狎鷗亭 → 聖水大林倉庫（D4）", time: "約 15 分", fare: "₩8,000–11,000", note: "過漢江" },
    { seg: "聖水 → 纛島漢江公園（D4）", time: "約 7 分", fare: "₩5,000–6,000", note: "" },
    { seg: "纛島漢江 → 明洞飯店（D4）", time: "約 20 分", fare: "₩11,000–13,000", note: "夜間" },
  ],
  taxiRules: [
    "基本費 ₩4,800（起步約 1.6 km），之後每約 131 m 或時速 15 km 以下每 35 秒 +₩100。",
    "深夜加成 22:00–04:00：22–23 時 & 02–04 時 +20%；23–02 時 +40%（最貴）。",
    "跨市加成（出首爾）+20%；但仁川機場 ↔ 首爾不收邊界費。",
    "Day 1 晚到：盡量 22:00 前到飯店可避深夜加成。",
  ],
  taxiApps: [
    "叫車 Kakao T：可用台灣 +886 門號註冊、綁 Visa／MasterCard，出發前先辦好。",
    "4 人＋大行李上機場：行李多時叫 Kakao Venti／i.M 大型車更好塞、分攤更划算。",
    "定位技巧：高樓會干擾 GPS，把上車點移到「大門口／顯眼地標」。",
    "地鐵 ₩1,550（卡），進出都嗶卡；路線以 Naver Map／KakaoMap 即時為準。",
  ],
  stations: [
    ["忠武路站", "ChIJF0OnPOOifDUR58l2u5fFViM"],
    ["景福宮站", "ChIJieciEpWifDURJ8C1gbw1VvI"],
    ["乙支路3街站", "ChIJAWNsHeSifDUREcuaWDQ1dv8"],
    ["乙支路入口站", "ChIJA5RMFe6ifDURGrk7MY0umwc"],
    ["東大門歷史文化公園站", "ChIJRTkaPz2jfDUReQo0-UY580U"],
    ["鐘路5街站", "ChIJLw9rPyGjfDURFT2VCDR2ZSk"],
    ["新沙站", "ChIJiS6vTOijfDURyEZUZYIqBJk"],
    ["弘大入口站", "ChIJExW378KYfDUR8aFijbcqirQ"],
  ],
};

/* ---------- utilities ---------- */
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem("s26:" + k) || "false"); } catch { return false; } },
  set: (k, v) => { try { localStorage.setItem("s26:" + k, JSON.stringify(v)); } catch {} },
};
const mapLink = (url, label) => `<a class="maplink" href="${url}" target="_blank" rel="noopener">📍 ${esc(label)}</a>`;

/* ---------- trip status ---------- */
function tripStatus() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(TRIP.startISO + "T00:00:00");
  const end = new Date(TRIP.endISO + "T00:00:00");
  const dayMs = 86400000;
  if (today < start) {
    const n = Math.round((start - today) / dayMs);
    return { phase: "before", label: `出發倒數 ${n} 天`, dayIndex: 0 };
  }
  if (today >= start && today <= end) {
    const idx = Math.round((today - start) / dayMs);
    return { phase: "during", label: `Day ${idx + 1} · 今天`, dayIndex: idx };
  }
  return { phase: "after", label: "旅程結束 · 一路順風", dayIndex: 5 };
}

/* ---------- views ---------- */
function viewHome() {
  const st = tripStatus();
  const wrap = el("div", "stack");

  // hero
  const hero = el("section", "hero");
  hero.innerHTML = `
    <div class="hero-eyebrow">SEOUL · 보라해 💜</div>
    <div class="hero-status">${esc(st.label)}</div>
    <div class="hero-dates">2026 / 6 / 30 — 7 / 5　·　${esc(TRIP.subtitle)}</div>`;
  wrap.appendChild(hero);

  // flights
  const f = el("section", "card");
  f.innerHTML = `<h2 class="card-h"><span class="ic">✈</span>航班</h2>
    <div class="flight">
      <div class="flight-route">${esc(TRIP.flights.out.route)}</div>
      <div class="flight-line"><span>出發</span>${esc(TRIP.flights.out.dep)}</div>
      <div class="flight-line"><span>抵達</span>${esc(TRIP.flights.out.arr)}</div>
      <div class="flight-air">${esc(TRIP.flights.out.airline)}</div>
    </div>
    <div class="flight">
      <div class="flight-route">${esc(TRIP.flights.back.route)}</div>
      <div class="flight-line"><span>出發</span>${esc(TRIP.flights.back.dep)}</div>
      <div class="flight-line"><span>抵達</span>${esc(TRIP.flights.back.arr)}</div>
      <div class="flight-air">${esc(TRIP.flights.back.airline)}</div>
      <div class="warn">⚠ ${esc(TRIP.flights.back.warn)}</div>
    </div>`;
  wrap.appendChild(f);

  // hotel
  const h = el("section", "card");
  h.innerHTML = `<h2 class="card-h"><span class="ic">🏨</span>住宿</h2>
    <div class="hotel-name">${esc(TRIP.hotel.name)} <span class="muted">· ${esc(TRIP.hotel.area)}</span></div>
    <div class="kv"><span>地址</span>${esc(TRIP.hotel.addr)}</div>
    <div class="kv"><span>入住</span>${esc(TRIP.hotel.checkin)}　<span>退房</span>${esc(TRIP.hotel.checkout)}</div>
    <div class="kv"><span>房數</span>${esc(TRIP.hotel.rooms)}　<span>電話</span>${esc(TRIP.hotel.phone)}</div>
    <div class="warn">⚠ ${esc(TRIP.hotel.warn)}</div>
    ${mapLink(TRIP.hotel.map, "在地圖開啟飯店")}`;
  wrap.appendChild(h);

  // pre-departure checklist
  const c = el("section", "card");
  c.innerHTML = `<h2 class="card-h"><span class="ic">✅</span>出發前清單</h2>`;
  const list = el("div", "checklist");
  TRIP.predeparture.forEach((it) => {
    const row = el("label", "check");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = store.get(it.id);
    cb.addEventListener("change", () => { store.set(it.id, cb.checked); row.classList.toggle("done", cb.checked); });
    row.classList.toggle("done", cb.checked);
    row.appendChild(cb);
    row.appendChild(el("div", "check-body", `<div class="check-t">${esc(it.t)}</div><div class="check-d">${esc(it.d)}</div>`));
    list.appendChild(row);
  });
  c.appendChild(list);
  wrap.appendChild(c);

  // weather
  const w = el("section", "card");
  let chips = TRIP.weather.days.map((x) => `<div class="wchip"><div class="wchip-d">${esc(x.d)}</div><div class="wchip-i">${x.w}</div><div class="wchip-t">${esc(x.t)}</div></div>`).join("");
  w.innerHTML = `<h2 class="card-h"><span class="ic">☔</span>天氣 · 梅雨季</h2>
    <p class="p">${esc(TRIP.weather.intro)}</p>
    <div class="wgrid">${chips}</div>
    <p class="p tip">${esc(TRIP.weather.tips)}</p>`;
  wrap.appendChild(w);

  // maps
  const m = el("section", "card");
  m.innerHTML = `<h2 class="card-h"><span class="ic">🗺</span>地圖連結</h2><p class="p muted">點開即可導航。景點為精確定位，餐廳為名稱搜尋，到當地可搭配 Naver Map 再確認。</p>`;
  TRIP.days.forEach((d) => {
    const links = d.items.filter((i) => i.m);
    if (!links.length) return;
    const grp = el("div", "mapgrp");
    grp.appendChild(el("div", "mapgrp-h", `Day ${d.n} · ${esc(d.date)}`));
    const inner = el("div", "maprow");
    links.forEach((i) => { inner.innerHTML += `<a class="mappill" href="${i.m}" target="_blank" rel="noopener">${esc(i.mp)}</a>`; });
    grp.appendChild(inner); m.appendChild(grp);
  });
  wrap.appendChild(m);

  return wrap;
}

function dayCard(d, todayIdx) {
  const sec = el("section", "card day");
  const isToday = (d.n - 1) === todayIdx && tripStatus().phase === "during";
  sec.innerHTML = `<div class="day-head">
      <div class="day-num">Day ${d.n}${isToday ? '<span class="today">今天</span>' : ""}</div>
      <div class="day-meta"><span class="day-date">${esc(d.date)}（${esc(d.dow)}）</span><span class="day-label">${esc(d.label)}</span></div>
      <div class="day-wx">${esc(d.wx)}</div>
    </div>
    ${d.note ? `<div class="day-note">${esc(d.note)}</div>` : ""}`;
  const tl = el("div", "timeline");
  d.items.forEach((i) => {
    const row = el("div", "tl-row" + (i.flag ? " flag" : ""));
    const note = i.n ? `<div class="tl-note">${esc(i.n)}</div>` : "";
    const map = i.m ? mapLink(i.m, i.mp) : "";
    row.innerHTML = `<div class="tl-time">${esc(i.t)}</div>
      <div class="tl-dot"></div>
      <div class="tl-body"><div class="tl-act">${esc(i.a)}</div>${note}${map}</div>`;
    tl.appendChild(row);
  });
  sec.appendChild(tl);
  if (d.rain) sec.appendChild(el("div", "rainpill", `<b>雨備</b> ${esc(d.rain)}`));
  return sec;
}

function viewDays() {
  const st = tripStatus();
  const wrap = el("div", "stack");
  const sel = el("div", "dayselect");
  let active = st.phase === "during" ? st.dayIndex : 0;
  const body = el("div", "stack");
  function render() {
    body.innerHTML = "";
    body.appendChild(dayCard(TRIP.days[active], st.dayIndex));
    [...sel.children].forEach((c, i) => c.classList.toggle("on", i === active));
  }
  TRIP.days.forEach((d, i) => {
    const chip = el("button", "daychip", `<b>D${d.n}</b><span>${esc(d.date)}</span>`);
    if ((d.n - 1) === st.dayIndex && st.phase === "during") chip.classList.add("istoday");
    chip.addEventListener("click", () => { active = i; render(); body.scrollIntoView({ behavior: "smooth", block: "start" }); });
    sel.appendChild(chip);
  });
  wrap.appendChild(sel); wrap.appendChild(body); render();
  return wrap;
}

function viewTickets() {
  const wrap = el("div", "stack");
  const intro = el("section", "card");
  intro.innerHTML = `<h2 class="card-h"><span class="ic">🎟</span>票券預訂</h2>
    <p class="p muted">付費景點不多，重點是省排隊（電子票掃 QR）＋打好網路與交通。勾選已訂的項目。</p>`;
  wrap.appendChild(intro);

  const c = el("section", "card");
  const list = el("div", "checklist");
  TRIP.tickets.forEach((tk) => {
    const row = el("label", "check ticket");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = store.get(tk.id);
    cb.addEventListener("change", () => { store.set(tk.id, cb.checked); row.classList.toggle("done", cb.checked); });
    row.classList.toggle("done", cb.checked);
    row.appendChild(cb);
    const body = el("div", "check-body");
    body.innerHTML = `<div class="tk-top"><span class="check-t">${esc(tk.name)}</span><span class="tk-day">${esc(tk.day)}</span></div>
      <div class="tk-price"><span class="muted">現場</span> ${esc(tk.onsite)}　<span class="muted">線上</span> <b>${esc(tk.online)}</b></div>
      <div class="check-d ${tk.flag ? "flag-t" : ""}">${esc(tk.note)}</div>`;
    row.appendChild(body);
    list.appendChild(row);
  });
  c.appendChild(list);
  wrap.appendChild(c);

  const n = el("section", "card");
  n.innerHTML = `<h2 class="card-h"><span class="ic">ℹ</span>其他</h2>` +
    TRIP.ticketNotes.map((x) => `<p class="p"><b class="tag ${x.c}">${esc(x.k)}</b>${esc(x.v)}</p>`).join("");
  wrap.appendChild(n);
  return wrap;
}

function viewTransit() {
  const wrap = el("div", "stack");

  const sub = el("section", "card");
  sub.innerHTML = `<h2 class="card-h"><span class="ic">🚇</span>地鐵（從忠武路站）</h2>`;
  TRIP.subway.forEach((r) => {
    sub.appendChild(el("div", "trow", `<div class="trow-h">${esc(r.seg)}</div>
      <div class="trow-line">${esc(r.line)}</div>
      <div class="trow-meta"><span>${esc(r.stops)}</span><span>${esc(r.exit)}</span></div>`));
  });
  const stn = el("div", "stations");
  stn.innerHTML = `<div class="stations-h">車站地圖（點開導航）</div>`;
  const sr = el("div", "maprow");
  TRIP.stations.forEach(([nm, pid]) => { sr.innerHTML += `<a class="mappill" href="${SP(nm, pid)}" target="_blank" rel="noopener">${esc(nm)}</a>`; });
  stn.appendChild(sr); sub.appendChild(stn);
  wrap.appendChild(sub);

  const tx = el("section", "card");
  tx.innerHTML = `<h2 class="card-h"><span class="ic">🚕</span>計程車車資（本行程）</h2>`;
  TRIP.taxi.forEach((r) => {
    tx.appendChild(el("div", "trow", `<div class="trow-h">${esc(r.seg)}</div>
      <div class="fare-row"><span class="fare">${esc(r.fare)}</span><span class="muted">${esc(r.time)}${r.note ? " · " + esc(r.note) : ""}</span></div>`));
  });
  wrap.appendChild(tx);

  const rule = el("section", "card");
  rule.innerHTML = `<h2 class="card-h"><span class="ic">💡</span>跳表 · 深夜加成</h2>` +
    `<ul class="ul">${TRIP.taxiRules.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  wrap.appendChild(rule);

  const app = el("section", "card");
  app.innerHTML = `<h2 class="card-h"><span class="ic">📱</span>App ＆ 付款</h2>` +
    `<ul class="ul">${TRIP.taxiApps.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  wrap.appendChild(app);
  return wrap;
}

/* ---------- router ---------- */
const VIEWS = { home: viewHome, days: viewDays, tickets: viewTickets, transit: viewTransit };
function go(name) {
  const main = document.getElementById("view");
  main.innerHTML = "";
  main.appendChild((VIEWS[name] || viewHome)());
  main.scrollTop = 0; window.scrollTo({ top: 0 });
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b.dataset.v === name));
  store.set("lastview", name);
  document.getElementById("statusline").textContent = tripStatus().label;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => go(b.dataset.v)));
  const last = store.get("lastview") || "home";
  go(typeof last === "string" ? last : "home");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
