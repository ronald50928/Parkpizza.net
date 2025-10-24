"use client"
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import {
  BASE_PRICES,
  TOPPING_PRICE,
  defaultState,
  type BuilderState,
  type Topping,
  type ToppingAmount,
  toppingAmountToMultiplier,
} from './types'

type Ctx = {
  state: BuilderState
  set: (next: Partial<BuilderState>) => void
  setToppingAmount: (t: Topping, amount: ToppingAmount) => void
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
      // Try new version first
      const saved = localStorage.getItem('pp-builder-v3')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure toppingAmounts exists
        if (!parsed.toppingAmounts) parsed.toppingAmounts = {}
        return parsed
      }
      
      // Migrate from old version if exists
      const oldSaved = localStorage.getItem('pp-builder-v2')
      if (oldSaved) {
        const oldState = JSON.parse(oldSaved)
        // Convert old density system to new amount system
        const toppingAmounts: Partial<Record<Topping, ToppingAmount>> = {}
        if (oldState.toppingDensity) {
          Object.entries(oldState.toppingDensity).forEach(([topping, density]) => {
            if (density === 0) toppingAmounts[topping as Topping] = 'none'
            else if (density === 1) toppingAmounts[topping as Topping] = 'light'
            else if (density === 2) toppingAmounts[topping as Topping] = 'regular'
            else if (density === 3) toppingAmounts[topping as Topping] = 'extra'
          })
        }
        const migrated = {
          size: oldState.size || 'Medium',
          crust: oldState.crust || 'Regular',
          sauce: oldState.sauce || 'Red',
          cheese: oldState.cheese || 'Mozzarella',
          toppingAmounts,
          promo: oldState.promo
        }
        // Save migrated version
        localStorage.setItem('pp-builder-v3', JSON.stringify(migrated))
        // Clean up old version
        localStorage.removeItem('pp-builder-v2')
        return migrated
      }
    } catch {}
    return defaultState
  })

  useEffect(() => {
    try {
      localStorage.setItem('pp-builder-v3', JSON.stringify(state))
      const params = new URLSearchParams()
      params.set('size', state.size)
      params.set('crust', state.crust)
      params.set('sauce', state.sauce)
      params.set('cheese', state.cheese)
      const toppings = Object.entries(state.toppingAmounts)
        .filter(([, amount]) => amount && amount !== 'none')
        .map(([k, v]) => `${k}:${v}`)
        .join(',')
      if (toppings) params.set('toppings', toppings)
      if (state.promo) params.set('promo', state.promo)
      const qs = params.toString()
      const url = `${window.location.pathname}${qs ? '?' + qs : ''}`
      window.history.replaceState(null, '', url)
    } catch {}
  }, [state])

  const basePrice = useMemo(() => BASE_PRICES[state.size], [state.size])
  const toppingsCount = useMemo(() =>
    Object.values(state.toppingAmounts as Record<string, ToppingAmount>).reduce((sum, amount) => (amount && amount !== 'none' ? sum + 1 : sum), 0)
  , [state.toppingAmounts])
  const price = useMemo(() => basePrice + toppingsCount * TOPPING_PRICE, [basePrice, toppingsCount])

  const set = (next: Partial<BuilderState>) => setState((s) => ({ ...s, ...next }))
  const setToppingAmount = (t: Topping, amount: ToppingAmount) =>
    setState((s) => ({ ...s, toppingAmounts: { ...s.toppingAmounts, [t]: amount } }))

  const value: Ctx = { state, set, setToppingAmount, price, basePrice }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// Get visual topping count for canvas rendering
export function toppingCountForSize(size: BuilderState['size'], t: Topping, amount: ToppingAmount) {
  const base: Record<Topping, number> = {
    Pepperoni: 14,
    Mushrooms: 16,
    Onions: 14,
    Peppers: 14,
    Sausage: 18,
    Olives: 16,
  }
  const sizeMul = size === 'Small' ? 0.8 : size === 'Large' ? 1.25 : 1
  return Math.max(0, Math.round(base[t] * sizeMul * toppingAmountToMultiplier(amount)))
}
