import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG, ok } from '../data.js'

export const Reveal = ({ children, className = '', ...r }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }} {...r}>{children}</motion.div>
)

export const About = () => (
  <section className="sec" id="about"><div className="w about">
    <Reveal><h2>Curious by nature.<br />Engineer by choice.</h2></Reveal>
    <Reveal>
      <p>I’m a Computer Engineering student who enjoys exploring AI/ML, building software applications and solving technical problems. I like projects where data, code and design meet, from recommendation systems to voice-driven tools.</p>
      <p>I also care about software quality: testing, debugging and making sure what I build works across browsers and devices.</p>
      <div className="facts"><div><span>Studying</span>B.E. Computer Engineering</div><div><span>CGPA</span>9.19</div><div><span>Graduating</span>2027</div><div><span>Based in</span>Nashik, India</div></div>
    </Reveal>
  </div></section>
)

export const Experience = () => (
  <section className="sec" id="experience"><div className="w">
    <h2>Learning by building.</h2>
    <p className="sub">Practical development experience, collaboration, and continuous learning.</p>
    <Reveal className="tl"><h3>AI/ML Intern</h3>
      <p className="m">NetLeap IT Training and Solutions · Nashik, Maharashtra · {CONFIG.period}</p>
      <ul><li>Backend development using Python and Flask.</li><li>REST API integration and validation.</li><li>Debugging, testing and application optimization.</li><li>Data preprocessing and data-quality validation.</li><li>Machine-learning workflows and model evaluation.</li><li>Collaboration using Git and GitHub.</li></ul>
    </Reveal>
  </div></section>
)

export const Education = () => (
  <section className="sec" id="education"><Reveal className="w edu">
    <div><h3>EDUCATION</h3><ul><li>B.E. in Computer Engineering<small>Pune Vidyarthi Griha’s College of Engineering &amp; S.S. Dhamankar Institute, Nashik · 2023–2027 · CGPA 9.19</small></li></ul>
      <h3 style={{ marginTop: '2rem' }}>LEADERSHIP</h3><ul><li>Event Coordinator<small>URECKON</small></li><li>Project Leader<small>Academic software projects</small></li></ul></div>
    <div><h3>CERTIFICATIONS</h3><ul><li>Foundations: Data, Data, Everywhere<small>Google, Coursera</small></li><li>Cloud Foundations<small>AWS Academy Graduate</small></li><li>Java in Depth</li></ul></div>
  </Reveal></section>
)

export const Links = () => (
  <section className="sec" id="links"><div className="w">
    <h2>Find me online.</h2><p className="sub">Explore my code, professional profile, and writing.</p>
    <div className="pl">{CONFIG.social.map(s => (
      <motion.a key={s.n} whileHover={{ y: -4 }} href={s.u} {...(s.u.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <b>{s.n}</b><span>{s.u.replace('mailto:', '')}</span></motion.a>))}</div>
  </div></section>
)

export function Contact() {
  const [msg, setMsg] = useState('')
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONFIG.email); setMsg('Copied') } catch { setMsg('Select and copy manually') }
    setTimeout(() => setMsg(''), 2000)
  }
  return (
    <section className="sec contact" id="contact"><Reveal className="w">
      <h2>Have an interesting <span className="g">problem</span> to solve?</h2>
      <p className="sub">I’m always interested in connecting with people who build, experiment, and think differently.</p>
      <div className="mail"><a className="e" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        <button className="btn" onClick={copy}>Copy email</button><span role="status" style={{ color: 'var(--cy)' }}>{msg}</span></div>
    </Reveal></section>
  )
}

export const Footer = () => (
  <div className="w"><footer><span>Designed with curiosity. Built with code.</span><span>© {new Date().getFullYear()} Shraddha Deepak Gangurde</span></footer></div>
)
