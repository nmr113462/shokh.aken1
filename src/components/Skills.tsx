import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Briefcase, TrendingUp, Cpu, MessageSquare, ChevronDown, ArrowUpRight } from 'lucide-react'

const GROUPS = [
  {
    icon: Briefcase, category: 'Business & Leadership',
    color: '#00e5cc', level: 85,
    description: 'Building systems that scale. Every startup begins with a vision — I translate vision into executable strategy.',
    skills: [
      { name: 'Startup Building',   detail: 'From concept to MVP — structuring ideas into fundable, scalable ventures.' },
      { name: 'Strategic Thinking', detail: 'Multi-level planning: short-term execution + long-term market positioning.' },
      { name: 'Vision Planning',    detail: 'Setting clear north stars, milestones, and KPIs for ambitious companies.' },
      { name: 'Systems Design',     detail: 'Understanding how businesses, products, and processes interconnect at scale.' },
    ],
  },
  {
    icon: TrendingUp, category: 'Trading & Finance',
    color: '#f5c518', level: 78,
    description: 'Institutional-grade market analysis. I study how banks move price, identify manipulation, and enter with precision.',
    skills: [
      { name: 'Smart Money Concepts (SMC)',  detail: 'Tracking institutional order flow, premium/discount zones, and FVGs.' },
      { name: 'Liquidity & Order Blocks',   detail: 'Identifying where banks place stop hunts and accumulate positions.' },
      { name: 'Market Structure (BOS, CHoCH)', detail: 'Reading Break of Structure and Change of Character for trend confirmation.' },
      { name: 'Multi-timeframe Analysis',   detail: 'D1 narrative → H4 confirmation → M15 precision entry model.' },
      { name: 'Bank Manipulation Strategy', detail: 'Personal edge built on understanding how large players engineer liquidity.' },
    ],
  },
  {
    icon: Cpu, category: 'Tech & AI',
    color: '#a78bfa', level: 72,
    description: 'Leveraging AI as a competitive weapon. Building intelligent workflows to move faster than any team.',
    skills: [
      { name: 'Prompt Engineering',            detail: 'Crafting precise instructions to extract maximum value from AI models.' },
      { name: 'AI-powered Workflows',          detail: 'Automating research, analysis, and content generation pipelines.' },
      { name: 'Fullstack Understanding',       detail: 'Frontend, backend, database — knowing how every layer connects.' },
      { name: 'Frontend / Backend / DB',       detail: 'Practical knowledge of modern web architecture for startup building.' },
    ],
  },
  {
    icon: MessageSquare, category: 'Communication',
    color: '#fb923c', level: 80,
    description: 'Language is leverage. I communicate with the precision of a professional and the conviction of a founder.',
    skills: [
      { name: 'English — CEFR B2',       detail: 'Actively pursuing IELTS 7+ for top international university entry.' },
      { name: 'Professional Writing',    detail: 'Business communication, investor briefs, and strategic documentation.' },
      { name: 'Presentation Skills',     detail: 'Pitching ideas with clarity, confidence, and visual storytelling.' },
      { name: 'Strategic Storytelling',  detail: 'Shaping narratives that attract investors, partners, and top talent.' },
    ],
  },
]

function TiltWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-55,55], [7,-7]), { stiffness: 320, damping: 32 })
  const ry = useSpring(useTransform(x, [-55,55], [-7,7]), { stiffness: 320, damping: 32 })
  const sc = useSpring(1, { stiffness: 300, damping: 26 })
  return (
    <motion.div ref={ref}
      style={{ rotateX: rx, rotateY: ry, scale: sc, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={e => { const r = ref.current?.getBoundingClientRect()!; x.set(e.clientX-r.left-r.width/2); y.set(e.clientY-r.top-r.height/2); sc.set(1.025) }}
      onMouseLeave={() => { x.set(0); y.set(0); sc.set(1) }}>
      {children}
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState<number|null>(null)

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080e1b 0%, #07111d 100%)' }}>

      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'rgba(0,229,204,0.04)' }} />

      <div className="section-divider mb-0" />
      <div className="max-w-7xl mx-auto px-6 pt-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionLabel label="Expertise" title="Skills & Mastery"
            subtitle="Tap any card to expand. Each skill is a deliberate investment in the future." />
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {GROUPS.map((g, i) => (
            <motion.div key={g.category}
              initial={{ opacity: 0, y: 46 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}>
              <TiltWrap>
                <div className="rounded-3xl overflow-hidden cursor-pointer"
                  onClick={() => setActive(active === i ? null : i)}
                  style={{
                    background: 'rgba(10,16,28,0.7)',
                    backdropFilter: 'blur(36px) saturate(150%)',
                    border: active === i ? `1px solid ${g.color}55` : '1px solid rgba(0,229,204,0.1)',
                    boxShadow: active === i ? `0 0 36px ${g.color}18, 0 12px 40px rgba(0,0,0,0.45)` : '0 8px 28px rgba(0,0,0,0.35)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}>

                  {/* Top line */}
                  <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${g.color}66, transparent)` }} />

                  <div className="p-6 relative">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${g.color}14`, border: `1px solid ${g.color}28`, boxShadow: `0 4px 16px ${g.color}18` }}>
                        <g.icon size={20} style={{ color: g.color }} />
                      </div>
                      <motion.div animate={{ rotate: active === i ? 180 : 0 }} transition={{ duration: 0.32 }}
                        style={{ color: g.color }}><ChevronDown size={16}/></motion.div>
                    </div>

                    <h3 className="font-bold text-xs uppercase tracking-wider mb-3 font-heading" style={{ color: g.color }}>
                      {g.category}
                    </h3>

                    {/* Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(175,205,202,0.45)' }}>Proficiency</span>
                        <span className="text-[11px] font-bold font-heading" style={{ color: g.color }}>{g.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${g.color}, ${g.color}70)`, boxShadow: `0 0 8px ${g.color}55` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${g.level}%` } : { width: 0 }}
                          transition={{ duration: 1.1, delay: 0.4 + i * 0.1 }} />
                      </div>
                    </div>

                    {/* Pill preview */}
                    <div className="flex flex-wrap gap-1.5">
                      {g.skills.slice(0,3).map(s => (
                        <span key={s.name} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: `${g.color}0d`, border: `1px solid ${g.color}20`, color: 'rgba(190,220,216,0.6)' }}>
                          {s.name.split(' ')[0]}
                        </span>
                      ))}
                      {g.skills.length > 3 && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${g.color}16`, color: g.color }}>+{g.skills.length-3}</span>}
                    </div>
                  </div>

                  {/* Expand drawer */}
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div key="d"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4,0,0.2,1] }}
                        style={{ overflow: 'hidden' }}>
                        <div className="mx-4 mb-4 rounded-xl p-4"
                          style={{ background: 'rgba(5,10,20,0.55)', border: `1px solid ${g.color}18`, backdropFilter: 'blur(20px)' }}>
                          <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(175,208,204,0.58)' }}>{g.description}</p>
                          <div className="space-y-3">
                            {g.skills.map((s, si) => (
                              <motion.div key={s.name} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                                transition={{ delay: si*0.05 }} className="flex gap-2.5">
                                <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ background: g.color, boxShadow: `0 0 5px ${g.color}` }} />
                                <div>
                                  <p className="text-xs font-semibold font-heading mb-0.5" style={{ color: 'rgba(210,235,232,0.88)' }}>{s.name}</p>
                                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(165,200,196,0.52)' }}>{s.detail}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          <div className="mt-3 pt-2.5 flex items-center gap-1.5 border-t" style={{ borderColor: `${g.color}15` }}>
                            <ArrowUpRight size={11} style={{ color: g.color }}/>
                            <span className="text-[10px] font-semibold tracking-widest uppercase font-heading" style={{ color: g.color }}>Active Focus</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TiltWrap>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay: 0.9 }}
          className="text-center mt-5 text-xs" style={{ color: 'rgba(160,195,192,0.33)' }}>
          Tap any card to explore details ↑
        </motion.p>
      </div>
    </section>
  )
}
