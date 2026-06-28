# 首爾 2026 · 隨身旅遊手冊（PWA）

一個可離線、可「加到主畫面」的行動端旅遊手冊，內容為 2026/6/30–7/5 首爾 6 天 5 夜行程：航班、住宿、逐日時間軸、票券預訂清單、地鐵與計程車交通、以及各地點的 Google 地圖連結。

- **行動優先**：底部分頁（總覽／行程／票券／交通／實用），單手操作。
- **可離線**：Service Worker 快取，落地沒網路也能查。
- **可安裝**：支援 PWA，iOS／Android 都能「加到主畫面」當 App 用。
- **互動清單**：出發前／票券／購物清單可勾選，狀態存在裝置本機（localStorage）。
- **即時狀態**：首頁自動顯示「出發倒數 N 天」，旅程期間自動標示「今天 Day N」。

### 本版新增功能

- **🕒 即時時間軸高亮「現在該在哪一站」**：首頁依首爾當地時間（`Asia/Seoul`）自動算出「現在站」與「下一站」並高亮；「行程」分頁的當日時間軸同步標示。內建**預覽模擬**，旅程開始前也能輸入任意時間預覽。
- **💱 匯率換算小工具**：KRW ↔ TWD 即時匯率（open.er-api.com），可雙向切換、快捷金額對照、DCC 提醒；離線時用上次匯率估算並記住。
- **🗺 離線 Google 地圖匯入檔（My Maps KML）**：一鍵下載／分享 `seoul2026.kml`（按 Day 分色、含座標與說明），匯入 Google My Maps 後可在地圖 App 內離線使用。
- **☔ 即時天氣**：首頁天氣卡改抓 open-meteo 即時預報，離線自動回退到行前梅雨季預估。
- **🔍 全域搜尋**：跨行程／票券／交通／韓文／購物的關鍵字搜尋，可一鍵跳到對應分頁。
- **💬 常用韓文 + 朗讀**：10 句旅遊常用語，支援 `ko-KR` 語音朗讀與一鍵複製。
- **🌙 深色模式**：右上角切換，記住偏好。
- **🆘 緊急聯絡 / 🛍 購物退稅清單**：可點撥電話、可勾選。
- **📍 三地圖連結**：每個地點同時提供 Google／Naver／Kakao（韓國當地 Naver/Kakao 更準）。

## 檔案結構

```
seoul2026-claude/
├─ index.html              # 外殼
├─ app.css                 # 樣式（紫＝ARMI 應援色）
├─ app.js                  # 全部行程資料 + 畫面渲染 + 即時邏輯
├─ seoul2026.kml           # 離線 Google My Maps 匯入檔（按 Day 分色）
├─ manifest.webmanifest    # PWA manifest
├─ sw.js                   # Service Worker（離線快取，含 KML）
├─ .nojekyll               # 讓 GitHub Pages 直接出檔
└─ icons/                  # App 圖示（192/512/maskable/apple-touch）
```

## 部署到 GitHub Pages

1. 把整個資料夾推到 repo `garychen-soc/seoul2026-claude`：

   ```bash
   cd seoul2026-claude
   git init
   git add .
   git commit -m "Seoul 2026 PWA travel companion"
   git branch -M main
   git remote add origin https://github.com/garychen-soc/seoul2026-claude.git
   git push -u origin main
   ```

   或用 GitHub CLI 一行建立並推送：

   ```bash
   gh repo create garychen-soc/seoul2026-claude --public --source=. --remote=origin --push
   ```

2. 開啟 Pages：repo → **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**。

3. 約 1 分鐘後上線：
   **https://garychen-soc.github.io/seoul2026-claude/**

GitHub Pages 走 HTTPS，正好符合 PWA／Service Worker 的需求；所有路徑都用相對路徑（`./`），放在子目錄也能正常運作。

## 本機預覽

```bash
cd seoul2026-claude
python3 -m http.server 8080
# 開啟 http://localhost:8080
```

（用 `file://` 直接開也看得到畫面，但 Service Worker 需要透過 http(s) 才會註冊。）

## 修改內容

所有行程資料集中在 `app.js` 最上方的 `TRIP` 物件（航班、住宿、清單、天氣、逐日 `days`、票券、交通、車站）。改完重新整理即可；更新後想讓使用者拿到新版，把 `sw.js` 裡的 `CACHE = "seoul2026-v1"` 版本號 +1。
# seoul2026-claude
