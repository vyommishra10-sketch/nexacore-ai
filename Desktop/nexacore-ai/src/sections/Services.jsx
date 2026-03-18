import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../components/ServiceCard'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'AI Strategy Consulting',
    description: 'We define your AI roadmap from data to deployment — aligning technology with your business goals.',
  },
  {
    number: '02',
    title: 'Enterprise Software Development',
    description: 'Custom platforms built for scale and performance, designed to grow with your organisation.',
  },
  {
    number: '03',
    title: 'Digital Transformation',
    description: 'End-to-end modernisation of legacy systems into agile, cloud-native architectures.',
  },
  {
    number: '04',
    title: 'Cloud Architecture',
    description: 'Scalable, secure cloud infrastructure design optimised for AI and enterprise workloads.',
  },
  {
    number: '05',
    title: 'ML Model Development',
    description: 'Custom models trained on your business data — predictive analytics, NLP, computer vision and more.',
  },
  {
    number: '06',
    title: 'Automation Solutions',
    description: 'RPA and intelligent process automation pipelines that eliminate repetitive work at scale.',
  },
]

export default function Services() {
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
    gsap.set(items, { opacity: 0, y: 60 })
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section className="section-base" id="services" ref={sectionRef}
      style={{ minHeight: '100vh', background: '#0A0500' }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '5%',
        width: '90%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative' }}>

        {/* Header */}
        <div ref={headingRef}>
          <p style={{
            color: '#F97316', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: '12px', fontFamily: 'Rajdhani, sans-serif',
          }}>WHAT WE DO</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700, marginBottom: '16px',
            textTransform: 'uppercase',
          }}>Our <span style={{ color: '#F97316' }}>Services</span></h2>
          <p style={{
            color: '#6B6058', maxWidth: '500px',
            marginBottom: '60px', fontSize: '0.95rem',
          }}>
            From strategy to execution — hover each card to explore what we deliver.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {services.map((service, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '5%',
        width: '90%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)',
      }} />
    </section>
  )
}