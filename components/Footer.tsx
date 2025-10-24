import { FacebookIcon, InstagramIcon, SliceIcon, UberEatsIcon, DoorDashIcon, GrubHubIcon } from './icons/SocialIcons'

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="font-subhead text-lg font-semibold text-primary mb-3">Order & Connect</h3>
          <p className="text-sm text-neutral-700 font-body mb-4">Classic flavors. Park Ridge pride.</p>
          
          {/* Order Platforms */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">Order Online</p>
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="https://slicelife.com/restaurants/nj/park-ridge/07656/park-pizza/menu" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Order on Slice"
              >
                <SliceIcon className="w-8 h-8" />
              </a>
              <a 
                href="https://www.ubereats.com/store/park-pizza/dg14TBXHRIqO5uID1ksong?srsltid=AfmBOopwPasFVMYKQy2xG2od7D5Vwsd5prcMJ0tx0febRssHcb7YdXK_" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Order on Uber Eats"
              >
                <UberEatsIcon className="w-8 h-8" />
              </a>
              <a 
                href="https://www.doordash.com/store/park-pizza-park-ridge-142039/197237/?srsltid=AfmBOoqAIpMMc9wNf-JI-BivVfxhmAzJ3CDwQ060E77VRjZpMrjZX3T_" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Order on DoorDash"
              >
                <DoorDashIcon className="w-8 h-8" />
              </a>
              <a 
                href="https://www.grubhub.com/restaurant/park-pizza-85-park-ave-park-ridge/353189" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Order on GrubHub"
              >
                <GrubHubIcon className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">Follow Us</p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/ParkPizzaParkRidgeNJ/about" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="w-7 h-7" />
              </a>
              <a 
                href="https://www.instagram.com/parkpizza_nj/?hl=en" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-subhead font-semibold">Hours</h4>
          <p className="text-sm text-neutral-700 font-body">Open daily — see live hours on Slice.</p>
          <p className="text-xs text-neutral-500 font-body">Hours may vary for holidays or events.</p>
        </div>
        <div>
          <h4 className="font-subhead font-semibold">Visit</h4>
          <p className="text-sm text-neutral-700 font-body">
            <a href="https://maps.apple.com/?q=85+Park+Ave,+Park+Ridge,+NJ+07656" target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-2">
              85 Park Ave, Park Ridge, NJ 07656
            </a>
          </p>
          <p className="text-sm text-neutral-700 font-body">
            <a href="tel:2013919393" className="underline decoration-dotted underline-offset-2">(201) 391-9393</a>
          </p>
        </div>
      </div>
      <div className="bg-neutral-100 py-3 text-center text-xs text-neutral-600 font-body">© {new Date().getFullYear()} Park Pizza</div>
    </footer>
  )
}
