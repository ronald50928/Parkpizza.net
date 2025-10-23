import type { Metadata } from 'next'
import { Inter, Playfair_Display, Libre_Baskerville, DM_Sans, Italiana } from 'next/font/google'
import '@/styles/globals.css'

const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
const heading = Playfair_Display({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-heading' })
const subhead = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-subhead' })
const button = DM_Sans({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-button' })
const decorative = Italiana({ subsets: ['latin'], weight: '400', variable: '--font-decorative' })

export const metadata: Metadata = {
  title: 'Park Pizza – Park Ridge',
  description: 'Build your perfect pizza. Simple, fast, and delicious.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} ${subhead.variable} ${button.variable} ${decorative.variable} font-body bg-background text-text`}>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {children}
      </body>
    </html>
  )
}
