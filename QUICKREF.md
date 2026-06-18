# 🎯 快速參考指南

## ⚡ 快速開始（3 分鐘）

```bash
# 1. 進入項目目錄
cd /workspaces/topic

# 2. 複製環境配置
cp .env.example .env

# 3. 編輯 .env，添加你的 API Key
# 使用你喜歡的編輯器打開 .env
# 找到 VITE_OPENAI_API_KEY 或 VITE_GEMINI_API_KEY
# 替換為你的實際 API Key

# 4. 安裝依賴
npm install

# 5. 啟動開發模式
npm run dev

# 應用將在 Electron 窗口中打開！
```

---

## 📋 命令速查表

### 開發

| 命令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發模式（Vite + Electron） |
| `npm run vite` | 單獨啟動 Vite 開發服務器 |
| `npm run electron` | 單獨啟動 Electron |
| `npm run type-check` | 檢查 TypeScript 類型 |

### 構建

| 命令 | 說明 |
|------|------|
| `npm run build` | 構建 Web 版本到 `dist/` |
| `npm run dist` | 打包成 Electron 應用 |
| `npm run electron-dev` | 以開發模式運行 Electron |

### 維護

| 命令 | 說明 |
|------|------|
| `npm install` | 安裝依賴 |
| `npm update` | 更新依賴 |
| `npm list` | 列出已安裝的依賴 |

---

## 🔑 API Key 配置快速指南

### OpenAI API

1. 訪問：https://platform.openai.com/account/api-keys
2. 點擊「Create new secret key」
3. 複製密鑰到 `.env`：
   ```env
   VITE_AI_PROVIDER=OPENAI
   VITE_OPENAI_API_KEY=sk-...
   ```

### Google Gemini API

1. 訪問：https://makersuite.google.com/app/apikey
2. 點擊「Create API Key」
3. 複製密鑰到 `.env`：
   ```env
   VITE_AI_PROVIDER=GEMINI
   VITE_GEMINI_API_KEY=...
   ```

---

## 📂 核心文件一覽

| 文件 | 用途 |
|------|------|
| `src/renderer/App.tsx` | 主應用入口 |
| `src/renderer/components/*.tsx` | UI 元件 |
| `src/renderer/hooks/useStore.ts` | 狀態管理 |
| `src/renderer/services/aiService.ts` | AI 集成 |
| `electron/main.ts` | Electron 主進程 |
| `tailwind.config.js` | Tailwind 配置 |
| `.env` | 環境變數（不要提交） |

---

## 🎨 Tailwind 常用類

### 佈局
```html
<!-- 卡片 -->
<div class="card p-6 space-y-4">

<!-- 網格 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">

<!-- 彈性佈局 -->
<div class="flex gap-2 justify-center items-center">
```

### 按鈕
```html
<!-- 主按鈕 -->
<button class="btn-primary">提交</button>

<!-- 次按鈕 -->
<button class="btn-secondary">取消</button>
```

### 輸入
```html
<input class="input-field" placeholder="輸入..." />
<textarea class="input-field" rows="4"></textarea>
```

### 文字
```html
<h1 class="text-3xl font-bold text-slate-900">標題</h1>
<p class="text-sm text-slate-600">副文本</p>
<span class="text-primary-600">彩色文本</span>
```

### 顏色
```css
primary   /* 主色（藍色） */
slate     /* 中性色（灰色） */
green     /* 綠色 */
red       /* 紅色 */
```

---

## 🚀 快速故障排除

### 應用無法啟動

```bash
# 清除緩存並重新安裝
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### AI 功能不工作

```bash
# 檢查 .env 文件
cat .env

# 確認 API Key 正確
# 檢查開發者工具（F12）的錯誤信息
```

### 計時器卡住

```bash
# 刷新頁面
# 或清除本地存儲
# 開發者工具 → Application → Clear Site Data
```

### 樣式不正確

```bash
# 重新構建
npm run build
# 或清除緩存
rm -rf dist .vite-cache
npm run dev
```

---

## 💡 開發小技巧

### 1. 快速添加新元件

```bash
# 創建元件文件模板
echo 'import React from "react"

export const MyComponent: React.FC = () => {
  return <div className="card p-6"></div>
}' > src/renderer/components/MyComponent.tsx
```

### 2. 快速測試 AI 功能

在瀏覽器控制台：
```javascript
// 測試 AI 服務
import { AIService } from './renderer/services/aiService'
await AIService.getStudyAdvice('test', { totalFocusTime: 100, totalSessions: 4, tasksCompleted: 2 })
```

### 3. 檢查存儲的數據

在瀏覽器控制台：
```javascript
// 查看所有存儲的數據
JSON.parse(localStorage.getItem('ai-reading-timer-storage'))
```

### 4. 禁用開發者工具

編輯 `electron/main.ts`，註釋掉：
```typescript
// if (isDev) {
//   mainWindow.webContents.openDevTools()
// }
```

---

## 📱 測試檢查清單

- [ ] 計時器功能正常
- [ ] 任務可以添加/刪除/完成
- [ ] 統計圖表顯示
- [ ] AI 建議可以獲取
- [ ] 學習計劃可以生成
- [ ] 本地數據持久化
- [ ] 移動設備響應式
- [ ] 鍵盤導航可用

---

## 🔗 重要鏈接

| 資源 | 網址 |
|------|------|
| Node.js | https://nodejs.org/ |
| React | https://react.dev |
| Electron | https://www.electronjs.org |
| Tailwind CSS | https://tailwindcss.com |
| TypeScript | https://www.typescriptlang.org |
| Vite | https://vitejs.dev |
| OpenAI | https://platform.openai.com |
| Google AI | https://ai.google.dev |

---

## 📞 常見問題

**Q: 可以使用其他 AI 提供商嗎？**
A: 可以，編輯 `aiService.ts` 添加新提供商的邏輯。

**Q: 如何修改計時器的默認時間？**
A: 在 `useStore.ts` 中修改 `focusTime` 和 `breakTime` 的初始值。

**Q: 如何禁用數據持久化？**
A: 編輯 `useStore.ts`，移除 `persist` 中間件。

**Q: 可以添加數據庫存儲嗎？**
A: 可以，在 Electron 主進程中集成 SQLite 或其他數據庫。

**Q: 如何部署到生產環境？**
A: 使用 `npm run dist` 打包，然後分發到用戶。

---

## ✅ 最後檢查

在提交代碼前，確保：

```bash
# 類型檢查
npm run type-check

# 代碼格式化（可選）
npx prettier --write src

# 構建測試
npm run build

# 功能測試
npm run dev
```

---

**祝你開發順利！🎉**

有問題？查看完整指南：
- 快速設置：[SETUP.md](./SETUP.md)
- 開發指南：[DEVELOPER.md](./DEVELOPER.md)
- 項目 README：[README.md](./README.md)
