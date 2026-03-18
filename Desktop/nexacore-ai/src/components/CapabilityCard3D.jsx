import { useState, useRef } from 'react'

export default function CapabilityCard3D({ icon, title, description, color, useCases, tools }) {
  const [flipped, setFlipped] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (flipped) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 14
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
    <>
      {/* Expanded Modal */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0F0800',
              border: `1px solid ${color}`,
              borderTop: `3px solid ${color}`,
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: `0 0 60px ${color}44`,
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'transparent', border: 'none',
                color: '#6B6058', fontSize: '1.2rem', cursor: 'none',
              }}
            >✕</button>

            {/* Icon + Title */}
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{icon}</div>
            <h3 style={{
              color: color, fontSize: '1.5rem',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700, marginBottom: '12px',
            }}>{title}</h3>
            <p style={{
              color: '#F5F0EB', fontSize: '0.95rem',
              lineHeight: 1.7, marginBottom: '24px',
            }}>{description}</p>

            {/* Use Cases */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{
                color: color, fontSize: '0.75rem',
                letterSpacing: '0.15em', marginBottom: '10px',
                fontFamily: 'Rajdhani, sans-serif',
              }}>USE CASES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {useCases.map((uc, i) => (
                  <span key={i} style={{
                    background: `${color}18`,
                    border: `1px solid ${color}44`,
                    color: '#F5F0EB',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                  }}>{uc}</span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p style={{
                color: color, fontSize: '0.75rem',
                letterSpacing: '0.15em', marginBottom: '10px',
                fontFamily: 'Rajdhani, sans-serif',
              }}>TOOLS & TECH</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tools.map((tool, i) => (
                  <span key={i} style={{
                    background: '#160C00',
                    border: '1px solid rgba(249,115,22,0.2)',
                    color: '#FBBF24',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}>{tool}</span>
                ))}
              </div>
            </div>

            {/* AI Processing animation */}
            <div style={{
              marginTop: '24px',
              padding: '12px 16px',
              background: '#080808',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#F97316',
            }}>
              <AIProcessing />
            </div>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
          width: '100%',
          height: '320px',
          cursor: 'none',
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transition: flipped
            ? 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)'
            : 'transform 0.1s ease',
          transform: flipped
            ? 'rotateY(180deg)'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}>

          {/* FRONT */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%',
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            background: '#0F0800',
            borderTop: `2px solid ${color}`,
            borderLeft: '1px solid rgba(249,115,22,0.15)',
            borderRight: '1px solid rgba(249,115,22,0.15)',
            borderBottom: '1px solid rgba(249,115,22,0.15)',
            borderRadius: '4px',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '20px',
            boxShadow: `0 0 30px ${color}18`,
          }}>
            <div style={{
              fontSize: '3.5rem',
              filter: `drop-shadow(0 0 12px ${color})`,
            }}>{icon}</div>
            <h3 style={{
              color: color, fontSize: '1.3rem',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700, textAlign: 'center',
              padding: '0 20px', margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>{title}</h3>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '20px', height: '1px', background: color, opacity: 0.5 }} />
              <p style={{
                color: '#6B6058', fontSize: '0.7rem',
                letterSpacing: '0.15em', margin: 0,
                fontFamily: 'Rajdhani, sans-serif',
              }}>HOVER TO EXPLORE</p>
              <div style={{ width: '20px', height: '1px', background: color, opacity: 0.5 }} />
            </div>
          </div>

          {/* BACK */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%',
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${color}15, #0F0800)`,
            borderTop: `2px solid ${color}`,
            border: `1px solid ${color}`,
            borderRadius: '4px',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '28px', gap: '14px',
            boxShadow: `0 0 40px ${color}33`,
          }}>
            <div style={{ fontSize: '2.5rem' }}>{icon}</div>
            <h3 style={{
              color: color, fontSize: '1.1rem',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700, textAlign: 'center',
              margin: 0, textTransform: 'uppercase',
            }}>{title}</h3>
            <div style={{
              width: '40px', height: '2px',
              background: color, borderRadius: '2px',
            }} />
            <p style={{
              color: '#F5F0EB', fontSize: '0.88rem',
              textAlign: 'center', lineHeight: '1.7', margin: 0,
            }}>{description}</p>
            <button
              onClick={() => setExpanded(true)}
              className="btn-primary"
              style={{ fontSize: '0.75rem', padding: '10px 24px', marginTop: '8px' }}
            >
              EXPLORE →
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

function AIProcessing() {
  const [step, setStep] = useState(0)
  const steps = [
    '> Initializing module...',
    '> Loading neural network...',
    '> Processing data streams...',
    '> Optimizing parameters...',
    '✔ System ready.',
  ]

  useEffect(() => {
    if (step >= steps.length - 1) return
    const t = setTimeout(() => setStep(s => s + 1), 600)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div>
      {steps.slice(0, step + 1).map((s, i) => (
        <div key={i} style={{
          color: i === step
            ? (s.startsWith('✔') ? '#FBBF24' : '#F97316')
            : '#6B6058',
          marginBottom: '4px',
        }}>{s}</div>
      ))}
    </div>
  )
}