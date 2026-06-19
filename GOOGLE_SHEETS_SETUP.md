# 📊 Google Sheets 整合 - 完整設置指南

## 目錄
1. [功能概述](#功能概述)
2. [Google 雲端環境設置](#google-雲端環境設置)
3. [Google Apps Script 部署](#google-apps-script-部署)
4. [React 應用配置](#react-應用配置)
5. [使用方法](#使用方法)
6. [常見問題](#常見問題)

---

## 功能概述

此整合提供以下功能：

✅ **導出今日統計**：將當天的學習數據導出到 Google Sheets  
✅ **導出所有會話**：批量導出全部歷史數據  
✅ **即時同步**：數據實時保存到雲端  
✅ **Web App 連接**：通過 Google Apps Script Web App 無需認證  
✅ **錯誤處理**：完整的連接測試和錯誤提示  

---

## Google 雲端環境設置

### 步驟 1：建立 Google Sheet

1. 訪問 https://sheets.google.com
2. 點擊「➕ 新增」建立新的試算表
3. 將試算表命名為 「AI Reading Timer Data」
4. 在瀏覽器地址欄中複製 **Sheet ID**

**Sheet ID 位置：**
```
https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit
                                        ^^^^^^^^^^^^^^
```

✅ **保存此 ID，稍後會用到**

---

## Google Apps Script 部署

### 步驟 2：建立 Google Apps Script

1. 在你的 Google Sheet 中，點擊 **擴充功能** > **Apps Script**
2. Google 會新開一個編輯器分頁
3. 刪除預設代碼

### 步驟 3：複製代碼

將以下代碼複製到 Google Apps Script 編輯器中：

```javascript
// ===================================================================
// 📊 Google Apps Script - Google Sheets 整合
// ===================================================================

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // ← 替換為你的 Sheet ID
const SHEET_NAME = 'AI Reading Timer Data';

function initializeSheet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    const headers = [
      'Date',
      'Focus Time (min)',
      'Sessions Count',
      'Tasks Completed',
      'Break Time (min)',
      'Study Notes',
      'Timestamp',
      'Entry ID'
    ];
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    Logger.log('Sheet initialized successfully');
  } catch (error) {
    Logger.log('Error initializing sheet: ' + error);
  }
}

function addRecord(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet not found. Please run initializeSheet() first.',
        error: 'Sheet initialization failed'
      };
    }
    
    const row = [
      data.date,
      data.focusTime,
      data.sessionsCount,
      data.tasksCompleted,
      data.breakTime,
      data.studyNotes,
      data.timestamp,
      'ID_' + Date.now()
    ];
    
    sheet.appendRow(row);
    sheet.autoResizeColumns(1, 8);
    
    return {
      success: true,
      message: 'Record added successfully',
      data: row
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error adding record',
      error: error.toString()
    };
  }
}

function addBatch(dataArray) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet not found',
        error: 'Sheet initialization failed'
      };
    }
    
    let addedCount = 0;
    const rows = [];
    
    for (const data of dataArray) {
      const row = [
        data.date,
        data.focusTime,
        data.sessionsCount,
        data.tasksCompleted,
        data.breakTime,
        data.studyNotes,
        data.timestamp,
        'ID_' + Date.now() + '_' + addedCount
      ];
      rows.push(row);
      addedCount++;
    }
    
    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    
    sheet.autoResizeColumns(1, 8);
    
    return {
      success: true,
      message: `${addedCount} records added successfully`,
      count: addedCount
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error adding batch',
      error: error.toString()
    };
  }
}

function getData() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        data: [],
        message: 'Sheet not found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const records = [];
    
    for (let i = 1; i < data.length; i++) {
      const record = {};
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = data[i][j];
      }
      records.push(record);
    }
    
    return {
      success: true,
      data: records,
      count: records.length
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.toString()
    };
  }
}

function ping() {
  return {
    status: 'ok',
    message: 'Google Apps Script is running',
    timestamp: new Date().toISOString()
  };
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    
    let result;
    
    switch (action) {
      case 'addRecord':
        result = addRecord(payload.data);
        break;
      case 'addBatch':
        result = addBatch(payload.data);
        break;
      case 'getData':
        result = getData();
        break;
      case 'ping':
        result = ping();
        break;
      default:
        result = {
          success: false,
          error: 'Unknown action: ' + action
        };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Server error: ' + error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script Web App is running. Use POST requests to interact.'
  }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 步驟 4：修改 Sheet ID

在上面的代碼中，找到這一行：
```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
```

將 `YOUR_GOOGLE_SHEET_ID` 替換為你在步驟 1 中複製的 Sheet ID。

**範例：**
```javascript
const SHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
```

### 步驟 5：首次初始化

1. 在編輯器中，點擊 **執行** 或 **Run**
2. 選擇函數 `initializeSheet`
3. Google 會要求授權，按照提示進行即可
4. 等待執行完成

### 步驟 6：部署為 Web App

1. 在編輯器中，點擊 **部署** 或 **Deploy** 按鈕
2. 選擇 **新建部署** 或 **New Deployment**
3. 選擇類型：**Web 應用** 或 **Web App**
4. 設定以下項目：
   - **執行身份**：選擇 **我** 或 **Me**（你的 Google 帳戶）
   - **有誰可以存取**：選擇 **任何人** 或 **Anyone**
5. 點擊 **部署**

### 步驟 7：複製 Web App URL

部署完成後，你會看到一個對話框顯示 Web App URL：

```
https://script.google.com/macros/d/[DEPLOYMENT_ID]/usercache
```

✅ **複製整個 URL 並保存**

---

## React 應用配置

### 步驟 8：在應用中設置 URL

1. 打開 AI Reading Timer 應用
2. 點擊「☁️ 雲端存儲」標籤
3. 點擊「編輯 URL」按鈕
4. 貼上你在步驟 7 中複製的 Web App URL
5. 點擊「保存 URL」

### 步驟 9：測試連接

1. 點擊「🔗 測試連接」按鈕
2. 如果看到「✅ Google Sheets 連接正常！」，表示成功
3. 如果看到錯誤，請檢查 URL 是否正確複製

---

## 使用方法

### 導出今日統計

1. 完成一些學習會話
2. 點擊「☁️ 雲端存儲」標籤
3. 點擊「📅 導出今日統計」按鈕
4. 等待導出完成

### 導出所有會話

1. 點擊「☁️ 雲端存儲」標籤
2. 點擊「📚 導出所有會話」按鈕
3. 所有歷史數據將被導出
4. 檢查你的 Google Sheet 確認數據

### 檢查 Google Sheet

1. 訪問你的 Google Sheet：https://sheets.google.com
2. 打開 「AI Reading Timer Data」
3. 你應該看到你的學習數據已經被添加

---

## 常見問題

### Q1：「連接失敗」錯誤

**原因：**
- Web App URL 不正確
- Google Apps Script 未正確部署
- URL 過期

**解決方案：**
1. 確認 Web App URL 正確複製
2. 重新部署 Google Apps Script（創建新的部署）
3. 使用新的 URL 替換應用中的 URL

### Q2：「Sheet not found」錯誤

**原因：**
- Sheet ID 錯誤
- Sheet 名稱不是 「AI Reading Timer Data」

**解決方案：**
1. 確認 Sheet ID 是否正確
2. 確認工作表名稱是否為 「AI Reading Timer Data」
3. 在 Google Apps Script 中重新執行 `initializeSheet()` 函數

### Q3：如何更新 Web App URL？

1. 點擊「編輯 URL」
2. 清除舊 URL
3. 貼上新 URL
4. 點擊「保存 URL」

### Q4：能否匯出為 CSV？

目前可以直接在 Google Sheet 中：
1. 打開 Google Sheet
2. 點擊 **檔案** > **下載** > **逗號分隔值 (.csv)**

### Q5：資料是否安全？

- ✅ 數據只發送到你的 Google Sheet
- ✅ Google Apps Script 由你自己控制
- ✅ 應用不保存任何 API 密鑰
- ✅ 所有通信都通過 HTTPS 加密

---

## 高級用法

### 添加自定義欄位

如果你想添加更多欄位（例如「心情」、「難度等級」），可以：

1. 在 Google Sheet 中手動添加欄位
2. 在 Google Apps Script 中更新 `headers` 陣列
3. 在 React 應用中擴展 `DataToExport` 介面

### 自動每日導出

如果想要自動導出，可以修改 React 應用添加計時任務，但這超出本指南範圍。

---

## 支援與幫助

如有問題，請檢查：
- ✅ Google Apps Script 部署是否成功
- ✅ Sheet ID 是否正確
- ✅ Web App URL 是否正確
- ✅ 瀏覽器控制台是否有錯誤信息

---

**✨ 享受將你的學習數據保存到雲端吧！**
