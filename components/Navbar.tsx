'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'
import { slideInFromRight, fadeIn } from '@/lib/animations'

const OpenStatus = dynamic(() => import('./OpenStatus'), { ssr: false })

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [orderMenuOpen, setOrderMenuOpen] = useState(false)

  // Track scroll position for sticky nav effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-neutral-200 bg-white shadow-md'
          : 'border-transparent bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50" aria-label="Park Pizza home">
          <BrandLogo variant="nav" />
          <span className="sr-only">Park Pizza</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <OpenStatus />
          
          {/* Primary CTA */}
          <Link href="/build-pizza" className="btn btn-primary">
            🍕 Build Your Pizza
          </Link>
          
          {/* Order Platforms Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOrderMenuOpen(!orderMenuOpen)}
              onMouseEnter={() => setOrderMenuOpen(true)}
              onMouseLeave={() => setOrderMenuOpen(false)}
              className="btn btn-secondary flex items-center gap-1"
            >
              Order Now
              <svg className={`w-4 h-4 transition-transform ${orderMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {orderMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setOrderMenuOpen(true)}
                  onMouseLeave={() => setOrderMenuOpen(false)}
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
                  <a
                    href="https://www.parkpizzaparkridge.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 text-sm hover:bg-neutral-50 transition-colors rounded-t-lg font-body"
                  >
                    <div className="font-semibold">Slice (Official)</div>
                    <div className="text-xs text-neutral-600">Direct ordering</div>
                  </a>
                  <a
                    href="https://www.ubereats.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 text-sm hover:bg-neutral-50 transition-colors font-body"
                  >
                    <div className="font-semibold">Uber Eats</div>
                    <div className="text-xs text-neutral-600">Fast delivery</div>
                  </a>
                  <a
                    href="https://www.doordash.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 text-sm hover:bg-neutral-50 transition-colors rounded-b-lg font-body"
                  >
                    <div className="font-semibold">DoorDash</div>
                    <div className="text-xs text-neutral-600">Quick pickup</div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className="btn btn-secondary">About</Link>
          
          {/* Phone Number */}
          <a href="tel:2013919393" className="hidden lg:flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors font-body">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (201) 391-9393
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 rounded-md p-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 md:hidden"
              style={{ top: '64px' }}
            />
            
            {/* Menu */}
            <motion.div
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-[64px] h-[calc(100vh-64px)] w-[280px] bg-white shadow-xl md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-2 p-4">
                <OpenStatus />
                
                <Link
                  href="/build-pizza"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  🍕 Build Your Pizza
                </Link>

                <div className="my-2 border-t border-neutral-200" />

                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-2 mb-1 font-body">
                  Order Online
                </div>
                
                <a
                  href="https://www.parkpizzaparkridge.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full justify-start"
                >
                  Slice (Official)
                </a>
                
                <a
                  href="https://www.ubereats.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full justify-start"
                >
                  Uber Eats
                </a>
                
                <a
                  href="https://www.doordash.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full justify-start"
                >
                  DoorDash
                </a>

                <div className="my-2 border-t border-neutral-200" />

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary w-full justify-start"
                >
                  About Us
                </Link>

                <a
                  href="tel:2013919393"
                  className="flex items-center gap-2 rounded-md px-4 py-3 text-primary hover:bg-neutral-50 transition-colors font-body"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call (201) 391-9393
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
