# 📚 AI Reading Timer - 內建 AI 讀書計時助手

一款功能完整的桌面讀書計時器應用，融合**番茄鐘技巧**、**任務管理**、**學習統計**和**AI 助理**功能，幫助你提升學習效率和專注力。

## ✨ 核心功能

### 1. ⏱️ 計時器面板
- 自定義番茄鐘時間（讀書和休息時間）
- 開始/暫停/重設/跳過功能
- 視覺化計時顯示
- 計時完成時自動播放通知聲音

### 2. 📋 任務管理
- 新增、編輯、刪除任務
- 標記任務完成/未完成
- 任務完成度統計
- 本地持久化存儲

### 3. 📊 統計分析
- 每日學習時長統計
- 番茄鐘完成次數
- 完成任務統計
- 本週學習趨勢圖表
- 視覺化數據展示（使用 Recharts）

### 4. 🤖 AI 讀書助理
- **獲取建議**：輸入學習狀況，AI 根據你的數據提供改善專注力的建議和激勵話語
- **生成學習計劃**：輸入學習目標，AI 自動規劃多天學習計劃
- 支持 OpenAI 和 Google Gemini API
- 智能緩存和錯誤處理

## 🛠️ 技術棧

- **框架**：Electron + React 18 + TypeScript
- **樣式**：Tailwind CSS + PostCSS
- **構建**：Vite
- **狀態管理**：Zustand（帶持久化）
- **圖表**：Recharts
- **API 集成**：Axios + OpenAI/Gemini API

## 📦 項目結構

```
ai-reading-timer/
├── src/
│   ├── main/
│   │   ├── electron.ts          # Electron 主進程
│   │   └── preload.ts           # Electron 預載腳本
│   ├── renderer/
│   │   ├── App.tsx              # 主應用元件
│   │   ├── main.tsx             # React 入口
│   │   ├── components/
│   │   │   ├── TimerPanel.tsx   # 計時器元件
│   │   │   ├── TaskPanel.tsx    # 任務管理元件
│   │   │   ├── StatisticsPanel.tsx  # 統計圖表元件
│   │   │   └── AIAssistantPanel.tsx # AI 助理元件
│   │   ├── hooks/
│   │   │   ├── useStore.ts      # Zustand 數據存儲
│   │   │   └── useTimer.ts      # 計時器邏輯
│   │   ├── services/
│   │   │   └── aiService.ts     # AI API 服務
│   │   └── styles/
│   │       └── globals.css      # 全局樣式
├── electron/
│   ├── main.ts
│   └── preload.ts
├── public/                       # 靜態資源
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── index.html
```

## 🚀 快速開始

### 前提條件
- Node.js (v16 或更高)
- npm 或 yarn
- API Key（OpenAI 或 Google Gemini）

### 1️⃣ 安裝依賴

```bash
# 進入項目目錄
cd /workspaces/topic

# 安裝依賴
npm install

# 或使用 yarn
yarn install
```

### 2️⃣ 環境配置

創建 `.env` 文件（基於 `.env.example`）：

```bash
# 複製示例環境文件
cp .env.example .env

# 編輯 .env 文件，添加你的 API Key
```

**.env 文件配置說明**：

```env
# AI 服務提供商選擇（OPENAI 或 GEMINI）
VITE_AI_PROVIDER=OPENAI

# ============ OpenAI 配置 ============
VITE_OPENAI_API_KEY=sk-your-openai-key-here
VITE_OPENAI_MODEL=gpt-4-turbo-preview  # 或 gpt-3.5-turbo

# ============ Google Gemini 配置 ============
VITE_GEMINI_API_KEY=your-gemini-key-here

# 應用配置
VITE_APP_NAME=AI Reading Timer
VITE_APP_VERSION=1.0.0
```

**如何獲取 API Key**：

#### OpenAI
1. 訪問 [OpenAI Platform](https://platform.openai.com/)
2. 登錄或創建帳戶
3. 進入 [API Keys 頁面](https://platform.openai.com/account/api-keys)
4. 點擊「Create new secret key」
5. 複製 key 到 `.env` 文件

#### Google Gemini
1. 訪問 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 點擊「Create API Key」
3. 複製 key 到 `.env` 文件

### 3️⃣ 開發模式運行

```bash
# 啟動開發服務器（自動刷新）
npm run dev

# 或分別運行 Vite 和 Electron
npm run vite          # 終端 1
npm run electron      # 終端 2
```

### 4️⃣ 構建生產版本

```bash
# 構建 Web 版本
npm run build

# 使用 Electron Builder 打包應用
npm run dist

# 構建的文件位置：
# - Windows: dist/AI Reading Timer Setup.exe
# - macOS: dist/AI Reading Timer.dmg
# - Linux: dist/AI Reading Timer.AppImage
```

## 🎯 使用指南

### 計時器面板
1. 設定專注時間和休息時間
2. 點擊「開始」開始計時
3. 計時完成時會自動切換到休息或下一輪
4. 使用「暫停」按鈕臨時暫停計時
5. 使用「重設」按鈕重新開始

### 任務管理
1. 在輸入框輸入任務
2. 點擊「新增」按鈕添加到清單
3. 完成任務時勾選複選框
4. 點擊「🗑️」刪除任務
5. 實時查看完成進度

### 統計分析
1. 自動記錄每次計時會話
2. 查看本週學習時間和番茄鐘次數
3. 分析學習趨勢圖表
4. 了解學習進度

### AI 助理
#### 獲取建議
1. 切換到「AI 助理」標籤
2. 在「獲取建議」選項卡中描述你的學習狀況
3. 點擊「獲取 AI 建議」按鈕
4. AI 將根據你的狀況和統計數據提供改善建議

#### 生成學習計劃
1. 在「生成計劃」選項卡中輸入學習目標
2. 調整計劃天數（3-30 天）
3. 點擊「生成學習計劃」按鈕
4. AI 將生成詳細的日程安排

## 🎨 Tailwind CSS 配置指南

### 顏色方案

應用使用統一的色彩系統：

```tailwind
primary    - 主要操作色（藍色系）
focus      - 重點強調色（橙紅色系）
slate      - 中性色（灰度系）
```

### 自定義組件類

應用中預定義了多個 Tailwind 組件類：

```css
.btn-primary      # 主要按鈕
.btn-secondary    # 次要按鈕
.input-field      # 輸入框
.card             # 卡片容器
.focus-ring       # 焦點環
```

### 響應式設計

- 移動端優先（Mobile First）
- 斷點：md (768px)
- 流暢的響應式佈局

## 🔐 安全最佳實踐

1. **不要提交 .env 文件**
   ```bash
   # .gitignore 已包含 .env
   .env
   .env.local
   ```

2. **保護 API Key**
   - 不要在代碼中硬編碼 API key
   - 使用環境變數
   - 定期輪換 key

3. **Electron 安全**
   - 啟用了 Context Isolation
   - 禁用了 Node Integration
   - 使用 Preload 腳本進行 IPC

## 🐛 常見問題排查

### 問題：「找不到 API Key」
**解決**：
1. 確認 `.env` 文件存在
2. 檢查 `VITE_OPENAI_API_KEY` 或 `VITE_GEMINI_API_KEY` 已設置
3. 重啟開發服務器

### 問題：「計時器不工作」
**解決**：
1. 檢查瀏覽器控制台是否有錯誤
2. 確認 useTimer hook 正確使用
3. 檢查 Zustand 存儲是否初始化

### 問題：「圖表不顯示」
**解決**：
1. 確認 Recharts 已安裝
2. 檢查是否有數據記錄（需要至少一個計時會話）
3. 查看瀏覽器控制台的錯誤信息

### 問題：「AI 建議返回錯誤」
**解決**：
1. 驗證 API Key 有效性
2. 檢查 API 配額是否充足
3. 確認網絡連接正常
4. 查看 aiService.ts 的錯誤日誌

## 📝 開發命令參考

```bash
# 開發相關
npm run dev              # 啟動開發模式
npm run vite             # 單獨啟動 Vite
npm run electron         # 單獨啟動 Electron
npm run type-check       # TypeScript 類型檢查

# 構建相關
npm run build            # 構建 Web 版本
npm run dist             # 打包 Electron 應用
npm run electron-dev     # 以開發模式運行 Electron

# 包管理
npm install              # 安裝依賴
npm update               # 更新依賴
```

## 📚 項目依賴說明

| 包名 | 版本 | 用途 |
|------|------|------|
| react | ^18.2.0 | UI 框架 |
| electron | ^27.0.0 | 桌面應用框架 |
| tailwindcss | ^3.4.0 | CSS 框架 |
| zustand | ^4.4.0 | 狀態管理 |
| recharts | ^2.10.0 | 數據可視化 |
| openai | ^4.26.0 | OpenAI API |
| vite | ^5.0.0 | 構建工具 |
| typescript | ^5.0.0 | 類型檢查 |

## 🎓 學習資源

- [React 官方文檔](https://react.dev)
- [Electron 官方文檔](https://www.electronjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com)
- [TypeScript 手冊](https://www.typescriptlang.org/docs)
- [OpenAI API 文檔](https://platform.openai.com/docs)
- [Google Gemini API 文檔](https://ai.google.dev)

## 💡 未來優化方向

- [ ] 添加本地數據備份功能
- [ ] 實現用戶登錄和雲同步
- [ ] 添加音樂播放功能支持專注學習
- [ ] 實現計時器提醒和通知
- [ ] 支持更多 AI 提供商（Claude、LLaMA 等）
- [ ] 添加數據導出（CSV、PDF）
- [ ] 移動端應用版本
- [ ] 多語言支持

## 📄 許可證

MIT License - 自由使用和修改

## 👨‍💻 貢獻

歡迎提交 Pull Requests 和 Issues！

## 📞 支持

有任何問題或建議，歡迎通過以下方式聯繫：
- 提交 GitHub Issue
- 發送 Pull Request
- 發送郵件反饋

---

**祝你學習愉快，進步順利！** 🚀✨