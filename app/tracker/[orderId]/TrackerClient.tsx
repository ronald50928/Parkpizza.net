'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface OrderStatus {
  stage: 'received' | 'preparing' | 'baking' | 'quality' | 'ready'
  estimatedTime: number // minutes remaining
  orderNumber: string
  items: string[]
  timestamp: Date
}

const stages = [
  { id: 'received', label: 'Order Received', icon: '📋', description: 'We got your order!' },
  { id: 'preparing', label: 'Preparing', icon: '🧑‍🍳', description: 'Making your pizza with love' },
  { id: 'baking', label: 'Baking', icon: '🔥', description: 'Pizza is in the oven' },
  { id: 'quality', label: 'Quality Check', icon: '✅', description: 'Final touches' },
  { id: 'ready', label: 'Ready!', icon: '🎉', description: 'Your pizza is ready!' },
]

export default function TrackerClient({ orderId }: { orderId: string }) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    stage: 'received',
    estimatedTime: 22,
    orderNumber: orderId || 'DEMO-001',
    items: ['Custom Pizza', 'Large Pepperoni'],
    timestamp: new Date(),
  })

  const [pulse, setPulse] = useState(false)

  // Simulate order progression (for demo purposes)
  useEffect(() => {
    const progressStages: Array<OrderStatus['stage']> = [
      'received',
      'preparing',
      'baking',
      'quality',
      'ready',
    ]
    let currentIndex = progressStages.indexOf(orderStatus.stage)

    const interval = setInterval(() => {
      if (currentIndex < progressStages.length - 1) {
        currentIndex++
        setOrderStatus((prev) => ({
          ...prev,
          stage: progressStages[currentIndex],
          estimatedTime: Math.max(0, prev.estimatedTime - 5),
        }))
        setPulse(true)
        setTimeout(() => setPulse(false), 1000)
      }
    }, 8000) // Progress every 8 seconds for demo

    return () => clearInterval(interval)
  }, [orderStatus.stage])

  const currentStageIndex = stages.findIndex((s) => s.id === orderStatus.stage)

  return (
    <div className="pt-[64px] min-h-screen bg-gradient-to-b from-background to-warmgray/10">
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
            Track Your Order
          </h1>
          <p className="text-lg text-neutral-600 font-body">
            Order #{orderStatus.orderNumber}
          </p>
          <p className="text-sm text-neutral-500 font-body mt-1">
            Placed at {orderStatus.timestamp.toLocaleTimeString()}
          </p>
        </motion.div>

        {/* Estimated Time Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: pulse ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="mb-12 rounded-2xl bg-gradient-to-br from-primary via-electric/20 to-primary/80 p-8 text-center text-white shadow-xl"
        >
          <div className="text-6xl font-bold font-heading mb-2">
            {orderStatus.estimatedTime}
            <span className="text-3xl ml-2">min</span>
          </div>
          <p className="text-xl opacity-90 font-body">
            {orderStatus.stage === 'ready' ? 'Your order is ready!' : 'Estimated time remaining'}
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />
            <motion.div
              className="absolute left-8 top-0 w-1 bg-gradient-to-b from-electric via-electricPink to-electric md:left-1/2 md:-translate-x-1/2"
              initial={{ height: 0 }}
              animate={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* Stages */}
            <div className="space-y-8">
              {stages.map((stage, index) => {
                const isActive = index === currentStageIndex
                const isCompleted = index < currentStageIndex
                const isFuture = index > currentStageIndex

                return (
                  <motion.div
                    key={stage.id}
                    variants={staggerItem}
                    className={`relative flex items-start gap-4 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Stage Icon */}
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                        rotate: isActive ? [0, 360] : 0,
                      }}
                      transition={{
                        duration: isActive ? 2 : 0.3,
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 1,
                      }}
                      className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-3xl shadow-lg ${
                        isCompleted
                          ? 'bg-gradient-to-br from-electric to-electricPink'
                          : isActive
                          ? 'bg-gradient-to-br from-primary to-electric'
                          : 'bg-neutral-200'
                      }`}
                    >
                      {stage.icon}
                    </motion.div>

                    {/* Stage Content */}
                    <motion.div
                      className={`flex-1 rounded-lg border p-4 ${
                        isActive
                          ? 'border-electric/40 bg-gradient-to-br from-electric/10 to-electricPink/10 shadow-md'
                          : isCompleted
                          ? 'border-electricLight/30 bg-white/50'
                          : 'border-neutral-200 bg-white/30'
                      }`}
                    >
                      <h3
                        className={`font-subhead text-lg font-semibold mb-1 ${
                          isActive
                            ? 'text-electric'
                            : isCompleted
                            ? 'text-primary'
                            : 'text-neutral-400'
                        }`}
                      >
                        {stage.label}
                      </h3>
                      <p className="text-sm text-neutral-600 font-body">
                        {isActive ? '🔄 ' : isCompleted ? '✓ ' : ''}
                        {stage.description}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 rounded-xl border border-warmgray/40 bg-white p-6 shadow-sm"
        >
          <h3 className="font-subhead text-xl font-semibold text-primary mb-4">
            Your Order
          </h3>
          <ul className="space-y-2">
            {orderStatus.items.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-neutral-700 font-body">
                <span className="text-lg">🍕</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Call to Action */}
        <AnimatePresence>
          {orderStatus.stage === 'ready' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mb-6 text-6xl"
              >
                🎊
              </motion.div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                Your Pizza is Ready!
              </h2>
              <p className="text-lg text-neutral-600 font-body mb-6">
                Come pick up your delicious order!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 btn btn-primary text-lg px-8 py-4"
                >
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Notice */}
        {orderId === 'demo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 rounded-lg bg-electricAmber/10 border border-electricAmber/30 p-4 text-center"
          >
            <p className="text-sm text-neutral-600 font-body">
              📌 This is a demo tracker. In production, this would show real-time order status.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

