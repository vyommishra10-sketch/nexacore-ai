import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CASE_STUDIES } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudies() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cs-title', { opacity:0, y:30 }, {
        opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 75%' }
      })
      gsap.fromTo('.cs-card', { opacity:0, y:60 }, {
        opacity:1, y:0, duration:0.8, stagger:0.2, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 65%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="case-studies" ref={sectionRef} className="section-base"
      style={{ background:'#060606' }}>
      <div style={{
        position:'absolute', top:0, left:'5%', right:'5%', height:'1px',
        background:'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px' }}>

        {/* Header */}
        <div className="cs-title" style={{ textAlign:'center', marginBottom:'72px', opacity:0 }}>
          <div style={{
            color:'#F97316', fontSize:'0.7rem', fontWeight:700,
            letterSpacing:'0.25em', textTransform:'uppercase',
            marginBottom:'16px', fontFamily:"'Rajdhani', sans-serif",
            display:'flex', alignItems:'center', justifyContent:'center', gap:'12px',
          }}>
            <span style={{ width:'30px', height:'1px', background:'#F97316', display:'inline-block' }} />
            Case Studies
            <span style={{ width:'30px', height:'1px', background:'#F97316', display:'inline-block' }} />
          </div>
          <h2 style={{
            fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
            fontSize:'clamp(2.5rem,5vw,4rem)', color:'#F5F0EB',
            letterSpacing:'0.02em', textTransform:'uppercase',
          }}>
            Results That <span style={{ color:'#F97316' }}>Speak</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))',
          gap:'2px',
        }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.title} className="cs-card" style={{
              opacity:0, background:'#0F0800',
              padding:'48px 40px', position:'relative',
              overflow:'hidden', cursor:'none',
              transition:'background 0.3s ease',
              border:'1px solid rgba(249,115,22,0.06)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#160C00'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0F0800'}
            >
              {/* Top accent */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'2px',
                background:`linear-gradient(90deg, #F97316, ${i===1 ? '#FBBF24' : '#EA580C'}, transparent)`,
              }} />

              {/* Tag */}
              <div style={{
                display:'inline-block', padding:'4px 12px',
                border:'1px solid rgba(249,115,22,0.3)',
                color:'#F97316', fontSize:'0.65rem',
                fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                letterSpacing:'0.15em', textTransform:'uppercase',
                marginBottom:'32px',
              }}>
                {cs.tag}
              </div>

              {/* Client */}
              <div style={{
                color:'rgba(245,240,235,0.3)', fontSize:'0.75rem',
                fontFamily:"'Rajdhani', sans-serif", letterSpacing:'0.12em',
                textTransform:'uppercase', marginBottom:'12px', fontWeight:600,
              }}>
                {cs.client}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                fontSize:'1.5rem', color:'#F5F0EB',
                letterSpacing:'0.02em', textTransform:'uppercase',
                marginBottom:'28px', lineHeight:1.2,
              }}>
                {cs.title}
              </h3>

              {/* Divider */}
              <div style={{
                width:'40px', height:'1px', marginBottom:'24px',
                background:'linear-gradient(90deg, #F97316, transparent)',
              }} />

              {/* Result */}
              <div style={{
                background:'rgba(249,115,22,0.06)',
                border:'1px solid rgba(249,115,22,0.15)',
                padding:'16px 20px',
              }}>
                <div style={{
                  color:'rgba(245,240,235,0.4)', fontSize:'0.65rem',
                  fontFamily:"'Rajdhani', sans-serif", letterSpacing:'0.15em',
                  textTransform:'uppercase', marginBottom:'6px',
                }}>
                  Result
                </div>
                <div style={{
                  color:'#F97316', fontSize:'1.1rem',
                  fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                  letterSpacing:'0.02em',
                }}>
                  {cs.result}
                </div>
              </div>

              {/* BG number */}
              <div style={{
                position:'absolute', bottom:'-10px', right:'20px',
                fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                fontSize:'8rem', color:'rgba(249,115,22,0.03)',
                lineHeight:1, pointerEvents:'none',
              }}>
                {String(i+1).padStart(2,'0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}