import React, { useState } from 'react'
import { useGoogleSheetsExport } from '../hooks/useGoogleSheetsExport'

export const GoogleSheetsPanel: React.FC = () => {
  const [gasWebAppUrl, setGasWebAppUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const {
    status,
    exportTodayStats,
    exportAllSessions,
    testConnection,
    initializeGoogleSheets,
    clearStatus,
  } = useGoogleSheetsExport()

  const handleSaveUrl = () => {
    if (gasWebAppUrl.trim()) {
      initializeGoogleSheets(gasWebAppUrl)
      setShowUrlInput(false)
    } else {
      alert('請輸入有效的 Google Apps Script Web App URL')
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-bold text-gray-800">Google Sheets 整合</h2>
      </div>

      {/* 狀態消息 */}
      {status.message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            status.success
              ? 'bg-green-100 text-green-800 border border-green-300'
              : status.success === false
              ? 'bg-red-100 text-red-800 border border-red-300'
              : 'bg-blue-100 text-blue-800 border border-blue-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <span>{status.message}</span>
            {status.message && (
              <button
                onClick={clearStatus}
                className="text-sm hover:opacity-70"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* URL 配置部分 */}
      <div className="mb-4 bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">配置設置</h3>
          <button
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
          >
            {showUrlInput ? '取消' : '編輯 URL'}
          </button>
        </div>

        {showUrlInput ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="輸入 Google Apps Script Web App URL"
              value={gasWebAppUrl}
              onChange={(e) => setGasWebAppUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <p className="text-xs text-gray-600">
              格式: https://script.google.com/macros/d/[DEPLOYMENT_ID]/usercache
            </p>
            <button
              onClick={handleSaveUrl}
              disabled={status.isExporting}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              保存 URL
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={testConnection}
              disabled={status.isExporting}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status.isExporting ? '正在檢查...' : '🔗 測試連接'}
            </button>
            {gasWebAppUrl && (
              <p className="text-xs text-gray-600 break-all">
                已配置: {gasWebAppUrl.substring(0, 50)}...
              </p>
            )}
          </div>
        )}
      </div>

      {/* 導出選項 */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700">導出數據</h3>

        <button
          onClick={exportTodayStats}
          disabled={status.isExporting || !gasWebAppUrl}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 font-medium flex items-center justify-center gap-2"
        >
          {status.isExporting ? (
            <>
              <span className="animate-spin">⏳</span>
              導出中...
            </>
          ) : (
            <>
              📅 導出今日統計
            </>
          )}
        </button>

        <button
          onClick={exportAllSessions}
          disabled={status.isExporting || !gasWebAppUrl}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition disabled:opacity-50 font-medium flex items-center justify-center gap-2"
        >
          {status.isExporting ? (
            <>
              <span className="animate-spin">⏳</span>
              導出中...
            </>
          ) : (
            <>
              📚 導出所有會話
            </>
          )}
        </button>
      </div>

      {/* 幫助信息 */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <strong>💡 提示:</strong> 首次使用前，需要部署 Google Apps Script。請查看文檔了解詳細步驟。
        </p>
      </div>
    </div>
  )
}
