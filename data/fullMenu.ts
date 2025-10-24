/**
 * Complete Menu Data for Park Pizza
 * Based on actual restaurant menu
 */

export interface MenuItem {
  name: string
  price?: string
  sizes?: { size: string; price: string }[]
  description?: string
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

export const fullMenu: MenuCategory[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    items: [
      {
        name: 'Cheese Pizza',
        sizes: [
          { size: 'Small', price: '13.99' },
          { size: 'Large', price: '16.99' }
        ]
      },
      {
        name: 'Sicilian',
        price: '20.99'
      },
      {
        name: 'Grandma',
        price: '22.99'
      },
      {
        name: 'White Pizza',
        price: '19.99',
        description: 'Ricotta, mozzarella, garlic, no sauce'
      },
      {
        name: 'Margherita',
        price: '19.99',
        description: 'Fresh mozzarella, basil, sauce'
      },
      {
        name: 'Buffalo Chicken Pizza',
        price: '21.99'
      },
      {
        name: 'BBQ Chicken Pizza',
        price: '21.99'
      },
      {
        name: 'Meat Lovers',
        price: '22.99',
        description: 'Pepperoni, sausage, meatball, bacon, ham'
      },
      {
        name: 'Veggie Pizza',
        price: '21.99',
        description: 'Onions, peppers, mushrooms, olives, spinach'
      },
      {
        name: 'Hawaiian',
        price: '20.99',
        description: 'Ham, pineapple'
      },
      {
        name: 'Chicken Parm Pizza',
        price: '21.99'
      },
      {
        name: 'Chicken Bacon Ranch',
        price: '21.99'
      },
      {
        name: 'Vodka Pizza',
        price: '20.99'
      },
      {
        name: 'Penne Vodka Pizza',
        price: '21.99'
      }
    ]
  },
  {
    id: 'slices',
    name: 'Slices',
    icon: '🍕',
    items: [
      { name: 'Regular Slice', price: '3.50' },
      { name: 'Sicilian Slice', price: '3.75' },
      { name: 'Grandma Slice', price: '3.75' },
      { name: 'Specialty Slice', price: '4.50' }
    ]
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    icon: '🥖',
    items: [
      {
        name: 'Garlic Knots',
        sizes: [{ size: '6 pieces', price: '3.00' }]
      },
      {
        name: 'Mozzarella Sticks',
        sizes: [{ size: '6 pieces', price: '7.99' }]
      },
      { name: 'Fried Calamari', price: '12.99' },
      {
        name: 'Buffalo Wings',
        sizes: [
          { size: '6 pieces', price: '8.99' },
          { size: '12 pieces', price: '15.99' }
        ]
      },
      {
        name: 'Chicken Fingers',
        price: '9.99',
        description: '5 pieces with fries'
      },
      { name: 'French Fries', price: '4.99' },
      { name: 'Cheese Fries', price: '6.50' }
    ]
  },
  {
    id: 'salads',
    name: 'Salads',
    icon: '🥗',
    items: [
      { name: 'Garden Salad', price: '7.99' },
      { name: 'Caesar Salad', price: '8.99' },
      { name: 'Greek Salad', price: '9.99' },
      { name: 'Antipasto Salad', price: '11.99' },
      { name: 'Grilled Chicken Caesar', price: '11.99' },
      { name: 'Buffalo Chicken Salad', price: '12.50' }
    ]
  },
  {
    id: 'heroes',
    name: 'Hot Heroes',
    icon: '🥖',
    items: [
      { name: 'Meatball Parm Hero', price: '11.99' },
      { name: 'Chicken Parm Hero', price: '12.50' },
      { name: 'Eggplant Parm Hero', price: '11.99' },
      { name: 'Sausage, Peppers & Onions', price: '12.50' },
      { name: 'Shrimp Parm Hero', price: '13.99' }
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: '🍝',
    items: [
      { name: 'Spaghetti with Marinara', price: '10.99' },
      { name: 'Spaghetti with Meatballs', price: '12.99' },
      { name: 'Penne alla Vodka', price: '13.99' },
      { name: 'Baked Ziti', price: '13.50' },
      {
        name: 'Stuffed Shells',
        price: '13.50',
        description: '5 pieces'
      },
      {
        name: 'Cheese Ravioli',
        price: '13.99',
        description: '6 pieces'
      },
      { name: 'Lasagna', price: '14.99' },
      { name: 'Chicken Parm Pasta', price: '15.99' },
      { name: 'Shrimp Parm Pasta', price: '17.99' }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: '🥤',
    items: [
      { name: 'Can Soda', price: '1.75' },
      { name: 'Bottle Soda', price: '2.50' },
      { name: 'Water', price: '1.50' },
      { name: '2 Liter Soda', price: '3.99' }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    items: [
      { name: 'Cannoli', price: '4.50' },
      { name: 'Cheesecake', price: '5.99' },
      { name: 'Tiramisu', price: '6.50' }
    ]
  },
  {
    id: 'extras',
    name: 'Extras',
    icon: '➕',
    items: [
      { name: 'Side of Sauce', price: '1.00' },
      { name: 'Side of Dressing', price: '1.00' },
      { name: 'Extra Cheese', price: '2.00' },
      { name: 'Toppings (each)', price: '1.50' }
    ]
  }
]

// Helper to get category by id
export const getCategoryById = (id: string) => 
  fullMenu.find(cat => cat.id === id)

// Get all pizza items
export const getPizzas = () => 
  fullMenu.find(cat => cat.id === 'pizza')?.items || []

// Get featured items (for homepage)
export const getFeaturedItems = () => [
  {
    category: 'Pizza',
    items: getPizzas().slice(0, 4)
  }
]

