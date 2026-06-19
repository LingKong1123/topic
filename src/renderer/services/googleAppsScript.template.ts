// ===================================================================
// 📊 Google Apps Script - Google Sheets 整合
// ===================================================================
// 將此代碼複製到 Google Apps Script 編輯器中
// https://script.google.com/
// 
// 設置步驟：
// 1. 打開 Google Sheet
// 2. 點擊 擴充功能 > Apps Script
// 3. 複製此代碼到編輯器
// 4. 設置 SHEET_ID 和 SHEET_NAME
// 5. 部署為 Web App（執行身份：你的帳戶，有誰可以存取：任何人）
// 6. 複製部署 URL 到 React 應用
// ===================================================================

// 配置常量
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // 替換為你的 Google Sheet ID
const SHEET_NAME = 'AI Reading Timer Data'; // 工作表名稱

/**
 * 初始化 Sheet（首次執行時運行）
 */
function initializeSheet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // 設置標題行
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
      // 設置標題格式
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

/**
 * 新增單條記錄
 */
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
    
    // 自動調整列寬
    sheet.autoResizeColumns(1, headers.length);
    
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

/**
 * 新增批量記錄
 */
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
    
    // 批量插入所有行
    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    
    // 自動調整列寬
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

/**
 * 獲取所有數據
 */
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

/**
 * Health check endpoint
 */
function ping() {
  return {
    status: 'ok',
    message: 'Google Apps Script is running',
    timestamp: new Date().toISOString()
  };
}

/**
 * 處理 POST 請求
 */
function doPost(e) {
  try {
    // 解析請求體
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
    
    // 返回 JSON 響應
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

/**
 * 處理 GET 請求（可選）
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script Web App is running. Use POST requests to interact.'
  }))
    .setMimeType(ContentService.MimeType.JSON);
}
