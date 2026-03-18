import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../constants'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(8,8,8,0.98)' : 'rgba(8,8,8,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(249,115,22,0.1)',
        transition: 'all 0.3s ease',
      }}>
        {/* Orange top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #F97316, transparent)',
        }} />

        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 32px',
          height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              fontSize: '1.6rem', color: '#F5F0EB', letterSpacing: '0.06em',
            }}>NEXA</span>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
              fontSize: '1.6rem', color: '#F97316', letterSpacing: '0.06em',
            }}>CORE</span>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 400,
              fontSize: '1.0rem', color: 'rgba(245,240,235,0.3)', letterSpacing: '0.15em',
              marginLeft: '8px', borderLeft: '1px solid rgba(249,115,22,0.3)', paddingLeft: '8px',
            }}>AI</span>
          </a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}
            className="hidden md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  style={{
                    color: 'rgba(245,240,235,0.4)', textDecoration: 'none',
                    fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', transition: 'color 0.2s ease',
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#F97316'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(245,240,235,0.4)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                style={{
                  padding: '8px 24px',
                  border: '1px solid #F97316',
                  color: '#F97316', textDecoration: 'none',
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                  fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F97316'; e.currentTarget.style.color = '#080808' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F97316' }}
              >
                Get Started
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'none', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}
            className="md:hidden">
            {[0,1,2].map((i) => (
              <span key={i} style={{
                display: 'block', height: '2px', background: '#F97316',
                transition: 'all 0.3s ease',
                width: i === 1 ? '16px' : '24px',
                transform: menuOpen
                  ? i===0 ? 'rotate(45deg) translate(5px,5px)'
                  : i===1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(8,8,8,0.98)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '40px',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden',
      }} className="md:hidden">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            style={{
              color: '#F5F0EB', textDecoration: 'none', fontSize: '2.5rem',
              fontWeight: 700, fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = '#F97316'}
            onMouseLeave={(e) => e.target.style.color = '#F5F0EB'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}