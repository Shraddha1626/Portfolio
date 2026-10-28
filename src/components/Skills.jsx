import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG, ic } from '../data.js'

export default function Skills() {
  const names = Object.keys(CONFIG.skills)
  const [n, setN] = useState(names[0])
  return (
    <section className="sec" id="skills"><div className="w">
      <h2>My toolkit.</h2>
      <p className="sub">Grouped by what I use them for.</p>
      <div className="tabs" role="tablist" aria-label="Skill categories">
        {names.map(x => (
          <button key={x} role="tab" aria-selected={n === x} onClick={() => setN(x)}>
            {n === x && <motion.span layoutId="tab" className="ul" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}{x}
          </button>
        ))}
      </div>
      <div className="skills" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={n} style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem' }}
            initial="h" animate="s" exit={{ opacity: 0 }} variants={{ s: { transition: { staggerChildren: 0.05 } } }}>
            {CONFIG.skills[n].map(s => (
              <motion.span key={s} whileHover={{ y: -3 }} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }}
                dangerouslySetInnerHTML={{ __html: ic(s) + s }} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div></section>
  )
}
