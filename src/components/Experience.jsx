import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

// Map custom visual tags to each company to enhance detail
const companyTags = {
  "Patients' Aid Foundation": ["Visual Campaigns", "Brand Language", "Video Production", "Social Media Engagement"],
  "Digital Expanders Agency": ["Performance Creatives", "Paid Social Ads", "Asset Templates", "Collaboration"],
  "Kolachi Resource Hub": ["Branded Collateral", "Brochures & Banners", "Internal Comms", "Client Review"],
  "DigiKal": ["Identity Packages", "Logo & Color Systems", "Content Calendars", "Client Management"],
  "Lakhani Solution": ["Graphic Deliverables", "Corporate Branding", "Adobe Suite", "Visual Concepts"]
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showAll, setShowAll] = useState(false)
  
  const detailsRef = useRef(null)
  const tabsRef = useRef(null)
  const containerRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Initial entrance animation on scroll-into-view
    const ctx = gsap.context(() => {
      gsap.from('.experience-container', {
        scrollTrigger: {
          trigger: '.experience-container',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, containerRef)

    isFirstRender.current = false
    return () => ctx.revert()
  }, [])

  // Transition slide/fade-in animation when activeTab changes (desktop only)
  useEffect(() => {
    if (isFirstRender.current || isMobile) return
    gsap.fromTo(detailsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    )
  }, [activeTab, isMobile])

  // GSAP animation for mobile list item expansion
  useEffect(() => {
    if (isMobile && showAll) {
      gsap.fromTo('.mobile-exp-card-extra', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
      )
    }
  }, [showAll, isMobile])

  const activeExp = data.experience[activeTab]

  return (
    <section className="experience section" id="experience" ref={containerRef}>
      {/* Background Blobs */}
      <div className="glass-blob exp-blob-1"></div>
      <div className="glass-blob exp-blob-2"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="section-label">Career Path</span>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
          From agency fast-paced environments to nonprofit impact — here's where I've honed my craft.
        </p>

        {isMobile ? (
          /* Mobile View: Vertical list of cards with "See More" */
          <div className="experience-mobile-list">
            {(showAll ? data.experience : data.experience.slice(0, 2)).map((exp, i) => (
              <div 
                key={i} 
                className={`experience-details-card mobile-exp-card ${i >= 2 ? 'mobile-exp-card-extra' : ''}`}
                style={{ marginBottom: 'var(--space-lg)' }}
              >
                <div className="experience-header">
                  <div className="experience-title-row">
                    <h3>
                      <span className="role">{exp.title}</span>
                      <span className="at">@</span>
                      <span className="company">{exp.company}</span>
                    </h3>
                    <span className="duration-badge">{exp.duration}</span>
                  </div>
                  <div className="experience-meta-row">
                    <span className="date">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {exp.date}
                    </span>
                    <span className="location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="experience-content">
                  <ul>
                    {exp.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="experience-footer">
                  <span className="footer-label">Core Capabilities Utilized:</span>
                  <div className="experience-tags">
                    {companyTags[exp.company]?.map((tag, idx) => (
                      <span key={idx} className="exp-tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {!showAll && data.experience.length > 2 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-xl)' }}>
                <button className="btn-secondary" onClick={() => setShowAll(true)}>
                  See More Experience
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Desktop View: Interactive sidebar tabs */
          <div className="experience-container">
            {/* Company List Tabs */}
            <div className="experience-tabs" ref={tabsRef}>
              {data.experience.map((exp, i) => (
                <button
                  key={i}
                  className={`exp-tab-btn ${activeTab === i ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  <span className="tab-company">{exp.company}</span>
                  <span className="tab-title">{exp.title}</span>
                </button>
              ))}
            </div>

            {/* Active Experience Details (Liquid Glass Card) */}
            <div className="experience-details-card" ref={detailsRef}>
              <div className="experience-header">
                <div className="experience-title-row">
                  <h3>
                    <span className="role">{activeExp.title}</span>
                    <span className="at">@</span>
                    <span className="company">{activeExp.company}</span>
                  </h3>
                  <span className="duration-badge">{activeExp.duration}</span>
                </div>
                <div className="experience-meta-row">
                  <span className="date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {activeExp.date}
                  </span>
                  <span className="location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {activeExp.location}
                  </span>
                </div>
              </div>

              <div className="experience-content">
                <ul>
                  {activeExp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Core Capabilities Utilized */}
              <div className="experience-footer">
                <span className="footer-label">Core Capabilities Utilized:</span>
                <div className="experience-tags">
                  {companyTags[activeExp.company]?.map((tag, idx) => (
                    <span key={idx} className="exp-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
