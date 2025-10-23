"use client"
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import {
  BASE_PRICES,
  TOPPING_PRICE,
  defaultState,
  type BuilderState,
  type Topping,
  densityToMultiplier,
} from './types'

type Ctx = {
  state: BuilderState
  set: (next: Partial<BuilderState>) => void
  setDensity: (t: Topping, d: number) => void
  price: number
  basePrice: number
}

const Ctx = createContext<Ctx | null>(null)

export function useBuilder() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useBuilder outside Provider')
  return v
}

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BuilderState>(() => {
    if (typeof window === 'undefined') return defaultState
    try {
      const saved = localStorage.getItem('pp-builder-v2')
      if (saved) return JSON.parse(saved)
    } catch {}
    return defaultState
  })

  useEffect(() => {
    try {
      localStorage.setItem('pp-builder-v2', JSON.stringify(state))
      const params = new URLSearchParams()
      params.set('size', state.size)
      params.set('crust', state.crust)
      params.set('sauce', state.sauce)
      params.set('cheese', state.cheese)
      const td = Object.entries(state.toppingDensity)
        .filter(([, d]) => d && d > 0)
        .map(([k, v]) => `${k}:${v}`)
        .join(',')
      if (td) params.set('td', td)
      if (state.promo) params.set('promo', state.promo)
      const qs = params.toString()
      const url = `${window.location.pathname}${qs ? '?' + qs : ''}`
      window.history.replaceState(null, '', url)
    } catch {}
  }, [state])

  const basePrice = useMemo(() => BASE_PRICES[state.size], [state.size])
  const toppingsCount = useMemo(() =>
    Object.values(state.toppingDensity as Record<string, number>).reduce((sum, d) => (d && d > 0 ? sum + 1 : sum), 0)
  , [state.toppingDensity])
  const price = useMemo(() => basePrice + toppingsCount * TOPPING_PRICE, [basePrice, toppingsCount])

  const set = (next: Partial<BuilderState>) => setState((s) => ({ ...s, ...next }))
  const setDensity = (t: Topping, d: number) =>
    setState((s) => ({ ...s, toppingDensity: { ...s.toppingDensity, [t]: Math.max(0, Math.min(3, Math.round(d))) as any } }))

  const value: Ctx = { state, set, setDensity, price, basePrice }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function toppingCountForSize(size: BuilderState['size'], t: Topping, density: number) {
  const base: Record<Topping, number> = {
    Pepperoni: 14,
    Mushrooms: 16,
    Onions: 14,
    Peppers: 14,
    Sausage: 18,
    Olives: 16,
  }
  const sizeMul = size === 'Small' ? 0.8 : size === 'Large' ? 1.25 : 1
  return Math.max(0, Math.round(base[t] * sizeMul * densityToMultiplier(density as any)))
}
