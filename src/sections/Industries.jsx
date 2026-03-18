import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  { emoji: '🏥', name: 'Healthcare & MedTech',         descriptor: 'AI-powered diagnostics & patient data',   accent: '#F97316' },
  { emoji: '💹', name: 'Financial Services & FinTech', descriptor: 'Intelligent risk & trading systems',       accent: '#FBBF24' },
  { emoji: '🏭', name: 'Manufacturing & Industry 4.0', descriptor: 'Smart factories & predictive maintenance', accent: '#F97316' },
  { emoji: '🛒', name: 'Retail & E-Commerce',          descriptor: 'Hyper-personalised shopping experiences', accent: '#FBBF24' },
  { emoji: '⚡', name: 'Energy & Sustainability',       descriptor: 'Grid optimisation & carbon analytics',    accent: '#F97316' },
  { emoji: '🏛️', name: 'Government & Public Sector',  descriptor: 'Secure AI for citizen services',          accent: '#FBBF24' },
  { emoji: '🎓', name: 'Education & EdTech',            descriptor: 'Adaptive learning & outcomes AI',         accent: '#F97316' },
  { emoji: '🚚', name: 'Logistics & Supply Chain',      descriptor: 'Route intelligence & demand forecasting', accent: '#FBBF24' },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const rowRef     = useRef(null);
  const headingRef = useRef(null);

  /* drag-to-scroll */
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const down  = (e) => { isDown = true;  el.style.cursor = 'grabbing'; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const leave = ()  => { isDown = false; el.style.cursor = 'grab'; };
    const up    = ()  => { isDown = false; el.style.cursor = 'grab'; };
    const move  = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5; };
    el.addEventListener('mousedown',  down);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mouseup',    up);
    el.addEventListener('mousemove',  move);
    return () => {
      el.removeEventListener('mousedown',  down);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mouseup',    up);
      el.removeEventListener('mousemove',  move);
    };
  }, []);

  /* GSAP ScrollTrigger */
  useEffect(() => {
    const row     = rowRef.current;
    const heading = headingRef.current;
    if (!row || !heading) return;

    gsap.fromTo(heading,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

    gsap.fromTo(row,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="industries" ref={sectionRef} className="section-base" style={{ overflow: 'hidden' }}>
      <style>{`
        .ind-scroll::-webkit-scrollbar { display: none; }
        .ind-tile {
          min-width: 220px; height: 280px;
          background: var(--bg-card);
          border-top: 2px solid var(--orange);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          padding: 28px 22px;
          display: flex; flex-direction: column; justify-content: space-between;
          flex-shrink: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          user-select: none;
        }
        .ind-tile:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 0 32px rgba(249,115,22,0.2);
        }
        .ind-emoji { font-size: 38px; line-height: 1; }
        .ind-name  {
          color: var(--white);
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700; font-size: 15px;
          text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.3;
        }
        .ind-bar  { width: 28px; height: 2px; border-radius: 2px; }
        .ind-desc { color: var(--muted); font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; }
      `}</style>

      {/* Heading */}
      <div ref={headingRef} style={{ padding: '0 clamp(24px, 6vw, 96px)', marginBottom: '56px' }}>
        <p style={{
          color: 'var(--orange)', fontSize: '11px',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '14px'
        }}>
          Industries Served
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          textTransform: 'uppercase', margin: 0, color: 'var(--white)'
        }}>
          Transforming <span style={{ color: 'var(--orange)' }}>Every Sector</span>
        </h2>
      </div>

      {/* Scrollable row */}
      <div
        ref={rowRef}
        className="ind-scroll"
        style={{
          display: 'flex', gap: '20px',
          overflowX: 'auto',
          paddingLeft:   'clamp(24px, 6vw, 96px)',
          paddingRight:  'clamp(24px, 6vw, 96px)',
          paddingBottom: '16px',
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {INDUSTRIES.map((ind, i) => (
          <div key={i} className="ind-tile">
            <div className="ind-emoji">{ind.emoji}</div>
            <div className="ind-name">{ind.name}</div>
            <div className="ind-bar" style={{ background: ind.accent }} />
            <div className="ind-desc">{ind.descriptor}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
