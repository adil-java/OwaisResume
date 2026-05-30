import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Menu body scroll lock removed to prevent jumping on mobile
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    // Small timeout to allow the mobile menu animation to start closing
    // and release the body overflow lock before executing the smooth scroll.
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 180)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a href="#" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
         <span><span>Owais<span>.<span className="logo-w">J</span></span></span></span>
        </a>

        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
          <button className="nav-link" onClick={() => scrollTo('experience')}>Experience</button>
          <button className="nav-link" onClick={() => scrollTo('portfolio')}>Work</button>
          <button className="nav-link" onClick={() => scrollTo('skills')}>Skills</button>
          <ThemeToggle />
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Get In Touch</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
          <button
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
        <button className="nav-link" onClick={() => scrollTo('experience')}>Experience</button>
        <button className="nav-link" onClick={() => scrollTo('portfolio')}>Work</button>
        <button className="nav-link" onClick={() => scrollTo('skills')}>Skills</button>
        <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
        <ThemeToggle />
      </div>
    </nav>
  )
}
