"use client"
import React from 'react'
import { useBuilder } from './state'
import { SIZES, CRUSTS, SAUCES, CHEESES, TOPPINGS, TOPPING_AMOUNTS, TOPPING_LABELS, TOPPING_DESCRIPTIONS, type Topping, type ToppingAmount } from './types'

export default function BuilderStepper() {
  const { state, set, setToppingAmount } = useBuilder()
  const [open, setOpen] = React.useState<'size' | 'crust' | 'sauce' | 'cheese' | 'toppings'>('toppings')

  const Section = ({ id, title, children }: { id: typeof open; title: string; children: React.ReactNode }) => (
    <section className="rounded-lg border border-warmgray/40 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between">
        <h3 className="font-subhead text-primary text-lg font-semibold">{title}</h3>
        <button className="text-sm underline decoration-dotted" onClick={() => setOpen(id)}>
          {open === id ? 'Open' : 'Edit'}
        </button>
      </header>
      {open === id && <div className="space-y-3">{children}</div>}
    </section>
  )

  return (
    <div className="space-y-4">
      <Section id="size" title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => set({ size: s })}
              className={`btn ${state.size === s ? 'btn-primary' : 'btn-secondary'}`}>{s}</button>
          ))}
        </div>
      </Section>
      <Section id="crust" title="Crust">
        <div className="flex flex-wrap gap-2">
          {CRUSTS.map((c) => (
            <button key={c} onClick={() => set({ crust: c })}
              className={`btn ${state.crust === c ? 'btn-primary' : 'btn-secondary'}`}>{c}</button>
          ))}
        </div>
      </Section>
      <Section id="sauce" title="Sauce">
        <div className="flex flex-wrap gap-2">
          {SAUCES.map((s) => (
            <button key={s} onClick={() => set({ sauce: s })}
              className={`btn ${state.sauce === s ? 'btn-primary' : 'btn-secondary'}`}>{s}</button>
          ))}
        </div>
      </Section>
      <Section id="cheese" title="Cheese">
        <div className="flex flex-wrap gap-2">
          {CHEESES.map((c) => (
            <button key={c} onClick={() => set({ cheese: c })}
              className={`btn ${state.cheese === c ? 'btn-primary' : 'btn-secondary'}`}>{c}</button>
          ))}
        </div>
      </Section>
      <Section id="toppings" title="Toppings">
        <div className="grid grid-cols-1 gap-3">
          {TOPPINGS.map((t) => {
            const currentAmount = state.toppingAmounts[t] || 'none'
            return (
              <div key={t} className="rounded border border-warmgray/40 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-block h-3.5 w-3.5 rounded-full flex-shrink-0" style={{backgroundColor: colorFor(t)}} />
                  <span className="font-medium flex-1">{t}</span>
                </div>
                <div className="flex gap-2">
                  {TOPPING_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setToppingAmount(t as Topping, amount)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        currentAmount === amount
                          ? 'bg-primary text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                      title={TOPPING_DESCRIPTIONS[amount]}
                    >
                      {TOPPING_LABELS[amount]}
                    </button>
                  ))}
                </div>
                {currentAmount !== 'none' && (
                  <div className="mt-2 text-xs text-neutral-600 italic">
                    {TOPPING_DESCRIPTIONS[currentAmount]}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>
    </div>
  )
}

function colorFor(t: string) {
  switch (t) {
    case 'Pepperoni': return '#B22222'
    case 'Sausage': return '#8D6E63'
    case 'Mushrooms': return '#D7CCC8'
    case 'Peppers': return '#2E7D32'
    case 'Onions': return '#7E57C2'
    case 'Olives': return '#000000'
    default: return '#B8B6B0'
  }
}
