export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3">
        <div>
          <h3 className="font-subhead text-lg font-semibold text-primary">Order & Contact</h3>
          <p className="text-sm text-neutral-700 font-body">Classic flavors. Park Ridge pride.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a className="btn btn-accent" href="https://www.parkpizzaparkridge.com" target="_blank" rel="noreferrer">Order on Slice</a>
            <a className="btn bg-neutral-200 text-neutral-800" href="tel:2013919393">Call (201) 391-9393</a>
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
