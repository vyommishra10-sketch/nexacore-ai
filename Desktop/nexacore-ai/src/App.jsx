import { useEffect, useRef } from 'react'
import './index.css'
import CursorGlow from './components/CursorGlow'
import Capabilities from './sections/Capabilities'
import Services from './sections/Services'
import TechStack from './sections/TechStack'

function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      inner.style.left = mouseX + 'px'
      inner.style.top = mouseY + 'px'
    }

    const onMouseEnter = () => outer.classList.add('hovered')
    const onMouseLeave = () => outer.classList.remove('hovered')

    const animate = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      outer.style.left = outerX + 'px'
      outer.style.top = outerY + 'px'
      requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, [data-hover]')
      .forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  )
}

function App() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <CustomCursor />
      <Capabilities />
      <Services />
      <TechStack />
    </div>
  )
}

export default App