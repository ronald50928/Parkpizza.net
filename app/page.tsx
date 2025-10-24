'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialProof from '@/components/SocialProof'
import MenuSection from '@/components/MenuSection'
import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp, staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations'

export default function HomePage() {
  const benefitsRef = useRef(null)
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Add padding to account for fixed navbar */}
      <div className="pt-[64px]">
        {/* Hero Section - Redesigned with Logo and Floating Images */}
        <header
          className="relative isolate min-h-[90vh] flex items-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #800000 0%, #6b0000 50%, #800000 100%)',
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #e6c69b 0%, transparent 50%), radial-gradient(circle at 80% 80%, #e6c69b 0%, transparent 50%)',
            }} />
          </div>

          {/* Main Content Container */}
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 relative z-10">
            <div className="flex items-center gap-8 lg:gap-12">
              
              {/* Left Side - Logo (Hidden on mobile, shown on desktop) */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block flex-shrink-0"
                style={{ width: '280px' }}
              >
                <img 
                  src="/newlogo.png" 
                  alt="Park Pizza Logo" 
                  className="w-full drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                  }}
                />
              </motion.div>

              {/* Center - Text Content */}
              <div className="flex-1 text-center lg:text-left text-white min-w-0">
              {/* Mobile Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden mb-8 flex justify-center"
              >
                <img 
                  src="/newlogo.png" 
                  alt="Park Pizza Logo" 
                  className="w-64 drop-shadow-2xl"
                />
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                style={{
                  textShadow: '2px 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                Your Slice of <br className="md:hidden" />
                <span className="text-secondary">Park Ridge</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-lg md:text-xl lg:text-2xl text-neutral-50 font-body leading-relaxed mb-8 mx-auto lg:mx-0"
                style={{
                  textShadow: '1px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Hand-tossed tradition meets modern convenience.
                <br />
                <span className="text-secondary font-semibold">Build your perfect pizza</span> or order our classics in minutes.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/build-pizza" 
                    className="btn btn-primary text-lg px-8 py-4 shadow-2xl"
                    style={{ boxShadow: '0 10px 30px rgba(128, 0, 0, 0.4)' }}
                  >
                    🍕 Build Your Pizza
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    className="btn btn-secondary text-lg px-8 py-4 shadow-xl bg-white/95 backdrop-blur" 
                    href="https://www.parkpizzaparkridge.com" 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    📦 Order for Delivery
                  </a>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm md:text-base"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                  <span className="text-2xl">⏱️</span>
                  <span className="font-semibold">~22 min wait</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                  <span className="text-2xl">🏡</span>
                  <span className="font-semibold">Established 1977</span>
                </div>
              </motion.div>
              </div>

              {/* Right Side - Floating Food Images */}
              <div className="hidden lg:block flex-shrink-0 relative" style={{ width: '320px', height: '600px' }}>
              {/* Cheese Pizza - Top Right (Always show on lg+) */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -20, 0],
                  rotate: [-10, -5, -10]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-0 right-0 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src="/cheesepizza.jpeg" 
                  alt="Cheese Pizza" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ display: 'block' }}
                />
              </motion.div>

              {/* Pepperoni Pizza - Middle (Always show on lg+) */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: [0, 15, 0],
                  rotate: [10, 15, 10]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.5 },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute top-32 right-8 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src="/pepperonipizza.jpeg" 
                  alt="Pepperoni Pizza" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ display: 'block' }}
                />
              </motion.div>

              {/* Chicken Parm - Bottom Left (Always show on lg+) */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -15 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -15, 0],
                  rotate: [-15, -10, -15]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.7 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute bottom-24 left-0 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src="/chickenparmigiana.jpeg" 
                  alt="Chicken Parmigiana" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ display: 'block' }}
                />
              </motion.div>

              {/* Meatball Sandwich - Bottom Right (Show on xl+ only, would be too crowded on lg) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.9 },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
                className="absolute bottom-0 right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src="/meatballsandwich.jpeg" 
                  alt="Meatball Sandwich" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ display: 'block' }}
                />
              </motion.div>

              {/* Spaghetti - Middle Center (Show on xl+ only, would be too crowded on lg) */}
              <motion.div
                initial={{ opacity: 0, rotate: 5 }}
                animate={{ 
                  opacity: 1, 
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                  rotate: [5, 0, 5]
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 1.1 },
                  x: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                  rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                style={{ willChange: 'transform' }}
              >
                <img 
                  src="/sapaghettiwithmeatballs.jpeg" 
                  alt="Spaghetti with Meatballs" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ display: 'block' }}
                />
              </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.5
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </header>

        {/* Social Proof Section */}
        <SocialProof />

        {/* Why Choose Us - Enhanced with animations */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
          <motion.div
            ref={benefitsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="mb-12 text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              Why Park Ridge Chooses Us
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-600 font-body max-w-2xl mx-auto"
            >
              We&apos;re more than just a pizzeria—we&apos;re your neighborhood gathering place, 
              serving up quality, tradition, and community with every slice.
            </motion.p>
          </motion.div>

          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="rounded-xl border border-warmgray/40 bg-white p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="font-subhead text-2xl font-semibold text-primary mb-3">
                Quality Ingredients
              </h3>
              <p className="text-base text-neutral-700 font-body leading-relaxed">
                Fresh-made dough daily, premium mozzarella, and crisp vegetables. 
                We source locally whenever possible because quality matters.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="rounded-xl border border-warmgray/40 bg-white p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-subhead text-2xl font-semibold text-primary mb-3">
                Fast + Friendly
              </h3>
              <p className="text-base text-neutral-700 font-body leading-relaxed">
                Order online for quick pickup, or get delivery through our trusted partners. 
                Your hot, fresh pizza arrives in ~22 minutes on average.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="rounded-xl border border-warmgray/40 bg-white p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-subhead text-2xl font-semibold text-primary mb-3">
                Park Ridge Proud
              </h3>
              <p className="text-base text-neutral-700 font-body leading-relaxed">
                Maroon and gold—our hometown colors. Established in 1977, we&apos;ve been 
                proudly serving Park Ridge for nearly 50 years as your local favorite.
              </p>
            </motion.div>
          </motion.section>

          {/* Interactive Builder Teaser */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 rounded-2xl bg-gradient-to-br from-primary via-electric/20 to-primary/80 p-8 md:p-12 text-center text-white shadow-2xl border border-electric/30"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Design Your Dream Pizza
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our interactive pizza builder lets you customize every detail—from crust to toppings. 
              Watch your creation come to life with stunning 3D animations!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/build-pizza"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-electricAmber text-primary px-8 py-4 rounded-lg font-bold text-lg hover:from-electricAmber hover:to-secondary transition-all shadow-lg"
              >
                Try the Builder
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.section>

          {/* Pizza Tracker Feature */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-16 rounded-2xl bg-gradient-to-br from-electric/10 to-electricPink/10 border border-electric/20 p-8 md:p-12 text-center shadow-lg"
          >
            <div className="text-6xl mb-4">📍</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Track Your Order in Real-Time
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-neutral-700 font-body">
              Watch your pizza journey from prep to perfection! Our live tracker shows you exactly where your order is.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tracker/demo"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-electric to-electricPink text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-electricPink hover:to-electric transition-all shadow-lg"
              >
                Try Demo Tracker
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.section>
        </main>

        {/* Menu Section */}
        <MenuSection />
      </div>

      <Footer />
    </div>
  )
}
