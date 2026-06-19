import React, { useState } from 'react'
import TimerPanel from './components/TimerPanel'
import TaskPanel from './components/TaskPanel'
import StatisticsPanel from './components/StatisticsPanel'
import AIAssistantPanel from './components/AIAssistantPanel'
import { GoogleSheetsPanel } from './components/GoogleSheetsPanel'

type TabType = 'timer' | 'tasks' | 'stats' | 'ai' | 'sheets'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('timer')

  const tabs: { id: TabType; label: string; icon: string; component: React.FC }[] = [
    { id: 'timer', label: '計時器', icon: '⏱️', component: TimerPanel },
    { id: 'tasks', label: '任務', icon: '📋', component: TaskPanel },
    { id: 'stats', label: '統計', icon: '📊', component: StatisticsPanel },
    { id: 'ai', label: 'AI 助理', icon: '🤖', component: AIAssistantPanel },
    { id: 'sheets', label: '雲端存儲', icon: '☁️', component: GoogleSheetsPanel },
  ]

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || TimerPanel

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                📚 AI Reading Timer
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                搭載 AI 的讀書計時助手，幫你提升學習效率
              </p>
            </div>
            <div className="text-right text-sm text-slate-600">
              <p>讓我們一起專注學習吧！💪</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm border border-slate-200'
              }`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs sm:text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content area with animation */}
        <div className="animate-fadeIn">
          <ActiveComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4">📚 關於</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                AI Reading Timer 是一款功能強大的讀書計時工具，融合番茄鐘技巧和 AI 技術，幫助你提升學習效率。
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">✨ 主要功能</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>⏱️ 自定義番茄鐘計時</li>
                <li>📋 任務清單管理</li>
                <li>📊 學習數據統計</li>
                <li>🤖 AI 學習建議</li>
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h3 className="text-lg font-semibold mb-4">💡 學習小貼士</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>🎯 設定明確的學習目標</li>
                <li>🔇 消除周圍的干擾</li>
                <li>☕ 定期休息保持精力</li>
                <li>📈 追蹤進度並慶祝成就</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2024 AI Reading Timer. Made with ❤️ for learners everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App
