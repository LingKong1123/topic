import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("timer");

  // --- ⏱️ 計時器核心狀態與邏輯區 ---
  const [workLength, setWorkLength] = useState(25 * 60); // 預設工作 25 分鐘 (以秒計算)
  const [breakLength, setBreakLength] = useState(5 * 60); // 預設休息 5 分鐘 (以秒計算)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isWorking, setIsWorking] = useState(true); // true = 專注時間, false = 休息時間
  const [isRunning, setIsRunning] = useState(false);
  
  // 使用 useRef 儲存定時器，確保在各種狀態切換下都能準確清除與控制
  const timerRef = useRef(null);

  // 當使用者在「非執行狀態」調整工作或休息時間時，同步更新畫面顯示的時間
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(isWorking ? workLength : breakLength);
    }
  }, [workLength, breakLength, isWorking, isRunning]);

  // 核心倒數計時邏輯
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // 時間到了，清除目前的計時
            clearInterval(timerRef.current);
            setIsRunning(false);
            
            // 自動切換下一個模式
            const nextMode = !isWorking;
            setIsWorking(nextMode);
            
            // 延遲一下跳出提醒，避免阻塞渲染
            setTimeout(() => {
              alert(nextMode ? "💪 休息結束！準備開始專注！" : "🔊 專注時間結束！休息一下吧！");
            }, 100);
            
            return nextMode ? workLength : breakLength;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    // 元件卸載時清除計時器，防範記憶體流失
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isWorking, workLength, breakLength]);

  // 格式化時間（將總秒數轉換為 mm:ss 格式顯示）
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 重置按鈕邏輯
  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsWorking(true);
    setTimeLeft(workLength);
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
            <h2 className="text-3xl font-bold mb-2 text-slate-800">
              ⏱️ 計時器 — <span className="text-xl font-semibold text-blue-500">{isWorking ? "專注中" : "休息中"}</span>
            </h2>
            <div className="text-center">
              {/* 動態顯示倒數時間 */}
              <div className="text-6xl font-bold text-blue-600 mb-8 font-mono tracking-wider">
                {formatTime(timeLeft)}
              </div>
              
              {/* 控制按鈕 */}
              <div className="flex gap-4 justify-center mb-8">
                <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`${isRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"} text-white px-8 py-3 rounded-lg font-semibold transition`}
                >
                  {isRunning ? "暫停計時" : "開始計時"}
                </button>
                <button 
                  onClick={handleReset}
                  className="bg-slate-300 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-400 transition"
                >
                  重置
                </button>
              </div>

              <hr className="border-slate-100 my-6" />

              {/* 🛠️ 時間增減調整與自訂功能面板 */}
              <div className="max-w-xs mx-auto space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">📝 專注時間 :</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setWorkLength(prev => Math.max(60, prev - 60))}
                      className="w-8 h-8 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-semibold text-slate-800">{Math.floor(workLength / 60)} 分</span>
                    <button 
                      onClick={() => setWorkLength(prev => prev + 60)}
                      className="w-8 h-8 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">☕ 休息時間 :</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setBreakLength(prev => Math.max(60, prev - 60))}
                      className="w-8 h-8 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-semibold text-slate-800">{Math.floor(breakLength / 60)} 分</span>
                    <button 
                      onClick={() => setBreakLength(prev => prev + 60)}
                      className="w-8 h-8 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      case "tasks":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              📋 任務清單
            </h2>
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
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              📊 統計數據
            </h2>
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
      {/* Header */}
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
