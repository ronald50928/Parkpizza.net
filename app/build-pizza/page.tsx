import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BuilderPageClient from '@/components/builder/BuilderPageClient'

export default function BuildPizzaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add padding to account for fixed navbar */}
      <div className="pt-[64px]">
        <BuilderPageClient />
      </div>
      <Footer />
    </div>
  )
}
