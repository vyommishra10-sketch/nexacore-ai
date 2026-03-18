import { useState } from 'react';

const ADMIN_USER = 'nexacore';
const ADMIN_PASS = 'webathon2026';

// ─── Login Page ───────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('nexacore_token', 'authenticated');
        onLogin();
      } else {
        setError('Invalid credentials. Try again.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <style>{`
        .login-box {
          width: 100%; max-width: 420px;
          background: #0F0800;
          border-top: 2px solid #F97316;
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
          padding: 48px 40px;
        }
        .login-input {
          width: 100%; background: #080808;
          border: 1px solid rgba(249,115,22,0.2);
          color: #F5F0EB; font-family: 'Inter', sans-serif; font-size: 14px;
          padding: 14px 16px; outline: none; margin-bottom: 16px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #F97316;
          box-shadow: 0 0 16px rgba(249,115,22,0.15);
        }
        .login-btn {
          width: 100%; background: #F97316;
          color: #080808; font-family: 'Rajdhani', sans-serif;
          font-weight: 700; font-size: 14px; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 14px;
          border: none; cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .login-btn:hover { background: #FBBF24; box-shadow: 0 8px 30px rgba(249,115,22,0.4); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="login-box">
        {/* Logo */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '26px', color: '#F5F0EB', textTransform: 'uppercase' }}>Nexa</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '26px', color: '#F97316', textTransform: 'uppercase' }}>Core</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '13px', color: '#6B6058', marginLeft: '6px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>AI</span>
          <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginTop: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Client Portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            Username
          </label>
          <input className="login-input" type="text" value={user}
            onChange={e => { setUser(e.target.value); setError(''); }}
            placeholder="Enter username" required />

          <label style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <input className="login-input" type="password" value={pass}
            onChange={e => { setPass(e.target.value); setError(''); }}
            placeholder="Enter password" required />

          {error && (
            <p style={{ color: '#F97316', fontFamily: 'Inter, sans-serif', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              ⚠ {error}
            </p>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Access Portal →'}
          </button>
        </form>

        <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', textAlign: 'center', marginTop: '24px' }}>
          Demo credentials — user: <span style={{ color: '#F97316' }}>nexacore</span> / pass: <span style={{ color: '#F97316' }}>webathon2026</span>
        </p>
      </div>
    </div>
  );
}

// ─── Portal Dashboard ─────────────────────────────────────
const TABS = ['Project Status', 'Reports', 'Messages'];

const TAB_CONTENT = {
  'Project Status': [
    { name: 'AI Diagnostics Platform', client: 'HealthCore Systems', progress: 85, status: 'In Progress', tag: 'Healthcare' },
    { name: 'Predictive Trading Engine', client: 'QuantumFin Capital', progress: 100, status: 'Completed', tag: 'FinTech' },
    { name: 'Smart Factory Automation', client: 'Nexon Manufacturing', progress: 60, status: 'In Progress', tag: 'Manufacturing' },
    { name: 'Cloud Migration Suite', client: 'RetailPro Inc', progress: 30, status: 'Planning', tag: 'Retail' },
  ],
  'Reports': [
    { title: 'Q1 2026 Performance Report', date: 'Mar 01, 2026', size: '2.4 MB', type: 'PDF' },
    { title: 'AI Model Accuracy Analysis', date: 'Feb 15, 2026', size: '1.1 MB', type: 'PDF' },
    { title: 'Infrastructure Cost Summary', date: 'Feb 01, 2026', size: '890 KB', type: 'XLSX' },
    { title: 'Monthly Sprint Review', date: 'Jan 28, 2026', size: '540 KB', type: 'PDF' },
  ],
  'Messages': [
    { from: 'Priya Sharma', role: 'Project Manager', time: '2h ago', msg: 'The latest model deployment is live. Please review the accuracy metrics in the report.', unread: true },
    { from: 'Dev Team', role: 'Engineering', time: '5h ago', msg: 'Sprint 14 completed. All tickets resolved. Moving to Sprint 15 planning tomorrow.', unread: true },
    { from: 'Alex Chen', role: 'Data Scientist', time: '1d ago', msg: 'Training pipeline updated. New model shows 3.2% improvement in F1 score.', unread: false },
    { from: 'Support', role: 'NexaCore AI', time: '2d ago', msg: 'Your quarterly review is scheduled for March 25th. Calendar invite sent.', unread: false },
  ],
};

function PortalDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('Project Status');

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        .portal-nav {
          background: #0F0800;
          border-bottom: 1px solid rgba(249,115,22,0.15);
          padding: 0 clamp(24px, 4vw, 64px);
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
        }
        .tab-btn {
          background: none; border: none;
          font-family: 'Rajdhani', sans-serif; font-weight: 600;
          font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 8px 20px; cursor: pointer;
          transition: color 0.2s ease, border-bottom 0.2s ease;
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active { color: #F97316; border-bottom: 2px solid #F97316; }
        .tab-btn:not(.active) { color: #6B6058; }
        .tab-btn:hover:not(.active) { color: #F5F0EB; }
        .portal-card {
          background: #0F0800;
          border-top: 2px solid #F97316;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          padding: 24px;
          transition: box-shadow 0.3s ease;
        }
        .portal-card:hover { box-shadow: 0 0 24px rgba(249,115,22,0.12); }
        .progress-bar-bg {
          height: 4px; background: rgba(249,115,22,0.15);
          border-radius: 2px; overflow: hidden; margin-top: 8px;
        }
        .progress-bar-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #F97316, #FBBF24);
          transition: width 1s ease;
        }
        .logout-btn {
          background: none; border: 1px solid rgba(249,115,22,0.3);
          color: #6B6058; font-family: 'Rajdhani', sans-serif;
          font-weight: 600; font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 8px 16px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .logout-btn:hover { border-color: #F97316; color: #F97316; }
      `}</style>

      {/* Navbar */}
      <nav className="portal-nav">
        <div>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F5F0EB', textTransform: 'uppercase' }}>Nexa</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F97316', textTransform: 'uppercase' }}>Core</span>
          <span style={{ color: '#6B6058', fontSize: '11px', marginLeft: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Client Portal</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout →</button>
      </nav>

      {/* Content */}
      <div style={{ padding: '40px clamp(24px, 4vw, 64px)' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', textTransform: 'uppercase', color: '#F5F0EB', margin: 0 }}>
            Welcome back, <span style={{ color: '#F97316' }}>NexaCore</span>
          </h1>
          <p style={{ color: '#6B6058', fontSize: '13px', marginTop: '6px' }}>
            Last login: March 18, 2026 · San Francisco, CA
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(249,115,22,0.1)', marginBottom: '32px' }}>
          {TABS.map(tab => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: Project Status */}
        {activeTab === 'Project Status' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {TAB_CONTENT['Project Status'].map((p, i) => (
              <div key={i} className="portal-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px' }}>
                    {p.tag}
                  </span>
                  <span style={{ color: p.status === 'Completed' ? '#FBBF24' : p.status === 'Planning' ? '#6B6058' : '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', marginBottom: '4px' }}>{p.name}</div>
                <div style={{ color: '#6B6058', fontSize: '12px', marginBottom: '12px' }}>{p.client}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B6058', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
                  <span style={{ color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '14px' }}>{p.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Reports */}
        {activeTab === 'Reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TAB_CONTENT['Reports'].map((r, i) => (
              <div key={i} className="portal-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', padding: '4px 10px' }}>
                    {r.type}
                  </span>
                  <div>
                    <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '15px' }}>{r.title}</div>
                    <div style={{ color: '#6B6058', fontSize: '12px', marginTop: '2px' }}>{r.date} · {r.size}</div>
                  </div>
                </div>
                <button style={{ background: 'none', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 16px', cursor: 'pointer' }}>
                  Download ↓
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Messages */}
        {activeTab === 'Messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TAB_CONTENT['Messages'].map((m, i) => (
              <div key={i} className="portal-card" style={{ borderTopColor: m.unread ? '#F97316' : 'rgba(249,115,22,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#F97316', fontSize: '14px' }}>
                      {m.from[0]}
                    </div>
                    <div>
                      <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}>{m.from}</div>
                      <div style={{ color: '#6B6058', fontSize: '11px' }}>{m.role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.unread && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />}
                    <span style={{ color: '#6B6058', fontSize: '12px' }}>{m.time}</span>
                  </div>
                </div>
                <p style={{ color: '#6B6058', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{m.msg}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Portal Component ────────────────────────────────
export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('nexacore_token') === 'authenticated'
  );

  const handleLogin  = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('nexacore_token');
    setIsLoggedIn(false);
  };

  return isLoggedIn
    ? <PortalDashboard onLogout={handleLogout} />
    : <LoginPage onLogin={handleLogin} />;
}
