import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  { icon: '📧', label: 'Email',    value: 'hello@nexacore.ai' },
  { icon: '📍', label: 'Location', value: 'San Francisco, CA' },
  { icon: '📞', label: 'Phone',    value: '+1 (415) 000-0000' },
];

const SOCIALS = [
  { icon: '🔗', label: 'LinkedIn', href: '#' },
  { icon: '🐙', label: 'GitHub',   href: '#' },
  { icon: '🐦', label: 'Twitter',  href: '#' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef    = useRef(null);
  const infoRef    = useRef(null);

  const [form, setForm]           = useState({ name: '', email: '', company: '', message: '' });
  const [focused, setFocused]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFocus  = (name) => setFocused(f => ({ ...f, [name]: true }));
  const handleBlur   = (name) => setFocused(f => ({ ...f, [name]: form[name] ? true : false }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  useEffect(() => {
    const heading = headingRef.current;
    const formEl  = formRef.current;
    const infoEl  = infoRef.current;
    if (!heading || !formEl || !infoEl) return;

    gsap.fromTo(heading,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

    gsap.fromTo(formEl,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });

    gsap.fromTo(infoEl,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-base" style={{ background: '#0A1000' }}>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          padding: 0 clamp(24px, 6vw, 96px);
          margin-top: 56px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .field-wrap { position: relative; margin-bottom: 24px; }
        .field-label {
          position: absolute; left: 16px;
          font-family: 'Inter', sans-serif; font-size: 13px;
          pointer-events: none;
          transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
          color: var(--muted);
        }
        .field-label.float {
          top: 6px !important; font-size: 10px !important;
          color: var(--orange) !important;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .field-input {
          width: 100%; background: var(--bg-card);
          border: 1px solid var(--border); border-radius: 0;
          color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.25s ease, box-shadow 0.25s ease;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
        }
        .field-input:focus {
          border-color: var(--orange);
          box-shadow: 0 0 0 1px var(--orange), 0 0 16px rgba(249,115,22,0.15);
        }
        .field-input.text-input { padding: 22px 16px 8px; height: 54px; }
        .field-input.textarea   { padding: 22px 16px 8px; height: 130px; resize: none; }
        .success-box {
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.3);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          padding: 32px 28px; text-align: center;
        }
        .info-card {
          background: var(--bg-card); border-top: 2px solid var(--orange);
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          padding: 20px 22px; display: flex; align-items: center; gap: 16px;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .info-card:hover { box-shadow: 0 0 24px rgba(249,115,22,0.15); transform: translateX(4px); }
        .social-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 20px; background: var(--bg-card);
          border: 1px solid var(--border);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          color: var(--muted); font-family: 'Rajdhani', sans-serif;
          font-weight: 600; font-size: 13px;
          text-transform: uppercase; letter-spacing: 0.08em;
          text-decoration: none;
          transition: border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .social-btn:hover { border-color: var(--orange); color: var(--orange); box-shadow: 0 0 16px rgba(249,115,22,0.15); }
      `}</style>

      <div ref={headingRef} style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>
        <p style={{ color: 'var(--orange)', fontSize: '11px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '14px' }}>
          Get In Touch
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, textTransform: 'uppercase', margin: 0, color: 'var(--white)' }}>
          Let's Build the <span style={{ color: 'var(--orange)' }}>Future Together</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', marginTop: '14px', maxWidth: '520px' }}>
          Ready to transform your business with AI? Our team is ready to help.
        </p>
      </div>

      <div className="contact-grid">
        <div ref={formRef}>
          {submitted ? (
            <div className="success-box">
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '22px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '8px' }}>
                Message Sent!
              </h3>
              <p style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                We'll be in touch within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', message: '' }); setFocused({}); }}
                style={{ marginTop: '20px', background: 'none', border: '1px solid var(--orange)', color: 'var(--orange)', padding: '8px 20px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name',    label: 'Full Name',     type: 'text',  textarea: false },
                { name: 'email',   label: 'Email Address', type: 'email', textarea: false },
                { name: 'company', label: 'Company',       type: 'text',  textarea: false },
                { name: 'message', label: 'Message',       type: 'text',  textarea: true  },
              ].map(({ name, label, type, textarea }) => (
                <div className="field-wrap" key={name}>
                  <label
                    className={`field-label ${focused[name] || form[name] ? 'float' : ''}`}
                    style={{ top: textarea ? '16px' : '50%', transform: focused[name] || form[name] ? 'none' : textarea ? 'none' : 'translateY(-50%)' }}
                  >
                    {label}
                  </label>
                  {textarea ? (
                    <textarea name={name} value={form[name]} onChange={handleChange}
                      onFocus={() => handleFocus(name)} onBlur={() => handleBlur(name)}
                      className="field-input textarea" required />
                  ) : (
                    <input type={type} name={name} value={form[name]} onChange={handleChange}
                      onFocus={() => handleFocus(name)} onBlur={() => handleBlur(name)}
                      className="field-input text-input" required />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>

        <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CONTACT_INFO.map((item, i) => (
              <div key={i} className="info-card">
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <div style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ color: 'var(--white)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '16px' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: 'var(--border)' }} />
          <div>
            <p style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>Follow Us</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} className="social-btn"><span>{s.icon}</span>{s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '20px', marginTop: '8px' }}>
            <p style={{ color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>
              "We don't just build AI solutions — we build the future your business deserves."
            </p>
            <p style={{ color: 'var(--orange)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>
              — NexaCore AI Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}