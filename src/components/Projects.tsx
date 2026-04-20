import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionLabel from './SectionLabel'
import { Building2, BarChart3, Globe, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

function Card3D({ p, i }: { p: any; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-80,80],[10,-10]),{stiffness:280,damping:30})
  const ry = useSpring(useTransform(x, [-80,80],[-10,10]),{stiffness:280,damping:30})
  const sc = useSpring(1,{stiffness:300,damping:26})
  const [spot, setSpot] = useState({ x:50, y:50, on:false })

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:56, rotateX:12 }} whileInView={{ opacity:1, y:0, rotateX:0 }}
      viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.14 }}
      style={{ rotateX:rx, rotateY:ry, scale:sc, transformStyle:'preserve-3d', perspective:1000 }}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect()!
        x.set(e.clientX-r.left-r.width/2); y.set(e.clientY-r.top-r.height/2)
        setSpot({ x:((e.clientX-r.left)/r.width)*100, y:((e.clientY-r.top)/r.height)*100, on:true })
        sc.set(1.02)
      }}
      onMouseLeave={() => { x.set(0); y.set(0); setSpot(s=>({...s,on:false})); sc.set(1) }}
      className="h-full">

      <div className="rounded-3xl p-6 h-full flex flex-col relative overflow-hidden glass-shine"
        style={{ background:'rgba(9,14,26,0.72)', backdropFilter:'blur(36px) saturate(150%)',
          border:`1px solid ${p.tagColor}22`,
          boxShadow:`0 16px 48px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)` }}>

        {/* Spotlight */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{ background:`radial-gradient(circle at ${spot.x}% ${spot.y}%, ${p.tagColor}16 0%, transparent 58%)`, opacity: spot.on?1:0 }} />

        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background:`linear-gradient(90deg, transparent, ${p.tagColor}66, transparent)` }} />
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ background:`${p.tagColor}10` }} />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <motion.div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background:`${p.tagColor}14`, border:`1px solid ${p.tagColor}28`, boxShadow:`0 4px 18px ${p.tagColor}1c` }}
              whileHover={{ scale:1.1, rotate:7 }} transition={{ type:'spring', stiffness:400, damping:16 }}>
              <p.icon size={22} style={{ color:p.tagColor }}/>
            </motion.div>
            <div className="flex items-center gap-1.5">
              <motion.span className="w-1.5 h-1.5 rounded-full"
                style={{ background:p.tagColor }}
                animate={{ opacity:[1,0.3,1], scale:[1,0.8,1] }} transition={{ duration:2.2, repeat:Infinity }}/>
              <span className="text-xs font-medium" style={{ color:p.tagColor }}>{p.status}</span>
            </div>
          </div>

          <span className="text-[10px] font-bold tracking-widest uppercase mb-1.5 font-heading" style={{ color:p.tagColor }}>{p.tag}</span>
          <h3 className="text-xl font-bold mb-0.5 font-heading" style={{ color:'rgba(215,240,238,0.95)' }}>{p.title}</h3>
          <p className="text-xs mb-3" style={{ color:'rgba(165,200,196,0.5)' }}>{p.subtitle}</p>
          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color:'rgba(175,208,204,0.62)' }}>{p.description}</p>

          <div className="rounded-xl p-3.5 space-y-2"
            style={{ background:'rgba(5,9,18,0.55)', border:`1px solid ${p.tagColor}12` }}>
            {p.highlights.map((h: string, hi: number) => (
              <motion.div key={h} className="flex items-center gap-2"
                initial={{ opacity:0, x:-6 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:0.5+i*0.1+hi*0.05 }}>
                <ArrowUpRight size={11} style={{ color:p.tagColor }} className="flex-shrink-0"/>
                <span className="text-xs" style={{ color:'rgba(175,205,202,0.6)' }}>{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const { ref, inView } = useInView()

  const projects = [
    {
      icon: Building2, tag: t('projects.safiqx.tag'), tagColor: '#00e5cc',
      title: t('projects.safiqx.title'), subtitle: t('projects.safiqx.sub'), status: t('projects.status.dev'),
      description: t('projects.safiqx.desc'),
      highlights: [t('projects.safiqx.h1'), t('projects.safiqx.h2'), t('projects.safiqx.h3'), t('projects.safiqx.h4')],
    },
    {
      icon: BarChart3, tag: t('projects.trading.tag'), tagColor: '#f5c518',
      title: t('projects.trading.title'), subtitle: t('projects.trading.sub'), status: t('projects.status.research'),
      description: t('projects.trading.desc'),
      highlights: [t('projects.trading.h1'), t('projects.trading.h2'), t('projects.trading.h3'), t('projects.trading.h4')],
    },
    {
      icon: Globe, tag: t('projects.identity.tag'), tagColor: '#a78bfa',
      title: t('projects.identity.title'), subtitle: t('projects.identity.sub'), status: t('projects.status.active'),
      description: t('projects.identity.desc'),
      highlights: [t('projects.identity.h1'), t('projects.identity.h2'), t('projects.identity.h3'), t('projects.identity.h4')],
    },
  ]

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden"
      style={{ background:'linear-gradient(180deg, #07111d 0%, #06101a 100%)' }}>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(0,229,204,1) 1px, transparent 1px),linear-gradient(90deg, rgba(0,229,204,1) 1px, transparent 1px)', backgroundSize:'80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div initial={{ opacity:0, y:36 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}>
          <SectionLabel label={t('projects.label')} title={t('projects.title')} subtitle={t('projects.subtitle')} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {projects.map((p,i) => <Card3D key={p.title} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}
