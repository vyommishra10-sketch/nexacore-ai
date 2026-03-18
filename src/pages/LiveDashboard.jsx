import { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

function getLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(id); }
      else setVal(current);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

function StatCard({ icon, label, value, isText, accent = '#F97316' }) {
  const numVal = typeof value === 'number' ? value : 0;
  const counted = useCountUp(numVal);
  return (
    <div className="dash-stat-card" style={{ borderTopColor: accent }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <span style={{ fontSize: '28px' }}>{icon}</span>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}`, display: 'inline-block', marginTop: '4px' }} />
      </div>
      <div style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '34px', color: '#F5F0EB', lineHeight: 1 }}>
        {isText ? value : counted.toLocaleString()}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#0F0800', border: '1px solid rgba(249,115,22,0.3)', padding: '10px 16px', fontFamily: 'Rajdhani, sans-serif', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}>
      <p style={{ color: '#6B6058', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>{label}</p>
      <p style={{ color: '#F97316', fontWeight: 700, fontSize: '18px', margin: 0 }}>{payload[0].value}</p>
    </div>
  );
}

const SECTIONS = ['Hero', 'Services', 'Industries', 'Case Studies', 'Contact'];

function seedEngagement() {
  if (!getLS('nexacore_engagement', null)) {
    const seed = {};
    SECTIONS.forEach(s => { seed[s] = Math.floor(Math.random() * 120) + 20; });
    setLS('nexacore_engagement', seed);
  }
}

function buildChartData() {
  const eng = getLS('nexacore_engagement', {});
  return SECTIONS.map(s => ({ section: s, views: eng[s] || 0 }));
}

function buildTimelineData() {
  const base = [42, 38, 61, 55, 89, 74, 96, 110];
  const now = new Date();
  return base.map((v, i) => {
    const h = new Date(now - (7 - i) * 3600000);
    return { time: h.getHours().toString().padStart(2, '0') + ':00', visits: v + Math.floor(Math.random() * 10) };
  });
}

// ─── Tabs ─────────────────────────────────────────────────
const TABS = ['Analytics', 'User Profile', 'Services Viewed', 'Form History'];

export default function LiveDashboard() {
  const sessionStart            = useRef(Date.now());
  const [activeTab, setActiveTab] = useState('Analytics');
  const [sessionSec, setSessionSec]   = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [topSection, setTopSection]   = useState('—');
  const [chartData, setChartData]     = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  // User profile from localStorage
  const [userProfile]    = useState(() => getLS('nexacore_user_profile', null));
  const [servicesViewed] = useState(() => getLS('nexacore_services_viewed', [
    { name: 'AI Strategy Consulting', viewedAt: '2026-03-18 14:32', count: 3 },
    { name: 'ML Model Development',   viewedAt: '2026-03-18 14:35', count: 2 },
    { name: 'Cloud Architecture',     viewedAt: '2026-03-18 14:40', count: 1 },
  ]));
  const [formHistory] = useState(() => getLS('nexacore_form_submissions', [
    { name: 'John Smith',    email: 'john@healthcore.ai',   company: 'HealthCore Systems',   message: 'Interested in AI diagnostics platform...', submittedAt: '2026-03-18 14:45', status: 'New' },
    { name: 'Priya Sharma',  email: 'priya@quantumfin.com', company: 'QuantumFin Capital',   message: 'Looking for predictive trading solutions...', submittedAt: '2026-03-17 09:12', status: 'Reviewed' },
    { name: 'Alex Chen',     email: 'alex@nexonmfg.com',    company: 'Nexon Manufacturing',  message: 'Need IoT and automation integration...', submittedAt: '2026-03-16 11:30', status: 'Replied' },
  ]));

  useEffect(() => {
    seedEngagement();
    const visits = getLS('nexacore_total_visits', 0) + 1;
    setLS('nexacore_total_visits', visits);
    setChartData(buildChartData());
    setTimelineData(buildTimelineData());

    const interval = setInterval(() => {
      const sec = Math.floor((Date.now() - sessionStart.current) / 1000);
      setSessionSec(sec);
      setTotalVisits(getLS('nexacore_total_visits', visits));
      const eng = getLS('nexacore_engagement', {});
      const top = Object.entries(eng).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
      setTopSection(top);
      setChartData(buildChartData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(sessionSec / 60);
  const secs = sessionSec % 60;
  const sessionLabel = `${mins}m ${secs.toString().padStart(2, '0')}s`;

  const statusColor = (s) => s === 'New' ? '#F97316' : s === 'Reviewed' ? '#FBBF24' : '#6B6058';

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'Inter, sans-serif', cursor: 'default' }}>
      <style>{`
        * { cursor: default !important; }
        .dash-stat-card {
          background: #0F0800; border-top: 2px solid #F97316;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
          padding: 24px; transition: box-shadow 0.3s ease;
        }
        .dash-stat-card:hover { box-shadow: 0 0 28px rgba(249,115,22,0.15); }
        .dash-panel {
          background: #0F0800; border-top: 2px solid rgba(249,115,22,0.35);
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%);
          padding: 28px;
        }
        .dash-tab {
          background: none; border: none; border-bottom: 2px solid transparent;
          font-family: 'Rajdhani', sans-serif; font-weight: 600;
          font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 10px 20px; transition: all 0.2s ease;
        }
        .dash-tab.active  { color: #F97316; border-bottom-color: #F97316; }
        .dash-tab:not(.active) { color: #6B6058; }
        .dash-tab:hover:not(.active) { color: #F5F0EB; }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #F97316;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.7); }
          50%      { box-shadow: 0 0 0 5px rgba(249,115,22,0); }
        }
        .row-item {
          padding: 16px 0; border-bottom: 1px solid rgba(249,115,22,0.06);
          display: flex; align-items: flex-start; gap: 16px;
        }
        .row-item:last-child { border-bottom: none; }
      `}</style>

      {/* Navbar */}
      <div style={{ background: '#0F0800', borderBottom: '1px solid rgba(249,115,22,0.15)', padding: '0 clamp(24px, 4vw, 64px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F5F0EB', textTransform: 'uppercase' }}>Nexa</span>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F97316', textTransform: 'uppercase' }}>Core</span>
          <span style={{ color: '#6B6058', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginLeft: '8px' }}>Live Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="live-dot" />
          <span style={{ color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live</span>
        </div>
      </div>

      <div style={{ padding: '40px clamp(24px, 4vw, 64px)' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 32px)', textTransform: 'uppercase', color: '#F5F0EB', margin: 0 }}>
            Website <span style={{ color: '#F97316' }}>Analytics</span>
          </h1>
          <p style={{ color: '#6B6058', fontSize: '13px', marginTop: '6px' }}>Real-time · Updates every second · Data via localStorage</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <StatCard icon="👁️" label="Total Visits"     value={totalVisits}  accent="#F97316" />
          <StatCard icon="⏱️" label="Session Duration" value={sessionLabel} isText accent="#FBBF24" />
          <StatCard icon="🔥" label="Top Section"       value={topSection}   isText accent="#F97316" />
          <StatCard icon="📬" label="Form Submissions"  value={formHistory.length} accent="#FBBF24" />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(249,115,22,0.1)', marginBottom: '28px', flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab} className={`dash-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Analytics ── */}
        {activeTab === 'Analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div className="dash-panel">
                <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: '0 0 24px' }}>
                  Section <span style={{ color: '#F97316' }}>Engagement</span>
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#F97316" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.07)" />
                    <XAxis dataKey="section" tick={{ fill: '#6B6058', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6B6058', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="views" stroke="#F97316" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: '#F97316', r: 4 }} activeDot={{ r: 6, fill: '#FBBF24' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="dash-panel">
                <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: '0 0 24px' }}>
                  Hourly <span style={{ color: '#F97316' }}>Traffic</span>
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.07)" />
                    <XAxis dataKey="time" tick={{ fill: '#6B6058', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6B6058', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="visits" stroke="#FBBF24" strokeWidth={2.5} dot={{ fill: '#FBBF24', r: 3 }} activeDot={{ r: 6, fill: '#F97316' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="dash-panel">
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: '0 0 24px' }}>
                Section <span style={{ color: '#F97316' }}>Breakdown</span>
              </h2>
              {chartData.map((item, i) => {
                const maxViews = Math.max(...chartData.map(d => d.views), 1);
                const pct = Math.round((item.views / maxViews) * 100);
                return (
                  <div key={item.section} className="row-item" style={{ alignItems: 'center' }}>
                    <span style={{ color: '#6B6058', fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', width: '18px', textAlign: 'right' }}>{i + 1}</span>
                    <span style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', width: '130px' }}>{item.section}</span>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(249,115,22,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: i === 0 ? 'linear-gradient(90deg, #F97316, #FBBF24)' : 'rgba(249,115,22,0.45)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '14px', width: '48px', textAlign: 'right' }}>{item.views}</span>
                    <span style={{ color: '#6B6058', fontSize: '11px', width: '36px', textAlign: 'right' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Tab: User Profile ── */}
        {activeTab === 'User Profile' && (
          <div className="dash-panel">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: '0 0 24px' }}>
              Saved <span style={{ color: '#F97316' }}>Profile</span>
            </h2>
            {userProfile ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {Object.entries(userProfile).map(([key, val]) => (
                  <div key={key}>
                    <div style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{key}</div>
                    <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '16px' }}>{val}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>👤</div>
                <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  No profile saved yet. User profile will appear here after onboarding.
                </p>
                <button
                  onClick={() => {
                    const demo = { name: 'Demo User', email: 'demo@nexacore.ai', company: 'NexaCore AI', industry: 'Technology', role: 'Developer' };
                    setLS('nexacore_user_profile', demo);
                    window.location.reload();
                  }}
                  style={{ marginTop: '16px', background: 'none', border: '1px solid rgba(249,115,22,0.3)', color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 20px' }}
                >
                  Load Demo Profile
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Services Viewed ── */}
        {activeTab === 'Services Viewed' && (
          <div className="dash-panel">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: '0 0 24px' }}>
              Services <span style={{ color: '#F97316' }}>Viewed</span>
            </h2>
            {servicesViewed.length === 0 ? (
              <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>No services viewed yet.</p>
            ) : (
              servicesViewed.map((s, i) => (
                <div key={i} className="row-item">
                  <div style={{ width: '36px', height: '36px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#F97316', fontSize: '14px', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.name}</div>
                    <div style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginTop: '2px' }}>Last viewed: {s.viewedAt}</div>
                  </div>
                  <div style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', color: '#F97316', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '13px', padding: '4px 12px' }}>
                    {s.count}x
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Tab: Form History ── */}
        {activeTab === 'Form History' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F0EB', margin: 0 }}>
              Contact Form <span style={{ color: '#F97316' }}>Submissions</span>
            </h2>
            {formHistory.length === 0 ? (
              <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>No form submissions yet.</p>
            ) : (
              formHistory.map((f, i) => (
                <div key={i} className="dash-panel" style={{ borderTopColor: statusColor(f.status) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#F97316', fontSize: '16px' }}>
                        {f.name[0]}
                      </div>
                      <div>
                        <div style={{ color: '#F5F0EB', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase' }}>{f.name}</div>
                        <div style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>{f.email} · {f.company}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: statusColor(f.status), fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', background: `${statusColor(f.status)}15`, border: `1px solid ${statusColor(f.status)}44`, padding: '3px 10px' }}>
                        {f.status}
                      </span>
                      <span style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>{f.submittedAt}</span>
                    </div>
                  </div>
                  <p style={{ color: '#6B6058', fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{f.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}