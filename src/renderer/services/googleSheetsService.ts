import axios from 'axios'

export interface DataToExport {
  date: string
  focusTime: number
  sessionsCount: number
  tasksCompleted: number
  breakTime: number
  studyNotes?: string
}

export interface GoogleSheetsConfig {
  gasWebAppUrl: string // Google Apps Script Web App URL
  sheetId?: string // Optional: Google Sheet ID
}

export class GoogleSheetsService {
  private static gasWebAppUrl: string = ''
  private static sheetId: string = ''

  /**
   * 初始化 Google Sheets 配置
   */
  static initialize(config: GoogleSheetsConfig): void {
    this.gasWebAppUrl = config.gasWebAppUrl
    this.sheetId = config.sheetId || ''
    
    if (!this.gasWebAppUrl) {
      console.warn('Google Apps Script Web App URL not configured')
    }
  }

  /**
   * 導出單條記錄到 Google Sheets
   */
  static async exportRecord(data: DataToExport): Promise<boolean> {
    if (!this.gasWebAppUrl) {
      throw new Error('Google Apps Script Web App URL not configured. Please run initialize() first.')
    }

    try {
      const response = await axios.post(
        this.gasWebAppUrl,
        {
          action: 'addRecord',
          data: {
            date: data.date,
            focusTime: data.focusTime,
            sessionsCount: data.sessionsCount,
            tasksCompleted: data.tasksCompleted,
            breakTime: data.breakTime,
            studyNotes: data.studyNotes || '',
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Record exported successfully:', response.data)
      return response.data.success === true
    } catch (error) {
      console.error('Failed to export record to Google Sheets:', error)
      throw error
    }
  }

  /**
   * 導出多條記錄到 Google Sheets
   */
  static async exportBatch(dataArray: DataToExport[]): Promise<boolean> {
    if (!this.gasWebAppUrl) {
      throw new Error('Google Apps Script Web App URL not configured. Please run initialize() first.')
    }

    try {
      const response = await axios.post(
        this.gasWebAppUrl,
        {
          action: 'addBatch',
          data: dataArray.map((item) => ({
            date: item.date,
            focusTime: item.focusTime,
            sessionsCount: item.sessionsCount,
            tasksCompleted: item.tasksCompleted,
            breakTime: item.breakTime,
            studyNotes: item.studyNotes || '',
            timestamp: new Date().toISOString(),
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Batch exported successfully:', response.data)
      return response.data.success === true
    } catch (error) {
      console.error('Failed to export batch to Google Sheets:', error)
      throw error
    }
  }

  /**
   * 從 Google Sheets 讀取數據
   */
  static async fetchData(): Promise<DataToExport[]> {
    if (!this.gasWebAppUrl) {
      throw new Error('Google Apps Script Web App URL not configured. Please run initialize() first.')
    }

    try {
      const response = await axios.post(
        this.gasWebAppUrl,
        {
          action: 'getData',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Data fetched successfully:', response.data)
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch data from Google Sheets:', error)
      throw error
    }
  }

  /**
   * 檢查 Google Apps Script 連接是否正常
   */
  static async healthCheck(): Promise<boolean> {
    if (!this.gasWebAppUrl) {
      return false
    }

    try {
      const response = await axios.post(
        this.gasWebAppUrl,
        {
          action: 'ping',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      )

      return response.data.status === 'ok'
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }

  /**
   * 設置 Web App URL
   */
  static setWebAppUrl(url: string): void {
    this.gasWebAppUrl = url
  }

  /**
   * 獲取當前的 Web App URL
   */
  static getWebAppUrl(): string {
    return this.gasWebAppUrl
  }
}
