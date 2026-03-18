import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Services',     href: '#services' },
  { label: 'Industries',   href: '#industries' },
  { label: 'Case Studies', href: '#casestudies' },
  { label: 'Contact',      href: '#contact' },
];

const SOCIALS = [
  { icon: '🔗', label: 'LinkedIn', href: '#' },
  { icon: '🐙', label: 'GitHub',   href: '#' },
  { icon: '🐦', label: 'Twitter',  href: '#' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <footer ref={footerRef} style={{
      background: '#030400',
      borderTop: '1px solid rgba(249,115,22,0.1)',
      padding: '60px clamp(24px, 6vw, 96px) 32px',
    }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; align-items: center; }
          .footer-links { align-items: center !important; }
          .footer-socials { justify-content: center !important; }
        }
        .footer-nav-link {
          color: var(--muted);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.1em;
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 4px 0;
        }
        .footer-nav-link:hover { color: var(--orange); }
        .footer-social-btn {
          display: flex; align-items: center; gap: 6px;
          color: var(--muted); font-family: 'Rajdhani', sans-serif;
          font-weight: 600; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-social-btn:hover { color: var(--orange); }
      `}</style>

      <div className="footer-grid">

        {/* LEFT — Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--white)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Nexa
            </span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--orange)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Core
            </span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, fontSize: '14px', color: 'var(--muted)', marginLeft: '6px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              AI
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.7, maxWidth: '280px' }}>
            The Future of Enterprise AI. Building intelligent solutions for the world's most ambitious companies.
          </p>
          {/* Socials */}
          <div className="footer-socials" style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} className="footer-social-btn">
                <span style={{ fontSize: '16px' }}>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* CENTER — Nav links */}
        <div>
          <p style={{ color: 'var(--orange)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Quick Links
          </p>
          <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_LINKS.map((link, i) => (
              <a key={i} href={link.href} className="footer-nav-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Contact info */}
        <div>
          <p style={{ color: 'var(--orange)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '📧', value: 'hello@nexacore.ai' },
              { icon: '📍', value: 'San Francisco, CA' },
              { icon: '📞', value: '+1 (415) 000-0000' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                <span style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(249,115,22,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
          © 2026 NexaCore AI. Built by <span style={{ color: 'var(--orange)' }}>Team Codepiece</span>.
        </span>
        <span style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.05em' }}>
          Webathon 3.0 · Special PS
        </span>
      </div>
    </footer>
  );
}