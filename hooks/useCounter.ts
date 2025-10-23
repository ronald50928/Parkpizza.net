/**
 * Number counting animation hook
 * Used for animating stats, prices, etc.
 */

import { useEffect, useRef, useState } from 'react'

interface UseCounterOptions {
  start?: number
  end: number
  duration?: number
  delay?: number
  onComplete?: () => void
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  onComplete
}: UseCounterOptions) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const frameRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp
        }

        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = start + (end - start) * easeOut

        countRef.current = current
        setCount(Math.floor(current))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setCount(end)
          onComplete?.()
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const timeout = setTimeout(startAnimation, delay)

    return () => {
      clearTimeout(timeout)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [start, end, duration, delay, onComplete])

  return count
}

