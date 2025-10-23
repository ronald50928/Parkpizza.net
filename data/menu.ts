/**
 * House Pizza Menu Data
 * Popular signature pizzas to showcase
 */

export interface HousePizza {
  id: string
  name: string
  description: string
  toppings: string[]
  price: {
    small: number
    medium: number
    large: number
  }
  image?: string
  popular?: boolean
  vegetarian?: boolean
  spicy?: boolean
}

export const housePizzas: HousePizza[] = [
  {
    id: 'margherita',
    name: 'Classic Margherita',
    description: 'Fresh mozzarella, San Marzano tomatoes, basil, and extra virgin olive oil',
    toppings: ['Mozzarella', 'Tomatoes', 'Basil'],
    price: { small: 12.99, medium: 16.99, large: 19.99 },
    popular: true,
    vegetarian: true
  },
  {
    id: 'pepperoni-deluxe',
    name: 'Pepperoni Deluxe',
    description: 'Double pepperoni, extra cheese, and our signature red sauce',
    toppings: ['Double Pepperoni', 'Extra Mozzarella'],
    price: { small: 14.99, medium: 18.99, large: 22.99 },
    popular: true
  },
  {
    id: 'park-ridge-special',
    name: 'Park Ridge Special',
    description: 'Pepperoni, sausage, mushrooms, onions, and peppers—our hometown favorite',
    toppings: ['Pepperoni', 'Sausage', 'Mushrooms', 'Onions', 'Peppers'],
    price: { small: 16.99, medium: 21.99, large: 25.99 },
    popular: true
  },
  {
    id: 'meat-lovers',
    name: 'Meat Lovers',
    description: 'Pepperoni, sausage, bacon, and ham for the carnivore in you',
    toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham'],
    price: { small: 16.99, medium: 21.99, large: 25.99 }
  }
]

export const getPopularPizzas = () => housePizzas.filter(p => p.popular)

