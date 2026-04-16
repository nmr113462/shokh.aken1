import { useEffect, useRef } from 'react'

interface P { x:number; y:number; vx:number; vy:number; r:number; a:number }

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const N = 90
    const ps: P[] = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.2 + 0.3,
      a:  Math.random() * 0.55 + 0.1,
    }))

    let id: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      }
      // teal connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.strokeStyle = `rgba(0,229,204,${0.08 * (1 - d/90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />
}
