import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { CONFIG, ok } from '../data.js'

const reduce = () => window.matchMedia('(prefers-reduced-motion:reduce)').matches
const ROLES = ['AI/ML Developer', 'Full-Stack Developer', 'QA Engineer', 'Software Developer']
const WORDS = [['Building'], ['intelligent', 1], ['experiences'], ['through'], ['code', 1], ['&'], ['creativity.']]

function Typer() {
  const [txt, setTxt] = useState(reduce() ? ROLES[0] : '')
  useEffect(() => {
    if (reduce()) return
    let i = 0, n = 0, del = false, t
    const tick = () => {
      const r = ROLES[i]
      n += del ? -1 : 1
      setTxt(r.slice(0, n))
      let wait = del ? 35 : 70
      if (!del && n === r.length) { del = true; wait = 1400 }
      else if (del && n === 0) { del = false; i = (i + 1) % ROLES.length; wait = 300 }
      t = setTimeout(tick, wait)
    }
    t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [])
  return <p className="typer" aria-label={ROLES.join(', ')}>{txt}</p>
}

function Network() {
  const g = useRef(null)
  const { nodes, edges } = useMemo(() => {
    const nodes = Array.from({ length: 22 }, (_, i) => { const a = i * 2.4, r = 40 + ((i * 53) % 150); return [200 + Math.cos(a) * r, 200 + Math.sin(a) * r * 0.9] })
    const edges = []
    nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 85) edges.push([a, b]) }))
    return { nodes, edges }
  }, [])
  useEffect(() => {
    if (reduce()) return
    const f = e => { if (g.current) g.current.style.transform = `translate(${(e.clientX / innerWidth - 0.5) * 16}px,${(e.clientY / innerHeight - 0.5) * 16}px)` }
    addEventListener('pointermove', f)
    return () => removeEventListener('pointermove', f)
  }, [])
  return (
    <svg id="net" viewBox="0 0 400 400" role="img" aria-label="Abstract neural network graphic">
      <g ref={g}>
        {edges.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />)}
        {nodes.map((p, i) => <circle key={i} className={i % 5 ? '' : 'h'} cx={p[0]} cy={p[1]} r={i % 5 ? 4 : 7} />)}
      </g>
    </svg>
  )
}

function Count({ to, d = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(reduce() ? to : 0)
  useEffect(() => {
    if (!inView || reduce()) return
    const c = animate(0, to, { duration: 1.3, ease: 'easeOut', onUpdate: x => setV(x) })
    return () => c.stop()
  }, [inView, to])
  return <b ref={ref}>{d ? v.toFixed(d) : Math.round(v)}</b>
}

export default function Hero() {
  return (
    <div className="w hero" style={{ position: 'relative' }}>
      <div>
        <p className="tag">COMPUTER ENGINEERING · AI/ML · SOFTWARE DEVELOPMENT</p>
        <Typer />
        <h1>
          {WORDS.map(([w, hl], i) => (
            <motion.span key={i} className={hl ? 'g' : ''} style={{ display: 'inline-block', marginRight: '.25em' }}
              initial={{ opacity: 0, y: 40, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 120, damping: 16 }}>{w}</motion.span>
          ))}
        </h1>
        <p className="s">I’m Shraddha, a Computer Engineering student passionate about building intelligent applications, developing meaningful digital experiences, and creating reliable software.</p>
        <div className="cta">
          <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn p" href="#projects">Explore My Work →</motion.a>
          {ok(CONFIG.resume) && <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn" href={CONFIG.resume} download>Download Resume ↓</motion.a>}
        </div>
        <div className="meta"><span><i className="dot" />{CONFIG.status}</span><span>Nashik, India</span></div>
        <div className="stats">
          <div><Count to={9.19} d={2} /><span>CGPA</span></div>
          <div><b>2027</b><span>GRADUATING</span></div>
          <div><Count to={CONFIG.projects.length} /><span>PROJECTS</span></div>
        </div>
      </div>
      <Network />
      <span className="scroll" aria-hidden="true">Scroll ↓</span>
    </div>
  )
}
