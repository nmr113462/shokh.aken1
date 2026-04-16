export default function Footer() {
  return (
    <footer className="py-8" style={{ background:'#04080f', borderTop:'1px solid rgba(0,229,204,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-base font-bold font-heading">
          <span className="teal-shimmer">Shohijahon Turdaliyev</span>
        </div>
        <p className="text-xs" style={{ color:'rgba(155,190,185,0.45)' }}>
          Future CEO · Fintech Founder · Uzbekistan · 2026
        </p>
        <p className="text-xs" style={{ color:'rgba(130,170,166,0.3)' }}>Built with vision.</p>
      </div>
    </footer>
  )
}
