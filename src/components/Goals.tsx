import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

const PHASES = [
  {
    phase: 'Phase I', timeline: '2026 — Short-Term', color: '#00e5cc',
    goals: [
      { text: 'Achieve IELTS 7+', done: false },
      { text: 'Build strong university portfolio', done: false },
      { text: 'Develop startup MVP (SafiqX)', done: false },
      { text: 'Improve prompt engineering & AI skills', done: true },
      { text: 'Establish active trading performance record', done: false },
    ],
  },
  {
    phase: 'Phase II', timeline: '2027–2028 — Mid-Term', color: '#f5c518',
    goals: [
      { text: 'Enter top international university', done: false },
      { text: 'Launch SafiqX beta platform', done: false },
      { text: 'Build strong trading capital base', done: false },
      { text: 'Form advisory and founding team', done: false },
      { text: 'Secure initial investor interest', done: false },
    ],
  },
  {
    phase: 'Phase III', timeline: '5–10 Years — Long-Term', color: '#a78bfa',
    goals: [
      { text: 'Become CEO of global fintech company', done: false },
      { text: 'Build multi-billion halal investment ecosystem', done: false },
      { text: 'Expand SafiqX to global markets', done: false },
      { text: 'Compete with top-tier financial institutions', done: false },
      { text: 'Empower millions through ethical finance', done: false },
    ],
  },
]

export default function Goals() {
  const { ref, inView } = useInView()
  return (
    <section id="goals" ref={ref} className="py-24 relative"
      style={{ background: 'linear-gradient(180deg, #070f1c 0%, #06101a 100%)' }}>
      <div className="section-divider mb-0" />
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <motion.div initial={{ opacity:0, y:36 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}>
          <SectionLabel label="Roadmap" title="Goals & Milestones"
            subtitle="A structured, phased approach to building a global financial empire — starting today." />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PHASES.map((ph, i) => (
            <motion.div key={ph.phase}
              initial={{ opacity:0, y:46 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7, delay:i*0.12 }}
              className="rounded-2xl p-6 relative overflow-hidden hover-lift glass-shine"
              style={{ background:'rgba(9,14,26,0.65)', backdropFilter:'blur(32px)', border:`1px solid ${ph.color}20` }}>

              <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl"
                style={{ background:`linear-gradient(90deg, transparent, ${ph.color}, transparent)` }} />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ background:`${ph.color}0e` }} />

              <div className="mb-5">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 font-heading"
                  style={{ background:`${ph.color}12`, border:`1px solid ${ph.color}25`, color:ph.color }}>
                  {ph.phase}
                </span>
                <div className="flex items-center gap-2">
                  <Clock size={12} style={{ color:ph.color }}/>
                  <h3 className="text-sm font-semibold font-heading" style={{ color:'rgba(210,235,232,0.8)' }}>{ph.timeline}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {ph.goals.map(g => (
                  <div key={g.text} className="flex items-start gap-2.5">
                    {g.done
                      ? <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color:ph.color }}/>
                      : <Circle size={15} className="flex-shrink-0 mt-0.5" style={{ color:`${ph.color}55` }}/>}
                    <span className={`text-sm leading-relaxed ${g.done ? 'line-through opacity-50' : ''}`}
                      style={{ color:'rgba(175,208,204,0.65)' }}>
                      {g.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
