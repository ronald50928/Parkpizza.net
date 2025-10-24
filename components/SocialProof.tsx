/**
 * Social Proof Component
 * Displays trust indicators like orders, ratings, reviews
 * Inspired by Domino's real-time stats
 */

'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import AnimatedCounter from './ui/AnimatedCounter'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  // Simulate live order count (in real app, this would be from API)
  const [orderCount, setOrderCount] = useState(12)
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setOrderCount(prev => {
          const rand = Math.random()
          // 20% chance to increment
          if (rand < 0.2) return prev + 1
          return prev
        })
      }, 15000) // Check every 15 seconds

      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto w-full max-w-screen-xl px-4 py-8"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Rating */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center rounded-lg border border-electricLight/20 bg-gradient-to-br from-white to-electricLight/5 p-4 shadow-sm"
        >
          <div className="mb-2 flex items-center gap-1 text-2xl">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
              >
                ⭐
              </motion.span>
            ))}
          </div>
          <div className="text-2xl font-bold text-primary font-heading">
            <AnimatedCounter end={4.8} decimals={1} />
          </div>
          <div className="text-sm text-neutral-600 font-body">
            from <AnimatedCounter end={523} suffix="+" /> reviews
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center rounded-lg border border-electricPink/20 bg-gradient-to-br from-white to-electricPink/5 p-4 shadow-sm"
        >
          <div className="mb-2 text-3xl">🔥</div>
          <div className="text-2xl font-bold text-primary font-heading">
            <motion.span
              key={orderCount}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {orderCount}
            </motion.span>
          </div>
          <div className="text-center text-sm text-neutral-600 font-body">
            orders in the last hour
          </div>
        </motion.div>

        {/* Avg Delivery Time */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center rounded-lg border border-warmgray/30 bg-white p-4 shadow-sm"
        >
          <div className="mb-2 text-3xl">⏱️</div>
          <div className="text-2xl font-bold text-primary font-heading">
            <AnimatedCounter end={22} />
            <span className="text-lg"> min</span>
          </div>
          <div className="text-sm text-neutral-600 font-body">
            average wait time
          </div>
        </motion.div>

        {/* Local Pride */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center rounded-lg border border-warmgray/30 bg-white p-4 shadow-sm"
        >
          <div className="mb-2 text-3xl">🏡</div>
          <div className="text-2xl font-bold text-primary font-heading">
            <AnimatedCounter end={1977} />
          </div>
          <div className="text-sm text-neutral-600 font-body">
            Established
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

