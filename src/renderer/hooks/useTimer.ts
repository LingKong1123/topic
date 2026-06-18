import { useEffect } from 'react'
import { useStore } from './useStore'

export const useTimer = () => {
  const {
    isRunning,
    currentTime,
    isBreak,
    focusTime,
    breakTime,
    setCurrentTime,
    setIsBreak,
    setIsRunning,
    incrementSessions,
  } = useStore()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1)
      }, 1000)
    } else if (currentTime === 0 && isRunning) {
      // Timer reached zero
      setIsRunning(false)
      
      if (!isBreak) {
        // Finished focus, switch to break
        incrementSessions()
        setIsBreak(true)
        setCurrentTime(breakTime * 60)
        playNotificationSound()
      } else {
        // Finished break, switch to focus
        setIsBreak(false)
        setCurrentTime(focusTime * 60)
        playNotificationSound()
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, currentTime, isBreak, focusTime, breakTime, setCurrentTime, setIsBreak, setIsRunning, incrementSessions])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setCurrentTime(focusTime * 60)
  }

  const skipSession = () => {
    if (!isBreak) {
      incrementSessions()
    }
    setIsBreak(!isBreak)
    setCurrentTime(isBreak ? focusTime * 60 : breakTime * 60)
  }

  return {
    currentTime,
    isRunning,
    isBreak,
    toggleTimer,
    resetTimer,
    skipSession,
  }
}

const playNotificationSound = () => {
  // Create a simple beep sound
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = 800
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}
