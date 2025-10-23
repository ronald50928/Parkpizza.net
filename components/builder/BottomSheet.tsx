"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BottomSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="mx-auto max-w-screen-md px-4 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-1.5 w-12 rounded-full bg-neutral-300" />
                <button className="text-sm underline decoration-dotted" onClick={onClose}>Close</button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

