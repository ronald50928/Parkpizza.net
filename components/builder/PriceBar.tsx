"use client"
import React from 'react'
import { useBuilder } from './state'

export default function PriceBar({ onCustomize }: { onCustomize?: () => void }) {
  const { price, basePrice } = useBuilder()
  const [copied, setCopied] = React.useState(false)
  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }
  const [added, setAdded] = React.useState(false)
  const onAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }
  return (
    <div className="sticky bottom-0 z-30 border-t border-warmgray/40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-neutral-700">
          <span className="font-semibold">Total:</span> ${price.toFixed(2)}
          <span className="ml-2 text-xs text-neutral-500">Base ${basePrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary md:hidden" onClick={onCustomize}>Customize</button>
          <button className="btn btn-secondary hidden md:inline-flex" onClick={onShare}>{copied ? 'Copied!' : 'Share'}</button>
          <button className="btn btn-primary" onClick={onAdd}>{added ? 'Added!' : 'Add to Cart (demo)'}</button>
        </div>
      </div>
    </div>
  )
}
