import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Award, BookOpen, Lightbulb, TrendingUp } from 'lucide-react'

const LIST = [
  { icon:BookOpen,   title:'CEFR B2 English',      sub:'Language Proficiency', desc:'Achieved B2 level in English, actively working toward IELTS 7+ for top international university admission.', color:'#00e5cc' },
  { icon:TrendingUp, title:'Active SMC Trader',     sub:'Trading Mastery',      desc:'Mastering Smart Money Concepts — deep understanding of bank manipulation, order blocks, and market structure.', color:'#f5c518' },
  { icon:Lightbulb,  title:'SafiqX Concept Founded',sub:'Startup Development',  desc:'Created the full concept, vision, and infrastructure blueprint for a halal fintech brokerage platform.', color:'#a78bfa' },
  { icon:Award,      title:'AI & Prompt Engineering',sub:'Tech Skills',         desc:'Self-taught proficiency in AI tools, workflow automation, and prompt engineering for business applications.', color:'#34d399' },
]

export default function Achievements() {
  const { ref, inView } = useInView()
  return (
    <section id="achievements" ref={ref} className="py-24 relative"
      style={{ background:'linear-gradient(180deg, #06101a 0%, #070f1c 100%)' }}>

      <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{ background:'rgba(0,229,204,0.04)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity:0, y:36 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}>
          <SectionLabel label="Achievements" title="What I've Earned"
            subtitle="Real accomplishments at 17 — foundations of something much larger." />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LIST.map((a, i) => (
            <motion.div key={a.title}
              initial={{ opacity:0, y:36 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:i*0.1 }}
              className="rounded-2xl p-6 text-center relative overflow-hidden hover-lift glass-shine cursor-default"
              style={{ background:'rgba(9,14,26,0.65)', backdropFilter:'blur(28px)', border:`1px solid ${a.color}1e` }}>

              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background:`linear-gradient(90deg,transparent,${a.color}55,transparent)` }} />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                style={{ background:`${a.color}12` }} />

              <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background:`${a.color}12`, border:`1px solid ${a.color}28`, boxShadow:`0 0 20px ${a.color}18` }}
                whileHover={{ scale:1.12 }} transition={{ type:'spring', stiffness:400, damping:16 }}>
                <a.icon size={24} style={{ color:a.color }}/>
              </motion.div>

              <span className="text-[10px] font-bold tracking-widest uppercase mb-1.5 block font-heading" style={{ color:a.color }}>{a.sub}</span>
              <h3 className="font-bold text-sm mb-2 font-heading" style={{ color:'rgba(215,238,235,0.9)' }}>{a.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:'rgba(170,205,200,0.56)' }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.55 }}
          className="text-center mt-7 text-xs" style={{ color:'rgba(150,190,186,0.35)' }}>
          More achievements being added as the journey continues...
        </motion.p>
      </div>
    </section>
  )
}
