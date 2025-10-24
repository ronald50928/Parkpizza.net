'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { fullMenu, type MenuCategory } from '@/data/fullMenu'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header with padding for fixed navbar */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="pt-[64px] pb-12 bg-gradient-to-br from-primary to-primary/90 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </Link>

          <div className="text-center">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Our Complete Menu
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 font-body">
              From classic cheese pizzas to specialty pastas, explore our full selection of authentic Italian-American favorites.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/build-pizza"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg font-bold hover:bg-electricAmber transition-all shadow-lg"
              >
                🎨 Build Your Own Pizza
              </Link>
              <a
                href="tel:201-391-9595"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-all"
              >
                📞 Call to Order: 201-391-9595
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Navigation */}
      <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur border-b border-neutral-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            {fullMenu.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {fullMenu
          .filter(cat => !selectedCategory || cat.id === selectedCategory)
          .map((category, index) => (
            <MenuCategorySection key={category.id} category={category} index={index} />
          ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4 py-16 text-center"
      >
        <div className="rounded-2xl bg-gradient-to-br from-electric/10 to-electricPink/10 border border-electric/20 p-8 md:p-12">
          <div className="text-5xl mb-4">🍕</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg text-neutral-700 mb-6 font-body">
            Pick up in ~22 minutes or get delivery through our partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build-pizza"
              className="btn btn-primary text-lg px-8 py-4"
            >
              🎨 Build Your Pizza
            </Link>
            <a
              href="https://www.slicelife.com/restaurants/nj/park-ridge/07656/park-pizza-park-ridge/menu"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              📦 Order for Delivery
            </a>
          </div>
          
          {/* Back to Home Link */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function MenuCategorySection({ category, index }: { category: MenuCategory; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.section
      ref={ref}
      id={category.id}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-16 scroll-mt-32"
    >
      {/* Category Header */}
      <motion.div
        variants={staggerItem}
        className="mb-8 border-b border-primary/20 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
            {category.name}
          </h2>
        </div>
      </motion.div>

      {/* Menu Items Grid */}
      <motion.div
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2"
      >
        {category.items.map((item, itemIndex) => (
          <motion.div
            key={`${item.name}-${itemIndex}`}
            variants={staggerItem}
            className="group rounded-xl border border-warmgray/40 bg-white p-5 hover:shadow-lg transition-all hover:border-electric/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-subhead text-lg font-semibold text-primary mb-1 group-hover:text-electric transition-colors">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-neutral-600 font-body mb-2">
                    {item.description}
                  </p>
                )}
                {item.sizes && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.sizes.map((sizeOption, sizeIndex) => (
                      <span
                        key={sizeIndex}
                        className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-md font-body"
                      >
                        {sizeOption.size}: ${sizeOption.price}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {item.price && !item.sizes && (
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-secondary font-heading">
                    ${item.price}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

