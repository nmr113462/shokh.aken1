import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import MyStats      from './components/MyStats'
import About        from './components/About'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import Vision       from './components/Vision'
import Goals        from './components/Goals'
import Achievements from './components/Achievements'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background:'#06101a', color:'rgba(215,238,235,0.92)' }}>
      <Navbar />
      <Hero />
      <MyStats />
      <About />
      <Skills />
      <Projects />
      <Vision />
      <Goals />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}
