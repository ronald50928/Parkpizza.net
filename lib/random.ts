export type RNG = () => number

export function createSeededRng(seed: number | string): RNG {
  // Convert string seed to number
  let s = typeof seed === 'number' ? seed : hashString(seed)
  if (s <= 0) s = 1
  // LCG constants (Numerical Recipes)
  let state = s % 2147483647
  return () => (state = (state * 48271) % 2147483647) / 2147483647
}

function hashString(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return Math.abs(h)
}

export function pick<T>(rng: RNG, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i)
}

