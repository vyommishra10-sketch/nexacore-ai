import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CAPABILITIES } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const icons = ['◈', '⬡', '◎', '⬟']

export default function Capabilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cap-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
      gsap.fromTo('.cap-title', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="capabilities" ref={sectionRef} className="section-base">
      <div style={{
        position: 'absolute', top: 0, left: '5%', right: '5%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div className="cap-title" style={{ textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
          <div style={{
            color: '#F97316', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            marginBottom: '16px', fontFamily: "'Rajdhani', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <span style={{ width: '30px', height: '1px', background: '#F97316', display: 'inline-block' }} />
            Core Capabilities
            <span style={{ width: '30px', height: '1px', background: '#F97316', display: 'inline-block' }} />
          </div>
          <h2 style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#F5F0EB',
            letterSpacing: '0.02em', textTransform: 'uppercase',
          }}>
            Technology That <span style={{ color: '#F97316' }}>Transforms</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2px',
        }}>
          {CAPABILITIES.map((cap, i) => (
            <div key={cap.title} className="cap-card" style={{
              opacity: 0, background: '#0F0800',
              padding: '48px 36px', position: 'relative',
              overflow: 'hidden', transition: 'background 0.3s ease',
              border: '1px solid rgba(249,115,22,0.08)',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#160C00'
              e.currentTarget.querySelector('.cap-line').style.transform = 'scaleX(1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0F0800'
              e.currentTarget.querySelector('.cap-line').style.transform = 'scaleX(0)'
            }}
            >
              {/* Number */}
              <div style={{
                position: 'absolute', top: '24px', right: '24px',
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                fontSize: '4rem', color: 'rgba(249,115,22,0.06)',
                lineHeight: 1,
              }}>
                {String(i+1).padStart(2,'0')}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: '1.8rem', color: '#F97316',
                marginBottom: '24px', lineHeight: 1,
              }}>
                {icons[i]}
              </div>

              {/* Bottom line */}
              <div className="cap-line" style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, #F97316, #FBBF24)',
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.4s ease',
              }} />

              <h3 style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                fontSize: '1.4rem', color: '#F5F0EB',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                {cap.title}
              </h3>
              <p style={{
                color: 'rgba(245,240,235,0.4)', fontSize: '0.9rem',
                lineHeight: 1.8, fontFamily: 'Inter, sans-serif', fontWeight: 300,
              }}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}