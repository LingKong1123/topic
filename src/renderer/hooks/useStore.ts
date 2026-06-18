import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export interface TimerSession {
  id: string
  date: Date
  focusMinutes: number
  breakMinutes: number
  sessionsCount: number
  tasksCompleted: number
}

export interface StoreState {
  // Timer state
  focusTime: number
  breakTime: number
  isRunning: boolean
  currentTime: number
  isBreak: boolean
  sessionsCount: number
  setFocusTime: (time: number) => void
  setBreakTime: (time: number) => void
  setIsRunning: (running: boolean) => void
  setCurrentTime: (time: number) => void
  setIsBreak: (isBreak: boolean) => void
  incrementSessions: () => void
  resetTimer: () => void

  // Task state
  tasks: Task[]
  addTask: (title: string) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  clearTasks: () => void
  
  // Statistics
  sessions: TimerSession[]
  addSession: (session: TimerSession) => void
  getStatistics: () => {
    totalFocusTime: number
    totalSessions: number
    tasksCompleted: number
  }
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Timer initialization
      focusTime: 25,
      breakTime: 5,
      isRunning: false,
      currentTime: 25 * 60,
      isBreak: false,
      sessionsCount: 0,
      
      setFocusTime: (time: number) => set({ focusTime: time, currentTime: time * 60 }),
      setBreakTime: (time: number) => set({ breakTime: time }),
      setIsRunning: (running: boolean) => set({ isRunning: running }),
      setCurrentTime: (time: number) => set({ currentTime: time }),
      setIsBreak: (isBreak: boolean) => set({ isBreak }),
      
      incrementSessions: () => set((state) => ({ 
        sessionsCount: state.sessionsCount + 1 
      })),
      
      resetTimer: () => {
        const { focusTime } = get()
        set({
          currentTime: focusTime * 60,
          isRunning: false,
          isBreak: false,
        })
      },

      // Tasks
      tasks: [],
      
      addTask: (title: string) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date(),
          },
        ],
      })),
      
      removeTask: (id: string) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      
      toggleTask: (id: string) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed, completedAt: new Date() }
            : task
        ),
      })),
      
      clearTasks: () => set({ tasks: [] }),

      // Sessions and statistics
      sessions: [],
      
      addSession: (session: TimerSession) => set((state) => ({
        sessions: [...state.sessions, session],
      })),
      
      getStatistics: () => {
        const { sessions } = get()
        return {
          totalFocusTime: sessions.reduce((sum, s) => sum + s.focusMinutes, 0),
          totalSessions: sessions.length,
          tasksCompleted: sessions.reduce((sum, s) => sum + s.tasksCompleted, 0),
        }
      },
    }),
    {
      name: 'ai-reading-timer-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        sessions: state.sessions,
        focusTime: state.focusTime,
        breakTime: state.breakTime,
      }),
    }
  )
)
