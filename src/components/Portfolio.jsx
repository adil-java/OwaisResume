import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

function ProjectMedia({ project }) {
  /* Render static thumbnail for all cards */
  return <img src={project.image} alt={project.title} loading="lazy" />
}

export default function Portfolio({ onProjectClick }) {
  const gridRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setShowAll(false)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      // Entrance animation on first scroll-into-view
      const ctx = gsap.context(() => {
        gsap.from('.project-card', {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
        })
      }, gridRef)
      isFirstRender.current = false
      return () => ctx.revert()
    } else {
      // Transition animation when category is changed or "See More" clicked
      const ctx = gsap.context(() => {
        gsap.fromTo('.project-card',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 }
        )
      }, gridRef)
      return () => ctx.revert()
    }
  }, [activeCategory, showAll])

  const baseFiltered = data.projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  )

  // Push video projects to the end when viewing "All" category
  const filteredProjects = activeCategory === 'All'
    ? [...baseFiltered.filter(p => !p.video), ...baseFiltered.filter(p => !!p.video)]
    : baseFiltered

  const displayProjects = !showAll && activeCategory === 'All'
    ? filteredProjects.slice(0, 6)
    : filteredProjects

  return (
    <section className="section" id="portfolio">
      <div className="glass-blob blob-1"></div>
      <div className="glass-blob blob-2"></div>
      <div className="glass-blob blob-3"></div>

      <div className="container">
        <div className="portfolio-header">
          <div>
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">Projects & Campaigns</h2>
            <p className="section-subtitle">
              A curated selection of brand identities, campaigns, and visual content
              crafted for organizations that want to make a real impression.
            </p>
          </div>
          <div className="portfolio-filters">
            {data.projectCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-grid" ref={gridRef}>
          {displayProjects.map((project) => {
            const hasVideo = !!project.video

            return (
              <div
                className={`project-card ${hasVideo ? 'has-video' : ''}`}
                key={project.id}
                onClick={() => onProjectClick(project)}
                id={`project-${project.id}`}
              >
                <div className="project-image">
                  <ProjectMedia project={project} />
                  {hasVideo && (
                    <div className="video-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      VIDEO
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-meta-row">
                    <span className="project-category">{project.category}</span>
                    {project.skills && (
                      <div className="project-skills">
                        {project.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="project-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {!showAll && activeCategory === 'All' && filteredProjects.length > 6 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <button className="btn-secondary" onClick={() => setShowAll(true)}>
              See More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
