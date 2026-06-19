import { useState, useCallback } from 'react'
import { GoogleSheetsService, DataToExport } from '../services/googleSheetsService'
import { useStore } from './useStore'

export interface ExportStatus {
  isExporting: boolean
  success: boolean | null
  error: string | null
  message: string | null
}

export const useGoogleSheetsExport = () => {
  const [status, setStatus] = useState<ExportStatus>({
    isExporting: false,
    success: null,
    error: null,
    message: null,
  })

  const store = useStore()

  /**
   * 導出今日統計數據
   */
  const exportTodayStats = useCallback(async () => {
    setStatus({ isExporting: true, success: null, error: null, message: '正在導出...' })

    try {
      const today = new Date().toISOString().split('T')[0]
      const stats = store.getStatistics()

      const dataToExport: DataToExport = {
        date: today,
        focusTime: stats.totalFocusTime,
        sessionsCount: stats.totalSessions,
        tasksCompleted: stats.tasksCompleted,
        breakTime: store.breakTime,
      }

      const result = await GoogleSheetsService.exportRecord(dataToExport)

      if (result) {
        setStatus({
          isExporting: false,
          success: true,
          error: null,
          message: '✅ 成功導出到 Google Sheets！',
        })
      } else {
        throw new Error('導出失敗')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setStatus({
        isExporting: false,
        success: false,
        error: errorMessage,
        message: `❌ 導出失敗：${errorMessage}`,
      })
    }
  }, [store])

  /**
   * 導出所有會話數據
   */
  const exportAllSessions = useCallback(async () => {
    setStatus({ isExporting: true, success: null, error: null, message: '正在導出所有數據...' })

    try {
      const dataArray: DataToExport[] = store.sessions.map((session) => ({
        date: new Date(session.date).toISOString().split('T')[0],
        focusTime: session.focusMinutes,
        sessionsCount: session.sessionsCount,
        tasksCompleted: session.tasksCompleted,
        breakTime: session.breakMinutes,
      }))

      if (dataArray.length === 0) {
        throw new Error('沒有可導出的數據')
      }

      const result = await GoogleSheetsService.exportBatch(dataArray)

      if (result) {
        setStatus({
          isExporting: false,
          success: true,
          error: null,
          message: `✅ 成功導出 ${dataArray.length} 條記錄到 Google Sheets！`,
        })
      } else {
        throw new Error('批量導出失敗')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setStatus({
        isExporting: false,
        success: false,
        error: errorMessage,
        message: `❌ 導出失敗：${errorMessage}`,
      })
    }
  }, [store])

  /**
   * 檢查連接
   */
  const testConnection = useCallback(async () => {
    setStatus({ isExporting: true, success: null, error: null, message: '正在檢查連接...' })

    try {
      const isConnected = await GoogleSheetsService.healthCheck()

      if (isConnected) {
        setStatus({
          isExporting: false,
          success: true,
          error: null,
          message: '✅ Google Sheets 連接正常！',
        })
      } else {
        throw new Error('連接檢查失敗')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setStatus({
        isExporting: false,
        success: false,
        error: errorMessage,
        message: `❌ 連接失敗：${errorMessage}`,
      })
    }
  }, [])

  /**
   * 初始化 Google Sheets
   */
  const initializeGoogleSheets = useCallback((gasWebAppUrl: string) => {
    try {
      GoogleSheetsService.initialize({ gasWebAppUrl })
      setStatus({
        isExporting: false,
        success: true,
        error: null,
        message: '✅ Google Sheets 配置已保存！',
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setStatus({
        isExporting: false,
        success: false,
        error: errorMessage,
        message: `❌ 配置失敗：${errorMessage}`,
      })
    }
  }, [])

  return {
    status,
    exportTodayStats,
    exportAllSessions,
    testConnection,
    initializeGoogleSheets,
    clearStatus: () =>
      setStatus({
        isExporting: false,
        success: null,
        error: null,
        message: null,
      }),
  }
}
