"use client"
import React from 'react'
import { useBuilder } from './state'
import type { Topping } from './types'

interface HousePiesProps {
  onPresetSelect?: () => void
}

export default function HousePies({ onPresetSelect }: HousePiesProps) {
  const { set, setToppingAmount } = useBuilder()

  const preset = (name: string) => {
    if (name === 'Margherita') {
      set({ 
        sauce: 'Red', 
        cheese: 'Mozzarella',
        toppingAmounts: {} // No toppings
      })
    } else if (name === 'Park Ridge Special') {
      set({ 
        sauce: 'Red', 
        cheese: 'Mozzarella',
        toppingAmounts: {
          Pepperoni: 'regular',
          Sausage: 'light',
          Mushrooms: 'light',
          Onions: 'light'
        }
      })
    } else if (name === 'Veggie') {
      set({ 
        sauce: 'Red', 
        cheese: 'Mozzarella',
        toppingAmounts: {
          Mushrooms: 'regular',
          Onions: 'regular',
          Peppers: 'regular',
          Olives: 'light'
        }
      })
    }
    // Notify parent to collapse sections after preset selection
    onPresetSelect?.()
  }

  return (
    <div className="rounded-lg border border-warmgray/40 bg-white p-4 shadow-sm">
      <h3 className="font-subhead text-primary text-lg font-semibold mb-2">House Pies</h3>
      <p className="text-sm text-neutral-600 mb-3 font-body">Start with one of our popular pizzas (you can still customize!)</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-secondary" onClick={() => preset('Margherita')}>
          🍅 Margherita
        </button>
        <button className="btn btn-secondary" onClick={() => preset('Park Ridge Special')}>
          🍕 Park Ridge Special
        </button>
        <button className="btn btn-secondary" onClick={() => preset('Veggie')}>
          🥬 Veggie
        </button>
      </div>
    </div>
  )
}

