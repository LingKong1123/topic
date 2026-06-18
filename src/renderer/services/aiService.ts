import axios from 'axios'

export interface AIResponse {
  suggestion: string
  motivation: string
  planSteps?: string[]
}

interface OpenAIMessage {
  role: 'user' | 'assistant'
  content: string
}

const API_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'OPENAI'
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo-preview'
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export class AIService {
  static async getStudyAdvice(studyStatus: string, sessionStats: {
    totalFocusTime: number
    totalSessions: number
    tasksCompleted: number
  }): Promise<AIResponse> {
    if (API_PROVIDER === 'OPENAI') {
      return this.getOpenAIAdvice(studyStatus, sessionStats)
    } else if (API_PROVIDER === 'GEMINI') {
      return this.getGeminiAdvice(studyStatus, sessionStats)
    }
    throw new Error('Invalid AI provider configured')
  }

  private static async getOpenAIAdvice(
    studyStatus: string,
    sessionStats: any
  ): Promise<AIResponse> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'user',
        content: `你是一位資深的學習效率教練。根據以下學習狀況，給出改善專注力的建議和激勵話語：

學習狀況：${studyStatus}

今日統計：
- 專注時間：${sessionStats.totalFocusTime} 分鐘
- 番茄鐘次數：${sessionStats.totalSessions} 次
- 完成任務：${sessionStats.tasksCompleted} 個

請以 JSON 格式回覆，包含以下欄位：
- suggestion: 改善專注力的具體建議
- motivation: 激勵話語
- planSteps: 建議的學習計劃步驟（列表）`,
      },
    ]

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: OPENAI_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const content = response.data.choices[0].message.content
      const parsed = JSON.parse(content)
      return {
        suggestion: parsed.suggestion || '',
        motivation: parsed.motivation || '',
        planSteps: parsed.planSteps || [],
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getDefaultAdvice()
    }
  }

  private static async getGeminiAdvice(
    studyStatus: string,
    sessionStats: any
  ): Promise<AIResponse> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const prompt = `你是一位資深的學習效率教練。根據以下學習狀況，給出改善專注力的建議和激勵話語：

學習狀況：${studyStatus}

今日統計：
- 專注時間：${sessionStats.totalFocusTime} 分鐘
- 番茄鐘次數：${sessionStats.totalSessions} 次
- 完成任務：${sessionStats.tasksCompleted} 個

請以 JSON 格式回覆，包含以下欄位：
- suggestion: 改善專注力的具體建議
- motivation: 激勵話語
- planSteps: 建議的學習計劃步驟（列表）`

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      )

      const content = response.data.candidates[0].content.parts[0].text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid JSON in response')
      }
      const parsed = JSON.parse(jsonMatch[0])
      return {
        suggestion: parsed.suggestion || '',
        motivation: parsed.motivation || '',
        planSteps: parsed.planSteps || [],
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return this.getDefaultAdvice()
    }
  }

  private static getDefaultAdvice(): AIResponse {
    return {
      suggestion: '保持規律的學習節奏。建議使用番茄鐘技巧，每次專注25分鐘後休息5分鐘。如果感到分心，可以嘗試消除周圍的干擾源。',
      motivation: '你已經開始行動了，這就是成功的第一步！每一個專注的時刻都在累積你的進步。相信自己，堅持下去！',
      planSteps: [
        '設定清晰的學習目標',
        '使用番茄鐘進行時間管理',
        '在安靜的環境中學習',
        '定期休息以保持精力',
        '記錄學習進度並慶祝小勝利',
      ],
    }
  }

  static async generateLearningPlan(goal: string, durationDays: number = 7): Promise<string[]> {
    if (API_PROVIDER === 'OPENAI') {
      return this.generateOpenAIPlan(goal, durationDays)
    } else if (API_PROVIDER === 'GEMINI') {
      return this.generateGeminiPlan(goal, durationDays)
    }
    throw new Error('Invalid AI provider configured')
  }

  private static async generateOpenAIPlan(goal: string, durationDays: number): Promise<string[]> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'user',
        content: `作為學習效率專家，請為以下目標生成一個 ${durationDays} 天的學習計畫：

目標：${goal}

請提供一個詳細的日程安排，每天列出具體的學習任務和目標。以 JSON 格式回覆，包含一個 "plan" 陣列，每個元素是一個字符串描述。`,
      },
    ]

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: OPENAI_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const content = response.data.choices[0].message.content
      const parsed = JSON.parse(content)
      return parsed.plan || []
    } catch (error) {
      console.error('OpenAI plan generation error:', error)
      return this.getDefaultPlan(goal)
    }
  }

  private static async generateGeminiPlan(goal: string, durationDays: number): Promise<string[]> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const prompt = `作為學習效率專家，請為以下目標生成一個 ${durationDays} 天的學習計畫：

目標：${goal}

請提供一個詳細的日程安排，每天列出具體的學習任務和目標。以 JSON 格式回覆，包含一個 "plan" 陣列，每個元素是一個字符串描述。`

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      )

      const content = response.data.candidates[0].content.parts[0].text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid JSON in response')
      }
      const parsed = JSON.parse(jsonMatch[0])
      return parsed.plan || []
    } catch (error) {
      console.error('Gemini plan generation error:', error)
      return this.getDefaultPlan(goal)
    }
  }

  private static getDefaultPlan(goal: string): string[] {
    return [
      `第 1 天：了解 ${goal} 的基礎概念，閱讀入門資料`,
      `第 2 天：深入學習核心知識點，做筆記和摘要`,
      `第 3 天：完成練習題和實踐項目`,
      `第 4 天：複習前三天的內容，解決遇到的問題`,
      `第 5 天：學習進階主題和應用場景`,
      `第 6 天：進行綜合練習和項目應用`,
      `第 7 天：最終複習和知識整合，準備考試或展示成果`,
    ]
  }
}

export default AIService
