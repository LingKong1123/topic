import { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("timer");

  const tabs = [
    { id: "timer", label: "計時器", icon: "⏱️" },
    { id: "tasks", label: "任務", icon: "📋" },
    { id: "stats", label: "統計", icon: "📊" },
    { id: "ai", label: "AI 助理", icon: "🤖" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "timer":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">⏱️ 計時器</h2>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-8">25:00</div>
              <div className="flex gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  開始計時
                </button>
                <button className="bg-slate-300 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-400 transition">
                  重置
                </button>
              </div>
            </div>
          </div>
        );
      case "tasks":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">📋 任務清單</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-lg">完成閱讀第一章</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-lg">複習數學公式</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="新增任務..."
              className="w-full mt-4 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case "stats":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">📊 統計數據</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-slate-600">今日番茄鐘</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600">5h 40m</div>
                <div className="text-sm text-slate-600">學習時長</div>
              </div>
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              🤖 AI 學習建議
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-blue-900">學習建議</p>
                <p className="text-sm text-blue-800 mt-1">
                  根據你的學習數據，建議每個番茄鐘後休息 5 分鐘。
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">進度追蹤</p>
                <p className="text-sm text-green-800 mt-1">
                  你的學習連續性很好，請再加油！
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-semibold text-yellow-900">優化建議</p>
                <p className="text-sm text-yellow-800 mt-1">
                  嘗試在下午 2-4 點進行複習，效果會更佳。
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-sm border border-slate-200"
              }`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs sm:text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="animate-fadeIn">{renderContent()}</div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">📚 關於</h3>
              <p className="text-slate-400 text-sm">
                AI Reading Timer 是一款功能強大的讀書計時工具，融合番茄鐘技巧和
                AI 技術。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">✨ 功能</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>⏱️ 番茄鐘計時</li>
                <li>📋 任務管理</li>
                <li>📊 數據統計</li>
                <li>🤖 AI 建議</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">💡 學習貼士</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>🎯 設定明確目標</li>
                <li>🔇 消除干擾</li>
                <li>☕ 定期休息</li>
                <li>📈 追蹤進度</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2024 AI Reading Timer. Made with ❤️ for learners.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
