# 首爾 2026 · 隨身旅遊手冊（PWA）

一個可離線、可「加到主畫面」的行動端旅遊手冊，內容為 2026/6/30–7/5 首爾 6 天 5 夜行程：航班、住宿、逐日時間軸、票券預訂清單、地鐵與計程車交通、以及各地點的 Google 地圖連結。

- **行動優先**：底部分頁（總覽／行程／票券／交通），單手操作。
- **可離線**：Service Worker 快取，落地沒網路也能查。
- **可安裝**：支援 PWA，iOS／Android 都能「加到主畫面」當 App 用。
- **互動清單**：出發前清單與票券清單可勾選，狀態存在裝置本機（localStorage）。
- **即時狀態**：首頁自動顯示「出發倒數 N 天」，旅程期間自動標示「今天 Day N」。

## 檔案結構

```
seoul2026-claude/
├─ index.html              # 外殼
├─ app.css                 # 樣式（紫＝ARMI 應援色）
├─ app.js                  # 全部行程資料 + 畫面渲染
├─ manifest.webmanifest    # PWA manifest
├─ sw.js                   # Service Worker（離線快取）
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
