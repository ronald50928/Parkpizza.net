"use client"
import React, { useEffect, useRef } from 'react'
import { createSeededRng } from '../../lib/random'
import { samplePointsInCircle } from '../../lib/geometry'
import { useBuilder, toppingCountForSize } from './state'
import type { Topping } from './types'

type Props = { className?: string }

export default function PizzaCanvas({ className = '' }: Props) {
  const { state } = useBuilder()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const sizeCss = canvas.parentElement?.clientWidth || 400
    const size = Math.min(400, sizeCss) // Reduced from 560 to 400
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    // Adjust radius based on pizza size selection
    const sizeMultiplier = state.size === 'Small' ? 0.75 : state.size === 'Large' ? 0.95 : 0.85
    const radius = (size / 2 - 12) * sizeMultiplier

    // Seed using current selection to keep deterministic positions for share
    const seed = JSON.stringify(state)
    const rng = createSeededRng(seed)

    // Draw static, no motion
    ctx.clearRect(0, 0, size, size)
    drawBase(ctx, size, radius, state)
    const order: Topping[] = ['Pepperoni', 'Sausage', 'Mushrooms', 'Peppers', 'Onions', 'Olives']
    order.forEach((t) => drawTopping(ctx, size, radius, rng, t, state))

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [state])

  return <canvas ref={canvasRef} className={`mx-auto block rounded-lg border border-warmgray/30 bg-white shadow-inner ${className}`} />
}

function drawBase(ctx: CanvasRenderingContext2D, size: number, radius: number, state: any) {
  ctx.save()
  ctx.translate(size / 2, size / 2)
  // crust
  ctx.beginPath()
  ctx.arc(0, 0, radius + 10, 0, Math.PI * 2)
  ctx.fillStyle = '#D2A679'
  ctx.fill()
  // dough
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.fillStyle = '#F4D7A1'
  ctx.fill()
  // sauce
  ctx.beginPath()
  ctx.arc(0, 0, radius - 8, 0, Math.PI * 2)
  ctx.fillStyle = state.sauce === 'Red' ? '#C33' : state.sauce === 'Pesto' ? '#2E8B57' : '#F8F9FA'
  ctx.globalAlpha = state.sauce === 'White' ? 0.7 : 0.9
  ctx.fill()
  ctx.globalAlpha = 1
  // cheese overlay
  if (state.cheese !== 'None') {
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, radius - 10)
    grad.addColorStop(0, state.cheese === 'Mozzarella' ? '#FFE082' : '#FFF59D')
    grad.addColorStop(1, 'rgba(255, 245, 157, 0.65)')
    ctx.beginPath()
    ctx.arc(0, 0, radius - 10, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
  ctx.restore()
}

function drawTopping(
  ctx: CanvasRenderingContext2D,
  size: number,
  radius: number,
  rng: () => number,
  topping: Topping,
  state: any
) {
  const amount = state.toppingAmounts[topping] || 'none'
  if (amount === 'none') return
  const count = toppingCountForSize(state.size, topping, amount)
  if (count <= 0) return

  const points = samplePointsInCircle(rng, radius - 22, count, 22)

  ctx.save()
  ctx.translate(size / 2, size / 2)
  points.forEach((p, i) => {
    const rot = ((i * 53) % 360) * (Math.PI / 180)
    // subtle shadow under each piece
    drawShadow(ctx, p.x, p.y, topping)
    switch (topping) {
      case 'Pepperoni':
        drawPepperoni(ctx, p.x, p.y, 13)
        break
      case 'Sausage':
        drawSausage(ctx, p.x, p.y, 6)
        break
      case 'Mushrooms':
        ctx.save(); ctx.rotate(rot); drawMushroom(ctx, p.x, p.y, 12); ctx.restore()
        break
      case 'Peppers':
        drawPepperStrip(ctx, p.x, p.y, 18, (i * 37) % 360)
        break
      case 'Onions':
        drawOnionRing(ctx, p.x, p.y, 10)
        break
      case 'Olives':
        drawOlive(ctx, p.x, p.y, 8)
        break
    }
  })
  ctx.restore()
}

function drawPepperoni(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save()
  ctx.translate(x, y)
  // rim
  ctx.fillStyle = '#8B1A1A'
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  // center gradient
  const g = ctx.createRadialGradient(-r*0.25, -r*0.25, r*0.2, 0, 0, r*0.95)
  g.addColorStop(0, '#C83A2E')
  g.addColorStop(1, '#A81F1F')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(0, 0, r-1.5, 0, Math.PI*2); ctx.fill()
  // light speckles
  ctx.fillStyle = 'rgba(255,230,180,0.25)'
  for (let i=0;i<3;i++){ const a=(i*2.1)%6.28; const rr=r*0.5; ctx.beginPath(); ctx.arc(Math.cos(a)*rr*0.3, Math.sin(a)*rr*0.3, 1.2, 0, Math.PI*2); ctx.fill() }
  ctx.restore()
}

function drawSausage(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save(); ctx.translate(x, y)
  ctx.fillStyle = '#8D6E63'
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawMushroom(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save(); ctx.translate(x, y)
  ctx.fillStyle = '#E0D6CF'; ctx.strokeStyle = '#8D6E63'; ctx.lineWidth = 1.2
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, 0)
  ctx.quadraticCurveTo(0, -size * 0.7, size * 0.5, 0)
  ctx.quadraticCurveTo(0, -size * 0.3, -size * 0.5, 0)
  ctx.closePath(); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#BCAAA4'
  ctx.fillRect(-1.3, 0, 2.6, size * 0.45)
  ctx.restore()
}

function drawPepperStrip(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, rot: number) {
  ctx.save(); ctx.translate(x, y); ctx.rotate((rot * Math.PI) / 180)
  const g = ctx.createLinearGradient(-len/2, 0, len/2, 0)
  g.addColorStop(0, '#2E7D32'); g.addColorStop(1, '#43A047')
  ctx.fillStyle = g
  const w = 5
  ctx.beginPath()
  ctx.moveTo(-len / 2, -w)
  ctx.quadraticCurveTo(0, -w * 1.6, len / 2, -w)
  ctx.quadraticCurveTo(0, w * 1.6, -len / 2, w)
  ctx.closePath(); ctx.fill()
  ctx.restore()
}

function drawOnionRing(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save(); ctx.translate(x, y)
  ctx.strokeStyle = 'rgba(126,87,194,0.9)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(126,87,194,0.5)'
  ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()
}

function drawOlive(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save(); ctx.translate(x, y)
  ctx.fillStyle = '#1B1B1B'; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#4A4A4A'; ctx.beginPath(); ctx.arc(-r*0.2, -r*0.15, r * 0.45, 0, Math.PI * 2); ctx.fill()
  // glossy highlight
  ctx.globalAlpha = 0.35; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(r*0.2, -r*0.2, r*0.25, 0, Math.PI*2); ctx.fill(); ctx.globalAlpha = 1
  ctx.restore()
}
function drawShadow(ctx: CanvasRenderingContext2D, x: number, y: number, topping: Topping) {
  ctx.save(); ctx.translate(x, y)
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  const rx = topping === 'Pepperoni' ? 8 : topping === 'Peppers' ? 10 : 6
  const ry = topping === 'Peppers' ? 3 : 4
  ctx.beginPath(); ctx.ellipse(0, 2.5, rx, ry, 0, 0, Math.PI*2); ctx.fill()
  ctx.restore()
}
