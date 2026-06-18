import React, { useMemo } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useStore } from '../hooks/useStore'

export const StatisticsPanel: React.FC = () => {
  const { sessions, getStatistics } = useStore()
  const stats = getStatistics()

  const chartData = useMemo(() => {
    // Group sessions by date
    const groupedByDate: { [key: string]: any } = {}

    sessions.forEach((session) => {
      const date = new Date(session.date).toLocaleDateString('zh-TW')
      if (!groupedByDate[date]) {
        groupedByDate[date] = {
          date,
          focusMinutes: 0,
          sessions: 0,
          tasksCompleted: 0,
        }
      }
      groupedByDate[date].focusMinutes += session.focusMinutes
      groupedByDate[date].sessions += session.sessionsCount
      groupedByDate[date].tasksCompleted += session.tasksCompleted
    })

    return Object.values(groupedByDate).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [sessions])

  const weeklyData = useMemo(() => {
    const now = new Date()
    const weekData: { [key: number]: any } = {}

    for (let i = 0; i < 7; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
      weekData[i] = {
        day: dayOfWeek,
        focusMinutes: 0,
        sessionsCount: 0,
      }
    }

    sessions.forEach((session) => {
      const sessionDate = new Date(session.date)
      const daysDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff >= 0 && daysDiff < 7) {
        weekData[daysDiff].focusMinutes += session.focusMinutes
        weekData[daysDiff].sessionsCount += session.sessionsCount
      }
    })

    return Object.values(weekData).reverse()
  }, [sessions])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">⏱️ 總專注時間</h3>
          <p className="text-3xl font-bold text-primary-600">
            {Math.floor(stats.totalFocusTime / 60)}h {stats.totalFocusTime % 60}m
          </p>
          <p className="text-xs text-slate-500 mt-2">
            相當於 {Math.floor(stats.totalFocusTime / 60)} 小時 {stats.totalFocusTime % 60} 分鐘
          </p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">🎯 番茄鐘次數</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalSessions}</p>
          <p className="text-xs text-slate-500 mt-2">累計完成的專注週期</p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">✅ 已完成任務</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.tasksCompleted}</p>
          <p className="text-xs text-slate-500 mt-2">勾選完成的任務數量</p>
        </div>
      </div>

      {/* Charts */}
      {chartData.length > 0 ? (
        <div className="space-y-6">
          {/* Weekly overview */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📊 本週概覽</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="focusMinutes" fill="#0ea5e9" name="專注時間（分鐘）" />
                <Bar dataKey="sessionsCount" fill="#10b981" name="番茄鐘次數" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Daily trend */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📈 學習趨勢</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="focusMinutes"
                  stroke="#0ea5e9"
                  name="專注時間（分鐘）"
                  dot={{ fill: '#0ea5e9' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-slate-500 text-lg">
            📉 還沒有統計數據。開始使用計時器，記錄你的學習進度吧！
          </p>
        </div>
      )}
    </div>
  )
}

export default StatisticsPanel
