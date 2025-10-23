/**
 * Toast Notification Component
 * For positive feedback on user actions
 */

'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { toastSlideIn } from '@/lib/animations'

export interface ToastProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌'
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastSlideIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed right-4 top-20 z-[100] max-w-sm"
        >
          <div className={`rounded-lg border p-4 shadow-lg ${colors[type]}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icons[type]}</span>
              <p className="flex-1 text-sm font-medium font-body">{message}</p>
              <button
                onClick={onClose}
                className="text-xl opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

