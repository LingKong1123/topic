# 🚀 快速開始 - Google Sheets 整合

## 什麼是新增的？

AI Reading Timer 現在可以**將你的學習數據自動保存到 Google Sheets**！

✅ 前端網頁效果（已有）  
✅ API 自動填入資料（已有）  
✅ **Google Sheets 雲端儲存（新增）** 🎉

---

## 3 分鐘快速開始

### 1️⃣ 準備 Google Sheet

訪問 https://sheets.google.com，建立新試算表。記錄這個 URL 中的 Sheet ID：

```
https://docs.google.com/spreadsheets/d/[THIS_IS_SHEET_ID]/edit
                                        ^^^^^^^^^^^^^^
```

### 2️⃣ 部署 Google Apps Script

在你的 Google Sheet 中：
1. 點擊 **擴充功能** → **Apps Script**
2. 複製此代碼模板：[googleAppsScript.template.ts](./src/renderer/services/googleAppsScript.template.ts)
3. 替換 `YOUR_GOOGLE_SHEET_ID` 為你的 Sheet ID
4. 點擊 **部署** → **新建部署** → **Web 應用**
5. 設定為「任何人」可存取
6. 複製生成的 Web App URL

### 3️⃣ 在應用中配置

1. 打開 AI Reading Timer
2. 點擊「☁️ 雲端存儲」標籤
3. 點擊「編輯 URL」
4. 貼上你的 Web App URL
5. 點擊「🔗 測試連接」確認
6. 完成！

---

## 使用

### 導出今日數據
```
點擊「☁️ 雲端存儲」→ 點擊「📅 導出今日統計」
```

### 導出所有歷史數據
```
點擊「☁️ 雲端存儲」→ 點擊「📚 導出所有會話」
```

### 檢查你的數據
打開你的 Google Sheet，在「AI Reading Timer Data」工作表中查看所有導出的數據。

---

## 新增文件一覽

| 文件 | 用途 |
|------|------|
| `googleSheetsService.ts` | Google Sheets API 服務層 |
| `useGoogleSheetsExport.ts` | React Hook，用於導出邏輯 |
| `GoogleSheetsPanel.tsx` | UI 面板組件 |
| `googleAppsScript.template.ts` | Google Apps Script 代碼模板 |
| `GOOGLE_SHEETS_SETUP.md` | 詳細設置指南 |
| `GOOGLE_SHEETS_IMPLEMENTATION.md` | 實施總結文檔 |

---

## 常見問題

**Q: 需要 API 密鑰嗎？**  
A: 不需要！使用 Web App 方式，無需密鑰。

**Q: 數據安全嗎？**  
A: 完全安全。所有通信都是 HTTPS 加密，數據只存在你的 Google Sheet。

**Q: 可以編輯已導出的數據嗎？**  
A: 可以直接在 Google Sheet 中編輯。

**Q: 如何刪除導出的數據？**  
A: 在 Google Sheet 中手動刪除行即可。

---

## 完整指南

詳細的分步驟設置指南請見：  
📖 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

實施技術細節請見：  
📖 [GOOGLE_SHEETS_IMPLEMENTATION.md](./GOOGLE_SHEETS_IMPLEMENTATION.md)

---

## 支援

如遇到問題，請檢查：
- ✅ Sheet ID 是否正確
- ✅ Google Apps Script 是否正確部署  
- ✅ Web App URL 是否正確複製
- ✅ 網絡連接是否正常

**祝你使用愉快！📚✨**
