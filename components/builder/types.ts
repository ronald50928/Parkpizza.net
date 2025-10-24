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

// Kitchen-friendly topping portions
export type ToppingAmount = 'none' | 'light' | 'regular' | 'extra'

export const TOPPING_AMOUNTS: ToppingAmount[] = ['none', 'light', 'regular', 'extra']

export const TOPPING_LABELS: Record<ToppingAmount, string> = {
  none: 'None',
  light: 'Light',
  regular: 'Regular',
  extra: 'Extra'
}

export const TOPPING_DESCRIPTIONS: Record<ToppingAmount, string> = {
  none: 'No topping',
  light: '~Half portion',
  regular: 'Standard portion',
  extra: '~Double portion'
}

export type BuilderState = {
  size: Size
  crust: Crust
  sauce: Sauce
  cheese: Cheese
  toppingAmounts: Partial<Record<Topping, ToppingAmount>>
  promo?: string
}

export const defaultState: BuilderState = {
  size: 'Medium',
  crust: 'Regular',
  sauce: 'Red',
  cheese: 'Mozzarella',
  toppingAmounts: {},
}

// Convert topping amount to visual multiplier for canvas
export function toppingAmountToMultiplier(amount: ToppingAmount | undefined): number {
  if (!amount || amount === 'none') return 0
  if (amount === 'light') return 0.5
  if (amount === 'regular') return 1
  return 1.5 // extra
}

