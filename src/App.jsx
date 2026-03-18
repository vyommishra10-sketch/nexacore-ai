import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import Navbar        from './components/Navbar'
import Hero          from './sections/Hero'
import About         from './sections/About'
import Capabilities  from './sections/Capabilities'
import Services from './sections/Services'
import Industries from './sections/Industries'
import CaseStudies from './sections/CaseStudies'
import Contact from './sections/Contact'

const themeValue = {
  colors: {
    bgDeep:  '#080808',
    bgCard:  '#0F0800',
    orange:  '#F97316',
    amber:   '#FBBF24',
    white:   '#F5F0EB',
    muted:   '#6B6058',
  },
}

export default function App() {
  return (
    <ThemeContext.Provider value={themeValue}>
      <BrowserRouter>
        <Navbar />
        <main>
  <Hero />
  <About />
  <Capabilities />
  <Services />
  <Industries />
  <CaseStudies />
  <Contact />
</main>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}