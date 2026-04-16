import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Layers, BrainCircuit, BarChart2, Shield, TrendingUp } from 'lucide-react'

const PILLARS = [
  { icon:TrendingUp,  title:'Trading Execution',  color:'#00e5cc', desc:'Institutional-grade execution engine for retail and professional traders worldwide.' },
  { icon:BarChart2,   title:'Advanced Analytics',  color:'#f5c518', desc:'TradingView-level charting and market structure analysis powered by real-time data.' },
  { icon:BrainCircuit,title:'AI-Driven Insights',  color:'#a78bfa', desc:'Machine learning models that identify high-probability setups and market patterns.' },
  { icon:Layers,      title:'Asset Management',    color:'#34d399', desc:'BlackRock-inspired systematic portfolio management for individual and institutional investors.' },
  { icon:Shield,      title:'Halal Compliance',    color:'#fb923c', desc:'Fully Shariah-compliant structure ensuring ethical investing for 1.8 billion Muslims globally.' },
]

function PCard({ p, i }: { p: typeof PILLARS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const rx = useSpring(useTransform(y,[-50,50],[8,-8]),{stiffness:380,damping:34})
  const ry = useSpring(useTransform(x,[-50,50],[-8,8]),{stiffness:380,damping:34})
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:36, scale:0.96 }} whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true }} transition={{ duration:0.6, delay:0.25+i*0.08 }}
      style={{
        rotateX:rx, rotateY:ry,
        transformStyle:'preserve-3d' as const,
        perspective:800,
        background:`rgba(9,14,24,0.7)`,
        backdropFilter:'blur(32px)',
        border:`1px solid ${p.color}1e`,
        boxShadow:`0 8px 28px rgba(0,0,0,0.35)`,
      }}
      whileHover={{ scale:1.06, y:-4 }}
      onMouseMove={e => { const r=ref.current?.getBoundingClientRect()!; x.set(e.clientX-r.left-r.width/2); y.set(e.clientY-r.top-r.height/2) }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="rounded-2xl p-5 text-center relative overflow-hidden glass-shine cursor-default hover-lift">

      <div className="absolute inset-x-0 top-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${p.color}66,transparent)` }} />
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full blur-2xl pointer-events-none" style={{ background:`${p.color}16` }} />

      <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
        style={{ background:`${p.color}14`, border:`1px solid ${p.color}28`, boxShadow:`0 4px 18px ${p.color}1c` }}
        whileHover={{ scale:1.14, rotate:10 }} transition={{ type:'spring', stiffness:400, damping:15 }}>
        <p.icon size={20} style={{ color:p.color }}/>
      </motion.div>
      <h3 className="text-sm font-bold mb-1.5 font-heading" style={{ color:'rgba(215,238,235,0.92)' }}>{p.title}</h3>
      <p className="text-xs leading-relaxed" style={{ color:'rgba(170,205,200,0.55)' }}>{p.desc}</p>
    </motion.div>
  )
}

export default function Vision() {
  const { ref, inView } = useInView()
  return (
    <section id="vision" ref={ref} className="py-24 relative overflow-hidden hex-bg"
      style={{ background:'linear-gradient(180deg, #06101a 0%, #070f1c 100%)' }}>

      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none orb-drift"
        style={{ background:'rgba(0,229,204,0.06)' }} />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div initial={{ opacity:0, y:36 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}>
          <SectionLabel label="Future Company" title="SafiqX — The Vision"
            subtitle="A next-generation halal brokerage and investment platform built to compete with the world's top financial institutions." />
        </motion.div>

        {/* Central glass quote */}
        <motion.div initial={{ opacity:0, y:28, scale:0.97 }} animate={inView ? { opacity:1, y:0, scale:1 } : {}}
          transition={{ duration:0.8, delay:0.18 }}
          className="max-w-4xl mx-auto mb-14">
          <div className="rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden glass-shine"
            style={{ background:'rgba(0,229,204,0.04)', backdropFilter:'blur(48px) saturate(160%)',
              border:'1px solid rgba(0,229,204,0.22)',
              boxShadow:'0 0 80px rgba(0,229,204,0.07), 0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background:'radial-gradient(ellipse at center, rgba(0,229,204,0.07), transparent 65%)' }} />
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background:'linear-gradient(90deg, transparent, rgba(0,229,204,0.55), transparent)' }} />
            <p className="relative text-xl sm:text-2xl italic font-medium leading-relaxed mb-5 font-heading"
              style={{ color:'rgba(0,229,204,0.85)' }}>
              "SafiqX is not just a fintech company. It is a movement — to give every Muslim and ethical investor access to world-class financial infrastructure."
            </p>
            <div className="relative flex items-center justify-center gap-3">
              <div className="h-px w-10" style={{ background:'rgba(0,229,204,0.35)' }}/>
              <span className="text-xs font-semibold tracking-widest uppercase font-heading" style={{ color:'rgba(0,229,204,0.7)' }}>SafiqX Mission</span>
              <div className="h-px w-10" style={{ background:'rgba(0,229,204,0.35)' }}/>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map((p,i) => <PCard key={p.title} p={p} i={i}/>)}
        </div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.9 }}
          className="text-center mt-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-6 py-2 rounded-full font-heading"
            style={{ background:'rgba(0,229,204,0.07)', border:'1px solid rgba(0,229,204,0.2)', color:'#00e5cc' }}>
            Goal: Global leader in ethical finance
          </span>
        </motion.div>
      </div>
    </section>
  )
}
