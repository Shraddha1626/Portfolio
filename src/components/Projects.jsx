import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, PV, ok } from '../data.js'

const FILTERS = { All: () => true, 'AI & Data': p => /AI|Intelligence|Data/.test(p.c), 'Web & Full-Stack': p => /Web|Full-Stack/.test(p.c) }

function Card({ p, i }) {
  const [open, setOpen] = useState(false)
  const tilt = e => {
    if (!matchMedia('(hover:hover)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const c = e.currentTarget, pv = c.querySelector('.pv'), r = pv.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    pv.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.03)`
    const b = c.getBoundingClientRect()
    c.style.setProperty('--mx', e.clientX - b.left + 'px'); c.style.setProperty('--my', e.clientY - b.top + 'px')
  }
  return (
    <motion.article layout className="card" onPointerMove={tilt} onPointerLeave={e => (e.currentTarget.querySelector('.pv').style.transform = '')}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
      <div className={`pv ${p.v}`} role="img" aria-label={`Illustrative preview of ${p.t}`} dangerouslySetInnerHTML={{ __html: PV[p.v]() }} />
      <div>
        <p className="cat">{p.c}</p>
        <h3>{p.t}</h3>
        <p>{p.d}</p>
        <ul className="tech">{p.s.map(x => <li key={x}>{x}</li>)}</ul>
        <div className="acts">
          <button className="btn" aria-expanded={open} aria-controls={`m${i}`} onClick={() => setOpen(o => !o)}>{open ? 'Hide details' : 'Details'}</button>
          {ok(p.live) && <a className="btn p" href={p.live} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>}
          {ok(p.gh) && <a className="btn" href={p.gh} target="_blank" rel="noopener noreferrer">View GitHub ↗</a>}
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={`m${i}`} className="more" style={{ display: 'block', overflow: 'hidden' }}
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              <b>Category:</b> {p.c}<br /><b>Stack:</b> {p.s.join(', ')}<br />Preview above is an illustration, not a screenshot.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [f, setF] = useState('All')
  const list = CONFIG.projects.filter(FILTERS[f])
  return (
    <section className="sec" id="projects"><div className="w">
      <h2>Selected work.</h2>
      <p className="sub">Ranked from most technically involved to more focused web projects.</p>
      <div className="filters" role="group" aria-label="Filter projects">
        {Object.keys(FILTERS).map(k => <button key={k} aria-pressed={f === k} onClick={() => setF(k)}>{k}</button>)}
      </div>
      <div id="plist"><AnimatePresence mode="popLayout">{list.map((p, i) => <Card key={p.t} p={p} i={i} />)}</AnimatePresence></div>
    </div></section>
  )
}
