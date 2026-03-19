import { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portal from "./pages/Portal";
import LiveDashboard from "./pages/LiveDashboard";
import CMSEditor from "./pages/CMSEditor";
import Industries from "./sections/Industries";
import CaseStudies from "./sections/CaseStudies";
import Contact from "./sections/Contact";
import FooterDark from "./components/Footer";

// ─── CONFIG ───────────────────────────────────────────────────
const CLAUDE_MODEL = "claude-sonnet-4-20250514";

async function callClaude(messages, system = "") {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: CLAUDE_MODEL, max_tokens: 1000, system, messages }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return data.content?.map(c => c.text || "").join("") || "";
}

function injectStyles() {
  const id = "nc-styles";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Instrument Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ripple{0%{transform:scale(1);opacity:0.55}100%{transform:scale(2.6);opacity:0}}
    @keyframes blink{0%,100%{box-shadow:0 0 0 0 var(--ring)}70%{box-shadow:0 0 0 10px transparent}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes slideRight{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
    .nc-fade{animation:fadeUp 0.4s ease both}
    .nc-slide{animation:slideRight 0.35s ease both}
    input::placeholder,textarea::placeholder{opacity:.42}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:3px}
  `;
  document.head.appendChild(s);
}

const COUNTRY_THEMES = {
  India:            { flag:"🇮🇳", bg:"#FAF7F2", surface:"#FFFFFF", surface2:"#F3EFE8", border:"#E5DDD0", text:"#1A1208", textMuted:"#7A6A55", accent:"#0D7377", accentText:"#FFFFFF", accentSoft:"#0D737715" },
  "United States":  { flag:"🇺🇸", bg:"#F8F9FF", surface:"#FFFFFF", surface2:"#EEF2FF", border:"#DDE3F5", text:"#0A0F2E", textMuted:"#5A6080", accent:"#2250F4", accentText:"#FFFFFF", accentSoft:"#2250F415" },
  "United Kingdom": { flag:"🇬🇧", bg:"#F4F5F7", surface:"#FFFFFF", surface2:"#EAECF0", border:"#D2D6DE", text:"#0D1117", textMuted:"#586069", accent:"#003078", accentText:"#FFFFFF", accentSoft:"#00307815" },
  Germany:          { flag:"🇩🇪", bg:"#F5F5F5", surface:"#FFFFFF", surface2:"#EBEBEB", border:"#D4D4D4", text:"#111111", textMuted:"#666666", accent:"#1A1A1A", accentText:"#FFFFFF", accentSoft:"#1A1A1A10" },
  Japan:            { flag:"🇯🇵", bg:"#FAFAFA", surface:"#FFFFFF", surface2:"#F2F2F2", border:"#E8E8E8", text:"#141414", textMuted:"#888888", accent:"#BC002D", accentText:"#FFFFFF", accentSoft:"#BC002D12" },
  Brazil:           { flag:"🇧🇷", bg:"#13082B", surface:"#1E1040", surface2:"#281850", border:"#3D2870", text:"#F0EAFF", textMuted:"#9B8FC0", accent:"#8B5CF6", accentText:"#FFFFFF", accentSoft:"#8B5CF622" },
  Australia:        { flag:"🇦🇺", bg:"#F0F7FF", surface:"#FFFFFF", surface2:"#E4F0FD", border:"#C8DEFA", text:"#0A1E3D", textMuted:"#4A6080", accent:"#0066CC", accentText:"#FFFFFF", accentSoft:"#0066CC15" },
  Canada:           { flag:"🇨🇦", bg:"#F4F8F4", surface:"#FFFFFF", surface2:"#E8F2E8", border:"#CCDECE", text:"#0D1F0D", textMuted:"#4A6B4A", accent:"#1B6B2F", accentText:"#FFFFFF", accentSoft:"#1B6B2F15" },
  France:           { flag:"🇫🇷", bg:"#FBF8F4", surface:"#FFFFFF", surface2:"#F2EDE6", border:"#E0D6C8", text:"#1A1008", textMuted:"#7A6855", accent:"#7B1F3A", accentText:"#FFFFFF", accentSoft:"#7B1F3A15" },
  Other:            { flag:"🌍", bg:"#F7F8FC", surface:"#FFFFFF", surface2:"#EDF0F8", border:"#D8DCEA", text:"#0E1428", textMuted:"#5A6278", accent:"#3B5BDB", accentText:"#FFFFFF", accentSoft:"#3B5BDB15" },
};

const INDUSTRIES = ["Technology","Healthcare","Finance","Education","Retail","Manufacturing","Legal","Marketing","Other"];
const COUNTRIES  = ["India","United States","United Kingdom","Germany","Japan","Brazil","Australia","Canada","France","Other"];

const TAGLINES = {
  Technology:"Ship faster. Scale smarter.",
  Healthcare:"Care powered by intelligence.",
  Finance:"Risk less. Earn more.",
  Education:"Every learner, a unique path.",
  Retail:"Anticipate demand. Delight customers.",
  Manufacturing:"Precision at every step.",
  Legal:"Sharper insights. Stronger cases.",
  Marketing:"Reach the right people.",
  Other:"Transform your enterprise with AI.",
};

const INDUSTRY_SERVICES = {
  Technology:    [{ icon:"🧠", title:"AI Automation Suite",   desc:"End-to-end workflow automation powered by adaptive ML models." },{ icon:"📡", title:"DevOps Intelligence",    desc:"Predict failures, optimise pipelines, ship with confidence." },{ icon:"☁️", title:"Cloud Optimisation",     desc:"Right-size cloud spend with continuous AI recommendations." },{ icon:"📊", title:"Predictive Analytics",   desc:"Turn raw telemetry into forward-looking product insights." }],
  Healthcare:    [{ icon:"🏥", title:"Patient Data AI",        desc:"Unified patient intelligence with full HIPAA compliance." },{ icon:"📋", title:"Compliance Automation",  desc:"Stay audit-ready with real-time regulatory monitoring." },{ icon:"🔬", title:"Diagnostic Insights",    desc:"AI-assisted pattern recognition across imaging and lab data." },{ icon:"⚡", title:"Workflow Optimiser",     desc:"Streamline clinical workflows and reduce admin burden." }],
  Finance:       [{ icon:"📉", title:"Risk Intelligence",      desc:"Real-time portfolio risk scoring with explainable AI." },{ icon:"🛡️", title:"Fraud Detection AI",     desc:"Sub-millisecond transaction screening at 99.7% precision." },{ icon:"⚖️", title:"RegTech Automation",     desc:"Automated compliance reporting across 40+ jurisdictions." },{ icon:"💹", title:"Investment Insights",    desc:"Quantitative signals fused with macro and alternative data." }],
  Education:     [{ icon:"🎓", title:"Adaptive Learning AI",   desc:"Personalised learning paths that evolve with every student." },{ icon:"📈", title:"Student Analytics",      desc:"Early-warning signals for at-risk students across cohorts." },{ icon:"📚", title:"Curriculum Optimiser",   desc:"Data-driven curriculum design aligned to outcomes." },{ icon:"🖥️", title:"EdTech Platform",        desc:"White-label AI infrastructure for education providers." }],
  Retail:        [{ icon:"🔮", title:"Demand Forecasting",     desc:"SKU-level predictions with 93% accuracy up to 12 weeks out." },{ icon:"🛒", title:"Customer AI",            desc:"Hyper-personalised recommendations across every channel." },{ icon:"📦", title:"Inventory Intelligence", desc:"Eliminate stockouts and overstock with smart replenishment." },{ icon:"✨", title:"Personalisation Engine", desc:"1:1 customer experiences at the scale of millions." }],
  Manufacturing: [{ icon:"🔧", title:"Predictive Maintenance", desc:"Catch equipment failures before they cost you downtime." },{ icon:"🚛", title:"Supply Chain AI",        desc:"End-to-end visibility with disruption prediction." },{ icon:"✅", title:"Quality Control AI",     desc:"Computer-vision defect detection at line speed." },{ icon:"🏭", title:"Factory Analytics",      desc:"OEE dashboards with AI-driven improvement recommendations." }],
  Legal:         [{ icon:"📄", title:"Contract AI",            desc:"Extract, review and risk-score contracts in seconds." },{ icon:"🔍", title:"Compliance Monitor",     desc:"Continuous scanning across regulations and jurisdictions." },{ icon:"⚖️", title:"Legal Research AI",      desc:"Deep case-law search with citation graph analysis." },{ icon:"💼", title:"Case Intelligence",      desc:"Outcome prediction and strategy modelling for litigation." }],
  Marketing:     [{ icon:"🚀", title:"Campaign AI",            desc:"Self-optimising campaigns that improve with every impression." },{ icon:"👥", title:"Audience Intelligence",  desc:"Build precise segments from first and third-party signals." },{ icon:"✍️", title:"Content Optimiser",      desc:"AI-generated content aligned to brand voice." },{ icon:"📡", title:"Attribution Engine",     desc:"Multi-touch attribution across online and offline channels." }],
  Other:         [{ icon:"🧠", title:"Enterprise AI Core",     desc:"Foundational AI infrastructure built for your use case." },{ icon:"📊", title:"Data Intelligence",      desc:"Unified data layer with automated insight generation." },{ icon:"⚡", title:"Process Automation",     desc:"AI-driven automation for any repeatable business process." },{ icon:"🔮", title:"Smart Analytics",        desc:"Self-serve analytics for teams of all technical levels." }],
};

const CAPABILITIES = [
  { icon:"🧠", title:"Adaptive AI Core",     desc:"Self-learning models that improve with every interaction." },
  { icon:"📊", title:"Predictive Analytics", desc:"Forward-looking intelligence on your industry's data." },
  { icon:"🔒", title:"Enterprise Security",  desc:"Zero-trust architecture with proactive threat detection." },
  { icon:"⚡", title:"Process Automation",   desc:"Eliminate repetitive work across every department." },
  { icon:"🌐", title:"Global Localisation",  desc:"Auto-adapted content, language and compliance per market." },
  { icon:"🤝", title:"Stack Integration",    desc:"Native connectors for ERP, CRM and cloud infrastructure." },
];

function useUserData() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("nexacore_user")) || null; }
    catch { return null; }
  });
  const saveUser = useCallback((data) => {
    const u = { ...data, lastVisit: new Date().toISOString() };
    localStorage.setItem("nexacore_user", JSON.stringify(u));
    setUser(u);
  }, []);
  const clearUser = useCallback(() => {
    localStorage.removeItem("nexacore_user");
    setUser(null);
  }, []);
  return { user, saveUser, clearUser };
}

function Onboarding({ onComplete }) {
  const t = COUNTRY_THEMES["Other"];
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({ name:"", industry:"", country:"" });
  const [error, setError] = useState("");

  const validate = () => {
    if (step===0 && !form.name.trim())  { setError("Please enter your name."); return false; }
    if (step===1 && !form.industry)     { setError("Please select your industry."); return false; }
    if (step===2 && !form.country)      { setError("Please select your country."); return false; }
    setError(""); return true;
  };
  const next = () => { if (validate()) { if (step<2) setStep(s=>s+1); else onComplete(form); } };

  const inp = { width:"100%", padding:"12px 15px", borderRadius:10, boxSizing:"border-box", background:t.surface2, border:`1.5px solid ${t.border}`, color:t.text, fontSize:15, outline:"none", fontFamily:"inherit", marginTop:6 };

  const screens = [
    { emoji:"👋", h:"Welcome to NexaCore AI",      p:"We personalise everything to you. Start with your name." },
    { emoji:"🏢", h:`Hi ${form.name||"there"}!`,   p:"Which industry are you in? We'll tailor AI solutions for your sector." },
    { emoji:"🌍", h:"Almost there!",               p:"Pick your country to unlock a region-adapted theme and experience." },
  ];

  return (
    <div style={{ minHeight:"100vh", background:t.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36 }}>
        <div style={{ width:36,height:36,borderRadius:10,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",color:t.accentText,fontWeight:900,fontSize:18 }}>N</div>
        <span style={{ fontSize:20,fontWeight:800,color:t.text,letterSpacing:"-0.5px" }}>Nexa<span style={{color:t.accent}}>Core</span></span>
      </div>
      <div style={{ display:"flex", alignItems:"center", marginBottom:28 }}>
        {["Name","Industry","Country"].map((label,i)=>(
          <div key={label} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:i<=step?t.accent:t.surface2,border:`2px solid ${i<=step?t.accent:t.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:i<=step?t.accentText:t.textMuted,fontSize:12,fontWeight:700,transition:"all 0.3s" }}>{i<step?"✓":i+1}</div>
              <span style={{ fontSize:11,color:i===step?t.accent:t.textMuted,fontWeight:i===step?700:400 }}>{label}</span>
            </div>
            {i<2 && <div style={{ width:44,height:2,margin:"0 6px",marginBottom:18,background:i<step?t.accent:t.border,transition:"background 0.3s" }}/>}
          </div>
        ))}
      </div>
      <div key={step} className="nc-fade" style={{ width:"100%",maxWidth:480,background:t.surface,borderRadius:20,border:`1px solid ${t.border}`,padding:"34px 34px 30px",boxShadow:`0 4px 40px ${t.accent}14` }}>
        <div style={{ fontSize:32,marginBottom:8 }}>{screens[step].emoji}</div>
        <h2 style={{ fontSize:21,fontWeight:800,color:t.text,marginBottom:6 }}>{screens[step].h}</h2>
        <p style={{ color:t.textMuted,fontSize:14,marginBottom:18,lineHeight:1.6 }}>{screens[step].p}</p>
        {step===0 && (<><label style={{ color:t.textMuted,fontSize:13,fontWeight:600 }}>Full Name</label><input autoFocus style={inp} placeholder="e.g. Divya Sharma" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&next()}/></>)}
        {step===1 && (<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>{INDUSTRIES.map(ind=>(<button key={ind} onClick={()=>setForm(f=>({...f,industry:ind}))} style={{ padding:"10px 13px",borderRadius:8,cursor:"pointer",background:form.industry===ind?t.accent:t.surface2,border:`1.5px solid ${form.industry===ind?t.accent:t.border}`,color:form.industry===ind?t.accentText:t.text,fontSize:13,fontWeight:600,textAlign:"left",transition:"all 0.15s" }}>{ind}</button>))}</div>)}
        {step===2 && (<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>{COUNTRIES.map(c=>(<button key={c} onClick={()=>setForm(f=>({...f,country:c}))} style={{ padding:"10px 13px",borderRadius:8,cursor:"pointer",background:form.country===c?t.accent:t.surface2,border:`1.5px solid ${form.country===c?t.accent:t.border}`,color:form.country===c?t.accentText:t.text,fontSize:13,fontWeight:600,textAlign:"left",transition:"all 0.15s",display:"flex",gap:6,alignItems:"center" }}><span>{COUNTRY_THEMES[c]?.flag}</span><span>{c}</span></button>))}</div>)}
        {error && <p style={{ color:"#CC3333",fontSize:13,marginTop:8 }}>{error}</p>}
        <div style={{ display:"flex",gap:10,marginTop:22 }}>
          {step>0 && (<button onClick={()=>setStep(s=>s-1)} style={{ padding:"11px 17px",borderRadius:10,border:`1.5px solid ${t.border}`,background:"transparent",color:t.textMuted,cursor:"pointer",fontSize:14,fontWeight:600 }}>← Back</button>)}
          <button onClick={next} style={{ flex:1,padding:"11px 0",borderRadius:10,border:"none",background:t.accent,color:t.accentText,cursor:"pointer",fontSize:15,fontWeight:700,boxShadow:`0 4px 18px ${t.accent}40` }}>
            {step<2?"Continue →":"Launch My Experience 🚀"}
          </button>
        </div>
      </div>
      <p style={{ color:t.textMuted,fontSize:12,marginTop:16 }}>Your data stays in your browser. We never share it.</p>
    </div>
  );
}

function ContactPageDivya({ user, t, onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:user?.name||"", email:"", company:"", message:"" });
  const inp = { width:"100%", padding:"11px 14px", borderRadius:10, boxSizing:"border-box", background:t.surface2, border:`1.5px solid ${t.border}`, color:t.text, fontSize:14, outline:"none", fontFamily:"inherit" };
  return (
    <div className="nc-slide" style={{ position:"fixed",inset:0,zIndex:800,background:t.bg,overflowY:"auto",display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"16px 32px",borderBottom:`1px solid ${t.border}`,background:t.surface,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:30,height:30,borderRadius:8,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",color:t.accentText,fontWeight:900,fontSize:15 }}>N</div>
          <span style={{ fontSize:17,fontWeight:800,color:t.text,letterSpacing:"-0.3px" }}>Nexa<span style={{color:t.accent}}>Core</span></span>
        </div>
        <button onClick={onClose} style={{ background:"transparent",border:`1px solid ${t.border}`,color:t.textMuted,padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600 }}>← Back to site</button>
      </div>
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 24px" }}>
        {sent ? (
          <div className="nc-fade" style={{ textAlign:"center",maxWidth:420 }}>
            <div style={{ fontSize:60,marginBottom:18 }}>✅</div>
            <h2 style={{ fontSize:26,fontWeight:900,color:t.text,marginBottom:10 }}>We've got your message!</h2>
            <p style={{ color:t.textMuted,fontSize:15,lineHeight:1.7,marginBottom:26 }}>Our team will reach out within 48 hours, {user?.name}.</p>
            <button onClick={onClose} style={{ padding:"12px 28px",borderRadius:10,border:"none",background:t.accent,color:t.accentText,cursor:"pointer",fontSize:15,fontWeight:700 }}>Explore NexaCore →</button>
          </div>
        ) : (
          <div style={{ width:"100%",maxWidth:520 }}>
            <div style={{ background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,padding:"30px",display:"flex",flexDirection:"column",gap:15 }}>
              <h2 style={{ fontSize:22,fontWeight:900,color:t.text,marginBottom:4 }}>Let's talk about your enterprise.</h2>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div><label style={{ color:t.textMuted,fontSize:13,fontWeight:600,display:"block",marginBottom:5 }}>Your Name</label><input style={inp} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/></div>
                <div><label style={{ color:t.textMuted,fontSize:13,fontWeight:600,display:"block",marginBottom:5 }}>Work Email</label><input style={inp} type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
              </div>
              <div><label style={{ color:t.textMuted,fontSize:13,fontWeight:600,display:"block",marginBottom:5 }}>Company</label><input style={inp} value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))}/></div>
              <div><label style={{ color:t.textMuted,fontSize:13,fontWeight:600,display:"block",marginBottom:5 }}>Message</label><textarea style={{...inp,resize:"vertical"}} rows={4} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}/></div>
              <button onClick={()=>setSent(true)} style={{ padding:"13px",borderRadius:10,border:"none",cursor:"pointer",background:t.accent,color:t.accentText,fontWeight:700,fontSize:15,fontFamily:"inherit" }}>Send Message →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactFAB({ t, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center" }}>
      {[0,1].map(i=>(<div key={i} style={{ position:"absolute",width:"100%",height:"100%",borderRadius:"50%",background:t.accent,animation:`ripple 2s ease-out ${i*0.9}s infinite`,pointerEvents:"none" }}/>))}
      <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ position:"relative",width:52,height:52,borderRadius:"50%",border:"none",background:t.accent,color:t.accentText,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${t.accent}55`,transition:"transform 0.2s",transform:hov?"scale(1.1)":"scale(1)",zIndex:1 }}>
        ✉️
      </button>
    </div>
  );
}

function TrendBanner({ banner, accent }) {
  const [v, setV] = useState(true);
  if (!v) return null;
  return (
    <div style={{ background:banner.bg||accent,color:"#fff",padding:"8px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:13,fontWeight:500,gap:12 }}>
      <span>{banner.text}</span>
      <button onClick={()=>setV(false)} style={{ background:"rgba(0,0,0,.2)",border:"none",color:"#fff",borderRadius:4,padding:"2px 10px",cursor:"pointer",fontSize:13 }}>✕</button>
    </div>
  );
}

function ResumeBar({ user, onReset, t }) {
  const [v, setV] = useState(true);
  if (!v) return null;
  const th   = COUNTRY_THEMES[user.country]||COUNTRY_THEMES["Other"];
  const last = user.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : "recently";
  return (
    <div style={{ background:t.accentSoft,borderBottom:`1px solid ${t.border}`,padding:"8px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
      <span style={{ color:t.textMuted,fontSize:13 }}>{th.flag} Welcome back, <strong style={{color:t.text}}>{user.name}</strong> · Last visited {last}</span>
      <div style={{ display:"flex",gap:8 }}>
        <button onClick={()=>setV(false)} style={{ background:"transparent",border:`1px solid ${t.border}`,color:t.textMuted,padding:"4px 12px",borderRadius:6,cursor:"pointer",fontSize:12 }}>Dismiss</button>
        <button onClick={onReset} style={{ background:"transparent",border:`1px solid ${t.border}`,color:t.textMuted,padding:"4px 12px",borderRadius:6,cursor:"pointer",fontSize:12 }}>Reset Profile</button>
      </div>
    </div>
  );
}

function Nav({ t, user, onContactClick }) {
  const th = COUNTRY_THEMES[user.country]||COUNTRY_THEMES["Other"];
  return (
    <nav style={{ position:"sticky",top:0,zIndex:500,background:t.surface+"EE",backdropFilter:"blur(12px)",borderBottom:`1px solid ${t.border}`,padding:"0 32px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",color:t.accentText,fontWeight:900,fontSize:14 }}>N</div>
        <span style={{ fontSize:17,fontWeight:800,color:t.text,letterSpacing:"-0.3px" }}>Nexa<span style={{color:t.accent}}>Core</span></span>
      </div>
      <div style={{ display:"flex",gap:26 }}>
        {[["About","#about"],["Capabilities","#capabilities"],["Solutions","#solutions"],["Industries","#industries"],["Case Studies","#casestudies"],["Contact","#contact"]].map(([label,href])=>(
          <a key={href} href={href} style={{ color:t.textMuted,textDecoration:"none",fontSize:14,fontWeight:500 }}>{label}</a>
        ))}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:6,background:t.accentSoft,border:`1px solid ${t.border}`,borderRadius:100,padding:"4px 11px" }}>
          <span style={{fontSize:13}}>{th.flag}</span>
          <span style={{ fontSize:12,color:t.accent,fontWeight:600 }}>{user.name}</span>
        </div>
        <button onClick={onContactClick} style={{ background:t.accent,color:t.accentText,padding:"7px 16px",borderRadius:8,border:"none",fontSize:13,fontWeight:700,cursor:"pointer" }}>
          Get in Touch
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ user, t }) {
  const th      = COUNTRY_THEMES[user.country]||COUNTRY_THEMES["Other"];
  const tagline = TAGLINES[user.industry]||TAGLINES["Other"];
  return (
    <section style={{ padding:"56px 40px 48px",textAlign:"center",background:t.bg }}>
      <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:t.accentSoft,border:`1px solid ${t.accent}33`,borderRadius:100,padding:"4px 15px",marginBottom:20,fontSize:11,color:t.accent,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase" }}>
        {th.flag} Personalised for {user.country} · {user.industry}
      </div>
      <h1 style={{ fontSize:"clamp(1.6rem,3.2vw,2.5rem)",fontWeight:900,lineHeight:1.18,color:t.text,letterSpacing:"-0.8px",maxWidth:640,margin:"0 auto 10px" }}>
        {user.name}, welcome to your enterprise AI command centre.
      </h1>
      <p style={{ fontSize:17,fontWeight:700,color:t.accent,margin:"0 auto 12px" }}>{tagline}</p>
      <p style={{ fontSize:15,color:t.textMuted,maxWidth:480,margin:"0 auto 28px",lineHeight:1.7 }}>
        NexaCore adapts to your industry, region, and team — every insight feels built for you.
      </p>
      <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
        <a href="#solutions" style={{ background:t.accent,color:t.accentText,padding:"12px 26px",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14,boxShadow:`0 6px 22px ${t.accent}40` }}>View My Recommendations →</a>
        <a href="#capabilities" style={{ background:"transparent",border:`1.5px solid ${t.border}`,color:t.text,padding:"12px 26px",borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:14 }}>Explore Capabilities</a>
      </div>
      <div style={{ display:"flex",marginTop:48,justifyContent:"center",borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,flexWrap:"wrap" }}>
        {[["500+","Enterprise Clients"],["99.9%","Uptime SLA"],["40%","Avg. Efficiency Gain"],["150+","Countries"]].map(([n,l],i,arr)=>(
          <div key={l} style={{ padding:"20px 36px",textAlign:"center",borderRight:i<arr.length-1?`1px solid ${t.border}`:"none" }}>
            <div style={{ fontSize:22,fontWeight:900,color:t.text,letterSpacing:"-0.5px" }}>{n}</div>
            <div style={{ fontSize:12,color:t.textMuted,marginTop:3,fontWeight:500 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ t }) {
  return (
    <section id="about" style={{ padding:"60px 40px",background:t.surface2,borderTop:`1px solid ${t.border}` }}>
      <div style={{ maxWidth:1020,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center" }}>
        <div>
          <div style={{ display:"inline-block",background:t.accentSoft,color:t.accent,fontSize:11,fontWeight:700,padding:"4px 13px",borderRadius:100,marginBottom:14,letterSpacing:"0.08em",textTransform:"uppercase" }}>Our Story</div>
          <h2 style={{ fontSize:"clamp(1.4rem,2.6vw,2rem)",fontWeight:900,color:t.text,marginBottom:14,lineHeight:1.2,letterSpacing:"-0.4px" }}>AI that thinks in your industry's language.</h2>
          <p style={{ color:t.textMuted,fontSize:14,lineHeight:1.8,marginBottom:12 }}>NexaCore was built because generic AI tools weren't enough. Every enterprise has unique compliance requirements, workflows, and market pressures.</p>
          <p style={{ color:t.textMuted,fontSize:14,lineHeight:1.8 }}>We built a platform that learns your context from the moment you arrive and delivers intelligence that actually fits your world.</p>
          <div style={{ marginTop:22,display:"flex",gap:8,flexWrap:"wrap" }}>
            {["ISO 27001","GDPR","SOC 2 Type II"].map(b=>(<span key={b} style={{ background:t.surface,border:`1px solid ${t.border}`,color:t.textMuted,fontSize:12,fontWeight:600,padding:"5px 12px",borderRadius:100 }}>{b}</span>))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {[["2019","Founded"],["500+","Enterprise clients"],["98%","Retention rate"],["48h","Avg. onboarding"]].map(([n,l])=>(
            <div key={l} style={{ background:t.surface,border:`1px solid ${t.border}`,borderRadius:14,padding:"20px",textAlign:"center" }}>
              <div style={{ fontSize:26,fontWeight:900,color:t.accent,letterSpacing:"-1px" }}>{n}</div>
              <div style={{ fontSize:13,color:t.textMuted,marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection({ t }) {
  return (
    <section id="capabilities" style={{ padding:"60px 40px",background:t.bg,borderTop:`1px solid ${t.border}` }}>
      <div style={{ maxWidth:1020,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ display:"inline-block",background:t.accentSoft,color:t.accent,fontSize:11,fontWeight:700,padding:"4px 13px",borderRadius:100,marginBottom:12,letterSpacing:"0.08em",textTransform:"uppercase" }}>What We Do</div>
          <h2 style={{ fontSize:"clamp(1.4rem,2.6vw,2rem)",fontWeight:900,color:t.text,marginBottom:8,letterSpacing:"-0.4px" }}>One platform. Every need.</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14 }}>
          {CAPABILITIES.map(c=>(
            <div key={c.title} style={{ background:t.surface,border:`1px solid ${t.border}`,borderRadius:14,padding:"24px",transition:"box-shadow 0.2s,border-color 0.2s",cursor:"default" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent+"55";e.currentTarget.style.boxShadow=`0 4px 18px ${t.accent}16`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.boxShadow="none";}}>
              <div style={{ width:40,height:40,borderRadius:10,background:t.accentSoft,border:`1px solid ${t.accent}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,marginBottom:12 }}>{c.icon}</div>
              <h3 style={{ color:t.text,fontSize:15,fontWeight:700,marginBottom:6 }}>{c.title}</h3>
              <p style={{ color:t.textMuted,fontSize:13,lineHeight:1.65,margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection({ user, t }) {
  const industry = user.industry||"Other";
  const allSvcs  = INDUSTRY_SERVICES[industry]||INDUSTRY_SERVICES["Other"];
  const [query,     setQuery]     = useState("");
  const [aiResult,  setAiResult]  = useState(null);
  const [searching, setSearching] = useState(false);
  const [aiProfile, setAiProfile] = useState(null);
  const [profLoad,  setProfLoad]  = useState(false);
  const debounce = useRef(null);

  useEffect(()=>{
    let alive = true;
    setProfLoad(true);
    callClaude(
      [{ role:"user", content:`Write one punchy sentence (max 18 words) on why NexaCore is perfect for ${industry} teams in ${user.country}. Be specific. No generic phrases.` }],
      "You write sharp enterprise marketing copy. No fluff."
    ).then(r=>{ if(alive){ setAiProfile(r.trim()); setProfLoad(false); } })
     .catch(()=>{ if(alive) setProfLoad(false); });
    return ()=>{ alive=false; };
  }, [industry, user.country]);

  useEffect(()=>{
    if (!query.trim()) { setAiResult(null); return; }
    clearTimeout(debounce.current);
    debounce.current = setTimeout(async()=>{
      setSearching(true);
      try {
        const titles = allSvcs.map(s=>s.title).join(", ");
        const raw = await callClaude(
          [{ role:"user", content:`User (${industry}, ${user.country}) searching: "${query}"\nAvailable: ${titles}\nReturn JSON: {"titles":["matched titles"],"reason":"one short sentence why"}` }],
          "You are a service recommendation engine. Return only valid JSON."
        );
        const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
        const matched = allSvcs.filter(s=>parsed.titles?.includes(s.title));
        setAiResult({ services:matched.length?matched:allSvcs, reason:parsed.reason });
      } catch { setAiResult(null); }
      setSearching(false);
    }, 600);
  }, [query]);

  const displayed = aiResult?.services||allSvcs;

  return (
    <section id="solutions" style={{ padding:"60px 40px",background:t.surface2,borderTop:`1px solid ${t.border}` }}>
      <div style={{ maxWidth:1020,margin:"0 auto" }}>
        <div style={{ background:t.accentSoft,border:`1px solid ${t.accent}33`,borderRadius:12,padding:"16px 20px",marginBottom:32,display:"flex",alignItems:"flex-start",gap:12 }}>
          <div style={{ width:38,height:38,borderRadius:9,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0 }}>🤖</div>
          <div>
            <div style={{ color:t.accent,fontWeight:700,fontSize:11,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em" }}>AI Recommendation Engine</div>
            {profLoad ? <div style={{ color:t.textMuted,fontSize:14,animation:"pulse 1s infinite" }}>Analysing your profile…</div>
              : <div style={{ color:t.text,fontSize:14,lineHeight:1.6 }}>{aiProfile||`Top ${industry} solutions, curated for you.`}</div>}
          </div>
        </div>
        <div style={{ textAlign:"center",marginBottom:28 }}>
          <h2 style={{ fontSize:"clamp(1.4rem,2.6vw,2rem)",fontWeight:900,color:t.text,marginBottom:8,letterSpacing:"-0.4px" }}>Your personalised AI stack, {user.name}.</h2>
          <div style={{ position:"relative",maxWidth:420,margin:"14px auto 0" }}>
            <span style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:t.textMuted,fontSize:14 }}>🔍</span>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services…"
              style={{ width:"100%",padding:"10px 38px",borderRadius:10,border:`1.5px solid ${t.border}`,background:t.surface,color:t.text,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box" }}/>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:14 }}>
          {displayed.map((svc,i)=>(
            <div key={svc.title} className="nc-fade" style={{ animationDelay:`${i*0.055}s`,background:t.surface,border:`1.5px solid ${i===0&&!aiResult?t.accent:t.border}`,borderRadius:13,padding:"22px 18px",transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 26px ${t.accent}20`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ width:38,height:38,borderRadius:9,background:t.accentSoft,border:`1px solid ${t.accent}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:11 }}>{svc.icon}</div>
              <h3 style={{ color:t.text,fontWeight:700,fontSize:14,marginBottom:5 }}>{svc.title}</h3>
              <p style={{ color:t.textMuted,fontSize:12,lineHeight:1.6,margin:"0 0 13px" }}>{svc.desc}</p>
              <div style={{ color:t.accent,fontSize:13,fontWeight:700,cursor:"pointer" }}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chatbot({ user, t }) {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState([]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(()=>{
    if (open && msgs.length===0) {
      setMsgs([{ role:"bot", text:`Hi ${user.name}! 👋 I'm the NexaCore assistant. Ask me about our ${user.industry} solutions, pricing, or anything else.` }]);
    }
  }, [open]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  const SYSTEM = `You are NexaCore AI's enterprise assistant. User: Name=${user.name}, Industry=${user.industry}, Country=${user.country}. Reply in 2-4 sentences max. Never say you are Claude or Anthropic.`;

  const send = async (text) => {
    const msg = (text||input).trim();
    if (!msg || loading) return;
    setInput("");
    const updated = [...msgs, { role:"user", text:msg }];
    setMsgs(updated);
    setLoading(true);
    try {
      const apiMsgs = updated.map(m=>({ role:m.role==="user"?"user":"assistant", content:m.text }));
      const reply   = await callClaude(apiMsgs, SYSTEM);
      setMsgs(m=>[...m,{ role:"bot", text:reply }]);
    } catch { setMsgs(m=>[...m,{ role:"bot", text:"Sorry, something went wrong." }]); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} style={{ position:"fixed",bottom:24,right:88,zIndex:900,width:50,height:50,borderRadius:"50%",border:"none",background:t.accent,color:t.accentText,fontSize:20,cursor:"pointer",boxShadow:`0 8px 28px ${t.accent}55`,display:"flex",alignItems:"center",justifyContent:"center" }}>
        {open?"✕":"💬"}
      </button>
      {open && (
        <div className="nc-slide" style={{ position:"fixed",bottom:84,right:88,zIndex:900,width:320,maxHeight:490,background:t.surface,borderRadius:16,border:`1px solid ${t.border}`,boxShadow:`0 16px 56px rgba(0,0,0,.18)`,display:"flex",flexDirection:"column",overflow:"hidden" }}>
          <div style={{ padding:"12px 15px",background:t.accent,display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15 }}>🧠</div>
            <div><div style={{ color:t.accentText,fontWeight:700,fontSize:14 }}>NexaCore Assistant</div><div style={{ color:`${t.accentText}BB`,fontSize:11 }}>AI-powered · Always available</div></div>
          </div>
          <div style={{ flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8 }}>
            {msgs.map((m,i)=>(
              <div key={i} style={{ alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"85%",background:m.role==="user"?t.accent:t.surface2,color:m.role==="user"?t.accentText:t.text,border:m.role==="bot"?`1px solid ${t.border}`:"none",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"9px 12px",fontSize:13,lineHeight:1.55 }}>{m.text}</div>
            ))}
            {loading && <div style={{ alignSelf:"flex-start",background:t.surface2,border:`1px solid ${t.border}`,borderRadius:"12px 12px 12px 2px",padding:"9px 13px",color:t.textMuted,fontSize:13 }}><span style={{animation:"pulse 1s infinite"}}>● ● ●</span></div>}
            <div ref={bottomRef}/>
          </div>
          <div style={{ padding:"9px 10px",borderTop:`1px solid ${t.border}`,display:"flex",gap:7,flexShrink:0 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Ask anything…"
              style={{ flex:1,background:t.surface2,border:`1px solid ${t.border}`,borderRadius:8,padding:"8px 11px",color:t.text,fontSize:13,outline:"none",fontFamily:"inherit" }}/>
            <button onClick={()=>send()} disabled={loading||!input.trim()} style={{ background:t.accent,border:"none",borderRadius:8,padding:"8px 13px",color:t.accentText,cursor:"pointer",fontSize:15 }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── MAIN SITE ────────────────────────────────────────────────
function MainSite() {
  useEffect(()=>{ injectStyles(); }, []);
  const { user, saveUser, clearUser } = useUserData();
  const [showOnboarding, setShowOnboarding] = useState(!user);
  const [showContact,    setShowContact]    = useState(false);
  const t = COUNTRY_THEMES[user?.country] || COUNTRY_THEMES["Other"];

  if (showOnboarding) {
    return <Onboarding onComplete={(data)=>{ saveUser(data); setShowOnboarding(false); }}/>;
  }

  return (
    <div style={{ background:t.bg, color:t.text, minHeight:"100vh" }}>
      {showContact && <ContactPageDivya user={user} t={t} onClose={()=>setShowContact(false)}/>}

      {[
        { id:"womens-day", text:"🌸 Celebrating Women in Tech — NexaCore proudly supports #WomenInAI", bg:"#9D174D" },
        { id:"summit",     text:"🚀 NexaCore at Global AI Summit 2026 — Register Now →", bg:null },
      ].map(b=><TrendBanner key={b.id} banner={b} accent={t.accent}/>)}

      <ResumeBar user={user} onReset={()=>{ clearUser(); setShowOnboarding(true); }} t={t}/>
      <Nav t={t} user={user} onContactClick={()=>setShowContact(true)}/>

      <main>
        <HeroSection         user={user} t={t}/>
        <AboutSection        t={t}/>
        <CapabilitiesSection t={t}/>
        <SolutionsSection    user={user} t={t}/>

        {/* ── YOUR SECTIONS ── */}
        <Industries />
        <CaseStudies />
        <Contact />
      </main>

      <FooterDark />

      <div style={{ position:"fixed",bottom:24,right:24,zIndex:900 }}>
        <ContactFAB t={t} onClick={()=>setShowContact(true)}/>
      </div>
      <Chatbot user={user} t={t}/>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<MainSite />} />
        <Route path="/portal"             element={<Portal />} />
        <Route path="/admin/dashboard"    element={<LiveDashboard />} />
        <Route path="/admin/cms"          element={<CMSEditor />} />
      </Routes>
    </BrowserRouter>
  );
}