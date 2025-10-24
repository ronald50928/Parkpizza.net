'use client'
import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Report Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          console.log('[LCP]', lastEntry.renderTime || lastEntry.loadTime)
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[]
          entries.forEach((entry) => {
            console.log('[FID]', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ type: 'first-input', buffered: true })

        // Cumulative Layout Shift (CLS)
        let clsScore = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as any[]
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value
            }
          })
          console.log('[CLS]', clsScore)
        })
        clsObserver.observe({ type: 'layout-shift', buffered: true })
      } catch (e) {
        console.error('Performance monitoring error:', e)
      }
    }

    // Log page load time
    window.addEventListener('load', () => {
      const perfData = performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      console.log('[Page Load]', pageLoadTime, 'ms')
    })
  }, [])

  return null // This component doesn't render anything
}

