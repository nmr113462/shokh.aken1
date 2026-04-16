interface Props { label: string; title: string; subtitle?: string; center?: boolean }

export default function SectionLabel({ label, title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase mb-3 px-3.5 py-1.5 rounded-full font-heading"
        style={{ color: '#00e5cc', background: 'rgba(0,229,204,0.08)', border: '1px solid rgba(0,229,204,0.2)' }}>
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-heading tracking-tight"
        style={{ color: 'rgba(215,240,238,0.95)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(175,208,204,0.6)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
