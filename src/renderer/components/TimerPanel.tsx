import React from 'react'
import { useTimer } from '../hooks/useTimer'
import { useStore } from '../hooks/useStore'

export const TimerPanel: React.FC = () => {
  const { currentTime, isRunning, isBreak, toggleTimer, resetTimer, skipSession } = useTimer()
  const { setFocusTime, setBreakTime, focusTime, breakTime } = useStore()

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="card p-8 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isBreak ? '☕ 休息時間' : '📚 專注時間'}
        </h2>
        <p className="text-slate-600">
          {isBreak ? '好好休息，準備下一輪' : '專注學習，享受進步的快感'}
        </p>
      </div>

      {/* Large timer display */}
      <div className="flex justify-center">
        <div className={`text-9xl font-bold tracking-tight transition-colors duration-300 ${
          isBreak ? 'text-green-500' : 'text-primary-500'
        }`}>
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-primary-500 hover:bg-primary-600'
          }`}
        >
          {isRunning ? '⏸ 暫停' : '▶ 開始'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300"
        >
          🔄 重設
        </button>
        <button
          onClick={skipSession}
          className="px-8 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300"
        >
          ⏭ 跳過
        </button>
      </div>

      {/* Settings */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-slate-900">⚙️ 自訂設定</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              專注時間（分鐘）
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={focusTime}
              onChange={(e) => setFocusTime(Number(e.target.value))}
              className="input-field"
              disabled={isRunning}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              休息時間（分鐘）
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              className="input-field"
              disabled={isRunning}
            />
          </div>
        </div>
      </div>

      {/* Info message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <p className="font-medium mb-1">💡 提示</p>
        <p>使用番茄鐘技巧可以有效提升專注力。建議每次專注 25 分鐘，然後休息 5 分鐘。</p>
      </div>
    </div>
  )
}

export default TimerPanel
