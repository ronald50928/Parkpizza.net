"use client"
import React, { useState, useEffect } from 'react'
import { BuilderProvider, useBuilder } from './state'
import PizzaCanvas from './PizzaCanvas'
import BuilderStepper from './BuilderStepper'
import PriceBar from './PriceBar'
import HousePies from './HousePies'
import BottomSheet from './BottomSheet'
import ProgressIndicator from './ProgressIndicator'
import Toast from '../ui/Toast'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

function BuilderContent() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  })
  const [previousProgress, setPreviousProgress] = useState(0)
  const { state } = useBuilder()

  // Calculate progress for confetti
  const calculateProgress = (): number => {
    let progress = 0
    if (state.size) progress += 20
    if (state.crust) progress += 15
    if (state.sauce) progress += 15
    if (state.cheese) progress += 15
    const toppingCount = Object.values(state.toppingDensity).filter(d => d && d > 0).length
    progress += Math.min(toppingCount * 5, 35)
    return Math.min(progress, 100)
  }

  // Trigger confetti when pizza is complete
  useEffect(() => {
    const currentProgress = calculateProgress()
    
    if (currentProgress === 100 && previousProgress < 100) {
      // Fire confetti!
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#800000', '#FFD700', '#E6C69B', '#FFF']
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#800000', '#FFD700', '#E6C69B', '#FFF']
        })
      }, 250)

      setToast({
        message: '🎉 Perfect! Your pizza is complete!',
        visible: true
      })

      return () => clearInterval(interval)
    }
    
    setPreviousProgress(currentProgress)
  }, [state, previousProgress])

  return (
    <>
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-10"
      >
        <motion.div
          variants={fadeInUp}
          className="mb-8 text-center"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
            Build Your Perfect Pizza
          </h1>
          <p className="text-base md:text-lg text-neutral-600 font-body">
            Customize every detail and watch it come to life in 3D!
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <motion.div
            variants={fadeInUp}
            className="sticky top-20 md:top-24"
          >
            <PizzaCanvas />
            <div className="mt-4"><HousePies /></div>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="hidden md:block"
          >
            <ProgressIndicator />
            <BuilderStepper />
          </motion.div>
        </div>
      </motion.main>
      
      <PriceBar onCustomize={() => setSheetOpen(true)} />
      
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <ProgressIndicator />
        <BuilderStepper />
      </BottomSheet>

      <Toast
        message={toast.message}
        type="success"
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </>
  )
}

export default function BuilderPageClient() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  )
}

