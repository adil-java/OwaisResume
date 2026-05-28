import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import data from '../data/data.json'

const floatingIcons = [
  { src: '/Theme/skills/adobe-photoshop-logo-transparent-background-free-png.webp', name: 'Photoshop' },
  { src: '/Theme/skills/adobe-illustrator-icon-free-png.webp', name: 'Illustrator' },
  { src: '/Theme/skills/adobe-premiere-pro-icon-free-png.webp', name: 'Premiere Pro' },
  { src: '/Theme/skills/adobe-after-effects-icon.webp', name: 'After Effects' },
  { src: '/Theme/skills/adobe-audition-logo-with-transparent-background-free-png.webp', name: 'Audition' },
  { src: '/Theme/skills/Adobe_InDesign_CC_icon.svg.png', name: 'InDesign' },
  { src: '/Theme/skills/DaVinci_Resolve_Studio.png', name: 'DaVinci Resolve' },
  { src: '/Theme/skills/canva-app-logo-on-a-transparent-background-free-png.webp', name: 'Canva' },
  { src: '/Theme/skills/figma-logo-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.webp', name: 'Figma' }
]

export default function Hero() {
  const heroRef = useRef(null)
  const featured = data.projects.slice(0, 3)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2 })

      tl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from('.hero-profile', {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.6')
        .from('.hero-title .line', {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
        }, '-=0.4')
        .from('.hero-description', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5')
        .from('.hero-actions', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.hero-panel', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.3')
        .from('.hero-tile', {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.4')
        .from('.hero-stat', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.3')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero section" ref={heroRef} id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-profile">
              <img
                className="hero-avatar"
                src="/profileImg.jpeg"
                alt={data.personal.name}
              />
              <div className="hero-socials">
                <a
                  className="hero-social-link"
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  href={`tel:${data.personal.phone}`}
                  aria-label="Phone"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
                <a
                  className="hero-social-link"
                  href={`mailto:${data.personal.email}`}
                  aria-label="Email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hero-badge">
              <span className="dot"></span>
              {data.personal.badge}
            </div>

            <h1 className="hero-title">
              {data.personal.tagline.map((line, i) => (
                <span className="line" key={i}>
                  {i === data.personal.tagline.length - 1
                    ? <span className="accent">{line}</span>
                    : line}
                </span>
              ))}
            </h1>

            <p className="hero-description">
              {data.personal.description}
            </p>

            <div className="hero-actions">
              <button className="btn-primary" active onClick={() => window.open('https://www.behance.net/owaisjavaid', '_blank')}>
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
                <img width="20" height="20" src="/images/behancelogo.png" alt="Behance" className="behance-logo" />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>
                Get In Touch
              </button>
            </div>

            <div className="hero-stats">
              {data.stats.map((stat, i) => (
                <div className="hero-stat" key={i}>
                  <div className="number">{stat.number}</div>
                  <div className="label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-gallery" aria-hidden="true">
            <div className="hero-panel">
              <div className="panel-label">Signature Approach</div>
              <div className="panel-title">Editorial clarity with campaign energy.</div>
              <div className="panel-tags">
                <span>Identity</span>
                <span>Campaigns</span>
                <span>Video</span>
              </div>
            </div>

            <div className="hero-tiles">
              {featured.map((project) => (
                <div className="hero-tile" key={project.id}>
                  <img src={project.image} alt="" loading="lazy" />
                  <div className="hero-tile-label">
                    <span>{project.title}</span>
                    <em>{project.category}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-shapes" aria-hidden="true">
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
      </div>

      <div className="hero-floating-icons" aria-hidden="true">
        {floatingIcons.map((icon, i) => {
          const positions = [
            { top: '12%', left: '8%', size: '44px', delay: '0s', duration: '20s' },
            { top: '38%', left: '4%', size: '38px', delay: '2s', duration: '24s' },
            { top: '78%', left: '12%', size: '48px', delay: '1s', duration: '22s' },
            { top: '20%', left: '88%', size: '52px', delay: '3s', duration: '18s' },
            { top: '48%', left: '92%', size: '42px', delay: '0.5s', duration: '26s' },
            { top: '75%', left: '85%', size: '46px', delay: '2.5s', duration: '21s' },
            { top: '15%', left: '45%', size: '36px', delay: '4s', duration: '25s' },
            { top: '88%', left: '48%', size: '50px', delay: '1.5s', duration: '23s' },
            { top: '55%', left: '42%', size: '34px', delay: '3.5s', duration: '28s' }
          ]
          const pos = positions[i % positions.length]

          return (
            <img
              key={i}
              src={icon.src}
              alt=""
              className="hero-floating-icon"
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                width: pos.size,
                height: pos.size,
                objectFit: 'contain',
                animationDelay: pos.delay,
                animationDuration: pos.duration,
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
