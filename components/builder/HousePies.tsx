"use client"
import React from 'react'
import { useBuilder } from './state'

export default function HousePies() {
  const { set, setDensity } = useBuilder()

  const preset = (name: string) => {
    if (name === 'Margherita') {
      set({ sauce: 'Red', cheese: 'Mozzarella' })
      setDensity('Pepperoni' as any, 0)
      setDensity('Mushrooms' as any, 0)
      setDensity('Onions' as any, 0)
      setDensity('Peppers' as any, 0)
      setDensity('Sausage' as any, 0)
      setDensity('Olives' as any, 0)
    } else if (name === 'Park Ridge Special') {
      set({ sauce: 'Red', cheese: 'Mozzarella' })
      setDensity('Pepperoni' as any, 2)
      setDensity('Sausage' as any, 1)
      setDensity('Mushrooms' as any, 1)
      setDensity('Onions' as any, 1)
    } else if (name === 'Veggie') {
      set({ sauce: 'Red', cheese: 'Mozzarella' })
      setDensity('Mushrooms' as any, 2)
      setDensity('Onions' as any, 2)
      setDensity('Peppers' as any, 2)
      setDensity('Olives' as any, 1)
      setDensity('Pepperoni' as any, 0)
      setDensity('Sausage' as any, 0)
    }
  }

  return (
    <div className="rounded-lg border border-warmgray/40 bg-white p-4 shadow-sm">
      <h3 className="font-subhead text-primary text-lg font-semibold mb-2">House Pies</h3>
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-secondary" onClick={() => preset('Margherita')}>Margherita</button>
        <button className="btn btn-secondary" onClick={() => preset('Park Ridge Special')}>Park Ridge Special</button>
        <button className="btn btn-secondary" onClick={() => preset('Veggie')}>Veggie</button>
      </div>
    </div>
  )
}

