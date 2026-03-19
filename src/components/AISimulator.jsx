import { useState, useEffect } from 'react'

const PIPELINE_STEPS = [
  { id: 1, label: 'DATA INGESTION', detail: 'Connecting to data streams...', duration: 800 },
  { id: 2, label: 'PREPROCESSING', detail: 'Normalizing & cleaning input...', duration: 1000 },
  { id: 3, label: 'MODEL LOADING', detail: 'Initializing neural network...', duration: 900 },
  { id: 4, label: 'INFERENCE', detail: 'Running predictions...', duration: 1200 },
  { id: 5, label: 'OPTIMIZATION', detail: 'Fine-tuning parameters...', duration: 700 },
  { id: 6, label: 'OUTPUT READY', detail: 'Generating insights...', duration: 500 },
]

const RESULTS = [
  { metric: 'ACCURACY', value: '94.7%', color: '#F97316' },
  { metric: 'LATENCY', value: '12ms', color: '#FBBF24' },
  { metric: 'CONFIDENCE', value: '0.987', color: '#F97316' },
  { metric: 'PROCESSED', value: '10,482', color: '#FBBF24' },
]

export default function AISimulator() {
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [completed, setCompleted] = useState(false)
  const [logs, setLogs] = useState([])

  const runSimulation = () => {
    if (running) return
    setRunning(true)
    setCompleted(false)
    setCurrentStep(0)
    setLogs([])
  }

  const reset = () => {
    setRunning(false)
    setCompleted(false)
    setCurrentStep(-1)
    setLogs([])
  }

  useEffect(() => {
    if (!running || currentStep < 0) return
    if (currentStep >= PIPELINE_STEPS.length) {
      setCompleted(true)
      setRunning(false)
      return
    }

    const step = PIPELINE_STEPS[currentStep]
    setLogs(prev => [...prev, `> ${step.detail}`])

    const timer = setTimeout(() => {
      setCurrentStep(s => s + 1)
    }, step.duration)

    return () => clearTimeout(timer)
  }, [running, currentStep])

  return (
    <div style={{
      background: '#0F0800',
      border: '1px solid rgba(249,115,22,0.2)',
      borderTop: '2px solid #F97316',
      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <div>
          <p style={{
            color: '#F97316', fontSize: '0.7rem',
            letterSpacing: '0.2em', marginBottom: '4px',
            fontFamily: 'Rajdhani, sans-serif',
          }}>NEXACORE SYSTEM</p>
          <h3 style={{
            color: '#F5F0EB', fontSize: '1.4rem',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700, margin: 0,
            textTransform: 'uppercase',
          }}>AI Pipeline Simulator</h3>
        </div>

        {/* Status dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: running ? '#F97316' : completed ? '#FBBF24' : '#6B6058',
            boxShadow: running ? '0 0 12px #F97316' : completed ? '0 0 12px #FBBF24' : 'none',
            animation: running ? 'pulse-orange 1s infinite' : 'none',
          }} />
          <span style={{
            color: running ? '#F97316' : completed ? '#FBBF24' : '#6B6058',
            fontSize: '0.7rem', letterSpacing: '0.15em',
            fontFamily: 'Rajdhani, sans-serif',
          }}>
            {running ? 'PROCESSING' : completed ? 'COMPLETE' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Pipeline steps */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '28px',
        flexWrap: 'wrap',
      }}>
        {PIPELINE_STEPS.map((step, i) => {
          const isDone = currentStep > i
          const isActive = currentStep === i
          return (
            <div key={step.id} style={{ flex: '1', minWidth: '80px' }}>
              <div style={{
                height: '3px',
                background: isDone || isActive ? '#F97316' : 'rgba(249,115,22,0.15)',
                borderRadius: '2px',
                marginBottom: '6px',
                transition: 'background 0.3s ease',
                boxShadow: isActive ? '0 0 8px #F97316' : 'none',
              }} />
              <p style={{
                color: isDone ? '#FBBF24' : isActive ? '#F97316' : '#6B6058',
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
                fontFamily: 'Rajdhani, sans-serif',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}>{step.label}</p>
            </div>
          )
        })}
      </div>

      {/* Terminal log */}
      <div style={{
        background: '#080808',
        border: '1px solid rgba(249,115,22,0.1)',
        borderRadius: '4px',
        padding: '16px 20px',
        minHeight: '120px',
        marginBottom: '24px',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
      }}>
        {logs.length === 0 && (
          <p style={{ color: '#6B6058' }}>
            {'>'} System ready. Click RUN to start simulation...
          </p>
        )}
        {logs.map((log, i) => (
          <p key={i} style={{
            color: i === logs.length - 1 ? '#F97316' : '#6B6058',
            marginBottom: '4px',
            transition: 'color 0.3s',
          }}>{log}</p>
        ))}
        {completed && (
          <p style={{ color: '#FBBF24', marginTop: '8px', fontWeight: 'bold' }}>
            ✔ Pipeline complete. Results generated.
          </p>
        )}
      </div>

      {/* Results */}
      {completed && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '24px',
        }}>
          {RESULTS.map((r, i) => (
            <div key={i} style={{
              background: '#160C00',
              border: `1px solid ${r.color}33`,
              borderTop: `2px solid ${r.color}`,
              padding: '14px 12px',
              textAlign: 'center',
            }}>
              <p style={{
                color: r.color, fontSize: '1.3rem',
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700, margin: 0,
              }}>{r.value}</p>
              <p style={{
                color: '#6B6058', fontSize: '0.6rem',
                letterSpacing: '0.1em', margin: 0,
                fontFamily: 'Rajdhani, sans-serif',
              }}>{r.metric}</p>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={runSimulation}
          disabled={running}
          className="btn-primary"
          style={{ opacity: running ? 0.5 : 1 }}
        >
          {running ? 'PROCESSING...' : '▶ RUN SIMULATION'}
        </button>
        {(completed || logs.length > 0) && (
          <button onClick={reset} className="btn-secondary">
            RESET
          </button>
        )}
      </div>

    </div>
  )
}