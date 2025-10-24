import TrackerClient from './TrackerClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Generate static params for static export
export function generateStaticParams() {
  return [
    { orderId: 'demo' },
  ]
}

export default function TrackerPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TrackerClient orderId={params.orderId} />
      <Footer />
    </div>
  )
}
