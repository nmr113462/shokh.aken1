import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Target, Globe, Zap } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

function FloatCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const mx   = useMotionValue(0); const my = useMotionValue(0)
  const rx   = useSpring(useTransform(my, [-40, 40], [6, -6]), { stiffness: 380, damping: 36 })
  const ry   = useSpring(useTransform(mx, [-40, 40], [-6, 6]), { stiffness: 380, damping: 36 })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={e => { const r = ref.current?.getBoundingClientRect()!; mx.set(e.clientX-r.left-r.width/2); my.set(e.clientY-r.top-r.height/2) }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}>
      {children}
    </motion.div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const { ref, inView } = useInView()

  const identity = [
    { icon: Target, title: t('about.visionTitle'),   color: '#00e5cc', text: t('about.visionText') },
    { icon: Globe,  title: t('about.missionTitle'),  color: '#f5c518', text: t('about.missionText') },
    { icon: Zap,    title: t('about.mindsetTitle'),  color: '#a78bfa', text: t('about.mindsetText') },
  ]

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #070f1c 0%, #080e1b 100%)' }}>

      {/* Ambient orb */}
      <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none orb-drift"
        style={{ background: 'rgba(0,229,204,0.05)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionLabel label={t('about.label')} title={t('about.title')} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Story */}
          <motion.div initial={{ opacity: 0, x: -36 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.18 }}
            className="space-y-5">
            {(t('about.paragraphs') as string[]).map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 + i * 0.1 }}
                className="text-base leading-relaxed" style={{ color: 'rgba(175,208,204,0.68)' }}>
                {p}
              </motion.p>
            ))}

            {/* Quote */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.62 }}
              className="mt-6 rounded-2xl p-5 relative overflow-hidden glass-shine"
              style={{ background: 'rgba(0,229,204,0.04)', backdropFilter: 'blur(32px)', border: '1px solid rgba(0,229,204,0.18)', boxShadow: '0 0 24px rgba(0,229,204,0.06)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                style={{ background: 'linear-gradient(180deg, #00e5cc, #f5c518)' }} />
              <p className="pl-4 text-base italic font-medium font-heading" style={{ color: '#00e5cc' }}>
                {t('about.quote')}
              </p>
            </motion.div>
          </motion.div>

          {/* Identity cards */}
          <div className="space-y-4">
            {identity.map((c, i) => (
              <FloatCard key={c.title} delay={0.18 + i * 0.14}>
                <div className="rounded-2xl p-6 relative overflow-hidden glass-shine hover-lift cursor-default"
                  style={{ background: 'rgba(10,16,28,0.65)', backdropFilter: 'blur(32px)', border: `1px solid ${c.color}20` }}>
                  <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                    style={{ background: `${c.color}14` }} />
                  <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.color}55, transparent)` }} />
                  <div className="flex gap-4 items-start relative">
                    <motion.div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.color}12`, border: `1px solid ${c.color}28`, boxShadow: `0 4px 14px ${c.color}14` }}
                      whileHover={{ scale: 1.12, rotate: 6 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>
                      <c.icon size={18} style={{ color: c.color }} />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm tracking-widest uppercase mb-1.5 font-heading" style={{ color: c.color }}>{c.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(175,208,204,0.62)' }}>{c.text}</p>
                    </div>
                  </div>
                </div>
              </FloatCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
