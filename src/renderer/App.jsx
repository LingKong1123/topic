import { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("timer");

  // === 計時器狀態與邏輯 ===
  const [timeLeft, setTimeLeft] = useState(1500); // 25分鐘 = 1500秒
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("時間到！休息一下吧。");
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  // === AI 困難分析狀態與邏輯 ===
  const [difficultyInput, setDifficultyInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      title: "學習建議",
      content: "根據你的學習數據，建議每個番茄鐘後休息 5 分鐘。",
      type: "blue"
    },
    {
      title: "進度追蹤",
      content: "你的學習連續性很好，請再加油！",
      type: "green"
    },
    {
      title: "優化建議",
      content: "嘗試在下午 2-4 點進行複習，效果會更佳。",
      type: "yellow"
    }
  ]);

  const handleAiAnalyze = (e) => {
    e.preventDefault();
    if (!difficultyInput.trim()) return;

    // 模擬 AI 根據關鍵字分析並給予準備方向
    const input = difficultyInput.toLowerCase();
    let newSuggestions = [];

    if (input.includes("數學") || input.includes("算") || input.includes("公式")) {
      newSuggestions = [
        { title: "🎯 核心突破口", content: `針對「${difficultyInput}」，建議不要死記公式，先從課本基本例題的推導過程著手。`, type: "blue" },
        { title: "📋 刷題準備方向", content: "每天定時練習 5 道觀念題，建立錯題本，將算錯的步驟用紅筆標記，隔天重新遮住再算一次。", type: "green" },
        { title: "💡 AI 心理建設", content: "理解概念比做大量題目更重要，進度慢一點沒關係，穩紮穩打才是最快的捷徑！", type: "yellow" }
      ];
    } else if (input.includes("英文") || input.includes("單字") || input.includes("背")) {
      newSuggestions = [
        { title: "🎯 核心突破口", content: `針對「${difficultyInput}」，建議放棄長時間死背。改用動態記憶法，把單字融入句子中閱讀。`, type: "blue" },
        { title: "📋 複習準備方向", content: "利用今天番茄鐘的零碎時間複習。早中晚各看 3 次，比一口氣背一小時更有效率。", type: "green" },
        { title: "💡 AI 心理建設", content: "語言需要刺激與反覆接觸，忘記是很正常的，多看幾次大腦就會自動記住！", type: "yellow" }
      ];
    } else {
      newSuggestions = [
        { title: "🎯 核心突破口", content: `針對你的困境「${difficultyInput}」，AI 建議將這個大問題切碎。先拆解成 15 分鐘內能完成的小任務。`, type: "blue" },
        { title: "📋 行動準備方向", content: "在下一個番茄鐘開始前，拿出一張紙寫下今天最重要的一件事，並立刻動手做前 5 分鐘。", type: "green" },
        { title: "💡 AI 心理建設", content: "萬事起頭難，只要開始專注第一個 5 分鐘，焦慮感就會自然消失！", type: "yellow" }
      ];
    }

    setAiSuggestions(newSuggestions);
    setDifficultyInput("");
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
              <div className="text-6xl font-bold text-blue-600 mb-8 font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={handleStartPause}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
                    isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isRunning ? "暫停計時" : "開始計時"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
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
            <h2 className="text-3xl font-bold mb-4 text-slate-800">🤖 AI 學習諮詢與建議</h2>
            
            {/* 困難輸入表單 */}
            <form onSubmit={handleAiAnalyze} className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                遇到了什麼學習困難？寫出來讓 AI 幫你規劃準備方向：
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={difficultyInput}
                  onChange={(e) => setDifficultyInput(e.target.value)}
                  placeholder="例如：數學公式背不起來、英文單字一直忘、無法靜下心..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm whitespace-nowrap"
                >
                  尋求建議
                </button>
              </div>
            </form>

            {/* AI 建議輸出結果 */}
            <div className="space-y-4">
              {aiSuggestions.map((item, index) => {
                let colorClass = "bg-blue-50 border-blue-500 text-blue-900 text-blue-800";
                if (item.type === "green") colorClass = "bg-green-50 border-green-500 text-green-900 text-green-800";
                if (item.type === "yellow") colorClass = "bg-yellow-50 border-yellow-500 text-yellow-900 text-yellow-800";
                
                const classes = colorClass.split(" ");
                return (
                  <div key={index} className={`${classes[0]} border-l-4 ${classes[1]} p-4 rounded`}>
                    <p className={`font-semibold ${classes[2]}`}>{item.title}</p>
                    <p className={`text-sm ${classes[3]} mt-1`}>{item.content}</p>
                  </div>
                );
              })}
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
