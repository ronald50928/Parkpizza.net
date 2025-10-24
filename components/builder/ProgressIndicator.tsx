/**
 * Pizza Builder Progress Indicator
 * Shows completion percentage and motivates user
 * Inspired by Domino's progress tracking
 */

'use client'
import { motion } from 'framer-motion'
import { useBuilder } from './state'

export default function ProgressIndicator() {
  const { state } = useBuilder()

  // Calculate completion percentage
  const calculateProgress = (): number => {
    let progress = 0
    
    // Size selected (20%)
    if (state.size) progress += 20
    
    // Crust selected (15%)
    if (state.crust) progress += 15
    
    // Sauce selected (15%)
    if (state.sauce) progress += 15
    
    // Cheese selected (15%)
    if (state.cheese) progress += 15
    
    // Toppings (35% - 5% per topping, up to 7 toppings)
    const toppingCount = Object.values(state.toppingAmounts).filter(amount => amount && amount !== 'none').length
    progress += Math.min(toppingCount * 5, 35)
    
    return Math.min(progress, 100)
  }

  const progress = calculateProgress()
  const isComplete = progress === 100

  const getMessage = (): string => {
    if (progress === 0) return "Let's start building!"
    if (progress < 35) return "Great start! Keep going..."
    if (progress < 65) return "You're on a roll! 🍕"
    if (progress < 100) return "Almost there..."
    return "Perfect! Your pizza is ready! 🎉"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-lg border border-electric/20 bg-gradient-to-r from-electric/5 via-primary/5 to-electricPink/5 p-4"
    >
      {/* Progress Bar */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-primary font-heading">
          {getMessage()}
        </div>
        <motion.div
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-bold text-primary font-heading"
        >
          {progress}%
        </motion.div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-neutral-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${
            isComplete
              ? 'bg-gradient-to-r from-electric via-electricPink to-electric'
              : 'bg-gradient-to-r from-primary via-electric/30 to-primary/70'
          }`}
        />
        
        {/* Animated shine effect when complete */}
        {isComplete && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear'
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        )}
      </div>

      {/* Milestones */}
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-600 font-body">
        <div className={progress >= 20 ? 'text-primary font-semibold' : ''}>
          {progress >= 20 ? '✓' : '○'} Size
        </div>
        <div className={progress >= 35 ? 'text-primary font-semibold' : ''}>
          {progress >= 35 ? '✓' : '○'} Base
        </div>
        <div className={progress >= 65 ? 'text-primary font-semibold' : ''}>
          {progress >= 65 ? '✓' : '○'} Toppings
        </div>
        <div className={progress === 100 ? 'text-primary font-semibold' : ''}>
          {progress === 100 ? '✓' : '○'} Complete
        </div>
      </div>
    </motion.div>
  )
}

