# 🎯 開始使用 - AI Reading Timer

歡迎使用 **AI Reading Timer** - 你的個人讀書計時和學習效率助手！

本文檔提供快速入門指南。

---

## 📝 文檔導航

在開始前，建議按順序閱讀以下文檔：

1. **START_HERE.md** ← 你在這裡 🔴
2. **QUICKREF.md** - 命令速查和常用代碼
3. **SETUP.md** - 詳細的安裝和配置
4. **README.md** - 完整的功能介紹
5. **DEVELOPER.md** - 開發和擴展指南
6. **PROJECT_SUMMARY.md** - 項目完成總結

---

## ⚡ 5 分鐘快速開始

### 前置準備

- ✅ Node.js v16+ ([下載](https://nodejs.org/))
- ✅ npm 或 yarn
- ✅ API Key（OpenAI 或 Google Gemini）

### 步驟 1️⃣：進入項目目錄

```bash
cd /workspaces/topic
```

### 步驟 2️⃣：獲取 API Key（選擇一個）

**OpenAI 路線（推薦新手）：**
1. 訪問 https://platform.openai.com/account/api-keys
2. 創建新密鑰（點擊 "Create new secret key"）
3. 複製密鑰

**Google Gemini 路線（免費額度充足）：**
1. 訪問 https://makersuite.google.com/app/apikey
2. 點擊 "Create API Key"
3. 複製密鑰

### 步驟 3️⃣：配置環境

```bash
# 複製示例環境文件
cp .env.example .env

# 編輯 .env 文件
nano .env
# 或在 VS Code 中
code .env
```

**編輯 .env 文件，填入你的 API Key：**

```env
# 如果使用 OpenAI
VITE_AI_PROVIDER=OPENAI
VITE_OPENAI_API_KEY=sk-your-actual-key-here
VITE_OPENAI_MODEL=gpt-4-turbo-preview

# 如果使用 Gemini
VITE_AI_PROVIDER=GEMINI
VITE_GEMINI_API_KEY=your-gemini-key-here
```

### 步驟 4️⃣：安裝依賴

```bash
npm install
```

⏳ 這可能需要 5-10 分鐘...

### 步驟 5️⃣：啟動應用

```bash
npm run dev
```

🎉 **完成！應用將在 Electron 窗口中打開。**

---

## ✨ 主要功能快速體驗

### 1. 試試計時器 ⏱️
- 設置專注時間（默認 25 分鐘）
- 點擊「開始」按鈕
- 看著計時器倒計時
- 完成時會有提示音

### 2. 添加任務 📋
- 輸入學習任務
- 按 Enter 或點擊「新增」
- 任務完成時勾選
- 看進度條實時更新

### 3. 查看統計 📊
- 切換到「統計」標籤
- 查看本週學習趨勢
- 了解你的進度

### 4. 使用 AI 助理 🤖
- 切換到「AI 助理」標籤
- 選擇「獲取建議」
- 描述你的學習狀況
- 點擊「獲取 AI 建議」
- AI 會給你個性化建議！

---

## 🚨 常見問題速解

### ❌ 應用無法啟動

```bash
# 清除並重新安裝
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### ❌ AI 功能提示「API key not configured」

1. 確認 `.env` 文件存在（在項目根目錄）
2. 檢查 API Key 沒有多餘空格
3. 重啟開發服務器：Ctrl+C，然後 `npm run dev`

### ❌ 計時器卡住

- 刷新頁面（Ctrl+R）
- 清除瀏覽器緩存（F12 → Application → Clear Site Data）

### ❌ 找不到文件錯誤

```bash
# 確認目錄結構正確
npm run type-check  # 檢查 TypeScript 類型
```

---

## 🎨 使用提示

### 💡 番茄鐘技巧
- 推薦：專注 25 分鐘，休息 5 分鐘
- 每 4 個完整周期後，休息 15-30 分鐘
- 調整時間以適應你的節奏

### 💡 任務設置
- 把大任務分解成小任務
- 每天 3-5 個任務最佳
- 優先完成重要任務

### 💡 AI 建議
- 描述具體的學習困難（如「容易分心」）
- 提及你的目標（如「準備考試」）
- AI 會根據你的數據提供更好的建議

### 💡 追蹤進度
- 每天檢查統計數據
- 找出你的最佳學習時段
- 根據數據調整策略

---

## 📂 關鍵文件位置

| 文件/目錄 | 用途 |
|----------|------|
| `.env` | 環境變數（API Key 在這裡） |
| `package.json` | 依賴管理 |
| `src/renderer/components/` | UI 元件 |
| `src/renderer/services/aiService.ts` | AI 集成 |
| `tailwind.config.js` | 樣式配置 |

---

## 🔄 日常開發命令

```bash
# 開發模式（推薦）
npm run dev

# 構建應用
npm run build

# 打包成桌面應用
npm run dist

# 類型檢查
npm run type-check
```

---

## 🔐 安全提示

⚠️ **重要：**
- 不要提交 `.env` 文件到 Git
- 不要在代碼中硬編碼 API Key
- 定期輪換你的 API Key
- 監控 API 使用量

---

## 🎓 更多資源

### 文檔
- **QUICKREF.md** - 快速參考命令
- **SETUP.md** - 詳細安裝指南
- **DEVELOPER.md** - 開發和擴展
- **README.md** - 完整功能列表

### 官方資源
- [React 文檔](https://react.dev)
- [Electron 文檔](https://www.electronjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Google Gemini](https://ai.google.dev)

### 社區
- React 社區
- Electron 討論區
- Stack Overflow

---

## ❓ 疑難排解檢查清單

在詢問問題前，請檢查：

- [ ] Node.js 版本是 v16 或更高？
- [ ] `.env` 文件存在且包含 API Key？
- [ ] 運行過 `npm install`？
- [ ] 開發服務器成功啟動？
- [ ] 瀏覽器開發者工具中有錯誤信息嗎？

---

## 🎯 下一步建議

### 立即體驗（5 分鐘）
✅ 使用預設配置試用應用

### 自定義應用（15 分鐘）
- 修改計時器默認時間
- 改變應用主題色
- 調整 AI 提示詞

### 深入開發（1 小時）
- 閱讀 DEVELOPER.md
- 添加新的 React 元件
- 集成額外的 API

### 生產部署（2 小時）
- 構建應用
- 打包為桌面應用
- 分發給用戶

---

## 💬 獲得幫助

### 問題排查步驟

1. **查看錯誤信息**
   - F12 打開開發者工具
   - 查看 Console 標籤中的紅色錯誤

2. **查看文檔**
   - SETUP.md 中的故障排除部分
   - DEVELOPER.md 中的調試技巧

3. **重啟應用**
   ```bash
   # 停止當前進程（Ctrl+C）
   # 清除緩存
   rm -rf dist .vite-cache
   # 重新啟動
   npm run dev
   ```

4. **清除本地存儲**
   - F12 → Application
   - 選擇 Storage → Local Storage
   - 點擊 "Clear Site Data"

---

## 📈 性能預期

| 指標 | 預期值 |
|------|--------|
| 首次啟動 | 3-5 秒 |
| 應用大小 | ~150-200MB |
| 內存使用 | ~150-200MB |
| CPU 使用（待機） | <5% |
| 計時精度 | ±1 秒 |

---

## 🎉 歡迎詞

歡迎加入 AI Reading Timer 的用戶社區！

我們希望這個應用能幫助你：
- 📚 提升學習效率
- 🎯 保持專注力
- 📊 追蹤學習進度
- 🤖 獲得 AI 支持

祝你學習愉快，進步順利！🚀

---

## 📞 反饋和建議

我們歡迎你的反饋和建議：
- 報告 Bug
- 提出功能建議
- 分享使用心得
- 幫助改進應用

---

## 🚀 現在就開始吧！

```bash
# 一鍵啟動
cd /workspaces/topic
npm install
npm run dev
```

**祝你使用愉快！** 💪✨

---

**下一步：** 請閱讀 **QUICKREF.md** 了解常用命令。
