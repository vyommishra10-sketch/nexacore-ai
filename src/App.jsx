import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Industries from './sections/Industries'
import CaseStudies from './sections/CaseStudies'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Portal from './pages/Portal'
import LiveDashboard from './pages/LiveDashboard'
import CMSEditor from './pages/CMSEditor'

function MainSite() {
  return (
    <div>
      <Industries />
      <CaseStudies />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/admin/dashboard" element={<LiveDashboard />} />
        <Route path="/admin/cms" element={<CMSEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
