import React, { useState, useRef, useEffect } from 'react'
import AIService, { AIResponse } from '../services/aiService'
import { useStore } from '../hooks/useStore'

export const AIAssistantPanel: React.FC = () => {
  const { getStatistics } = useStore()
  const [studyStatus, setStudyStatus] = useState('')
  const [learningGoal, setLearningGoal] = useState('')
  const [durationDays, setDurationDays] = useState(7)
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null)
  const [planSteps, setPlanSteps] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'advice' | 'plan'>('advice')
  const [error, setError] = useState<string | null>(null)
  const responseRef = useRef<HTMLDivElement>(null)

  const handleGetAdvice = async () => {
    if (!studyStatus.trim()) {
      setError('請先描述你的學習狀況')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const stats = getStatistics()
      const response = await AIService.getStudyAdvice(studyStatus, stats)
      setAIResponse(response)
      setActiveTab('advice')
      responseRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      setError(`獲取建議失敗：${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePlan = async () => {
    if (!learningGoal.trim()) {
      setError('請先輸入學習目標')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const plan = await AIService.generateLearningPlan(learningGoal, durationDays)
      setPlanSteps(plan)
      setActiveTab('plan')
      responseRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      setError(`生成計劃失敗：${err instanceof Error ? err.message : '未知錯誤'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-2">🤖 AI 讀書助理</h2>
        <p className="text-sm text-slate-600">由 AI 驅動的個性化學習建議和計劃生成</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('advice')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'advice'
              ? 'text-primary-600 border-primary-600'
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          💡 獲取建議
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'plan'
              ? 'text-primary-600 border-primary-600'
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          📋 生成計劃
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-900">
          <p className="font-medium">❌ {error}</p>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'advice' ? (
        <div className="space-y-4">
          {/* Study status input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              描述你的學習狀況
            </label>
            <textarea
              value={studyStatus}
              onChange={(e) => setStudyStatus(e.target.value)}
              placeholder="例如：最近讀書容易分心，專注力不夠，想要提高學習效率..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Get advice button */}
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ 正在思考中...' : '✨ 獲取 AI 建議'}
          </button>

          {/* AI Response */}
          {aiResponse && (
            <div ref={responseRef} className="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              {/* Motivation */}
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">💪 激勵話語</h3>
                <p className="text-blue-900 italic">{aiResponse.motivation}</p>
              </div>

              {/* Suggestion */}
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">💡 改善建議</h3>
                <p className="text-blue-900 whitespace-pre-wrap">{aiResponse.suggestion}</p>
              </div>

              {/* Plan steps */}
              {aiResponse.planSteps && aiResponse.planSteps.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-3">📝 建議步驟</h3>
                  <ol className="space-y-2 list-decimal list-inside text-blue-900">
                    {aiResponse.planSteps.map((step, idx) => (
                      <li key={idx} className="text-sm">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Learning goal input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              學習目標
            </label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="例如：學習 Python 基礎、掌握數據分析、準備托福考試..."
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Duration input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              計劃天數（{durationDays} 天）
            </label>
            <input
              type="range"
              min="3"
              max="30"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3 天</span>
              <span>30 天</span>
            </div>
          </div>

          {/* Generate plan button */}
          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ 正在生成計劃...' : '🚀 生成學習計劃'}
          </button>

          {/* Plan output */}
          {planSteps.length > 0 && (
            <div ref={responseRef} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 space-y-3">
              <h3 className="text-lg font-bold text-green-900">📚 {durationDays} 天學習計劃</h3>
              <div className="space-y-3">
                {planSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-3 border border-green-200 hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm font-semibold text-green-900 mb-1">第 {idx + 1} 天</p>
                    <p className="text-sm text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIAssistantPanel
