import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    tag: 'Healthcare',
    client: 'HealthCore Systems',
    metric: 43, unit: '%', metricLabel: 'Faster Diagnosis',
    title: 'AI Diagnostics Platform',
    description: 'Built an ML-powered diagnostic tool processing 10,000+ patient records daily with 94% accuracy.',
    accent: '#F97316',
  },
  {
    tag: 'FinTech',
    client: 'QuantumFin Capital',
    metric: 2.8, unit: 'x', metricLabel: 'Return Improvement',
    title: 'Predictive Trading Engine',
    description: 'Deployed real-time ML models analyzing 50+ market signals to automate trading decisions.',
    accent: '#FBBF24',
  },
  {
    tag: 'Manufacturing',
    client: 'Nexon Manufacturing',
    metric: 67, unit: '%', metricLabel: 'Less Downtime',
    title: 'Smart Factory Automation',
    description: 'Integrated IoT sensors with predictive maintenance AI across 12 production lines.',
    accent: '#F97316',
  },
];

function useCountUp(ref, target, duration = 2000) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDecimal = target % 1 !== 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = isDecimal
          ? (eased * target).toFixed(1)
          : Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, target, duration]);
}

function CaseCard({ tag, client, metric, unit, metricLabel, title, description, accent }) {
  const numRef = useRef(null);
  useCountUp(numRef, metric);

  return (
    <div className="cs-card">
      <div className="cs-top">
        <span className="cs-tag" style={{ color: accent, border: `1px solid ${accent}55`, background: `${accent}11` }}>
          {tag}
        </span>
        <span className="cs-client">{client}</span>
      </div>

      <div className="cs-metric">
        <span ref={numRef} className="cs-number" style={{ color: accent }}>0</span>
        <span className="cs-unit"  style={{ color: accent }}>{unit}</span>
      </div>
      <div className="cs-metric-label">{metricLabel}</div>

      <div className="cs-title">{title}</div>
      <div className="cs-desc">{description}</div>

      <div className="cs-bottom-bar" style={{ background: accent }} />
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const cards   = cardsRef.current?.querySelectorAll('.cs-card');
    const heading = headingRef.current;
    if (!cards || !heading) return;

    gsap.fromTo(heading,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="casestudies" ref={sectionRef} className="section-base">
      <style>{`
        .cs-card {
          background: var(--bg-card);
          border-top: 2px solid var(--orange);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          padding: 32px 28px 28px;
          display: flex; flex-direction: column; gap: 12px;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cs-card:hover {
          box-shadow: 0 0 40px rgba(249,115,22,0.15);
          transform: translateY(-4px);
        }
        .cs-top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .cs-tag {
          font-size: 10px; font-weight: 700;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 2px;
        }
        .cs-client { color: var(--muted); font-size: 13px; font-family: 'Inter', sans-serif; }
        .cs-metric { display: flex; align-items: baseline; gap: 4px; margin-top: 8px; }
        .cs-number {
          font-size: clamp(48px, 6vw, 72px); font-weight: 800; line-height: 1;
          font-family: 'Rajdhani', sans-serif;
        }
        .cs-unit { font-size: 32px; font-weight: 700; font-family: 'Rajdhani', sans-serif; }
        .cs-metric-label {
          color: var(--muted); font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; font-family: 'Inter', sans-serif; margin-top: -4px;
        }
        .cs-title {
          color: var(--white); font-size: 20px; font-weight: 700;
          font-family: 'Rajdhani', sans-serif; text-transform: uppercase;
          letter-spacing: 0.05em; margin-top: 8px;
        }
        .cs-desc { color: var(--muted); font-size: 14px; line-height: 1.6; font-family: 'Inter', sans-serif; }
        .cs-bottom-bar { height: 2px; border-radius: 1px; margin-top: auto; padding-top: 12px; }
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
          padding: 0 clamp(24px, 6vw, 96px);
        }
        @media (max-width: 900px) { .cs-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .cs-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Heading */}
      <div ref={headingRef} style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>
        <p style={{
          color: 'var(--orange)', fontSize: '11px',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '14px'
        }}>
          Case Studies
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          textTransform: 'uppercase', margin: 0, color: 'var(--white)'
        }}>
          Results That <span style={{ color: 'var(--orange)' }}>Speak</span>
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="cs-grid">
        {CASE_STUDIES.map((cs, i) => <CaseCard key={i} {...cs} />)}
      </div>
    </section>
  );
}
