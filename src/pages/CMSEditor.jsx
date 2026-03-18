import { useState, useEffect } from 'react';

const CMS_PASSWORD = 'nexacms2026';

const DEFAULTS = {
  heroTitle:    'The Future of Enterprise AI',
  heroSubtitle: 'NexaCore AI delivers cinematic digital presence for the world\'s most ambitious technology firms.',
  trendBanner:  '🚀 Webathon 3.0 · Special PS · Built by Team Codepiece',
};

// ─── Password Gate ────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === CMS_PASSWORD) onUnlock();
    else { setError('Wrong password. Try again.'); setPass(''); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
      <style>{`* { cursor: default !important; }`}</style>
      <div style={{ width: '100%', maxWidth: '380px', background: '#0F0800', borderTop: '2px solid #F97316', clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)', padding: '48px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '24px', color: '#F5F0EB', textTransform: 'uppercase' }}>Nexa</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '24px', color: '#F97316', textTransform: 'uppercase' }}>Core</span>
          <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', marginTop: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>CMS Editor · Admin Only</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Admin Password
          </label>
          <input
            type="password" value={pass}
            onChange={e => { setPass(e.target.value); setError(''); }}
            placeholder="Enter CMS password"
            style={{ width: '100%', background: '#080808', border: '1px solid rgba(249,115,22,0.2)', color: '#F5F0EB', fontFamily: 'Inter, sans-serif', fontSize: '14px', padding: '14px 16px', outline: 'none', marginBottom: '16px', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
            required
          />
          {error && <p style={{ color: '#F97316', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>⚠ {error}</p>}
          <button type="submit" style={{ width: '100%', background: '#F97316', color: '#080808', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', border: 'none', cursor: 'default', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}>
            Unlock CMS →
          </button>
        </form>
        <p style={{ color: '#2a2018', fontFamily: 'Inter, sans-serif', fontSize: '11px', textAlign: 'center', marginTop: '20px' }}>
          Hint: nexacms2026
        </p>
      </div>
    </div>
  );
}

// ─── CMS Editor ───────────────────────────────────────────
function Editor() {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('nexacore_cms');
      return saved ? JSON.parse(saved) : DEFAULTS;
    } catch { return DEFAULTS; }
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('nexacore_cms', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setContent(DEFAULTS);
    localStorage.setItem('nexacore_cms', JSON.stringify(DEFAULTS));
    setSaved(false);
  };

  const FIELDS = [
    { key: 'heroTitle',    label: 'Hero Title',       placeholder: 'Main heading on Hero section',  textarea: false },
    { key: 'heroSubtitle', label: 'Hero Subtitle',    placeholder: 'Subtitle text below the heading', textarea: true  },
    { key: 'trendBanner',  label: 'Trend Banner',     placeholder: 'Top banner announcement text',  textarea: false },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', cursor: 'default' }}>
      <style>{`
        * { cursor: default !important; }
        .cms-input {
          width: 100%; background: #080808;
          border: 1px solid rgba(249,115,22,0.2);
          color: #F5F0EB; fontFamily: Inter, sans-serif; font-size: 14px;
          padding: 14px 16px; outline: none; font-family: 'Inter', sans-serif;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          resize: none;
        }
        .cms-input:focus {
          border-color: #F97316;
          box-shadow: 0 0 16px rgba(249,115,22,0.15);
        }
        .preview-box {
          background: #0F0800;
          border-top: 2px solid rgba(249,115,22,0.3);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
          padding: 28px;
          height: 100%;
        }
      `}</style>

      {/* Navbar */}
      <div style={{ background: '#0F0800', borderBottom: '1px solid rgba(249,115,22,0.15)', padding: '0 clamp(24px, 4vw, 64px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F5F0EB', textTransform: 'uppercase' }}>Nexa</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F97316', textTransform: 'uppercase' }}>Core</span>
          <span style={{ color: '#6B6058', fontSize: '11px', marginLeft: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>CMS Editor</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleReset} style={{ background: 'none', border: '1px solid rgba(249,115,22,0.2)', color: '#6B6058', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 16px' }}>
            Reset
          </button>
          <button onClick={handleSave} style={{ background: saved ? '#FBBF24' : '#F97316', color: '#080808', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 20px', border: 'none', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)', transition: 'background 0.2s ease' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '40px clamp(24px, 4vw, 64px)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 32px)', textTransform: 'uppercase', color: '#F5F0EB', margin: 0 }}>
            Content <span style={{ color: '#F97316' }}>Editor</span>
          </h1>
          <p style={{ color: '#6B6058', fontSize: '13px', marginTop: '6px', fontFamily: 'Inter, sans-serif' }}>
            Edit website content · Changes save to localStorage · Reflect instantly on main site
          </p>
        </div>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* LEFT — Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {FIELDS.map(({ key, label, placeholder, textarea }) => (
              <div key={key}>
                <label style={{ color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                  {label}
                </label>
                {textarea ? (
                  <textarea
                    className="cms-input"
                    value={content[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    className="cms-input"
                    value={content[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    style={{ height: '50px' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* RIGHT — Preview */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <p style={{ color: '#6B6058', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Live Preview
            </p>

            {/* Trend Banner Preview */}
            <div style={{ background: '#F97316', padding: '10px 20px', marginBottom: '16px', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
              <p style={{ color: '#080808', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', margin: 0, textAlign: 'center' }}>
                {content.trendBanner || 'Trend Banner Text'}
              </p>
            </div>

            {/* Hero Preview */}
            <div className="preview-box">
              <p style={{ color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Hero Section Preview
              </p>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 32px)', textTransform: 'uppercase', color: '#F5F0EB', margin: '0 0 16px', lineHeight: 1.2 }}>
                {content.heroTitle || 'Hero Title'}
              </h2>
              <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
                {content.heroSubtitle || 'Hero subtitle text'}
              </p>
              <div style={{ display: 'inline-block', background: '#F97316', color: '#080808', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 24px', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}>
                Explore NexaCore →
              </div>
            </div>

            {/* Save reminder */}
            <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}>
              <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '12px', margin: 0 }}>
                💡 Click <span style={{ color: '#F97316', fontWeight: 600 }}>Save Changes</span> to persist edits. Changes reflect on the main site immediately after save.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────
export default function CMSEditor() {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem('nexacore_cms_auth') === 'true'
  );

  const handleUnlock = () => {
    sessionStorage.setItem('nexacore_cms_auth', 'true');
    setUnlocked(true);
  };

  return unlocked ? <Editor /> : <PasswordGate onUnlock={handleUnlock} />;
}
