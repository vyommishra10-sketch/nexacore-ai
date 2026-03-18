import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-left', { opacity:0, x:-50 }, {
        opacity:1, x:0, duration:1, ease:'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start:'top 75%' }
      })
      gsap.fromTo('.ct-right', { opacity:0, x:50 }, {
        opacity:1, x:0, duration:1, ease:'power3.out', delay:0.15,
        scrollTrigger: { trigger: sectionRef.current, start:'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputStyle = {
    width:'100%', padding:'14px 18px',
    background:'#0F0800', border:'1px solid rgba(249,115,22,0.2)',
    color:'#F5F0EB', fontFamily:'Inter, sans-serif', fontSize:'0.9rem',
    outline:'none', transition:'border-color 0.3s ease',
    marginBottom:'16px', cursor:'none',
  }

  return (
    <section id="contact" ref={sectionRef} className="section-base">
      <div style={{
        position:'absolute', top:0, left:'5%', right:'5%', height:'1px',
        background:'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      {/* Bottom footer line */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'2px',
        background:'linear-gradient(90deg, transparent, #F97316, transparent)',
      }} />

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 32px' }}>
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'80px', alignItems:'start',
        }}>

          {/* LEFT */}
          <div className="ct-left" style={{ opacity:0 }}>
            <div style={{
              color:'#F97316', fontSize:'0.7rem', fontWeight:700,
              letterSpacing:'0.25em', textTransform:'uppercase',
              marginBottom:'16px', fontFamily:"'Rajdhani', sans-serif",
              display:'flex', alignItems:'center', gap:'12px',
            }}>
              <span style={{ width:'30px', height:'1px', background:'#F97316', display:'inline-block' }} />
              Get In Touch
            </div>

            <h2 style={{
              fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
              fontSize:'clamp(2.5rem,5vw,4rem)', color:'#F5F0EB',
              letterSpacing:'0.02em', textTransform:'uppercase',
              marginBottom:'24px', lineHeight:1.05,
            }}>
              Ready to <span style={{ color:'#F97316' }}>Ignite</span> Your AI Journey?
            </h2>

            <p style={{
              color:'rgba(245,240,235,0.38)', fontSize:'1rem',
              lineHeight:1.9, fontFamily:'Inter, sans-serif',
              fontWeight:300, marginBottom:'48px', maxWidth:'420px',
            }}>
              Talk to our team. We will assess your needs and design
              a transformation roadmap built specifically for your enterprise.
            </p>

            {/* Contact details */}
            {[
              { label:'Email', value:'hello@nexacore.ai' },
              { label:'Phone', value:'+1 (800) NEXACORE' },
              { label:'HQ',    value:'San Francisco, CA' },
            ].map((item) => (
              <div key={item.label} style={{
                display:'flex', gap:'20px', alignItems:'center',
                marginBottom:'20px', paddingBottom:'20px',
                borderBottom:'1px solid rgba(249,115,22,0.08)',
              }}>
                <div style={{
                  color:'rgba(249,115,22,0.5)', fontSize:'0.65rem',
                  fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                  letterSpacing:'0.15em', textTransform:'uppercase',
                  minWidth:'50px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  color:'#F5F0EB', fontSize:'0.95rem',
                  fontFamily:'Inter, sans-serif', fontWeight:300,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Form */}
          <div className="ct-right" style={{
            opacity:0, background:'#0F0800',
            padding:'48px 40px',
            border:'1px solid rgba(249,115,22,0.1)',
            position:'relative',
          }}>
            {/* Top accent */}
            <div style={{
              position:'absolute', top:0, left:0, right:0, height:'2px',
              background:'linear-gradient(90deg, #F97316, #FBBF24, transparent)',
            }} />

            <h3 style={{
              fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
              fontSize:'1.5rem', color:'#F5F0EB',
              letterSpacing:'0.04em', textTransform:'uppercase',
              marginBottom:'32px',
            }}>
              Start a Conversation
            </h3>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <input
                style={{ ...inputStyle, marginBottom:0 }}
                placeholder="First Name"
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.2)'}
              />
              <input
                style={{ ...inputStyle, marginBottom:0 }}
                placeholder="Last Name"
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.2)'}
              />
            </div>

            <div style={{ height:'16px' }} />

            <input
              style={inputStyle}
              placeholder="Work Email"
              type="email"
              onFocus={(e) => e.target.style.borderColor = '#F97316'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.2)'}
            />
            <input
              style={inputStyle}
              placeholder="Company"
              onFocus={(e) => e.target.style.borderColor = '#F97316'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.2)'}
            />
            <textarea
              rows={4}
              style={{ ...inputStyle, resize:'none' }}
              placeholder="Tell us about your project..."
              onFocus={(e) => e.target.style.borderColor = '#F97316'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(249,115,22,0.2)'}
            />

            <button className="btn-primary" style={{ width:'100%', justifyContent:'center', border:'none' }}
              onClick={() => alert('Message sent! We will be in touch shortly.')}>
              Send Message →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop:'80px', paddingTop:'32px',
          borderTop:'1px solid rgba(249,115,22,0.08)',
          display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:'16px',
        }}>
          <div style={{
            fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
            fontSize:'1.2rem', color:'#F5F0EB',
          }}>
            NEXA<span style={{ color:'#F97316' }}>CORE</span>
            <span style={{ color:'rgba(245,240,235,0.3)', fontWeight:400, marginLeft:'8px', fontSize:'0.9rem' }}>AI</span>
          </div>
          <div style={{
            color:'rgba(245,240,235,0.25)', fontSize:'0.75rem',
            fontFamily:'Inter, sans-serif',
          }}>
            &copy; 2026 NexaCore AI. All rights reserved.
          </div>
          <div style={{ display:'flex', gap:'24px' }}>
            {['Privacy','Terms','Careers'].map((l) => (
              <span key={l} style={{
                color:'rgba(245,240,235,0.25)', fontSize:'0.75rem',
                fontFamily:"'Rajdhani', sans-serif", letterSpacing:'0.1em',
                textTransform:'uppercase', cursor:'none',
                transition:'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#F97316'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(245,240,235,0.25)'}
              >{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}