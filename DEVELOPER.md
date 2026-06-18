# 📖 開發者指南

本指南幫助開發者理解項目架構、如何添加新功能以及最佳實踐。

## 🏗️ 架構概述

### 項目分層

```
Presentation Layer (UI Components)
        ↓
Business Logic Layer (Custom Hooks & Services)
        ↓
State Management Layer (Zustand Store)
        ↓
Data Persistence Layer (localStorage + sessionStorage)
```

### 文件職責

| 目錄 | 用途 |
|------|------|
| `src/renderer/components/` | React 視圖元件 |
| `src/renderer/hooks/` | 自定義邏輯 hooks |
| `src/renderer/services/` | API 和業務邏輯服務 |
| `src/renderer/styles/` | 全局樣式 |
| `electron/` | 主進程和預載腳本 |
| `public/` | 靜態資源 |

---

## 🎨 添加新的 UI 元件

### 步驟 1：創建元件文件

```bash
# 創建新的元件文件
touch src/renderer/components/MyNewPanel.tsx
```

### 步驟 2：編寫元件

```typescript
import React, { useState } from 'react'
import { useStore } from '../hooks/useStore'

interface MyNewPanelProps {
  title?: string
}

export const MyNewPanel: React.FC<MyNewPanelProps> = ({ title = '新面板' }) => {
  const [loading, setLoading] = useState(false)
  const { /* 從 store 中解構需要的方法 */ } = useStore()

  return (
    <div className="card p-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      
      {/* 你的內容 */}
    </div>
  )
}

export default MyNewPanel
```

### 步驟 3：在 App.tsx 中使用

編輯 `src/renderer/App.tsx`：

```typescript
import MyNewPanel from './components/MyNewPanel'

// 在 tabs 陣列中添加新標籤
const tabs: { id: TabType; label: string; icon: string; component: React.FC }[] = [
  // ... 現有標籤
  { id: 'mynew', label: '新功能', icon: '✨', component: MyNewPanel },
]

// 更新 TabType
type TabType = 'timer' | 'tasks' | 'stats' | 'ai' | 'mynew'
```

---

## 🔧 添加新的 API 服務

### 步驟 1：創建服務文件

```bash
touch src/renderer/services/myNewService.ts
```

### 步驟 2：編寫服務

```typescript
import axios from 'axios'

export class MyNewService {
  static async fetchData(params: any) {
    try {
      const response = await axios.get('/api/endpoint', { params })
      return response.data
    } catch (error) {
      console.error('Service error:', error)
      throw error
    }
  }

  static async postData(data: any) {
    try {
      const response = await axios.post('/api/endpoint', data)
      return response.data
    } catch (error) {
      console.error('Service error:', error)
      throw error
    }
  }
}
```

### 步驟 3：在元件中使用

```typescript
import MyNewService from '../services/myNewService'

const MyComponent = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    setLoading(true)
    try {
      const result = await MyNewService.fetchData({ /* 參數 */ })
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleFetch} disabled={loading}>
      {loading ? '加載中...' : '獲取數據'}
    </button>
  )
}
```

---

## 📊 擴展 Zustand 狀態管理

### 添加新的狀態

編輯 `src/renderer/hooks/useStore.ts`：

```typescript
export interface StoreState {
  // 新狀態
  myNewState: string
  myNewFunction: (value: string) => void

  // ... 現有狀態
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // 新狀態初始值
      myNewState: 'default',
      
      // 新函數
      myNewFunction: (value: string) => set({ myNewState: value }),

      // ... 現有實現
    }),
    {
      name: 'ai-reading-timer-storage',
      partialize: (state) => ({
        // 添加要持久化的新狀態
        myNewState: state.myNewState,
        // ... 其他需要持久化的狀態
      }),
    }
  )
)
```

### 在元件中使用

```typescript
const MyComponent = () => {
  const { myNewState, myNewFunction } = useStore()

  return (
    <div>
      <p>{myNewState}</p>
      <button onClick={() => myNewFunction('new value')}>
        更新狀態
      </button>
    </div>
  )
}
```

---

## 🎯 創建自定義 Hook

### 步驟 1：創建 Hook 文件

```bash
touch src/renderer/hooks/useMyCustomHook.ts
```

### 步驟 2：實現 Hook

```typescript
import { useState, useEffect } from 'react'

interface MyHookOptions {
  initialValue?: string
}

export const useMyCustomHook = (options: MyHookOptions = {}) => {
  const { initialValue = '' } = options
  const [value, setValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Hook 邏輯
  }, [])

  return {
    value,
    setValue,
    isLoading,
  }
}
```

### 步驟 3：使用 Hook

```typescript
const MyComponent = () => {
  const { value, setValue, isLoading } = useMyCustomHook({ initialValue: 'test' })

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue('new value')}>更新</button>
    </div>
  )
}
```

---

## 🎨 使用 Tailwind CSS

### 預定義的組件類

應用已在 `src/renderer/styles/globals.css` 中定義了許多實用類：

```css
/* 按鈕 */
.btn-primary      /* 主要按鈕 */
.btn-secondary    /* 次要按鈕 */

/* 輸入 */
.input-field      /* 輸入框 */

/* 容器 */
.card             /* 卡片 */

/* 焦點 */
.focus-ring       /* 焦點環 */
```

### 使用示例

```tsx
<div className="card p-6 space-y-4">
  <input className="input-field" placeholder="輸入..." />
  <button className="btn-primary">提交</button>
  <button className="btn-secondary">取消</button>
</div>
```

### 添加新的組件類

編輯 `src/renderer/styles/globals.css`：

```css
@layer components {
  .my-custom-button {
    @apply px-4 py-2 bg-custom-color text-white rounded-lg font-medium;
  }
}
```

---

## 🧪 測試最佳實踐

### 元件測試

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText(/text/)).toBeInTheDocument()
  })

  test('handles click event', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    await user.click(screen.getByRole('button'))
    expect(/* assertion */).toBe(true)
  })
})
```

---

## 📝 命名約定

### 文件命名
- React 元件：`PascalCase.tsx`（例：`TimerPanel.tsx`）
- Hooks：`useCamelCase.ts`（例：`useTimer.ts`）
- Services：`camelCaseService.ts`（例：`aiService.ts`）
- 類型：`types.ts` 或在文件頂部定義

### 變量命名
- 常量：`UPPER_SNAKE_CASE`
- 變量和函數：`camelCase`
- 類和接口：`PascalCase`
- 私有方法：`_camelCase`

### React Props
```typescript
interface MyComponentProps {
  title: string
  onClickCallback?: (value: string) => void
  disabled?: boolean
}
```

---

## 🚀 性能優化建議

### 1. 使用 React.memo 避免不必要的重渲染

```typescript
const MyComponent = React.memo(({ title }: { title: string }) => {
  return <h2>{title}</h2>
})
```

### 2. 使用 useCallback 緩存函數

```typescript
const handleClick = useCallback(() => {
  // 邏輯
}, [])
```

### 3. 使用 useMemo 緩存計算結果

```typescript
const expensiveValue = useMemo(() => {
  return complexCalculation()
}, [dependency])
```

### 4. 代碼分割

```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

<Suspense fallback={<div>加載中...</div>}>
  <HeavyComponent />
</Suspense>
```

---

## 🔒 安全最佳實踐

### 1. API Key 保護
- 使用環境變數
- 不在前端代碼中硬編碼

### 2. 輸入驗證
```typescript
const validateInput = (input: string): boolean => {
  return input.trim().length > 0 && input.length < 500
}
```

### 3. 錯誤處理
```typescript
try {
  const result = await riskOperation()
} catch (error) {
  console.error('操作失敗:', error)
  // 顯示用戶友好的錯誤信息
}
```

### 4. CORS 和網絡安全
- 使用 HTTPS
- 設置適當的 CORS 頭
- 驗證來自 API 的數據

---

## 📚 代碼示例

### 完整的新功能示例

```typescript
// src/renderer/components/NewFeature.tsx
import React, { useState, useCallback } from 'react'
import { useStore } from '../hooks/useStore'
import FeatureService from '../services/featureService'

export const NewFeature: React.FC = () => {
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const { getStatistics } = useStore()

  const handleLoadData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await FeatureService.loadData()
      setData(result)
    } catch (error) {
      console.error('加載失敗:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleAddItem = useCallback(() => {
    if (input.trim()) {
      setData([...data, input])
      setInput('')
    }
  }, [input, data])

  return (
    <div className="card p-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-900">新功能</h2>
      
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field flex-1"
          placeholder="輸入..."
        />
        <button onClick={handleAddItem} className="btn-primary">
          添加
        </button>
      </div>

      <button onClick={handleLoadData} disabled={loading} className="btn-secondary">
        {loading ? '加載中...' : '加載數據'}
      </button>

      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="p-2 bg-slate-50 rounded">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🎯 調試技巧

### 1. 使用 React Developer Tools
- 安裝 React DevTools 瀏覽器擴展
- 檢查元件樹和 Props

### 2. 使用 Redux DevTools（對 Zustand）
- 可以觀察狀態變化

### 3. 控制台日誌
```typescript
console.log('Debug:', value)
console.warn('Warning:', message)
console.error('Error:', error)
```

### 4. 斷點調試
- F12 打開開發者工具
- Sources 標籤設置斷點
- 單步執行代碼

---

## 📋 提交代碼檢查清單

- [ ] 代碼符合命名約定
- [ ] 沒有未使用的變量或導入
- [ ] 添加了適當的錯誤處理
- [ ] 更新了相關文檔
- [ ] 測試了新功能
- [ ] 沒有硬編碼的敏感信息
- [ ] TypeScript 類型檢查通過

---

## 🤝 貢獻指南

1. 創建新分支：`git checkout -b feature/my-feature`
2. 提交更改：`git commit -m "feat: add new feature"`
3. 推送到遠程：`git push origin feature/my-feature`
4. 提交 Pull Request

---

## 📞 需要幫助？

- 查看項目 README.md
- 查看 SETUP.md 了解設置步驟
- 檢查現有的元件和服務作為示例
- 查看錯誤日誌和控制台信息

祝你開發愉快！🚀
