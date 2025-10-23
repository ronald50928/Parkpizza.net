"use client"
import React, { useMemo } from 'react'

type Props = {
  size: 'Small' | 'Medium' | 'Large'
  sauce: 'Red' | 'White' | 'Pesto'
  cheese: 'Mozzarella' | 'Vegan' | 'None'
  toppings: string[]
}

const SIZE_RADIUS: Record<Props['size'], number> = {
  Small: 140,
  Medium: 160,
  Large: 175,
}

function usePositions(count: number) {
  // A simple deterministic set of positions across the pizza surface
  return useMemo(() => {
    const pts: Array<{ x: number; y: number; r?: number; rot?: number }> = []
    const base = [
      [200, 120],
      [260, 160],
      [140, 160],
      [200, 200],
      [250, 230],
      [150, 230],
      [200, 260],
      [170, 190],
      [230, 190],
      [200, 160],
      [120, 200],
      [280, 200],
    ]
    for (let i = 0; i < count && i < base.length; i++) {
      pts.push({ x: base[i][0], y: base[i][1], r: 8 + ((i * 7) % 6), rot: (i * 37) % 360 })
    }
    return pts
  }, [count])
}

export default function PizzaPreview({ size, sauce, cheese, toppings }: Props) {
  const radius = SIZE_RADIUS[size]
  const sauceColor = sauce === 'Red' ? '#C0392B' : sauce === 'Pesto' ? '#2E8B57' : '#F8F9FA'
  const cheeseColor = cheese === 'None' ? undefined : cheese === 'Mozzarella' ? '#FFD54F' : '#FFF176'

  const pepperoniPos = usePositions(10)
  const onionPos = usePositions(8)
  const olivePos = usePositions(9)
  const pepperPos = usePositions(7)
  const mushroomPos = usePositions(8)
  const sausagePos = usePositions(9)

  const show = (name: string) => toppings.includes(name)

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-square rounded-lg bg-neutral-50 border shadow-inner">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <clipPath id="pizzaClip">
              <circle cx="200" cy="200" r={radius} />
            </clipPath>
          </defs>
          {/* Crust outer ring */}
          <circle cx="200" cy="200" r={radius + 18} fill="#D2A679" />
          {/* Dough base */}
          <circle cx="200" cy="200" r={radius} fill="#F4D7A1" />
          {/* Sauce */}
          <g clipPath="url(#pizzaClip)">
            <circle cx="200" cy="200" r={radius - 8} fill={sauceColor} opacity={sauce === 'White' ? 0.6 : 0.9} />
            {/* Cheese overlay */}
            {cheeseColor && (
              <circle cx="200" cy="200" r={radius - 12} fill={cheeseColor} opacity={0.5} />
            )}

            {/* Pepperoni */}
            {show('Pepperoni') && (
              <g>
                {pepperoniPos.map((p, i) => (
                  <g key={`pep-${i}`}>
                    <circle cx={p.x} cy={p.y} r={(p.r || 10) + 2} fill="#8B1A1A" opacity={0.35} />
                    <circle cx={p.x} cy={p.y} r={p.r || 10} fill="#B22222" />
                  </g>
                ))}
              </g>
            )}

            {/* Olives */}
            {show('Olives') && (
              <g>
                {olivePos.map((p, i) => (
                  <g key={`olv-${i}`}>
                    <circle cx={p.x} cy={p.y} r={6} fill="#000" />
                    <circle cx={p.x} cy={p.y} r={3} fill="#4d4d4d" />
                  </g>
                ))}
              </g>
            )}

            {/* Onions */}
            {show('Onions') && (
              <g stroke="#7E57C2" strokeWidth={2} fill="none">
                {onionPos.map((p, i) => (
                  <g key={`on-${i}`}>
                    <circle cx={p.x} cy={p.y} r={8} />
                    <circle cx={p.x} cy={p.y} r={4} />
                  </g>
                ))}
              </g>
            )}

            {/* Peppers */}
            {show('Peppers') && (
              <g fill="#2E7D32">
                {pepperPos.map((p, i) => (
                  <rect
                    key={`pepper-${i}`}
                    x={p.x - 8}
                    y={p.y - 2}
                    width={16}
                    height={4}
                    rx={2}
                    transform={`rotate(${p.rot || 0} ${p.x} ${p.y})`}
                  />
                ))}
              </g>
            )}

            {/* Mushrooms */}
            {show('Mushrooms') && (
              <g fill="#D7CCC8" stroke="#8D6E63" strokeWidth={1}>
                {mushroomPos.map((p, i) => (
                  <g key={`m-${i}`} transform={`translate(${p.x - 7} ${p.y - 6}) rotate(${(p.rot || 0) % 360} ${7} ${6})`}>
                    <path d="M1 6 C 1 1, 13 1, 13 6 Z" />
                    <rect x="6" y="6" width="2" height="5" rx="1" />
                  </g>
                ))}
              </g>
            )}

            {/* Sausage */}
            {show('Sausage') && (
              <g fill="#8D6E63">
                {sausagePos.map((p, i) => (
                  <circle key={`s-${i}`} cx={p.x} cy={p.y} r={4} />
                ))}
              </g>
            )}
          </g>
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-neutral-500">Preview updates live as you build</p>
    </div>
  )
}

