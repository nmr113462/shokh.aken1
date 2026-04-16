import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../hooks/useLanguage'

export default function MyStats() {
  const { t } = useLanguage()
  const { ref, inView } = useInView()

  const stats = [
    {
      icon: '📈',
      label: t('stats.tradingXP'),
      value: 'SMC',
      subvalue: t('stats.tradingSub'),
      bar: 78,
      barColor: '#00e5cc',
      glow: 'rgba(0,229,204,0.25)',
      detail: t('stats.tradingDetail'),
    },
    {
      icon: '🚀',
      label: t('stats.projectsBuilt'),
      value: '3',
      subvalue: t('stats.projectsSub'),
      bar: 60,
      barColor: '#f5c518',
      glow: 'rgba(245,197,24,0.25)',
      detail: t('stats.projectsDetail'),
    },
    {
      icon: '🌍',
      label: t('stats.englishLevel'),
      value: 'B2',
      subvalue: t('stats.englishSub'),
      bar: 72,
      barColor: '#a78bfa',
      glow: 'rgba(167,139,250,0.25)',
      detail: t('stats.englishDetail'),
    },
  ]

  return (
    <section ref={ref} className="py-10 relative" id="stats">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-5 relative overflow-hidden glass-shine hover-lift group cursor-default"
              style={{ background: 'rgba(10,16,28,0.6)', backdropFilter: 'blur(28px)', border: '1px solid rgba(0,229,204,0.1)' }}>

              {/* Corner glow */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                style={{ background: s.glow }} />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{s.icon}</span>
                    <div className="text-xs font-semibold tracking-widest uppercase font-heading"
                      style={{ color: s.barColor }}>
                      {s.label}
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-heading leading-none"
                    style={{ color: 'rgba(215,240,238,0.95)' }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(175,208,204,0.55)' }}>{s.subvalue}</div>
                </div>
                {/* Mini radial badge */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-heading"
                  style={{ background: `${s.glow}`, border: `1px solid ${s.barColor}30`, color: s.barColor }}>
                  {s.bar}%
                </div>
              </div>

              {/* Bar */}
              <div className="mb-3">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.barColor}, ${s.barColor}88)`, boxShadow: `0 0 8px ${s.glow}` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${s.bar}%` } : { width: 0 }}
                    transition={{ duration: 1.1, delay: 0.35 + i * 0.1, ease: [0.4, 0, 0.2, 1] }} />
                </div>
              </div>

              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(175,205,202,0.5)' }}>{s.detail}</p>

              {/* Bottom teal line */}
              <div className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${s.barColor}60, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
