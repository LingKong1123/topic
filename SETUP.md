# 🚀 AI Reading Timer - 完整設置指南

這份指南將逐步引導你設置和運行 AI Reading Timer 應用。

## 📋 目錄
1. [前置要求](#前置要求)
2. [初始安裝](#初始安裝)
3. [API Key 配置](#api-key-配置)
4. [運行應用](#運行應用)
5. [構建打包](#構建打包)
6. [故障排除](#故障排除)

---

## 前置要求

### 系統要求
- **操作系統**：Windows 10+、macOS 10.13+、Linux
- **Node.js**：v16 或更高版本
- **內存**：至少 2GB RAM
- **磁盤空間**：至少 500MB

### 驗證環境
```bash
# 檢查 Node.js 版本
node --version

# 檢查 npm 版本
npm --version
```

如果版本過低，請從 [Node.js 官方網站](https://nodejs.org/) 下載最新版本。

---

## 初始安裝

### 步驟 1：克隆或下載項目

```bash
# 進入工作目錄
cd /workspaces/topic

# 確認在項目目錄中
pwd
```

### 步驟 2：安裝依賴包

```bash
# 使用 npm 安裝
npm install

# 或使用 yarn（如果已安裝）
yarn install

# 使用 pnpm（如果已安裝）
pnpm install
```

**安裝可能需要 5-10 分鐘，請耐心等待。**

### 步驟 3：驗證安裝

```bash
# 檢查 node_modules 是否正確安裝
ls -la node_modules | wc -l

# 應該看到一個很大的數字（表示有很多包已安裝）
```

---

## API Key 配置

### 選項 A：使用 OpenAI API

#### 1. 獲取 OpenAI API Key

1. 訪問 [OpenAI Platform](https://platform.openai.com/)
2. 點擊右上角的「Sign up」（如果還沒有帳戶）
3. 登錄或創建帳戶
4. 進入 [API Keys 頁面](https://platform.openai.com/account/api-keys)
5. 點擊「Create new secret key」按鈕
6. 複製生成的密鑰（只會顯示一次）

#### 2. 配置 .env 文件

```bash
# 進入項目目錄
cd /workspaces/topic

# 複製示例環境文件
cp .env.example .env

# 編輯 .env 文件（使用你喜歡的編輯器）
nano .env
# 或者在 VS Code 中打開
code .env
```

#### 3. 編輯 .env 內容

```env
# AI 提供商選擇
VITE_AI_PROVIDER=OPENAI

# OpenAI 配置
VITE_OPENAI_API_KEY=sk-your-actual-key-here
VITE_OPENAI_MODEL=gpt-4-turbo-preview

# 注意：
# - 將 sk-your-actual-key-here 替換為你的實際 API Key
# - gpt-4-turbo-preview 是推薦模型，也可以用 gpt-3.5-turbo（更便宜）

# Gemini 配置（如果不使用可以留空）
VITE_GEMINI_API_KEY=

# 應用配置
VITE_APP_NAME=AI Reading Timer
VITE_APP_VERSION=1.0.0
```

### 選項 B：使用 Google Gemini API

#### 1. 獲取 Gemini API Key

1. 訪問 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登錄你的 Google 帳戶
3. 點擊「Create API Key」按鈕
4. 複製生成的密鑰

#### 2. 配置 .env 文件

```bash
cp .env.example .env
nano .env
```

#### 3. 編輯 .env 內容

```env
# AI 提供商選擇
VITE_AI_PROVIDER=GEMINI

# Gemini 配置
VITE_GEMINI_API_KEY=your-actual-gemini-key-here

# OpenAI 配置（如果不使用可以留空）
VITE_OPENAI_API_KEY=

# 應用配置
VITE_APP_NAME=AI Reading Timer
VITE_APP_VERSION=1.0.0
```

### ⚠️ 安全提示

1. **不要提交 .env 文件到 Git**
   - .env 文件已在 .gitignore 中設置
   - 確保 API Key 不會被洩露

2. **定期檢查 API Key 使用情況**
   - OpenAI：https://platform.openai.com/account/usage
   - Gemini：https://makersuite.google.com/

3. **設置 API 限額**
   - 登錄你的 API 提供商帳戶
   - 設置每月消費限額，防止意外費用

---

## 運行應用

### 開發模式

#### 方式 1：一鍵啟動（推薦）

```bash
# 在項目目錄中
npm run dev

# 這會同時啟動：
# - Vite 開發服務器（端口 5173）
# - Electron 應用
# - 熱重載（修改代碼自動刷新）
```

#### 方式 2：分別啟動（調試用）

**終端 1：**
```bash
npm run vite
# Vite 服務器將在 http://localhost:5173
```

**終端 2（等待 Vite 啟動後）：**
```bash
npm run electron
# Electron 應用將啟動
```

### 首次運行可能出現的情況

- ✅ 會看到應用窗口打開
- ✅ 開發者工具自動打開（按 F12 關閉）
- ✅ 修改代碼時應用自動刷新
- ⚠️ 如果 .env 配置不正確，AI 助理功能可能無法使用

---

## 構建打包

### 構建 Web 版本

```bash
# 構建優化版本
npm run build

# 輸出文件位置：./dist/
# 可以部署到任何靜態主機
```

### 打包成 Electron 應用

```bash
# 一次性構建並打包
npm run dist

# 打包後的文件位置：
# - Windows: dist/AI Reading Timer Setup.exe (安裝程序)
#          : dist/AI Reading Timer.exe (便攜版)
# - macOS: dist/AI Reading Timer.dmg (安裝程序)
#        : dist/AI Reading Timer.app (應用包)
# - Linux: dist/AI Reading Timer.AppImage (AppImage 格式)
#        : dist/AI Reading Timer.deb (Debian 包)
```

### 自定義打包配置

編輯 `package.json` 中的 `build` 部分：

```json
{
  "build": {
    "appId": "com.aireadingtimer.app",
    "productName": "AI Reading Timer",
    "files": [
      "dist/**/*",
      "electron/**/*",
      "node_modules/**/*",
      "package.json"
    ]
    // ... 其他配置
  }
}
```

---

## 故障排除

### 問題 1：npm install 失敗

**症狀**：`npm ERR! code ERESOLVE`

**解決方案**：
```bash
# 清除 npm 緩存
npm cache clean --force

# 使用 --legacy-peer-deps 標誌
npm install --legacy-peer-deps

# 或者升級 npm
npm install -g npm@latest
npm install
```

### 問題 2：Electron 無法啟動

**症狀**：「Failed to load URL」或「white screen」

**解決方案**：
```bash
# 確保 Vite 正在運行
npm run vite

# 在另一個終端運行
npm run electron-dev

# 檢查開發者工具中的錯誤信息
```

### 問題 3：AI 功能不工作

**症狀**：「API key not configured」或沒有 AI 建議

**解決方案**：
1. 檢查 `.env` 文件是否存在
2. 驗證 API Key 正確無誤
3. 檢查 `VITE_AI_PROVIDER` 設置正確
4. 重啟開發服務器
5. 查看瀏覽器控制台（F12）的錯誤信息

```bash
# 調試 API 連接
# 在瀏覽器開發者工具中運行：
console.log(import.meta.env.VITE_AI_PROVIDER)
console.log(import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 10))
```

### 問題 4：計時器不工作

**症狀**：計時器卡住或不計時

**解決方案**：
1. 刷新頁面（Ctrl+R 或 Cmd+R）
2. 清除本地存儲：開發者工具 → Application → Clear Site Data
3. 重啟 Electron 應用
4. 檢查瀏覽器控制台錯誤

### 問題 5：樣式不正確

**症狀**：按鈕不見、布局混亂

**解決方案**：
```bash
# 重新構建 Tailwind CSS
npm run build

# 或在開發模式下清除緩存
rm -rf .next node_modules/.vite
npm run dev
```

### 問題 6：圖表不顯示

**症狀**：統計面板為空

**解決方案**：
1. 需要至少完成一個計時會話
2. 檢查本地存儲是否有數據
3. 使用開發者工具檢查 Recharts 是否加載

```javascript
// 在開發者工具中檢查
localStorage.getItem('ai-reading-timer-storage')
```

---

## 開發常用命令

```bash
# 全部列出
npm run

# 最常用的
npm run dev              # 開發模式
npm run build            # 構建
npm run type-check       # 類型檢查

# 其他
npm run vite             # 單獨啟動 Vite
npm run electron         # 單獨啟動 Electron
npm run electron-dev     # Electron 開發模式
npm run dist             # 打包應用
```

---

## 性能優化建議

### 開發環境
- 使用 Vite 的快速刷新功能
- 開發者工具可以大幅降低性能，測試時關閉

### 生產環境
- 已通過 Vite 進行代碼分割和優化
- Electron Builder 會自動最小化應用包

### 首頁加載時間
- 首次加載：約 2-3 秒
- 後續加載：小於 1 秒（得益於緩存）

---

## 下一步

✅ 應用已設置完成！

你現在可以：
1. 開始使用計時器功能
2. 添加任務到清單
3. 查看學習統計
4. 使用 AI 助理獲取建議

## 📚 進階主題

### 自定義主題顏色

編輯 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9',  // 改變主色
        600: '#0284c7',
        // ...
      }
    }
  }
}
```

### 添加新的 React 元件

1. 在 `src/renderer/components/` 創建新文件
2. 編寫 React 元件
3. 在 `App.tsx` 中導入並使用

### 修改 AI 提示詞

編輯 `src/renderer/services/aiService.ts` 中的提示詞部分

### 擴展 Zustand 存儲

編輯 `src/renderer/hooks/useStore.ts` 添加新的狀態

---

## 支持和反饋

如有問題或建議，請：
- 查看本指南的故障排除部分
- 檢查項目的 GitHub Issues
- 提交 Bug Report

祝你使用愉快！🎉
