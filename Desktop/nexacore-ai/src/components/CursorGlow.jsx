import { useState, useRef } from 'react'

export default function CapabilityCard3D({ icon, title, desc }) {
  const [flipped, setFlipped] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (flipped) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    setTilt({ x, y })
  }

  const handleMouseEnter = () => {
    setFlipped(true)
    setTilt({ x: 0, y: 0 })
  }

  const handleMouseLeave = () => {
    setFlipped(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px', width: '100%', height: '300px', cursor: 'none' }}
    >
      <div style={{
        position: 'relative',
        width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: flipped
          ? 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)'
          : 'transform 0.15s ease',
        transform: flipped
          ? 'rotateY(180deg)'
          : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}>

        {/* FRONT */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: '#0F0800',
          borderTop: '2px solid #F97316',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '20px',
          boxShadow: '0 0 30px rgba(249,115,22,0.1)',
        }}>
          {/* Shine */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(249,115,22,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 10px #F97316)' }}>
            {icon}
          </div>
          <h3 style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: '#F5F0EB', fontSize: '1.3rem',
            fontWeight: '700', textAlign: 'center',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '0 20px', margin: 0,
          }}>{title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '1px', background: '#F97316', opacity: 0.5 }} />
            <p style={{
              color: '#6B6058', fontSize: '0.7rem',
              letterSpacing: '0.15em', margin: 0,
            }}>HOVER TO EXPLORE</p>
            <div style={{ width: '20px', height: '1px', background: '#F97316', opacity: 0.5 }} />
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.12), #0F0800)',
          borderTop: '2px solid #FBBF24',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '28px', gap: '16px',
          boxShadow: '0 0 40px rgba(249,115,22,0.25)',
        }}>
          <div style={{ fontSize: '2.5rem' }}>{icon}</div>
          <h3 style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: '#F97316', fontSize: '1.1rem',
            fontWeight: '700', textAlign: 'center',
            textTransform: 'uppercase', margin: 0,
          }}>{title}</h3>
          <div style={{ width: '40px', height: '2px', background: '#F97316', borderRadius: '2px' }} />
          <p style={{
            color: '#F5F0EB', fontSize: '0.88rem',
            textAlign: 'center', lineHeight: '1.7', margin: 0,
          }}>{desc}</p>
        </div>

      </div>
    </div>
  )
}