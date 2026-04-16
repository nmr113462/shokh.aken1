import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import ParticleField from './ParticleField'
import { useLanguage } from '../hooks/useLanguage'

const PHOTO = 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FCGRih1dJuLMcnqOqUkyYYEVSuIo1%2Fphoto_2026-01-12_19-30-07__b85e5f05.jpg?alt=media&token=426c5f69-cf92-4c6b-a545-dbccbe74c2c2'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const fade = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.4, 0, 0.2, 1] } },
}

export default function Hero() {
  const { t } = useLanguage()
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  const [scrolled, setScrolled] = useState(false)

  const stats = [
    { icon: '🎯', label: t('hero.stats.age'),   sub: t('hero.stats.ageSub'),    color: '#00e5cc' },
    { icon: '🌍', label: t('hero.stats.english'),     sub: t('hero.stats.englishSub'),     color: '#f5c518' },
    { icon: '🚀', label: t('hero.stats.startup'),         sub: t('hero.stats.startupSub'), color: '#a78bfa' },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden hex-bg"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 15% 90%, rgba(0,229,204,0.09) 0%, transparent 65%),
          radial-gradient(ellipse 50% 50% at 85% 15%, rgba(0,120,105,0.05) 0%, transparent 60%),
          linear-gradient(165deg, #07111f 0%, #09131f 50%, #050d19 100%)
        `,
      }}>

      <ParticleField />

      {/* bottom teal radial glow */}
      <div className="orb-drift absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,229,204,0.11) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="text-center lg:text-left">

            {/* Open badge */}
            <motion.div variants={fade} className="inline-flex mb-5">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                style={{ background: 'rgba(0,229,204,0.07)', border: '1px solid rgba(0,229,204,0.22)', color: '#00e5cc' }}>
                <span className="w-1.5 h-1.5 rounded-full pulse-green" style={{ background: '#00e5cc', boxShadow: '0 0 6px #00e5cc' }} />
                {t('hero.status')}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={fade}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-1 font-heading tracking-tight"
              style={{ color: 'rgba(215,240,238,0.95)' }}>
              {t('hero.shohijahon')}
            </motion.h1>
            <motion.h1 variants={fade}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-5 font-heading tracking-tight">
              <span className="gold-shimmer">{t('hero.turdaliyev')}</span>
            </motion.h1>

            {/* Title pills */}
            <motion.div variants={fade} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
              {(t('hero.titles') as string[]).map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(0,229,204,0.05)', border: '1px solid rgba(0,229,204,0.12)', color: 'rgba(195,232,228,0.65)' }}>
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fade} className="text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              style={{ color: 'rgba(175,208,204,0.62)' }}>
              {t('hero.tagline')}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <button onClick={() => go('#about')}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm font-heading transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f5c518, #ffd95a)', color: '#0a0f1a', boxShadow: '0 0 28px rgba(245,197,24,0.32)' }}>
                {t('hero.viewJourney')}
                <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button onClick={() => go('#contact')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm font-heading transition-all duration-200 hover:scale-105"
                style={{ border: '1px solid rgba(0,229,204,0.42)', color: '#00e5cc', boxShadow: '0 0 16px rgba(0,229,204,0.1)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(0,229,204,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,204,0.1)')}>
                <Mail size={15}/> {t('hero.contactMe')}
              </button>
            </motion.div>

            {/* Stat pills */}
            <motion.div variants={fade} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {stats.map(s => (
                <motion.div key={s.label} whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl cursor-default glass-shine relative overflow-hidden hover-lift"
                  style={{ background: 'rgba(8,14,26,0.65)', border: `1px solid ${s.color}20`, backdropFilter: 'blur(18px)' }}>
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="text-sm font-bold font-heading leading-none" style={{ color: s.color }}>{s.label}</div>
                    <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(170,200,196,0.5)' }}>{s.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT PHOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 44 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.38 }}
            className="flex justify-center lg:justify-end">

            <div className="relative">
              {/* Glow aura */}
              <div className="absolute inset-0 rounded-full pointer-events-none scale-[1.15] blur-3xl"
                style={{ background: 'rgba(0,229,204,0.18)' }} />

              {/* Rotating rings */}
              <div className="spin-slow absolute rounded-full pointer-events-none" style={{ inset: '-20px', border: '1px dashed rgba(0,229,204,0.2)' }} />
              <div className="spin-slow-reverse absolute rounded-full pointer-events-none" style={{ inset: '-38px', border: '1px solid rgba(245,197,24,0.12)' }} />

              {/* Conic border */}
              <div className="absolute rounded-full" style={{ inset: '-3px',
                background: 'conic-gradient(from 0deg, #f5c518 0%, #00e5cc 38%, #f5c518 65%, #00e5cc 100%)', padding: '2.5px' }}>
                <div className="w-full h-full rounded-full" style={{ background: '#060d18' }} />
              </div>

              {/* Photo */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 60px rgba(0,229,204,0.3)' }}>
                <img src={PHOTO} alt="Shohijahon Turdaliyev" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(155deg, rgba(0,229,204,0.06) 0%, transparent 50%)' }} />
              </div>

              {/* Badge: country */}
              <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-4 px-3.5 py-2 rounded-2xl text-xs font-semibold glass-shine"
                style={{ background: 'rgba(8,14,28,0.82)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,197,24,0.3)', color: '#f5c518' }}>
                🇺🇿 {t('hero.location')} · 2026
              </motion.div>

              {/* Badge: trading */}
              <motion.div animate={{ y: [0,7,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
                className="absolute -top-1 -left-8 px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 glass-shine"
                style={{ background: 'rgba(0,229,204,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,229,204,0.28)', color: '#00e5cc' }}>
                <span className="w-1.5 h-1.5 rounded-full pulse-green" style={{ background: '#00e5cc' }} />
                {t('hero.tradingStatus')}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ opacity: scrolled ? 0 : 1 }} transition={{ duration: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(160,200,196,0.38)' }}>{t('hero.scroll')}</span>
          <div className="bounce-arrow" style={{ color: '#00e5cc' }}><ArrowDown size={15}/></div>
        </motion.div>
      </div>
    </section>
  )
}