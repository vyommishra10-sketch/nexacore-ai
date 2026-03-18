import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-title', { opacity:0, y:30 }, {
        opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 75%' }
      })
      gsap.fromTo('.svc-card', { opacity:0, y:50 }, {
        opacity:1, y:0, duration:0.7, stagger:0.1, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 65%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section-base"
      style={{ background:'#060606' }}>
      <div style={{
        position:'absolute', top:0, left:'5%', right:'5%', height:'1px',
        background:'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px' }}>

        {/* Header */}
        <div className="svc-title" style={{ marginBottom:'72px', opacity:0 }}>
          <div style={{
            color:'#F97316', fontSize:'0.7rem', fontWeight:700,
            letterSpacing:'0.25em', textTransform:'uppercase',
            marginBottom:'16px', fontFamily:"'Rajdhani', sans-serif",
            display:'flex', alignItems:'center', gap:'12px',
          }}>
            <span style={{ width:'30px', height:'1px', background:'#F97316', display:'inline-block' }} />
            What We Do
          </div>
          <h2 style={{
            fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
            fontSize:'clamp(2.5rem,5vw,4rem)', color:'#F5F0EB',
            letterSpacing:'0.02em', textTransform:'uppercase',
            maxWidth:'600px',
          }}>
            Services Built for <span style={{ color:'#F97316' }}>Scale</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
          gap:'1px', background:'rgba(249,115,22,0.08)',
        }}>
          {SERVICES.map((svc, i) => (
            <div key={svc.title} className="svc-card" style={{
              opacity:0, background:'#060606', padding:'40px 32px',
              position:'relative', overflow:'hidden',
              transition:'background 0.3s ease', cursor:'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0F0800'
              e.currentTarget.querySelector('.svc-num').style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#060606'
              e.currentTarget.querySelector('.svc-num').style.opacity = '0.04'
            }}
            >
              {/* BG number */}
              <div className="svc-num" style={{
                position:'absolute', top:'16px', right:'20px',
                fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                fontSize:'5rem', color:'#F97316',
                lineHeight:1, opacity:'0.04',
                transition:'opacity 0.3s ease',
              }}>
                {String(i+1).padStart(2,'0')}
              </div>

              {/* Icon */}
              <div style={{
                fontSize:'2rem', marginBottom:'20px', lineHeight:1,
              }}>
                {svc.icon}
              </div>

              {/* Orange top accent on hover */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'2px',
                background:'linear-gradient(90deg, #F97316, transparent)',
                opacity: i === 0 ? 1 : 0,
              }} />

              <h3 style={{
                fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                fontSize:'1.25rem', color:'#F5F0EB',
                letterSpacing:'0.04em', textTransform:'uppercase',
                marginBottom:'12px',
              }}>
                {svc.title}
              </h3>
              <p style={{
                color:'rgba(245,240,235,0.38)', fontSize:'0.88rem',
                lineHeight:1.8, fontFamily:'Inter, sans-serif', fontWeight:300,
              }}>
                {svc.desc}
              </p>

              <div style={{
                marginTop:'24px', color:'#F97316', fontSize:'0.75rem',
                fontFamily:"'Rajdhani', sans-serif", fontWeight:600,
                letterSpacing:'0.12em', textTransform:'uppercase',
                display:'flex', alignItems:'center', gap:'8px',
                transition:'gap 0.2s ease',
              }}>
                Learn More →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}