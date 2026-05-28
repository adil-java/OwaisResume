import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

function ProjectMedia({ project, isHero }) {
  /* Hero scroll track */
  if (isHero) {
    return (
      <div className="project-scroll-track" aria-hidden="true">
        <img src="/scroll/Book Mockup.png" alt="" />
        <img src="/scroll/Free_M_Mockups_iMac_24_Inch.jpg" alt="" />
        <img src="/scroll/Mock 01.jpg" alt="" />
        <img src="/scroll/Screenshot 2026-05-28 221257.png" alt="" />
        <img src="/scroll/Screenshot 2026-05-28 222533.png" alt="" />
        <img src="/videos/AnkahiThumb.png" alt="" />
        <img src="/videos/limaThub.png" alt="" />
        <img src="/videos/NexaThumb.png" alt="" />
        <img src="/scroll/Book Mockup.png" alt="" />
        <img src="/scroll/Free_M_Mockups_iMac_24_Inch.jpg" alt="" />
        <img src="/scroll/Mock 01.jpg" alt="" />
        <img src="/scroll/Screenshot 2026-05-28 221257.png" alt="" />
        <img src="/scroll/Screenshot 2026-05-28 222533.png" alt="" />
        <img src="/videos/AnkahiThumb.png" alt="" />
        <img src="/videos/limaThub.png" alt="" />
        <img src="/videos/NexaThumb.png" alt="" />
      </div>
    )
  }

  /* Render static thumbnail for all other cards */
  return <img src={project.image} alt={project.title} loading="lazy" />
}

export default function Portfolio({ onProjectClick }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top',
        },
        y: 50,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="portfolio">
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
        </div>

        <div className="portfolio-grid is-all" ref={gridRef}>
          {data.projects.map((project, index) => {
            const isHero = index === 0
            const hasVideo = !!project.video

            return (
              <div
                className={`project-card ${hasVideo ? 'has-video' : ''}`}
                key={project.id}
                onClick={() => onProjectClick(project)}
                id={`project-${project.id}`}
              >
                <div className={`project-image ${isHero ? 'scroll-image' : ''}`}>
                  <ProjectMedia project={project} isHero={isHero} />
                  {hasVideo && (
                    <div className="video-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      VIDEO
                    </div>
                  )}
                </div>
                {!isHero && (
                  <>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <span className="project-category">{project.category} Design</span>
                    </div>
                    {(project.likes || project.views) && (
                      <div className="project-meta">
                        <span className="project-likes">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
