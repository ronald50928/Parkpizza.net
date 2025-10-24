'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add padding to account for fixed navbar */}
      <div className="pt-[64px]">
        <header className="relative isolate bg-fixed min-h-[50vh] flex items-center" style={{
          backgroundImage: "linear-gradient(rgba(128,0,0,0.40), rgba(230,198,155,0.35)), url('/hero-bg.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}>
          <div className="mx-auto max-w-screen-xl px-4 py-16 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-heading text-4xl md:text-5xl font-bold"
              style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.3)' }}
            >
              About Park Pizza
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 max-w-3xl font-body text-lg md:text-xl text-neutral-100 leading-relaxed"
              style={{ textShadow: '1px 2px 4px rgba(0,0,0,0.3)' }}
            >
              Classic neighborhood pizzeria energy with modern convenience. We&apos;re proud to serve Park Ridge with quality ingredients and friendly service.
            </motion.p>
          </div>
        </header>

        <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-10">
        <section className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4 font-body">
            <h2 className="font-subhead text-2xl font-semibold text-primary">Our Story</h2>
            <p>Park Pizza is a community staple in Park Ridge, NJ. We focus on fresh ingredients, time-tested recipes, and a warm, friendly atmosphere. Whether you’re grabbing a quick slice, building your own pie, or feeding the family, we aim to make every visit easy and delicious.</p>
            <p>Order ahead online for pickup or delivery through our official Slice storefront, or stop by our shop in the heart of Park Ridge.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a className="btn btn-primary" href="https://www.parkpizzaparkridge.com" target="_blank" rel="noreferrer">Order on Slice</a>
              <a className="btn btn-secondary" href="tel:2013919393">Call (201) 391-9393</a>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-lg border border-warmgray/40 bg-white p-4 shadow-sm">
              <h3 className="font-subhead text-primary text-lg font-semibold">Visit Us</h3>
              <p className="font-body text-sm text-neutral-800">85 Park Ave, Park Ridge, NJ 07656</p>
              <p className="font-body text-sm text-neutral-800"><a className="underline decoration-dotted" href="https://maps.apple.com/?q=85+Park+Ave,+Park+Ridge,+NJ+07656" target="_blank" rel="noreferrer">Open in Maps</a></p>
            </div>

            <div className="rounded-lg border border-warmgray/40 bg-white p-4 shadow-sm">
              <h3 className="font-subhead text-primary text-lg font-semibold">Our Logos</h3>
              <div className="space-y-3">
                <figure className="flex items-center gap-3">
                  <Image src="/newlogo.png" alt="Current Park Pizza logo" width={80} height={64} className="w-auto max-h-16 object-contain" />
                  <figcaption className="text-sm text-neutral-700">Current Logo</figcaption>
                </figure>
                <figure className="flex items-center gap-3">
                  <Image src="/parkpizza-logo.png" alt="Classic Park Pizza logo" width={80} height={64} className="w-auto max-h-16 object-contain" />
                  <figcaption className="text-sm text-neutral-700">Classic Logo</figcaption>
                </figure>
              </div>
              <p className="mt-2 text-xs text-neutral-500">We honor our heritage while refreshing our look for the future.</p>
            </div>
          </aside>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-warmgray/40 bg-white p-6 shadow-sm">
            <h3 className="font-subhead text-xl font-semibold text-primary">Quality Ingredients</h3>
            <p className="mt-2 text-sm font-body text-neutral-700">Fresh dough, premium cheese, and crisp toppings prepared daily.</p>
          </div>
          <div className="rounded-lg border border-warmgray/40 bg-white p-6 shadow-sm">
            <h3 className="font-subhead text-xl font-semibold text-primary">Fast + Friendly</h3>
            <p className="mt-2 text-sm font-body text-neutral-700">Order online for easy pickup or delivery from our partners.</p>
          </div>
          <div className="rounded-lg border border-warmgray/40 bg-white p-6 shadow-sm">
            <h3 className="font-subhead text-xl font-semibold text-primary">Park Ridge Proud</h3>
            <p className="mt-2 text-sm font-body text-neutral-700">Maroon and gold—our hometown colors, our identity.</p>
          </div>
        </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
