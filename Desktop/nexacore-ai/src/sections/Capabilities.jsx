import AISimulator from '../components/AISimulator'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CapabilityCard3D from '../components/CapabilityCard3D'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    icon: '🧠',
    title: 'Artificial Intelligence',
    description: 'We design and deploy intelligent systems that learn, adapt, and solve complex business problems at scale.',
    color: '#F97316',
    useCases: ['Predictive Analytics', 'NLP Chatbots', 'Image Recognition', 'Fraud Detection'],
    tools: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI'],
  },
  {
    icon: '📊',
    title: 'Machine Learning',
    description: 'Custom ML models trained on your data — from predictive analytics to computer vision and NLP.',
    color: '#FBBF24',
    useCases: ['Demand Forecasting', 'Churn Prediction', 'Recommendation Engine'],
    tools: ['PyTorch', 'Scikit-learn', 'MLflow', 'AWS SageMaker'],
  },
  {
    icon: '☁️',
    title: 'Cloud Computing',
    description: 'Scalable, secure cloud infrastructure designed for high-performance AI workloads.',
    color: '#F97316',
    useCases: ['Auto-scaling', 'Serverless AI', 'Data Pipelines', 'DevOps'],
    tools: ['AWS', 'GCP', 'Terraform', 'Docker', 'Kubernetes'],
  },
  {
    icon: '⚙️',
    title: 'Automation',
    description: 'Intelligent process automation that eliminates repetitive work and accelerates operations.',
    color: '#FBBF24',
    useCases: ['RPA Workflows', 'CI/CD Pipelines', 'Data ETL', 'Auto-reporting'],
    tools: ['n8n', 'Airflow', 'Zapier', 'GitHub Actions'],
  },
]

export default function Capabilities() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    )
    const items = cardsRef.current.filter(Boolean)
    gsap.set(items, { opacity: 0, y: 80 })
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
    })
  }, [])

  return (
    <section className="section-base" id="capabilities" ref={sectionRef}
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '5%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.06), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative' }}>
        {/* Header */}
        <div ref={headingRef}>
          <p style={{
            color: '#F97316', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '12px', fontFamily: 'Rajdhani, sans-serif',
          }}>CORE CAPABILITIES</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700, marginBottom: '16px',
            textTransform: 'uppercase',
          }}>Powered by <span style={{ color: '#F97316' }}>Next-Gen</span> Technology</h2>
          <p style={{
            color: '#6B6058', maxWidth: '500px',
            marginBottom: '60px', fontSize: '0.95rem',
          }}>
            Hover to explore each capability. Click <span style={{ color: '#F97316' }}>EXPLORE</span> to see real use cases and tools.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {capabilities.map((cap, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el}>
              <CapabilityCard3D {...cap} />
            </div>
          ))}
        </div>
      </div>
      {/* AI Simulator */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 5%', position: 'relative' }}>
        <p style={{
          color: '#F97316', fontSize: '0.75rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '12px', fontFamily: 'Rajdhani, sans-serif',
        }}>LIVE DEMO</p>
        <h3 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700, marginBottom: '32px',
          textTransform: 'uppercase',
        }}>See NexaCore <span style={{ color: '#F97316' }}>In Action</span></h3>
        <AISimulator />
      </div>
    </section>
  )
}