import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { INDUSTRIES } from '../constants'

gsap.registerPlugin(ScrollTrigger)

export default function Industries() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ind-title', { opacity:0, y:30 }, {
        opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 75%' }
      })
      gsap.fromTo('.ind-item', { opacity:0, x:-20 }, {
        opacity:1, x:0, duration:0.5, stagger:0.08, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 65%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="industries" ref={sectionRef} className="section-base">
      <div style={{
        position:'absolute', top:0, left:'5%', right:'5%', height:'1px',
        background:'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px' }}>
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'80px', alignItems:'center',
        }}>

          {/* LEFT */}
          <div className="ind-title" style={{ opacity:0 }}>
            <div style={{
              color:'#F97316', fontSize:'0.7rem', fontWeight:700,
              letterSpacing:'0.25em', textTransform:'uppercase',
              marginBottom:'16px', fontFamily:"'Rajdhani', sans-serif",
              display:'flex', alignItems:'center', gap:'12px',
            }}>
              <span style={{ width:'30px', height:'1px', background:'#F97316', display:'inline-block' }} />
              Industries Served
            </div>
            <h2 style={{
              fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
              fontSize:'clamp(2.5rem,5vw,4rem)', color:'#F5F0EB',
              letterSpacing:'0.02em', textTransform:'uppercase',
              marginBottom:'28px',
            }}>
              Every Sector. <span style={{ color:'#F97316' }}>One Platform.</span>
            </h2>
            <p style={{
              color:'rgba(245,240,235,0.38)', fontSize:'1rem',
              lineHeight:1.9, fontFamily:'Inter, sans-serif', fontWeight:300,
              maxWidth:'440px',
            }}>
              NexaCore AI delivers intelligence across the most demanding
              industries on the planet. Our solutions adapt to any sector,
              any scale, any challenge.
            </p>

            {/* Big number */}
            <div style={{ marginTop:'48px', display:'flex', gap:'40px' }}>
              {[['8+','Industries'],['40+','Countries'],['500+','Deployments']].map(([v,l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                    fontSize:'2rem', color:'#F97316', lineHeight:1, marginBottom:'4px',
                  }}>{v}</div>
                  <div style={{
                    fontSize:'0.65rem', color:'rgba(245,240,235,0.3)',
                    letterSpacing:'0.12em', textTransform:'uppercase',
                    fontFamily:"'Rajdhani', sans-serif",
                  }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Industry list */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={ind} className="ind-item" style={{
                opacity:0, padding:'20px 24px',
                background:'#0F0800',
                border:'1px solid rgba(249,115,22,0.06)',
                display:'flex', alignItems:'center',
                justifyContent:'space-between',
                transition:'all 0.3s ease', cursor:'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#160C00'
                e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'
                e.currentTarget.style.paddingLeft = '32px'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F0800'
                e.currentTarget.style.borderColor = 'rgba(249,115,22,0.06)'
                e.currentTarget.style.paddingLeft = '24px'
              }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                  <span style={{
                    fontFamily:"'Rajdhani', sans-serif", fontSize:'0.7rem',
                    color:'rgba(249,115,22,0.4)', fontWeight:600,
                    letterSpacing:'0.1em',
                  }}>
                    {String(i+1).padStart(2,'0')}
                  </span>
                  <span style={{
                    fontFamily:"'Rajdhani', sans-serif", fontWeight:600,
                    fontSize:'1rem', color:'#F5F0EB',
                    letterSpacing:'0.06em', textTransform:'uppercase',
                  }}>
                    {ind}
                  </span>
                </div>
                <span style={{ color:'rgba(249,115,22,0.4)', fontSize:'0.9rem' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}