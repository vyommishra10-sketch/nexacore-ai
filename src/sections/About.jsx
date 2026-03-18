import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, COMPANY_MISSION } from '../constants'

gsap.registerPlugin(ScrollTrigger)

function StatCard({ stat }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = stat.value / (2000 / 16)
      const counter = setInterval(() => {
        start += step
        if (start >= stat.value) {
          el.textContent = stat.value + stat.suffix
          clearInterval(counter)
        } else {
          el.textContent = Math.floor(start) + stat.suffix
        }
      }, 16)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [stat])

  return (
    <div style={{
      background: '#0D0000',
      borderTop: '2px solid #F97316',
      borderLeft: '1px solid rgba(255,0,51,0.15)',
      padding: '28px 24px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
      cursor: 'none',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(255,0,51,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '60px', height: '60px',
        background: 'radial-gradient(circle at top right, rgba(255,0,51,0.15), transparent)',
        pointerEvents: 'none',
      }} />
      <div ref={numRef} style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: 'clamp(2.5rem,5vw,3.5rem)',
        fontWeight: 700, color: '#F97316',
        lineHeight: 1, marginBottom: '8px',
        textShadow: '0 0 20px rgba(255,0,51,0.5)',
      }}>
        0{stat.suffix}
      </div>
      <div style={{
        color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem',
        fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', fontFamily: "'Rajdhani', sans-serif",
      }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{
      padding: '120px 0', position: 'relative', background: '#0A0A0A',
    }}>
      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0, left: '5%', right: '5%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,0,51,0.4), transparent)',
      }} />

      {/* Background text watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20vw', fontWeight: 900, color: 'rgba(255,0,51,0.03)',
        fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.1em',
        pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
      }}>
        NEXACORE
      </div>

      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '80px', alignItems: 'center', position: 'relative',
      }}>

        {/* LEFT */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div style={{
            color: '#F97316', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            marginBottom: '20px', fontFamily: "'Rajdhani', sans-serif",
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: '30px', height: '1px', background: '#F97316', display: 'inline-block' }} />
            About NexaCore
          </div>

          <h2 style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(2.5rem,5vw,3.8rem)', fontWeight: 700,
            color: '#F0F0F0', lineHeight: 1.05, marginBottom: '28px',
            letterSpacing: '0.02em', textTransform: 'uppercase',
          }}>
            Built for the{' '}
            <span style={{ color: '#F97316' }}>
            AI ERA
            </span>
          </h2>

          <div style={{
            borderLeft: '3px solid #F97316', paddingLeft: '24px', marginBottom: '40px',
            background: 'linear-gradient(90deg, rgba(255,0,51,0.05), transparent)',
            padding: '20px 24px',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '1rem',
              lineHeight: 1.9, fontFamily: 'Inter, sans-serif',
            }}>
              {COMPANY_MISSION}
            </p>
          </div>

          <a href="#capabilities"
            onClick={(e) => { e.preventDefault(); document.querySelector('#capabilities')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              color: '#F97316', textDecoration: 'none',
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              transition: 'gap 0.2s ease', borderBottom: '1px solid rgba(255,0,51,0.3)',
              paddingBottom: '4px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.gap = '16px'}
            onMouseLeave={(e) => e.currentTarget.style.gap = '10px'}
          >
            Our Capabilities →
          </a>
        </div>

        {/* RIGHT — Stats */}
        <div ref={rightRef} style={{
          opacity: 0, display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: '16px',
        }}>
          {STATS.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
      </div>
    </section>
  )
}