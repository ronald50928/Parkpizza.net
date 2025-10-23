import type { RNG } from './random'

export type Point = { x: number; y: number }

// Rejection sampling with min distance inside a circle of radius r (center at 0,0)
export function samplePointsInCircle(rng: RNG, radius: number, count: number, minDist: number): Point[] {
  const pts: Point[] = []
  let attempts = 0
  const maxAttempts = count * 200
  while (pts.length < count && attempts < maxAttempts) {
    attempts++
    const t = 2 * Math.PI * rng()
    const rr = radius * Math.sqrt(rng()) // sqrt for even distribution
    const x = rr * Math.cos(t)
    const y = rr * Math.sin(t)
    if (pts.every((p) => dist(p, { x, y }) >= minDist)) {
      pts.push({ x, y })
    }
  }
  return pts
}

export function dist(a: Point, b: Point) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}

