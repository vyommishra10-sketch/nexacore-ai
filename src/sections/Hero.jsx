import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const canvasRef   = useRef(null)
  const outerCursor = useRef(null)
  const innerCursor = useRef(null)
  const mouseRef    = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    })

    const embers = Array.from({ length: 120 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    -(Math.random() * 0.8 + 0.3),
      r:     Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.1,
      rgb:   Math.random() > 0.5 ? '249,115,22' : Math.random() > 0.5 ? '251,191,36' : '234,88,12',
    }))

    const nodes = Array.from({ length: 40 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach((n) => {
        const dx = mouseRef.current.x - n.x
        const dy = mouseRef.current.y - n.y
        const d  = Math.sqrt(dx*dx + dy*dy)
        if (d < 150) { n.vx += dx/d*0.015; n.vy += dy/d*0.015 }
        n.vx *= 0.98; n.vy *= 0.98
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(249,115,22,${(1-d/130)*0.15})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }
      embers.forEach((e) => {
        const dx = mouseRef.current.x - e.x
        const dy = mouseRef.current.y - e.y
        const d  = Math.sqrt(dx*dx + dy*dy)
        if (d < 100) { e.vx += (dx/d)*0.05; e.vy += (dy/d)*0.05 }
        e.x     += e.vx + Math.sin(Date.now()*0.001 + e.y) * 0.3
        e.y     += e.vy
        e.alpha -= 0.002
        if (e.y < -10 || e.alpha <= 0) {
          e.x     = Math.random() * canvas.width
          e.y     = canvas.height + 10
          e.alpha = Math.random() * 0.7 + 0.1
          e.vy    = -(Math.random() * 0.8 + 0.3)
        }
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${e.rgb},${e.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    const outer = outerCursor.current
    const inner = innerCursor.current
    let cx = 0, cy = 0, ox = 0, oy = 0
    const move = (e) => {
      cx = e.clientX; cy = e.clientY
      inner.style.left = cx + 'px'
      inner.style.top  = cy + 'px'
    }
    const loop = () => {
      ox += (cx-ox)*0.1; oy += (cy-oy)*0.1
      outer.style.left = ox + 'px'
      outer.style.top  = oy + 'px'
      requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => outer.classList.add('hovered'))
      el.addEventListener('mouseleave', () => outer.classList.remove('hovered'))
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    gsap.fromTo('.h-tag',  { opacity:0 },       { opacity:1, duration:1, delay:0.2, ease:'power3.out' })
    gsap.fromTo('.h-l1',   { y:80, opacity:0 }, { y:0, opacity:1, duration:1.1, delay:0.4, ease:'power4.out' })
    gsap.fromTo('.h-l2',   { y:80, opacity:0 }, { y:0, opacity:1, duration:1.1, delay:0.55, ease:'power4.out' })
    gsap.fromTo('.h-div',  { scaleX:0 },        { scaleX:1, duration:0.8, delay:0.9, ease:'power3.out', transformOrigin:'center' })
    gsap.fromTo('.h-sub',  { opacity:0, y:20 }, { opacity:1, y:0, duration:0.9, delay:1.0, ease:'power3.out' })
    gsap.fromTo('.h-cta',  { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:1.2, ease:'power3.out' })
    gsap.fromTo('.h-stat', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:1.4, stagger:0.1, ease:'power3.out' })
  }, [])

  return (
    <>
      <div ref={outerCursor} className="cursor-outer" />
      <div ref={innerCursor} className="cursor-inner" />

      <section id="hero" style={{
        position:'relative', height:'100vh', minHeight:'700px',
        display:'flex', alignItems:'center', justifyContent:'center',
        overflow:'hidden', background:'#080808',
      }}>
        <canvas ref={canvasRef} style={{
          position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0,
        }} />

        <div style={{
          position:'absolute', inset:0, zIndex:1,
          background:'radial-gradient(ellipse at center, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.92) 100%)',
        }} />
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:'35%', zIndex:1,
          background:'linear-gradient(to top, #080808, transparent)',
        }} />

        {/* Top orange line */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'2px', zIndex:2,
          background:'linear-gradient(90deg, transparent, #F97316, transparent)',
        }} />

        {/* Corner accents */}
        <div style={{ position:'absolute', top:0, left:0, width:'80px', height:'80px', zIndex:2, borderTop:'1px solid rgba(249,115,22,0.4)', borderLeft:'1px solid rgba(249,115,22,0.4)' }} />
        <div style={{ position:'absolute', top:0, right:0, width:'80px', height:'80px', zIndex:2, borderTop:'1px solid rgba(249,115,22,0.4)', borderRight:'1px solid rgba(249,115,22,0.4)' }} />
        <div style={{ position:'absolute', bottom:0, left:0, width:'80px', height:'80px', zIndex:2, borderBottom:'1px solid rgba(249,115,22,0.4)', borderLeft:'1px solid rgba(249,115,22,0.4)' }} />
        <div style={{ position:'absolute', bottom:0, right:0, width:'80px', height:'80px', zIndex:2, borderBottom:'1px solid rgba(249,115,22,0.4)', borderRight:'1px solid rgba(249,115,22,0.4)' }} />

        {/* Center glow */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          width:'800px', height:'400px', zIndex:1, pointerEvents:'none',
          background:'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)',
        }} />

        {/* Content — CENTERED */}
        <div style={{
          position:'relative', zIndex:3,
          padding:'0 clamp(24px, 6vw, 80px)',
          maxWidth:'1100px', width:'100%',
          textAlign:'center',
        }}>

          {/* Tag */}
          <div className="h-tag" style={{
            display:'inline-flex', alignItems:'center', gap:'12px',
            marginBottom:'40px', opacity:0,
          }}>
            <span style={{ width:'30px', height:'1px', background:'rgba(249,115,22,0.5)', display:'inline-block' }} />
            <span style={{
              color:'rgba(245,240,235,0.35)', fontSize:'0.7rem',
              fontFamily:"'Rajdhani', sans-serif", letterSpacing:'0.22em',
              textTransform:'uppercase', fontWeight:600,
            }}>
              AI &middot; Digital Transformation &middot; Enterprise Software
            </span>
            <span style={{ width:'30px', height:'1px', background:'rgba(249,115,22,0.5)', display:'inline-block' }} />
          </div>

          {/* NEXACORE */}
          <div style={{ overflow:'hidden', marginBottom:'8px' }}>
            <div className="h-l1" style={{
              fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
              fontSize:'clamp(4.5rem,12vw,11rem)', lineHeight:0.9,
              letterSpacing:'0.02em', color:'#F5F0EB', opacity:0,
            }}>
              NEXA<span style={{ color:'#F97316' }}>CORE</span>
            </div>
          </div>

          {/* Artificial Intelligence */}
          <div style={{ overflow:'hidden', marginBottom:'32px' }}>
            <div className="h-l2" style={{
              fontFamily:"'Rajdhani', sans-serif", fontWeight:300,
              fontSize:'clamp(1.2rem,3.5vw,3.5rem)', lineHeight:1,
              color:'rgba(245,240,235,0.18)', letterSpacing:'0.3em',
              textTransform:'uppercase', opacity:0,
            }}>
              Artificial Intelligence
            </div>
          </div>

          {/* Divider — centered */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'28px' }}>
            <div className="h-div" style={{
              width:'80px', height:'1px',
              background:'linear-gradient(90deg, transparent, #F97316, #FBBF24, transparent)',
            }} />
          </div>

          {/* Subtitle */}
          <p className="h-sub" style={{
            color:'rgba(245,240,235,0.38)',
            fontSize:'clamp(0.9rem,1.4vw,1.05rem)',
            maxWidth:'520px', margin:'0 auto 44px', lineHeight:1.9,
            fontFamily:'Inter, sans-serif', fontWeight:300, opacity:0,
          }}>
            We build the AI infrastructure that powers the most ambitious
            enterprises on the planet. Strategy. Engineering. Transformation.
          </p>

          {/* CTAs */}
          <div className="h-cta" style={{
            display:'flex', gap:'14px', alignItems:'center',
            justifyContent:'center', flexWrap:'wrap',
            opacity:0, marginBottom:'72px',
          }}>
            <a href="#about" className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior:'smooth' }) }}>
              Explore NexaCore &rarr;
            </a>
            <a href="#case-studies" className="btn-secondary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#case-studies')?.scrollIntoView({ behavior:'smooth' }) }}>
              View Our Work
            </a>
          </div>

          {/* Stats */}
          <div style={{
            borderTop:'1px solid rgba(249,115,22,0.1)',
            paddingTop:'28px', display:'flex', gap:'48px',
            flexWrap:'wrap', justifyContent:'center',
          }}>
            {[['200+','Enterprise Clients'],['50+','AI Projects'],['8','Years'],['98%','Retention']].map(([v,l]) => (
              <div key={l} className="h-stat" style={{ opacity:0, textAlign:'center' }}>
                <div style={{
                  fontFamily:"'Rajdhani', sans-serif", fontWeight:700,
                  fontSize:'1.8rem', color:'#F97316', lineHeight:1, marginBottom:'4px',
                }}>{v}</div>
                <div style={{
                  fontSize:'0.65rem', color:'rgba(245,240,235,0.28)',
                  letterSpacing:'0.14em', textTransform:'uppercase',
                  fontFamily:"'Rajdhani', sans-serif",
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll */}
        <div className="scroll-ind" style={{ zIndex:3 }}>
          <span style={{
            color:'rgba(249,115,22,0.35)', fontSize:'0.6rem',
            letterSpacing:'0.25em', fontFamily:"'Rajdhani', sans-serif",
          }}>SCROLL</span>
          <div style={{
            width:'1px', height:'40px',
            background:'linear-gradient(to bottom, #F97316, transparent)',
          }} />
        </div>
      </section>
    </>
  )
}