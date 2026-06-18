import React, { useState } from 'react'
import { useStore } from '../hooks/useStore'

export const TaskPanel: React.FC = () => {
  const { tasks, addTask, removeTask, toggleTask } = useStore()
  const [input, setInput] = useState('')

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input.trim())
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <div className="card p-6 space-y-4">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-2">📋 任務清單</h2>
        <p className="text-sm text-slate-600">
          完成率：{completedCount}/{tasks.length} ({completionRate}%)
        </p>
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      )}

      {/* Input section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="輸入新任務..."
          className="input-field flex-1"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 active:bg-primary-700"
        >
          ➕ 新增
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            還沒有任務。來新增第一個吧！✨
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
              
              {/* Task text */}
              <span
                className={`flex-1 transition-all ${
                  task.completed
                    ? 'line-through text-slate-400'
                    : 'text-slate-900 font-medium'
                }`}
              >
                {task.title}
              </span>
              
              {/* Delete button */}
              <button
                onClick={() => removeTask(task.id)}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-900">
          <p>
            🎯 你已經完成了 <span className="font-bold">{completedCount}</span> 個任務。
            {completionRate === 100 && ' 太棒了，今天的目標都完成了！🎉'}
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskPanel
