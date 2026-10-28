import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Palette({ commands, onClose }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const ref = useRef(null)
  const list = useMemo(() => commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase())), [q, commands])
  useEffect(() => { ref.current?.focus() }, [])
  const run = c => { if (!c) return; onClose(); c.run() }
  const key = e => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter') run(list[sel])
  }
  return (
    <div className="pal-bg" onMouseDown={onClose}>
      <motion.div className="pal" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={e => e.stopPropagation()}
        initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <input ref={ref} value={q} onChange={e => { setQ(e.target.value); setSel(0) }} onKeyDown={key} placeholder="Jump to a section or run a command…" aria-label="Search commands" />
        <ul role="listbox">
          {list.map((c, i) => <li key={c.label} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>{c.label}<span>{c.hint}</span></li>)}
          {!list.length && <li>No results</li>}
        </ul>
      </motion.div>
    </div>
  )
}
