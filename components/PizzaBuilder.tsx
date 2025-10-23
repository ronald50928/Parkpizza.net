"use client"
import { useEffect, useMemo, useState } from 'react'
import OptionSelector from './OptionSelector'
import PriceDisplay from './PriceDisplay'
import dynamic from 'next/dynamic'
const PizzaPreview = dynamic(() => import('./PizzaPreview'), { ssr: false })

const BASE_PRICES = { Small: 8, Medium: 10, Large: 12 } as const
type Size = keyof typeof BASE_PRICES
const TOPPING_PRICE = 1

const CRUSTS = ['Regular', 'Thin', 'Gluten-Free'] as const
const SAUCES = ['Red', 'White', 'Pesto'] as const
const CHEESES = ['Mozzarella', 'Vegan', 'None'] as const
const TOPPINGS = ['Pepperoni', 'Mushrooms', 'Onions', 'Peppers', 'Sausage', 'Olives'] as const

export default function PizzaBuilder() {
  const [size, setSize] = useState<Size>('Medium')
  const [crust, setCrust] = useState('Regular')
  const [sauce, setSauce] = useState('Red')
  const [cheese, setCheese] = useState('Mozzarella')
  const [toppings, setToppings] = useState<string[]>([])
  const [promo, setPromo] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const toggleTopping = (t: string) =>
    setToppings((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const basePrice = useMemo(() => BASE_PRICES[size] + TOPPING_PRICE * toppings.length, [size, toppings])
  const discountPct = useMemo(() => (promo.trim().toUpperCase() === 'WELCOME10' ? 0.1 : 0), [promo])
  const price = useMemo(() => basePrice * (1 - discountPct), [basePrice, discountPct])

  // hydrate from URL query or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const saved = localStorage.getItem('pp-builder')
      if (params.size || saved) {
        const state = saved ? JSON.parse(saved) : Object.fromEntries(params.entries())
        const isSize = (s: any): s is Size => s === 'Small' || s === 'Medium' || s === 'Large'
        if (isSize(state.size)) setSize(state.size)
        if (state.crust) setCrust(state.crust)
        if (state.sauce) setSauce(state.sauce)
        if (state.cheese) setCheese(state.cheese)
        if (state.toppings) setToppings(Array.isArray(state.toppings) ? state.toppings : String(state.toppings).split(',').filter(Boolean))
        if (state.promo) setPromo(state.promo)
      }
    } catch {}
  }, [])

  // persist to URL and localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams()
      params.set('size', String(size))
      params.set('crust', crust)
      params.set('sauce', sauce)
      params.set('cheese', cheese)
      if (toppings.length) params.set('toppings', toppings.join(','))
      if (promo) params.set('promo', promo)
      const qs = params.toString()
      const url = `${window.location.pathname}${qs ? '?' + qs : ''}`
      window.history.replaceState(null, '', url)
      localStorage.setItem('pp-builder', JSON.stringify({ size, crust, sauce, cheese, toppings, promo }))
    } catch {}
  }, [size, crust, sauce, cheese, toppings, promo])

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const onAddToCart = async () => {
    // confetti (lazy loaded)
    try {
      const mod = await import('canvas-confetti')
      mod.default?.({ particleCount: 120, spread: 70, origin: { y: 0.7 } })
    } catch {}
  }

  const onReset = () => {
    setSize('Medium')
    setCrust('Regular')
    setSauce('Red')
    setCheese('Mozzarella')
    setToppings([])
    setPromo('')
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-center font-heading text-3xl md:text-4xl font-bold text-primary">Build Your Pizza</h1>
      <div className="grid items-start gap-6 md:grid-cols-2">
        <div>
          <PizzaPreview size={size} sauce={sauce as any} cheese={cheese as any} toppings={toppings} />
        </div>
        <div className="text-left">
          <OptionSelector label="Size" value={size} options={Object.keys(BASE_PRICES)} onChange={(v) => setSize(v as any)} />
          <OptionSelector label="Crust" value={crust} options={[...CRUSTS]} onChange={setCrust} />
          <OptionSelector label="Sauce" value={sauce} options={[...SAUCES]} onChange={setSauce} />
          <OptionSelector label="Cheese" value={cheese} options={[...CHEESES]} onChange={setCheese} />

          <div className="mt-3">
            <p className="mb-2 font-semibold">Toppings</p>
            <div className="flex flex-wrap gap-2">
              {[...TOPPINGS].map((t) => (
                <button
                  key={t}
                  className={`rounded border px-3 py-1 text-sm transition ${
                    toppings.includes(t) ? 'border-accent bg-accent text-black' : 'border-neutral-300 bg-white'
                  }`}
                  onClick={() => toggleTopping(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-neutral-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {discountPct > 0 && (
              <div className="flex items-center justify-between text-green-700">
                <span>Promo (WELCOME10)</span>
                <span>-{(discountPct * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
          <PriceDisplay price={price} />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="btn btn-primary" onClick={onAddToCart}>Add to Cart (coming soon)</button>
            <button className="btn bg-neutral-200 text-neutral-800" disabled>
              Checkout (coming soon)
            </button>
            <button className="btn btn-accent" onClick={onShare}>{copied ? 'Link Copied!' : 'Share Link'}</button>
            <button className="btn bg-neutral-100 text-neutral-700 border" onClick={onReset}>Reset</button>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-neutral-700">Promo code</label>
            <div className="flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Try WELCOME10"
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
              />
              <span className="self-center text-xs text-neutral-500">demo</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left text-sm text-neutral-600">
            <div>
              <p>
                <span className="font-semibold">Crust:</span> {crust}
              </p>
              <p>
                <span className="font-semibold">Sauce:</span> {sauce}
              </p>
              <p>
                <span className="font-semibold">Cheese:</span> {cheese}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Size:</span> {size}
              </p>
              <p>
                <span className="font-semibold">Toppings:</span> {toppings.length ? toppings.join(', ') : 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
