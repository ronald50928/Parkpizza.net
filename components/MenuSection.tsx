/**
 * Menu Section Component
 * Showcases popular house pizzas with animations
 */

'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { housePizzas, type HousePizza } from '@/data/menu'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function MenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  // Show only popular pizzas (first 3)
  const popularPizzas = housePizzas.filter(p => p.popular).slice(0, 3)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-12 text-center"
      >
        <motion.div variants={staggerItem} className="text-5xl mb-4">
          🍕
        </motion.div>
        <motion.h2
          variants={staggerItem}
          className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Fan Favorites
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="text-lg text-neutral-600 font-body max-w-2xl mx-auto"
        >
          Can&apos;t decide? Try one of our most-loved signature pizzas, 
          or customize your own creation with our interactive builder.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-8 md:grid-cols-3 mb-8"
      >
        {popularPizzas.map((pizza, index) => (
          <PizzaCard key={pizza.id} pizza={pizza} index={index} />
        ))}
      </motion.div>

      {/* Build Your Own CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12"
      >
        <Link
          href="/build-pizza"
          className="btn btn-primary text-lg px-8 py-4"
        >
          🎨 Build Your Own
        </Link>
        <a
          href="https://www.parkpizzaparkridge.com"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary text-lg px-8 py-4"
        >
          📋 See Full Menu
        </a>
      </motion.div>
    </section>
  )
}

function PizzaCard({ pizza, index }: { pizza: HousePizza; index: number }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border border-warmgray/40 bg-white shadow-md hover:shadow-2xl transition-all"
    >
      {/* Popular Badge */}
      {pizza.popular && (
        <div className="absolute top-4 right-4 z-10 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold shadow-md">
          ⭐ POPULAR
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Pizza Icon/Placeholder */}
        <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
          <span className="text-6xl">🍕</span>
        </div>

        {/* Name */}
        <h3 className="font-heading text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
          {pizza.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 font-body leading-relaxed mb-4 min-h-[60px]">
          {pizza.description}
        </p>

        {/* Toppings List */}
        <div className="mb-4 flex flex-wrap gap-1">
          {pizza.toppings.slice(0, 3).map((topping) => (
            <span
              key={topping}
              className="inline-block px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-md font-body"
            >
              {topping}
            </span>
          ))}
          {pizza.toppings.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-md font-body">
              +{pizza.toppings.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div>
            <div className="text-xs text-neutral-500 font-body">Starting at</div>
            <div className="text-2xl font-bold text-primary font-heading">
              ${pizza.price.small}
            </div>
          </div>
          <a
            href="https://www.parkpizzaparkridge.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Order Now
          </a>
        </div>

        {/* Dietary Badges */}
        <div className="mt-3 flex gap-2">
          {pizza.vegetarian && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              🌱 Vegetarian
            </span>
          )}
          {pizza.spicy && (
            <span className="text-xs text-red-600 flex items-center gap-1">
              🌶️ Spicy
            </span>
          )}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"
      />
    </motion.div>
  )
}

