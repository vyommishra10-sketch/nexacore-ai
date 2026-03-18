import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techs = [
  { name: 'React.js', icon: '⚛️', color: '#F97316', category: 'Frontend' },
  { name: 'Vite', icon: '⚡', color: '#FBBF24', category: 'Build Tool' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#F97316', category: 'Styling' },
  { name: 'GSAP', icon: '🎬', color: '#FBBF24', category: 'Animation' },
  { name: 'Three.js', icon: '🌐', color: '#F97316', category: '3D / WebGL' },
  { name: 'Framer Motion', icon: '🎭', color: '#FBBF24', category: 'Animation' },
  { name: 'React Router', icon: '🔀', color: '#F97316', category: 'Routing' },
  { name: 'React Three Fiber', icon: '🧊', color: '#FBBF24', category: '3D / WebGL' },
]

function TechItem({ name, icon, color, category }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#160C00' : '#0F0800',
        borderTop: `2px solid ${hovered ? color : 'rgba(249,115,22,0.2)'}`,
        borderLeft: '1px solid rgba(249,115,22,0.1)',
        borderRight: '1px solid rgba(249,115,22,0.1)',
        borderBottom: '1px solid rgba(249,115,22,0.1)',
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        cursor: 'none',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 25px ${color}22` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <span style={{
        fontSize: '2.2rem',
        filter: hovered ? `drop-shadow(0 0 10px ${color})` : 'none',
        transition: 'filter 0.3s ease',
      }}>{icon}</span>
      <span style={{
        color: hovered ? color : '#6B6058',
        fontSize: '0.85rem',
        fontWeight: '600',
        fontFamily: 'Rajdhani, sans-serif',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        transition: 'color 0.3s ease',
      }}>{name}</span>
      <span style={{
        color: 'rgba(249,115,22,0.4)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        fontFamily: 'Rajdhani, sans-serif',
      }}>{category}</span>
    </div>
  )
}

export default function TechStack() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
    const items = itemsRef.current.filter(Boolean)
    gsap.set(items, { opacity: 0, scale: 0.8, y: 30 })
    gsap.to(items, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section className="section-base" id="techstack" ref={sectionRef}
      style={{ minHeight: '100vh' }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '5%',
        width: '90%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative' }}>

        {/* Header */}
        <div ref={headingRef}>
          <p style={{
            color: '#F97316', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '12px', fontFamily: 'Rajdhani, sans-serif',
          }}>BUILT WITH</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700, marginBottom: '16px',
            textTransform: 'uppercase',
          }}>Our <span style={{ color: '#F97316' }}>Technology</span> Stack</h2>
          <p style={{
            color: '#6B6058', maxWidth: '500px',
            marginBottom: '60px', fontSize: '0.95rem',
          }}>
            Every tool chosen for performance, scalability, and delivering cinematic experiences.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {techs.map((tech, i) => (
            <div key={i} ref={el => itemsRef.current[i] = el}>
              <TechItem {...tech} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}