import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage, Language } from '../hooks/useLanguage'

const navLinks = (t: any) => [
  { label: t('nav.about'),    href: '#about'    },
  { label: t('nav.skills'),   href: '#skills'   },
  { label: t('nav.projects'), href: '#projects' },
  { label: t('nav.vision'),   href: '#vision'   },
  { label: t('nav.goals'),    href: '#goals'    },
]

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]       = useState('')
  const [langOpen, setLangOpen] = useState(false)

  const links = navLinks(t)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = [...links.map(l => l.href.slice(1)), 'hero']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [links])

  const go = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const langNames: Record<Language, string> = {
    en: 'EN',
    uz: 'UZ',
    ru: 'RU'
  }

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className="transition-all duration-400"
        style={scrolled ? {
          background: 'rgba(8, 12, 22, 0.82)',
          backdropFilter: 'blur(40px) saturate(160%)',
          WebkitBackdropFilter: 'blur(40px) saturate(160%)',
          borderBottom: '1px solid rgba(0, 229, 204, 0.1)',
          boxShadow: '0 1px 0 rgba(0,229,204,0.04), 0 8px 32px rgba(0,0,0,0.5)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black font-heading
              bg-gradient-to-br from-[#00e5cc] to-[#00b8a5]"
              style={{ color: '#0a0f1a', boxShadow: '0 2px 12px rgba(0,229,204,0.4)' }}>
              ST
            </span>
            <span className="text-sm font-semibold hidden sm:block font-heading tracking-wide"
              style={{ color: 'rgba(195,240,235,0.75)' }}>
              {t('hero.shohijahon')}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full"
            style={{
              background: 'rgba(10, 15, 28, 0.55)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,229,204,0.08)',
            }}>
            {links.map(link => {
              const isActive = active === link.href.slice(1)
              return (
                <button key={link.label} onClick={() => go(link.href)}
                  className="relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 group"
                  style={{ color: isActive ? '#00e5cc' : 'rgba(195,220,218,0.6)' }}>
                  {isActive && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(0,229,204,0.1)', border: '1px solid rgba(0,229,204,0.22)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                  )}
                  <span className="relative z-10 block">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: '#00e5cc' }} />
                  </span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-heading transition-all duration-200"
                style={{
                  background: 'rgba(10, 15, 28, 0.55)',
                  border: '1px solid rgba(0, 229, 204, 0.15)',
                  color: 'rgba(195, 240, 235, 0.8)',
                }}
              >
                <Globe size={12} className="text-[#00e5cc]" />
                {langNames[language]}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-20 rounded-xl overflow-hidden glass z-50"
                    style={{ border: '1px solid rgba(0, 229, 204, 0.2)' }}
                  >
                    {(['en', 'uz', 'ru'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-[10px] font-bold text-left transition-colors ${
                          language === lang ? 'text-[#00e5cc] bg-[rgba(0,229,204,0.1)]' : 'text-[rgba(195,240,235,0.6)] hover:bg-[rgba(0,229,204,0.05)]'
                        }`}
                      >
                        {langNames[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <button onClick={() => go('#contact')}
              className="hidden md:flex items-center gap-1.5 text-xs px-5 py-2.5 rounded-full font-semibold font-heading
                transition-all duration-200 hover:scale-105"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,229,204,0.5)',
                color: '#00e5cc',
                boxShadow: '0 0 12px rgba(0,229,204,0.12)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,229,204,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 12px rgba(0,229,204,0.12)')}>
              {t('nav.contact')}
            </button>

            {/* Mobile button */}
            <button className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,229,204,0.08)', border: '1px solid rgba(0,229,204,0.15)', color: '#00e5cc' }}
              onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="md:hidden mx-4 mt-1 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8, 13, 26, 0.92)',
              backdropFilter: 'blur(48px) saturate(160%)',
              border: '1px solid rgba(0,229,204,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.button key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => go(link.href)}
                  className="text-left text-sm py-2.5 px-3 rounded-xl font-medium transition-colors duration-150"
                  style={{ color: 'rgba(195,235,232,0.7)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,204,0.08)'; e.currentTarget.style.color = '#00e5cc' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(195,235,232,0.7)' }}>
                  {link.label}
                </motion.button>
              ))}
              <div className="h-px my-1" style={{ background: 'rgba(0,229,204,0.08)' }} />
              <button onClick={() => go('#contact')} className="py-2.5 px-3 rounded-xl text-sm font-semibold text-center"
                style={{ background: 'rgba(0,229,204,0.12)', border: '1px solid rgba(0,229,204,0.25)', color: '#00e5cc' }}>
                {t('nav.contact')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
