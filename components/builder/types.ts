export type Size = 'Small' | 'Medium' | 'Large'
export type Crust = 'Regular' | 'Thin' | 'Gluten-Free'
export type Sauce = 'Red' | 'White' | 'Pesto'
export type Cheese = 'Mozzarella' | 'Vegan' | 'None'
export type Topping = 'Pepperoni' | 'Mushrooms' | 'Onions' | 'Peppers' | 'Sausage' | 'Olives'

export const SIZES: Size[] = ['Small', 'Medium', 'Large']
export const CRUSTS: Crust[] = ['Regular', 'Thin', 'Gluten-Free']
export const SAUCES: Sauce[] = ['Red', 'White', 'Pesto']
export const CHEESES: Cheese[] = ['Mozzarella', 'Vegan', 'None']
export const TOPPINGS: Topping[] = ['Pepperoni', 'Mushrooms', 'Onions', 'Peppers', 'Sausage', 'Olives']

export const BASE_PRICES: Record<Size, number> = { Small: 8, Medium: 10, Large: 12 }
export const TOPPING_PRICE = 1

export type Density = 0 | 1 | 2 | 3 // none, light, normal, extra

export type BuilderState = {
  size: Size
  crust: Crust
  sauce: Sauce
  cheese: Cheese
  toppingDensity: Partial<Record<Topping, Density>>
  promo?: string
}

export const defaultState: BuilderState = {
  size: 'Medium',
  crust: 'Regular',
  sauce: 'Red',
  cheese: 'Mozzarella',
  toppingDensity: {},
}

export function densityToMultiplier(d: Density | undefined): number {
  if (d === 0 || d === undefined) return 0
  if (d === 1) return 0.5
  if (d === 2) return 1
  return 1.4 // extra
}

