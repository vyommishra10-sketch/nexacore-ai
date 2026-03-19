import { useState } from 'react'

export default function ServiceCard({ number, title, description }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #160C00, #0F0800)'
          : '#0F0800',
        borderTop: `2px solid ${hovered ? '#F97316' : 'rgba(249,115,22,0.3)'}`,
        borderLeft: '1px solid rgba(249,115,22,0.1)',
        borderRight: '1px solid rgba(249,115,22,0.1)',
        borderBottom: '1px solid rgba(249,115,22,0.1)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
        padding: '32px 28px',
        cursor: 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 0 40px rgba(249,115,22,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: '220px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight effect */}
      <div style={{
        position: 'absolute',
        top: '-60px', right: '-60px',
        width: '150px', height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.08), transparent)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Number + arrow row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <span style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          fontFamily: 'Rajdhani, sans-serif',
          color: hovered ? 'rgba(249,115,22,0.25)' : 'rgba(249,115,22,0.08)',
          transition: 'color 0.4s ease',
          lineHeight: 1,
        }}>{number}</span>
        <span style={{
          color: '#F97316',
          fontSize: '1.2rem',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translate(0,0)' : 'translate(-8px, 8px)',
          transition: 'all 0.4s ease',
        }}>↗</span>
      </div>

      {/* Animated divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, #F97316, transparent)',
        width: hovered ? '100%' : '30%',
        transition: 'width 0.4s ease',
      }} />

      {/* Title */}
      <h3 style={{
        color: hovered ? '#F97316' : '#F5F0EB',
        fontSize: '1.1rem',
        fontWeight: '700',
        fontFamily: 'Rajdhani, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        transition: 'color 0.4s ease',
        margin: 0,
      }}>{title}</h3>

      {/* Description */}
      <p style={{
        color: hovered ? '#F5F0EB' : '#6B6058',
        fontSize: '0.88rem',
        lineHeight: '1.7',
        transition: 'color 0.4s ease',
        flex: 1,
        margin: 0,
      }}>{description}</p>

      {/* Bottom tag */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#F97316',
          boxShadow: '0 0 8px #F97316',
        }} />
        <span style={{
          color: '#F97316',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: 'Rajdhani, sans-serif',
        }}>Learn More</span>
      </div>

    </div>
  )
}