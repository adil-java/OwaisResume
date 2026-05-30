import { useEffect, useState, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

const ProjectModal = lazy(() => import('./components/ProjectModal'))

function App() {
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <>
      <Loader visible={loading} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Portfolio onProjectClick={setSelectedProject} />
        <Skills onProjectClick={setSelectedProject} />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </Suspense>
    </>
  )
}

export default App
