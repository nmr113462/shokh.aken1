import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, User, MessageSquare, AtSign } from 'lucide-react'
import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID,
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
})

/* ── Icons ─────────────────────────────────────────────── */
function TelegramIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
    </svg>
  )
}

function LinkedInIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

/* ── Contact channel config ─────────────────────────────── */
const CHANNELS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sturdaliyev123@gmail.com',
    href: 'mailto:sturdaliyev123@gmail.com',
    color: '#00e5cc',
    action: 'Open Email',
  },
  {
    icon: TelegramIcon,
    label: 'Telegram',
    value: '@shokh_ake_xfx',
    href: 'https://t.me/shokh_ake_xfx',
    color: '#38bdf8',
    action: 'Open Telegram',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'shokh.ake',
    href: 'https://www.linkedin.com/in/shokh.ake',
    color: '#60a5fa',
    action: 'Open LinkedIn',
  },
]

/* ── Types ─────────────────────────────────────────────── */
type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

/* ── Form input component ───────────────────────────────── */
function Field({
  icon: Icon, label, name, type = 'text', value, onChange, placeholder, required, textarea
}: {
  icon: React.ElementType; label: string; name: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string; required?: boolean; textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const base = {
    background: focused ? 'rgba(0,229,204,0.05)' : 'rgba(8,13,24,0.6)',
    border: `1px solid ${focused ? 'rgba(0,229,204,0.4)' : 'rgba(0,229,204,0.1)'}`,
    color: 'rgba(215,238,235,0.92)',
    backdropFilter: 'blur(16px)',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: focused ? '0 0 20px rgba(0,229,204,0.1)' : 'none',
  }

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-2 font-heading"
        style={{ color: 'rgba(0,229,204,0.75)' }}>
        <Icon size={11} /> {label}{required && <span style={{ color: '#f5c518' }}>*</span>}
      </label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={4} required={required}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none font-sans"
          style={{ ...base, fontFamily: 'DM Sans, sans-serif' }} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required}
          className="w-full rounded-xl px-4 py-3 text-sm"
          style={base} />
      )}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────── */
export default function Contact() {
  const { ref, inView } = useInView()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      await blink.db.contactMessages.create({
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || 'No subject',
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setErrorMsg('Something went wrong. Please try emailing directly.')
      setStatus('error')
    }
  }

  /* Open links natively — works on mobile too */
  const openChannel = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #070f1c 0%, #05090f 100%)' }}>

      {/* Bottom teal glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,229,204,0.1), transparent 70%)' }} />
      <div className="section-divider mb-0" />

      <div className="relative max-w-6xl mx-auto px-6 pt-6 z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <SectionLabel label="Contact" title="Let's Connect"
            subtitle="Reach out directly via any channel — or send a message below and I'll get back to you." />
        </motion.div>

        {/* ── Channel cards row ── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {CHANNELS.map((c, i) => (
            <motion.button
              key={c.label}
              onClick={() => openChannel(c.href)}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="w-full rounded-2xl p-6 relative overflow-hidden glass-shine hover-lift text-center cursor-pointer group"
              style={{
                background: 'rgba(9,14,26,0.65)',
                backdropFilter: 'blur(28px)',
                border: `1px solid ${c.color}22`,
                WebkitTapHighlightColor: 'transparent',
              }}
              whileHover={{ y: -4, boxShadow: `0 0 32px ${c.color}28` }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Top shine */}
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${c.color}55, transparent)` }} />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${c.color}10, transparent 65%)` }} />

              {/* Icon */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:scale-110"
                style={{
                  background: `${c.color}12`,
                  border: `1px solid ${c.color}28`,
                  boxShadow: `0 0 20px ${c.color}18`,
                }}>
                <c.icon size={24} style={{ color: c.color }} />
              </div>

              <p className="text-xs font-bold tracking-widest uppercase mb-1 font-heading" style={{ color: c.color }}>
                {c.label}
              </p>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgba(210,235,232,0.82)' }}>
                {c.value}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}20`, color: c.color }}>
                Tap to {c.action.split(' ')[1]} →
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── Contact form + quote grid ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-3xl p-7 relative overflow-hidden glass-shine"
            style={{
              background: 'rgba(9,14,26,0.7)',
              backdropFilter: 'blur(40px) saturate(150%)',
              border: '1px solid rgba(0,229,204,0.15)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}>

            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.5), transparent)' }} />

            <h3 className="text-lg font-bold mb-5 font-heading flex items-center gap-2"
              style={{ color: 'rgba(215,238,235,0.95)' }}>
              <MessageSquare size={18} style={{ color: '#00e5cc' }} />
              Send a Message
            </h3>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,229,204,0.1)', border: '1px solid rgba(0,229,204,0.3)' }}>
                    <CheckCircle2 size={32} style={{ color: '#00e5cc' }} />
                  </div>
                  <p className="font-bold text-lg font-heading" style={{ color: '#00e5cc' }}>Message Sent!</p>
                  <p className="text-sm" style={{ color: 'rgba(175,208,204,0.65)' }}>
                    Thanks! I'll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-2 text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(0,229,204,0.08)', border: '1px solid rgba(0,229,204,0.25)', color: '#00e5cc' }}>
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field icon={User} label="Name" name="name" value={form.name}
                      onChange={handleChange} placeholder="Your name" required />
                    <Field icon={AtSign} label="Email" name="email" type="email" value={form.email}
                      onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                  <Field icon={MessageSquare} label="Subject" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="What's this about?" />
                  <Field icon={MessageSquare} label="Message" name="message" value={form.message}
                    onChange={handleChange} placeholder="Tell me about your idea, opportunity, or question..." required textarea />

                  {/* Error */}
                  {(status === 'error' || errorMsg) && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                      <AlertCircle size={15} className="flex-shrink-0" />
                      {errorMsg || 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}

                  <button type="submit" disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm font-heading transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: status === 'loading' ? 'rgba(245,197,24,0.6)' : 'linear-gradient(135deg, #f5c518, #ffd95a)',
                      color: '#0a0f1a',
                      boxShadow: '0 0 28px rgba(245,197,24,0.3)',
                    }}>
                    {status === 'loading' ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quote + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-5">

            {/* Quote card */}
            <div className="rounded-3xl p-8 relative overflow-hidden glass-shine flex-1"
              style={{
                background: 'rgba(0,229,204,0.04)',
                backdropFilter: 'blur(48px)',
                border: '1px solid rgba(0,229,204,0.2)',
                boxShadow: '0 0 80px rgba(0,229,204,0.07), 0 16px 48px rgba(0,0,0,0.5)',
              }}>
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,204,0.06), transparent 65%)' }} />
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.5), transparent)' }} />

              <div className="relative">
                <p className="text-2xl sm:text-3xl font-bold mb-2 font-heading" style={{ color: 'rgba(215,240,238,0.95)' }}>
                  "I am not preparing
                </p>
                <p className="text-2xl sm:text-3xl font-bold mb-2 font-heading" style={{ color: 'rgba(215,240,238,0.95)' }}>
                  for the future —
                </p>
                <p className="text-2xl sm:text-3xl font-bold mb-6 font-heading">
                  <span className="teal-shimmer">I am building it."</span>
                </p>

                <div className="flex flex-col gap-3">
                  <a href="mailto:sturdaliyev123@gmail.com"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm font-heading transition-all duration-200 hover:scale-105 hover-lift"
                    style={{
                      background: 'linear-gradient(135deg, #f5c518, #ffd95a)',
                      color: '#0a0f1a',
                      boxShadow: '0 0 24px rgba(245,197,24,0.28)',
                      textDecoration: 'none',
                    }}>
                    <Mail size={14} /> Email Me Directly
                  </a>
                  <a href="https://t.me/shokh_ake_xfx" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm font-heading transition-all duration-200 hover:scale-105 hover-lift"
                    style={{
                      background: 'rgba(56,189,248,0.08)',
                      border: '1px solid rgba(56,189,248,0.3)',
                      color: '#38bdf8',
                      textDecoration: 'none',
                    }}>
                    <TelegramIcon size={14} /> Message on Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* Response time badge */}
            <div className="rounded-2xl px-5 py-4 flex items-center gap-3 glass-shine"
              style={{ background: 'rgba(9,14,26,0.6)', border: '1px solid rgba(0,229,204,0.1)', backdropFilter: 'blur(20px)' }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 pulse-green"
                style={{ background: '#00e5cc', boxShadow: '0 0 8px #00e5cc' }} />
              <div>
                <p className="text-xs font-bold font-heading" style={{ color: '#00e5cc' }}>Typically responds within 24h</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(165,200,196,0.55)' }}>
                  All messages saved · Check Telegram for faster replies
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
