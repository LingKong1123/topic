import { useState, useEffect, useRef } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("timer");

  // --- 計時器狀態功能 ---
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 預設 25 分鐘
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            alert("⏰ 番茄鐘結束！休息一下吧！");
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // --- AI 助理狀態功能 ---
  const [difficulty, setDifficulty] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!difficulty.trim()) return;

    // 模擬 AI 根據關鍵字給予具體建議與準備方向
    let advice = "保持專注，將大目標拆解成小步驟。";
    let direction = "建議每天固定安排 1-2 個番茄鐘專注攻克此項難題。";

    if (difficulty.includes("數學") || difficulty.includes("計算")) {
      advice = "理解公式背後的邏輯比死記更重要，試著從基礎例題著手。";
      direction = "1. 每天練習 3 題基礎題 ➔ 2. 錯題歸納並重新計算 ➔ 3. 挑戰進階題型。";
    } else if (difficulty.includes("英文") || difficulty.includes("語言") || difficulty.includes("單字")) {
      advice = "語言需要碎片化記憶，不建議長時間死背。";
      direction = "1. 利用早晨番茄鐘記 10 個單字 ➔ 2. 下午利用計時器閱讀一篇短文 ➔ 3. 睡前自我測試。";
    } else if (difficulty.includes("專注") || difficulty.includes("分心")) {
      advice = "大腦的專注力就像肌肉，需要漸進式訓練。";
      direction = "1. 開啟計時器前將手機放至另一個房間 ➔ 2. 實施嚴格的 25 分鐘專注、5 分鐘全休息 ➔ 3. 每天檢視分心原因。";
    } else if (difficulty.includes("進度") || difficulty.includes("讀不完")) {
      advice = "時間管理的本質是放棄不重要的事，抓大放小。";
      direction = "1. 列出今日必做前三件事 ➔ 2. 優先用精力最好的時段解決最難的科目 ➔ 3. 每週調整排程。";
    }

    setAiResponse({ advice, direction });
  };

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
              <div className="text-6xl font-bold text-blue-600 mb-8">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={toggleTimer}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
                    isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isRunning ? "暫停計時" : "開始計時"}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="bg-slate-300 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-400 transition"
                >
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
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-slate-600">完成任務</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">95%</div>
                <div className="text-sm text-slate-600">完成率</div>
              </div>
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">🤖 AI 學習建議助教</h2>
            
            {/* 困難輸入表單 */}
            <form onSubmit={handleAiSubmit} className="mb-8">
              <label htmlFor="difficulty-input" className="block text-sm font-medium text-slate-700 mb-2">
                請寫下你目前遇到的學習困難：
              </label>
              <div className="flex gap-2">
                <input
                  id="difficulty-input"
                  type="text"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="例如：數學公式記不住、背英文單字容易分心、讀書時間不夠..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shrink-0"
                >
                  獲取 AI 建議
                </button>
              </div>
            </form>

            {/* AI 回應區域 */}
            {aiResponse ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-semibold text-blue-900">💡 AI 改善建議</p>
                  <p className="text-sm text-blue-800 mt-1">{aiResponse.advice}</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-semibold text-green-900">🚀 具體準備方向步驟</p>
                  <p className="text-sm text-green-800 mt-1 whitespace-pre-line">{aiResponse.direction}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-slate-400 text-sm text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                在上方輸入您的困擾，AI 助理將為您量身打造學習方向。
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">📚 AI Reading Timer</h1>
              <p className="text-sm text-slate-600 mt-1">搭載 AI 的讀書計時助手，幫你提升學習效率</p>
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
