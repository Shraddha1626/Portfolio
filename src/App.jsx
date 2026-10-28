import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { CONFIG, ok } from './data.js'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Palette from './components/Palette.jsx'
import { About, Experience, Education, Links, Contact, Footer } from './components/Sections.jsx'

const NAV = ['about', 'projects', 'skills', 'experience']
const go = id => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' })

export default function App() {
  const [boot, setBoot] = useState(!matchMedia('(prefers-reduced-motion:reduce)').matches)
  const [menu, setMenu] = useState(false)
  const [pal, setPal] = useState(false)
  const [active, setActive] = useState('')
  const [top, setTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => { const t = setTimeout(() => setBoot(false), 900); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const on = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal(p => !p) } }
    const sc = () => setTop(scrollY > 600)
    addEventListener('keydown', on); addEventListener('scroll', sc, { passive: true })
    return () => { removeEventListener('keydown', on); removeEventListener('scroll', sc) }
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    NAV.forEach(id => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const r = document.documentElement.style
    const f = e => { r.setProperty('--px', e.clientX + 'px'); r.setProperty('--py', e.clientY + 'px') }
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) addEventListener('pointermove', f)
    return () => removeEventListener('pointermove', f)
  }, [])

  const commands = [
    ...['about', 'projects', 'skills', 'experience', 'education', 'contact'].map(id => ({ label: `Go to ${id[0].toUpperCase() + id.slice(1)}`, hint: 'Section', run: () => go(id) })),
    ...CONFIG.social.filter(s => ok(s.u)).map(s => ({ label: `Open ${s.n}`, hint: 'Link', run: () => (s.u.startsWith('http') ? window.open(s.u, '_blank', 'noopener') : (location.href = s.u)) })),
    { label: 'Copy email address', hint: 'Action', run: () => navigator.clipboard?.writeText(CONFIG.email) },
  ]

  return (
    <>
      <AnimatePresence>{boot && <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} aria-hidden="true"><motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>SHRADDHA<i>.</i></motion.span></motion.div>}</AnimatePresence>
      <div className="aur" aria-hidden="true" />
      <motion.div id="pg" style={{ scaleX: bar }} aria-hidden="true" />
      <header className="nav"><div className="w">
        <a className="logo" href="#home" aria-label="Shraddha, home">SHRADDHA<i>.</i></a>
        <button className="burger" aria-expanded={menu} aria-controls="lk" onClick={() => setMenu(m => !m)}>Menu</button>
        <nav className={'links' + (menu ? ' open' : '')} id="lk" aria-label="Main" onClick={e => e.target.tagName === 'A' && setMenu(false)}>
          {NAV.map(id => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{id[0].toUpperCase() + id.slice(1)}</a>)}
          <button className="kbd" onClick={() => setPal(true)} aria-label="Open command palette">Ctrl K</button>
          <a href="#contact" className="btn p">Let’s Connect</a>
        </nav>
      </div></header>
      <main id="home">
        <Hero />
        <div className="mq" aria-hidden="true"><div>{[0, 1].map(k => [...new Set(Object.values(CONFIG.skills).flat())].map(x => <span key={k + x}>{x}</span>))}</div></div>
        <About /><Projects /><Skills /><Experience /><Education /><Links /><Contact />
      </main>
      <Footer />
      <button id="top" className={top ? 'show' : ''} aria-label="Back to top" onClick={() => scrollTo({ top: 0 })}>↑</button>
      <AnimatePresence>{pal && <Palette commands={commands} onClose={() => setPal(false)} />}</AnimatePresence>
    </>
  )
}
