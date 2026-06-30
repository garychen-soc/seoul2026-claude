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
    out: { route: "台中 → 首爾", dep: "6/30（二）17:00 · 台中 T2", arr: "6/30 20:45 · 仁川 T1", airline: "德威航空 TW670", no: "TW670" },
    back: { route: "首爾 → 台中", dep: "7/5（日）14:50 · 仁川 T2", arr: "7/5 16:30 · 台中 T1", airline: "真航空 LJ737", no: "LJ737", warn: "回程在仁川「第二航廈 T2」報到，勿到 T1（接駁要 15–20 分）" },
  },
  bus: {
    title: "機場巴士 6015（明洞線）· 已購來回票",
    fare: "大人 ₩17,000／兒童 6–12 歲 ₩12,000（已購來回兌換券，需換實體票）",
    segs: [
      {
        dir: "去程 · 機場 → 市區（6/30 TW670 抵 T1）",
        time: "首班 05:19／末班 22:59，約 10–20 分一班",
        board: "T1 換票後於 1 樓站牌上車；約 60–75 分到明洞",
        note: "你約 21:30–22:00 出關，趕末班 22:59 可行但偏緊；怕來不及就改叫 Kakao T", flag: true,
        pick: "你抵達後可搭：21:24 · 21:39 · 21:55 · 22:11 · 22:27 · 22:43 · 22:59(末班)",
        full: "05:19, 05:39, 05:59, 06:19, 06:39, 06:59, 07:14, 07:29, 07:44, 07:59, 08:14, 08:29, 08:42, 08:55, 09:08, 09:21, 09:32, 09:42, 09:52, 10:02, 10:12, 10:22, 10:33, 10:44, 10:55, 11:06, 11:17, 11:28, 11:39, 11:50, 12:01, 12:12, 12:23, 12:34, 12:45, 12:56, 13:07, 13:18, 13:29, 13:40, 13:51, 14:02, 14:13, 14:24, 14:34, 14:44, 14:54, 15:04, 15:14, 15:23, 15:32, 15:41, 15:50, 15:59, 16:08, 16:17, 16:26, 16:35, 16:44, 16:54, 17:04, 17:14, 17:24, 17:34, 17:45, 17:57, 18:10, 18:23, 18:36, 18:49, 19:02, 19:15, 19:28, 19:41, 19:54, 20:09, 20:24, 20:39, 20:54, 21:09, 21:24, 21:39, 21:55, 22:11, 22:27, 22:43, 22:59",
        fullLabel: "完整發車時刻表（機場→市區 · 平日/週末相同）",
      },
      {
        dir: "回程 · 市區 → 機場（7/5 LJ737 飛 T2）",
        time: "首班 04:24／末班 19:40，約 10–20 分一班",
        board: "明洞站（L7明洞／世宗酒店 Sejong Hotel）上車；約 75–90 分到機場",
        note: "建議 10:00 前上車；巴士先到 T1 再到 T2，務必搭到「T2」下車",
        pick: "7/5（日）建議搭：09:55 · 10:06 · 10:17 · 10:28 · 10:40（再晚較趕）",
        full: "04:24, 04:36, 04:50, 05:04, 05:18, 05:32, 05:46, 06:00, 06:14, 06:27, 06:40, 06:53, 07:06, 07:18, 07:30, 07:42, 07:54, 08:05, 08:16, 08:27, 08:38, 08:49, 09:00, 09:11, 09:22, 09:33, 09:44, 09:55, 10:06, 10:17, 10:28, 10:40, 10:52, 11:04, 11:15, 11:26, 11:37, 11:48, 11:59, 12:10, 12:20, 12:30, 12:41, 12:52, 13:03, 13:14, 13:25, 13:36, 13:47, 13:58, 14:09, 14:20, 14:31, 14:42, 14:53, 15:04, 15:15, 15:26, 15:37, 15:48, 15:59, 16:10, 16:20, 16:30, 16:40, 16:50, 17:00, 17:12, 17:24, 17:36, 17:48, 18:00, 18:12, 18:24, 18:36, 18:48, 19:00, 19:12, 19:25, 19:40",
        fullLabel: "完整發車時刻表（明洞→機場 · 7/5 週日適用；平日班距略不同）",
      },
    ],
    exchange: [
      "憑兌換券需先換「實體紙本車票」才能上車：QR／憑證不能直接搭乘，也不能用機場巴士自動售票機。",
      "換票處：T1 第1航廈 1 樓 6 號門前（內側）；T2 第2航廈 B1 西側停車場巴士售票處。營業 06:00–22:00。",
      "一抵達就把 4 人來回票一次換好（來回＝2 張單程票，不可只換 1 張）；回程那張收好，回程日在明洞直接出示上車。",
      "換票時務必告知目的地「明洞 Myeongdong」，以免拿到錯誤區間的車票。",
      "巴士時間／站點可能臨時變更，搭乘前到官網確認：airportlimousine.co.kr。",
    ],
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
  phrases: [
    { z: "請刷卡結帳", k: "카드로 계산할게요", r: "ka-deu-ro gye-san-hal-ge-yo" },
    { z: "請幫我打包", k: "포장해 주세요", r: "po-jang-hae ju-se-yo" },
    { z: "請不要太辣", k: "덜 맵게 해주세요", r: "deol maep-ge hae-ju-se-yo" },
    { z: "廁所在哪裡？", k: "화장실 어디예요?", r: "hwa-jang-sil eo-di-ye-yo" },
    { z: "請載我到這裡", k: "여기로 가 주세요", r: "yeo-gi-ro ga ju-se-yo" },
    { z: "有中文菜單嗎？", k: "중국어 메뉴 있어요?", r: "jung-gug-eo me-nyu i-sseo-yo" },
    { z: "這個多少錢？", k: "이거 얼마예요?", r: "i-geo eol-ma-ye-yo" },
    { z: "可以退稅嗎？", k: "택스 리펀 되나요?", r: "taek-seu ri-peon doe-na-yo" },
    { z: "請給我一份這個", k: "이거 하나 주세요", r: "i-geo ha-na ju-se-yo" },
    { z: "謝謝", k: "감사합니다", r: "gam-sa-ham-ni-da" },
  ],
  shopping: [
    "Olive Young 旗艦（現場退稅）", "Gentle Monster 墨鏡", "Tamburins 香氛", "Stand Oil 包",
    "Mardi Mercredi 上衣", "Fwee 彩妝", "Amore 聖水體驗館", "HBAF 蜂蜜奶油杏仁",
    "辛拉麵／海苔／零食", "LINE FRIENDS / BT21", "ABC-MART 運動鞋", "退稅收據整理（滿 ₩15,000）", "行李秤確認（LJ737 限 15kg）",
  ],
  emergency: [
    { t: "住宿 Stayrak Hotel", v: "211-5 Toegye-ro, Jung-gu, Seoul", tel: "+82-2-1811-1811" },
    { t: "韓國警察", v: "刑事案件、報案", tel: "112" },
    { t: "消防・救護車", v: "火災、急病送醫", tel: "119" },
    { t: "韓國觀光諮詢專線", v: "中／英／日 24h，可協助翻譯", tel: "1330" },
    { t: "駐韓國台北代表部", v: "急難救助專線 +82-10-9080-2761", tel: "+82-2-399-2767" },
    { t: "旅外國人緊急服務（台灣）", v: "南韓全球免付費", tel: "001-800-0885-0885" },
    { t: "旅外國人急難救助（國內）", v: "免付費", tel: "0800-085-095" },
  ],
  fxTips: [
    "現場刷卡多以 KRW 計價最划算，避免「以 TWD 結帳」的 DCC 動態匯率手續費。",
    "WOWPASS 機場取卡可換匯＋當交通卡＋刷卡，零錢免煩惱。",
    "便利商店、計程車多可刷卡或嗶 T-money；保留少量現金給傳統市場攤販。",
  ],
  pay: {
    note: "依你的條件試算（悠遊付：非新戶＋綁元大；台灣Pay 暑假 20%；信用卡：中信 uniopen、星展 eco、永豐 SPORT 走 Google Pay）。回饋按「每會員／每卡」每月計，行程全在 7 月單月。",
    ladder: [
      { step: "1", q: "店家貼 TWQR 標誌 · 第一順位", use: "悠遊付", rate: "45.5%", d: "免手續費；活動一+二吃到回饋上限（活動二刷~$10,000）；7/3 週五 47.5%" },
      { step: "2", q: "悠遊付活動二上限刷滿（~$10,000）", use: "台灣Pay TWQR", rate: "20%", d: "第二個免手續費水桶！同 TWQR 店改用，再刷~$10,000 拿 $2,000 回饋", flag: true },
      { step: "3", q: "不收 TWQR · 刷卡第一順位", use: "中信 uniopen", rate: "淨 ~9.5%", d: "加碼滿約 $6,250（⚠ 需先確認 7 月加碼是否生效）" },
      { step: "4", q: "uniopen 滿／7月加碼失效", use: "星展 eco", rate: "淨 ~3.5%", d: "自動回饋免任務；刷到加碼滿約 $15,000" },
      { step: "5", q: "想再加一桶／店家收 Google Pay", use: "永豐 SPORT", rate: "毛5%·淨~3.5%", d: "用 Google Pay；需當月運動達標＋自動扣繳；加碼刷~$10,000 封頂；韓國 Google Pay 受理度不一" },
    ],
    tools: [
      { name: "悠遊付 TWQR", net: "45.5%（7/3五 47.5%）", cap: "活動一回饋 $600（刷~$2,350）＋活動二 $2,000（刷~$10,000）", tag: "免手續費" },
      { name: "台灣Pay TWQR", net: "20%", cap: "回饋上限 $2,000/月（刷~$10,000）·7/1–8/31", tag: "免手續費·第二桶" },
      { name: "中信 uniopen", net: "~9.5%", cap: "加碼 500 點/月（刷~$6,250）封頂", tag: "⚠ 加碼至 6/30" },
      { name: "星展 eco", net: "~3.5%", cap: "加碼 600 點/月（刷~$15,000）封頂", tag: "韓國實體·自動" },
      { name: "永豐 SPORT（Google Pay）", net: "~3.5%（毛5%）", cap: "指定支付加碼 300 豐點/月（刷~$10,000）＋運動獎勵 50/月（刷~$5,000）", tag: "需運動達標" },
    ],
    warn: "中信 uniopen 國外實體 +8% 加碼期限標示至 6/30，你 7/1–7/5 出遊在之後。行前務必到中信 App／uniopen 官網確認 7 月加碼是否生效、是否需登錄；若失效，uniopen 掉到基礎 3%，改用星展 eco（淨 3.5%）較好。",
    tips: [
      "超商（Day4 GS25 漢江泡麵、平日補水）多收 TWQR → 悠遊付。",
      "景福宮韓服／N首爾塔纜車／餐廳多不收 TWQR → uniopen 或 eco。",
      "樂天免稅店：悠遊付付一筆可領 100 元樂天券（限量會額滿，早點刷）。",
      "四人想都拿高回饋可各自註冊悠遊付；+15% 需各自綁元大帳戶（無元大者約 30.5%）。",
      "台灣Pay／悠遊付 TWQR 皆限金融卡或帳戶扣款（不支援信用卡）；台灣Pay 當悠遊付刷爆上限後的接力桶。",
      "星展 eco／uniopen 加碼需用實體卡或 Apple／Samsung Pay、外幣結算。",
      "永豐 SPORT 5% 需當月於大咖DACARD APP 達 1 萬大卡或 Apple Watch 畫圈 10 次＋設自動扣繳，否則只剩~1%；韓國 Google Pay 受理不如實體刷卡普及。",
    ],
  },
};

/* ---------- utilities ---------- */
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem("s26:" + k) || "false"); } catch { return false; } },
  set: (k, v) => { try { localStorage.setItem("s26:" + k, JSON.stringify(v)); } catch {} },
};
const mapLink = (url, label) => `<a class="maplink" href="${url}" target="_blank" rel="noopener">📍 ${esc(label)}</a>`;
const naver = (q) => "https://map.naver.com/p/search/" + encodeURIComponent(q);
const kakao = (q) => "https://map.kakao.com/link/search/" + encodeURIComponent(q);
// Google (precise CID/search) + Naver + Kakao for any item that has a map.
const mapTrio = (it) => {
  if (!it.m) return "";
  const q = it.mp || it.a;
  return `<div class="mtrio"><a href="${it.m}" target="_blank" rel="noopener">Google</a>` +
    `<a href="${naver(q)}" target="_blank" rel="noopener">Naver</a>` +
    `<a href="${kakao(q)}" target="_blank" rel="noopener">Kakao</a></div>`;
};

/* ---------- live state (weather + fx) ---------- */
const live = {
  fx: { rate: Number(localStorage.getItem("s26:fxRate")) || 0.0235, updated: localStorage.getItem("s26:fxUpdated") || "", loading: false, offline: !localStorage.getItem("s26:fxRate") },
  wx: { days: null, loading: false },
};

/* ---------- Seoul time helpers ---------- */
// Minutes since local midnight in Asia/Seoul, plus the M/D string for "today".
function seoulNow() {
  const override = sessionStorage.getItem("s26:simNow"); // "M/D HH:MM" for preview
  if (override) {
    const m = override.match(/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})/);
    if (m) return { md: `${+m[1]}/${+m[2]}`, mins: +m[3] * 60 + +m[4], sim: true };
  }
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date()).reduce((o, x) => (o[x.type] = x.value, o), {});
  return { md: `${+p.month}/${+p.day}`, mins: (+p.hour % 24) * 60 + +p.minute, sim: false };
}
const parseHM = (t) => { const m = String(t).match(/(\d{1,2}):(\d{2})/); return m ? +m[1] * 60 + +m[2] : null; };

// Which day/item are we "at" right now? Returns null when outside the trip window.
function currentWhere() {
  const now = seoulNow();
  const day = TRIP.days.find((d) => d.date === now.md);
  if (!day) return null;
  const timed = day.items.map((it, i) => ({ it, i, mins: parseHM(it.t) })).filter((x) => x.mins != null);
  if (!timed.length) return { day, idx: -1, next: null, beforeFirst: false };
  if (now.mins < timed[0].mins) return { day, idx: -1, next: timed[0], beforeFirst: true };
  let cur = timed[0];
  for (const x of timed) if (x.mins <= now.mins) cur = x; else break;
  const next = timed.find((x) => x.mins > now.mins) || null;
  return { day, idx: cur.i, cur, next, beforeFirst: false };
}

/* ---------- live weather (open-meteo, Seoul) ---------- */
const WX_ICON = (c) => c === 0 ? "☀" : [1, 2, 3].includes(c) ? "⛅" : [45, 48].includes(c) ? "🌫" : [51, 53, 55, 56, 57].includes(c) ? "🌦" : [61, 63, 65, 66, 67, 80, 81, 82].includes(c) ? "🌧" : [71, 73, 75, 77, 85, 86].includes(c) ? "🌨" : [95, 96, 99].includes(c) ? "⛈" : "🌡";
function loadWeather(after) {
  if (live.wx.loading || live.wx.days) { after && after(); return; }
  live.wx.loading = true;
  fetch("https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul&forecast_days=4", { cache: "no-store" })
    .then((r) => r.json()).then((j) => {
      const d = j.daily; if (!d || !d.time) throw 0;
      live.wx.days = d.time.map((iso, i) => ({
        md: (+iso.slice(5, 7)) + "/" + (+iso.slice(8, 10)),
        code: d.weather_code[i], max: Math.round(d.temperature_2m_max[i]), min: Math.round(d.temperature_2m_min[i]),
        rain: d.precipitation_probability_max ? d.precipitation_probability_max[i] : null,
      }));
    }).catch(() => { live.wx.days = null; })
    .finally(() => { live.wx.loading = false; after && after(); });
}

/* ---------- live FX (KRW -> TWD) ---------- */
function loadFx(after) {
  if (live.fx.loading) { after && after(); return; }
  live.fx.loading = true;
  fetch("https://open.er-api.com/v6/latest/KRW", { cache: "no-store" })
    .then((r) => r.json()).then((j) => {
      if (!j.rates || !j.rates.TWD) throw 0;
      live.fx.rate = j.rates.TWD; live.fx.offline = false;
      live.fx.updated = (j.time_last_update_utc || "").replace(/ \d{2}:.*$/, "");
      localStorage.setItem("s26:fxRate", String(live.fx.rate));
      localStorage.setItem("s26:fxUpdated", live.fx.updated);
    }).catch(() => { live.fx.offline = true; })
    .finally(() => { live.fx.loading = false; after && after(); });
}

/* ---------- Korean TTS ---------- */
function speakKo(text) {
  if (!("speechSynthesis" in window)) { alert("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = "ko-KR"; u.rate = 0.85;
  speechSynthesis.speak(u);
}

/* ---------- offline KML download / share ---------- */
function downloadKml() {
  const url = "./seoul2026.kml";
  if (navigator.share && navigator.canShare) {
    fetch(url).then((r) => r.blob()).then((b) => {
      const file = new File([b], "seoul2026.kml", { type: "application/vnd.google-earth.kml+xml" });
      if (navigator.canShare({ files: [file] })) return navigator.share({ files: [file], title: "首爾 2026 行程地圖" });
      throw 0;
    }).catch(() => triggerDownload(url));
  } else triggerDownload(url);
}
function triggerDownload(url) {
  const a = document.createElement("a"); a.href = url; a.download = "seoul2026.kml";
  document.body.appendChild(a); a.click(); a.remove();
}

/* ---------- trip status ---------- */
function tripStatus() {
  // honor the preview simulation so the whole UI stays consistent
  const sim = sessionStorage.getItem("s26:simNow");
  if (sim) {
    const md = (sim.match(/(\d{1,2})\/(\d{1,2})/) || []).slice(1).map(Number);
    const di = TRIP.days.findIndex((d) => d.date === `${md[0]}/${md[1]}`);
    if (di >= 0) return { phase: "during", label: `Day ${di + 1} · 今天`, dayIndex: di };
  }
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

/* ---------- "now" card (real-time timeline highlight) ---------- */
function itemRow(it, cls) {
  const note = it.n ? `<div class="now-sub">${esc(it.n)}</div>` : "";
  return `<div class="now-line ${cls}"><div class="now-time">${esc(it.t)}</div><div class="now-act">${esc(it.a)}${note}${mapTrio(it)}</div></div>`;
}
function fillNow(sec) {
  const st = tripStatus();
  const where = currentWhere();
  const now = seoulNow();
  let body = "", head = "現在該在哪一站", pulse = "";

  if (where && where.beforeFirst) {
    // a trip day, but the first activity hasn't started yet
    head = `Day ${where.day.n} · ${where.day.date} 即將開始`;
    body = `<div class="now-msg">今天還沒開始，第一站：</div>${itemRow(where.next.it, "is-next")}`;
  } else if (where) {
    // mid-itinerary: highlight current + next
    pulse = "live";
    head = `現在該在哪一站 · Day ${where.day.n}`;
    body = `<div class="now-label">📍 現在</div>${where.cur ? itemRow(where.cur.it, "is-now") : ""}`;
    if (where.next) body += `<div class="now-label">下一站 · ${esc(where.next.it.t)}</div>${itemRow(where.next.it, "is-next")}`;
    else body += `<div class="now-msg">今天行程已到最後一站 🌙</div>`;
  } else if (st.phase === "before") {
    const first = TRIP.days[0].items[0];
    head = "出發前預告";
    body = `<div class="now-msg">距離出發還有 <b>${st.label.replace(/\D/g, "")}</b> 天，第一站是：</div>${itemRow(first, "is-next")}`;
  } else if (st.phase === "after") {
    head = "旅程結束";
    body = `<div class="now-msg">六天五夜首爾行已完成，一路順風 💜</div>`;
  } else {
    body = `<div class="now-msg">今天不在行程日期內。</div>`;
  }

  const sim = now.sim ? `<span class="now-sim">模擬 ${now.md} ${String(Math.floor(now.mins / 60)).padStart(2, "0")}:${String(now.mins % 60).padStart(2, "0")}</span>` : "";
  sec.innerHTML = `
    <div class="now-head"><span class="now-dot ${pulse}"></span><h2>${head}</h2>${sim}
      <button class="now-prev" id="nowPrev" title="預覽任意時間">${now.sim ? "結束預覽" : "預覽"}</button></div>
    ${body}
    <div class="now-preview" id="nowPreview" hidden>
      <input id="nowSim" type="datetime-local" min="2026-06-30T00:00" max="2026-07-05T23:59" value="2026-07-02T15:30">
      <button class="now-go" id="nowGo">看那一刻</button>
    </div>`;

  sec.querySelector("#nowPrev").addEventListener("click", () => {
    if (now.sim) { sessionStorage.removeItem("s26:simNow"); fillNow(sec); return; }
    const p = sec.querySelector("#nowPreview"); p.hidden = !p.hidden;
  });
  const go = sec.querySelector("#nowGo");
  if (go) go.addEventListener("click", () => {
    const v = sec.querySelector("#nowSim").value; // 2026-07-02T15:30
    const m = v.match(/-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (m) { sessionStorage.setItem("s26:simNow", `${+m[1]}/${+m[2]} ${m[3]}:${m[4]}`); fillNow(sec); }
  });
}
let nowTimer = null;
function nowCard() {
  const sec = el("section", "card nowcard");
  fillNow(sec);
  clearInterval(nowTimer);
  nowTimer = setInterval(() => { if (document.body.contains(sec)) fillNow(sec); else clearInterval(nowTimer); }, 30000);
  return sec;
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

  // live "now — which station should I be at" card
  wrap.appendChild(nowCard());

  // flights
  const f = el("section", "card");
  const fr = (no) => `<a class="fr24" href="https://www.flightradar24.com/data/flights/${no.toLowerCase()}" target="_blank" rel="noopener">📡 即時航班地圖 ${esc(no)}</a>`;
  f.innerHTML = `<h2 class="card-h"><span class="ic">✈</span>航班</h2>
    <div class="flight">
      <div class="flight-route">${esc(TRIP.flights.out.route)}</div>
      <div class="flight-line"><span>出發</span>${esc(TRIP.flights.out.dep)}</div>
      <div class="flight-line"><span>抵達</span>${esc(TRIP.flights.out.arr)}</div>
      <div class="flight-air">${esc(TRIP.flights.out.airline)}</div>
      ${fr(TRIP.flights.out.no)}
    </div>
    <div class="flight">
      <div class="flight-route">${esc(TRIP.flights.back.route)}</div>
      <div class="flight-line"><span>出發</span>${esc(TRIP.flights.back.dep)}</div>
      <div class="flight-line"><span>抵達</span>${esc(TRIP.flights.back.arr)}</div>
      <div class="flight-air">${esc(TRIP.flights.back.airline)}</div>
      ${fr(TRIP.flights.back.no)}
      <div class="warn">⚠ ${esc(TRIP.flights.back.warn)}</div>
    </div>`;
  wrap.appendChild(f);

  // airport bus 6015 (round-trip voucher already purchased)
  const bs = el("section", "card");
  const B = TRIP.bus;
  bs.innerHTML = `<h2 class="card-h"><span class="ic">🚌</span>${esc(B.title)}</h2>
    <p class="p muted">${esc(B.fare)}</p>
    ${B.segs.map((s) => `<div class="bus-seg${s.flag ? " flag" : ""}">
      <div class="bus-dir">${esc(s.dir)}</div>
      <div class="bus-t">🕐 ${esc(s.time)}</div>
      <div class="bus-b">📍 ${esc(s.board)}</div>
      <div class="bus-n">${esc(s.note)}</div>
      ${s.pick ? `<div class="bus-pick">⭐ ${esc(s.pick)}</div>` : ""}
      ${s.full ? `<details class="bus-full"><summary>${esc(s.fullLabel || "完整發車時刻表")}</summary><div class="bus-times">${s.full.split(/,\s*/).map((t) => `<span>${esc(t)}</span>`).join("")}</div></details>` : ""}
    </div>`).join("")}
    <div class="bus-sub">🎫 取票說明（先換實體票）</div>
    <ul class="ul">${B.exchange.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  wrap.appendChild(bs);

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

  // weather (live open-meteo, falls back to static 梅雨季 data offline)
  const w = el("section", "card");
  const fillWx = () => {
    const liveByMd = {};
    if (live.wx.days) live.wx.days.forEach((x) => (liveByMd[x.md] = x));
    const chips = TRIP.weather.days.map((x) => {
      const lv = liveByMd[x.d];
      const icon = lv ? WX_ICON(lv.code) : x.w;
      const temp = lv ? `${lv.min}–${lv.max}°` + (lv.rain != null ? ` ☔${lv.rain}%` : "") : esc(x.t);
      return `<div class="wchip${lv ? " is-live" : ""}"><div class="wchip-d">${esc(x.d)}</div><div class="wchip-i">${icon}</div><div class="wchip-t">${temp}</div></div>`;
    }).join("");
    const src = live.wx.days ? `<span class="wx-live">● 即時更新</span>` : (live.wx.loading ? "讀取即時天氣…" : "離線：行前梅雨季預估");
    w.innerHTML = `<h2 class="card-h"><span class="ic">☔</span>天氣 · 梅雨季 <span class="wx-tag">${src}</span></h2>
      <p class="p">${esc(TRIP.weather.intro)}</p>
      <div class="wgrid">${chips}</div>
      <p class="p tip">${esc(TRIP.weather.tips)}</p>`;
  };
  fillWx();
  loadWeather(fillWx);
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
  const where = isToday ? currentWhere() : null;
  const curIdx = where && where.day === d ? where.idx : -2;
  const nextIdx = where && where.day === d && where.next ? where.next.i : -2;
  const tl = el("div", "timeline");
  d.items.forEach((i, ix) => {
    const hl = ix === curIdx ? " is-now" : ix === nextIdx ? " is-next" : "";
    const row = el("div", "tl-row" + (i.flag ? " flag" : "") + hl);
    const tagNow = ix === curIdx ? '<span class="tl-badge">現在</span>' : ix === nextIdx ? '<span class="tl-badge nx">下一站</span>' : "";
    const note = i.n ? `<div class="tl-note">${esc(i.n)}</div>` : "";
    row.innerHTML = `<div class="tl-time">${esc(i.t)}</div>
      <div class="tl-dot"></div>
      <div class="tl-body"><div class="tl-act">${tagNow}${esc(i.a)}</div>${note}${mapTrio(i)}</div>`;
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

function viewTools() {
  const wrap = el("div", "stack");

  /* 韓國支付攻略（依使用者持有的卡客製） */
  const pay = el("section", "card");
  const P = TRIP.pay;
  pay.innerHTML = `<h2 class="card-h"><span class="ic">💳</span>韓國支付攻略（你的卡）</h2>
    <p class="p muted">${esc(P.note)}</p>
    <div class="pay-ladder">${P.ladder.map((s) => `
      <div class="pay-step${s.flag ? " flag" : ""}">
        <div class="pay-no">${esc(s.step)}</div>
        <div class="pay-body"><div class="pay-q">${esc(s.q)}</div>
          <div class="pay-use">${esc(s.use)} <span class="pay-rate">${esc(s.rate)}</span></div>
          <div class="pay-d">${esc(s.d)}</div></div>
      </div>`).join("")}</div>
    <div class="warn">⚠ ${esc(P.warn)}</div>
    <div class="pay-tools">${P.tools.map((t) => `
      <div class="pay-tool"><div class="pt-top"><span class="pt-name">${esc(t.name)}</span><span class="pt-tag">${esc(t.tag)}</span></div>
        <div class="pt-net">淨回饋 <b>${esc(t.net)}</b></div>
        <div class="pt-cap">${esc(t.cap)}</div></div>`).join("")}</div>
    <ul class="ul" style="margin-top:10px">${P.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  wrap.appendChild(pay);

  /* 匯率換算器 */
  const fx = el("section", "card");
  fx.innerHTML = `<h2 class="card-h"><span class="ic">💱</span>匯率換算 <span class="wx-tag" id="fxState"></span></h2>
    <div class="fxrow">
      <div class="fxin"><label>金額</label><input id="fxAmt" type="number" inputmode="decimal" min="0" step="1000" value="${esc(localStorage.getItem("s26:fxAmt") || "10000")}"></div>
      <button class="fxswap" id="fxSwap" title="切換方向">⇅</button>
      <div class="fxin"><label>方向</label>
        <select id="fxDir"><option value="K2T">韓元 → 台幣</option><option value="T2K">台幣 → 韓元</option></select></div>
    </div>
    <div class="fxout" id="fxOut">—</div>
    <div class="fxquick" id="fxQuick"></div>
    <div class="actions-line"><button class="ghost-btn" id="fxRefresh">更新即時匯率</button></div>
    <ul class="ul" style="margin-top:10px">${TRIP.fxTips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  wrap.appendChild(fx);

  const amt = fx.querySelector("#fxAmt"), dir = fx.querySelector("#fxDir");
  dir.value = localStorage.getItem("s26:fxDir") || "K2T";
  const calc = () => {
    const r = live.fx.rate || 0.0235, n = Number(amt.value || 0);
    localStorage.setItem("s26:fxAmt", amt.value); localStorage.setItem("s26:fxDir", dir.value);
    fx.querySelector("#fxOut").innerHTML = dir.value === "K2T"
      ? `${n.toLocaleString()} <span class="fxu">KRW</span> ≈ <b>${(n * r).toLocaleString(undefined, { maximumFractionDigits: 0 })}</b> <span class="fxu">TWD</span>`
      : `${n.toLocaleString()} <span class="fxu">TWD</span> ≈ <b>${(n / r).toLocaleString(undefined, { maximumFractionDigits: 0 })}</b> <span class="fxu">KRW</span>`;
    fx.querySelector("#fxQuick").innerHTML = [1000, 5000, 10000, 50000].map((k) =>
      `<span class="fxchip">₩${k.toLocaleString()} ≈ NT$${Math.round(k * r)}</span>`).join("");
    fx.querySelector("#fxState").innerHTML = live.fx.loading ? "更新中…" :
      live.fx.offline ? `離線估算${live.fx.updated ? "（" + esc(live.fx.updated) + "）" : ""}` :
        `<span class="wx-live">● ${esc(live.fx.updated || "即時")}</span>`;
  };
  amt.addEventListener("input", calc);
  dir.addEventListener("change", calc);
  fx.querySelector("#fxSwap").addEventListener("click", () => { dir.value = dir.value === "K2T" ? "T2K" : "K2T"; calc(); });
  fx.querySelector("#fxRefresh").addEventListener("click", () => { calc(); loadFx(calc); });
  calc(); loadFx(calc);

  /* 離線地圖 KML */
  const km = el("section", "card");
  km.innerHTML = `<h2 class="card-h"><span class="ic">🗺</span>離線地圖（Google My Maps）</h2>
    <p class="p muted">下載整趟行程的 <b>.kml</b>，匯入 Google My Maps 後，在 Google 地圖 App 內可離線查看所有景點與餐廳（按 Day 分色）。</p>
    <div class="actions-line"><button class="primary-btn" id="kmlBtn">⬇ 下載 / 分享 KML</button>
      <a class="ghost-btn" href="https://www.google.com/maps/d/" target="_blank" rel="noopener">開啟 My Maps</a></div>
    <ol class="ol">
      <li>下載 <code>seoul2026.kml</code>（離線也可下載，已快取）。</li>
      <li>電腦開 <b>google.com/maps/d</b> → 建立新地圖 → 匯入 → 選 KML。</li>
      <li>手機 Google 地圖 →「你的地點 / 地圖」即可看到，景點先「⭐ 儲存」並下載離線地圖區域。</li>
    </ol>`;
  wrap.appendChild(km);
  km.querySelector("#kmlBtn").addEventListener("click", downloadKml);

  /* 韓文常用語 + TTS */
  const ph = el("section", "card");
  ph.innerHTML = `<h2 class="card-h"><span class="ic">💬</span>常用韓文（點 🔊 朗讀）</h2>`;
  TRIP.phrases.forEach((p) => {
    const row = el("div", "phrase");
    row.innerHTML = `<div class="ph-body"><div class="ph-z">${esc(p.z)}</div><div class="ph-k">${esc(p.k)}</div><div class="ph-r">${esc(p.r)}</div></div>
      <div class="ph-act"><button class="ph-btn" data-say="${esc(p.k)}">🔊</button><button class="ph-btn" data-cp="${esc(p.k)}">⧉</button></div>`;
    ph.appendChild(row);
  });
  wrap.appendChild(ph);
  ph.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", () => speakKo(b.dataset.say)));
  ph.querySelectorAll("[data-cp]").forEach((b) => b.addEventListener("click", () => {
    navigator.clipboard?.writeText(b.dataset.cp); b.textContent = "✓"; setTimeout(() => (b.textContent = "⧉"), 1000);
  }));

  /* 購物 / 退稅清單 */
  const sh = el("section", "card");
  sh.innerHTML = `<h2 class="card-h"><span class="ic">🛍</span>購物 · 退稅清單</h2>`;
  const list = el("div", "checklist");
  TRIP.shopping.forEach((x, i) => {
    const id = "shop" + i;
    const row = el("label", "check");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = store.get(id);
    cb.addEventListener("change", () => { store.set(id, cb.checked); row.classList.toggle("done", cb.checked); });
    row.classList.toggle("done", cb.checked);
    row.appendChild(cb);
    row.appendChild(el("div", "check-body", `<div class="check-t">${esc(x)}</div>`));
    list.appendChild(row);
  });
  sh.appendChild(list);
  wrap.appendChild(sh);

  /* 緊急聯絡 */
  const em = el("section", "card");
  em.innerHTML = `<h2 class="card-h"><span class="ic">🆘</span>緊急聯絡</h2>` +
    TRIP.emergency.map((e) => `<a class="emrow" href="tel:${e.tel.replace(/[^+\d]/g, "")}">
      <div class="em-body"><div class="em-t">${esc(e.t)}</div><div class="em-v">${esc(e.v)}</div></div>
      <div class="em-tel">${esc(e.tel)} 📞</div></a>`).join("");
  wrap.appendChild(em);

  return wrap;
}

/* ---------- router ---------- */
const VIEWS = { home: viewHome, days: viewDays, tickets: viewTickets, transit: viewTransit, tools: viewTools };
function go(name) {
  const sw = document.getElementById("searchWrap");
  if (sw && !sw.hidden) toggleSearch(false);
  const main = document.getElementById("view");
  main.innerHTML = "";
  main.appendChild((VIEWS[name] || viewHome)());
  main.scrollTop = 0; window.scrollTo({ top: 0 });
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b.dataset.v === name));
  store.set("lastview", name);
  document.getElementById("statusline").textContent = tripStatus().label;
}

/* ---------- global search ---------- */
function searchIndex() {
  const out = [];
  TRIP.days.forEach((d) => d.items.forEach((i) =>
    out.push({ cat: `Day ${d.n}·${d.date}`, title: i.a, sub: i.n || "", m: i.m, mp: i.mp || i.a, go: "days" })));
  TRIP.tickets.forEach((t) => out.push({ cat: "票券", title: t.name, sub: t.note, go: "tickets" }));
  TRIP.taxi.forEach((t) => out.push({ cat: "計程車", title: t.seg, sub: `${t.fare} · ${t.time}`, go: "transit" }));
  TRIP.subway.forEach((s) => out.push({ cat: "地鐵", title: s.seg, sub: `${s.line} · ${s.exit}`, go: "transit" }));
  TRIP.phrases.forEach((p) => out.push({ cat: "韓文", title: `${p.z} — ${p.k}`, sub: p.r, go: "tools" }));
  TRIP.shopping.forEach((x) => out.push({ cat: "購物", title: x, sub: "", go: "tools" }));
  return out;
}
let SIDX = null;
function runSearch(q) {
  const box = document.getElementById("searchRes");
  q = q.trim().toLowerCase();
  if (!q) { box.innerHTML = `<div class="sres-empty">輸入關鍵字搜尋全部行程、票券、交通、韓文與購物。</div>`; return; }
  SIDX = SIDX || searchIndex();
  const hits = SIDX.filter((x) => `${x.cat} ${x.title} ${x.sub}`.toLowerCase().includes(q)).slice(0, 40);
  box.innerHTML = hits.length ? hits.map((h) =>
    `<div class="sres"><div class="sres-cat">${esc(h.cat)}</div>
      <div class="sres-t">${esc(h.title)}</div>${h.sub ? `<div class="sres-s">${esc(h.sub)}</div>` : ""}
      <div class="sres-go">${h.m ? mapTrio(h) : ""}<button class="ghost-btn sres-jump" data-go="${h.go}">前往「${h.go === "days" ? "行程" : h.go === "tickets" ? "票券" : h.go === "transit" ? "交通" : "實用"}」</button></div></div>`).join("")
    : `<div class="sres-empty">找不到「${esc(q)}」相關內容。</div>`;
  box.querySelectorAll(".sres-jump").forEach((b) => b.addEventListener("click", () => { toggleSearch(false); go(b.dataset.go); }));
}
function toggleSearch(force) {
  const w = document.getElementById("searchWrap");
  const open = force != null ? force : w.hidden;
  w.hidden = !open;
  document.getElementById("searchBtn").classList.toggle("on", open);
  if (open) { const b = document.getElementById("searchBox"); runSearch(b.value || ""); b.focus(); }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => go(b.dataset.v)));

  // dark mode
  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    document.getElementById("themeBtn").textContent = t === "dark" ? "☀️" : "🌙";
  };
  applyTheme(localStorage.getItem("s26:theme") || "light");
  document.getElementById("themeBtn").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("s26:theme", next); applyTheme(next);
  });

  // search
  document.getElementById("searchBtn").addEventListener("click", () => toggleSearch());
  document.getElementById("searchBox").addEventListener("input", (e) => runSearch(e.target.value));

  const last = store.get("lastview") || "home";
  go(typeof last === "string" ? last : "home");

  // Register SW; auto-reload once when a NEW version takes control (skip first install).
  if ("serviceWorker" in navigator) {
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded || !hadController) return;
      reloaded = true; location.reload();
    });
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
