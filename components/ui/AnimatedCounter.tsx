/**
 * Animated number counter component
 * Used for stats like "500+ orders", ratings, etc.
 */

'use client'
import { motion } from 'framer-motion'
import { useCounter } from '@/hooks/useCounter'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const count = useCounter({
    start,
    end: isInView ? end : start,
    duration,
  })

  const formattedCount = decimals > 0 
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count.toString()

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formattedCount}{suffix}
    </motion.span>
  )
}

