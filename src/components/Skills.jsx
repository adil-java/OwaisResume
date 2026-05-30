import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import data from '../data/data.json'

const toolIconImages = {
  ps: '/Theme/skills/adobe-photoshop-logo-transparent-background-free-png.webp',
  ai: '/Theme/skills/adobe-illustrator-icon-free-png.webp',
  pr: '/Theme/skills/adobe-premiere-pro-icon-free-png.webp',
  ae: '/Theme/skills/adobe-after-effects-icon.webp',
  au: '/Theme/skills/adobe-audition-logo-with-transparent-background-free-png.webp',
  id: '/Theme/skills/Adobe_InDesign_CC_icon.svg.png',
  dv: '/Theme/skills/DaVinci_Resolve_Studio.png',
  cv: '/Theme/skills/canva-app-logo-on-a-transparent-background-free-png.webp',
  fg: '/Theme/skills/figma-logo-icon-figma-app-editable-transparent-background-premium-social-media-design-for-digital-download-free-png.webp'
}

// Professional human-crafted descriptions for each capability
const skillDescriptions = {
  "Brand Identity": "Visual identity design, logo mark construction, color systems, and corporate typography rules.",
  "Visual Systems": "Creating design frameworks that scale consistently across print, digital, and social formats.",
  "Typography": "Expressive display lettering, grid-based typesetting, and visual editorial layouts.",
  "Layout & Composition": "Designing spatial hierarchies for large-format outdoor billboards and high-traffic marketing.",
  "Cinematography": "Camera direction, scene lighting, frame composition, and raw footage capture.",
  "Video Editing": "Short-form advertising, TVC editing, sound integration, and pacing narrative cuts.",
  "Motion Graphics": "Kinetic typography, animated logo marks, title sequences, and graphic video overlays.",
  "Color Grading": "Color matching multi-camera footage, creating custom styles, and lookup tables (LUTs).",
  "Social Media Design": "Curating platform-specific templates, grid aesthetics, and performance-based assets.",
  "Campaign Creatives": "Promotional campaign banners, clearance sale creatives, and paid acquisition designs.",
  "Content Strategy": "Translating core brand missions and marketing goals into engaging digital storytelling layouts.",
  "Print Design": "Large-format outdoor banners, rollup displays, formal invitation sets, and corporate certificates."
}

// Domain structures for outcomes-based navigation
const domains = [
  {
    id: "design",
    label: "Brand & Visual Identity",
    icon: "🎨",
    skills: ["Brand Identity", "Visual Systems", "Typography", "Layout & Composition"],
    tools: ["ps", "ai", "fg", "id"],
    featuredProjectId: 1 // Mehndi Clothing
  },
  {
    id: "video",
    label: "Video & Motion Storytelling",
    icon: "🎬",
    skills: ["Cinematography", "Video Editing", "Motion Graphics", "Color Grading"],
    tools: ["pr", "ae", "dv", "au"],
    featuredProjectId: 7 // Narrative Short Film
  },
  {
    id: "marketing",
    label: "Digital Content & Strategy",
    icon: "📱",
    skills: ["Social Media Design", "Campaign Creatives", "Content Strategy", "Print Design"],
    tools: ["cv", "ps", "ai", "fg", "id"],
    featuredProjectId: 24 // Modern Glazing
  }
]

export default function Skills({ onProjectClick }) {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    // Fade and slide content dynamically on active tab change
    gsap.fromTo('.expertise-dashboard-content',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    )
  }, [activeTab])

  const currentDomain = domains[activeTab]

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Skills & Experience</h2>
        <p className="section-subtitle" style={{ marginBottom: 'var(--space-2xl)' }}>
          A structured breakdown of core visual design competencies and the creative software used to deliver outcomes.
        </p>

        {/* Dashboard Tab Selector */}
        <div className="expertise-tabs">
          {domains.map((domain, index) => (
            <button
              key={domain.id}
              className={`expertise-tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-icon">{domain.icon}</span>
              <span className="tab-label">{domain.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Grid Content */}
        <div className="expertise-dashboard-content">
          {/* Left Column: Creative Competencies */}
          <div className="expertise-left-col">
            <h3 className="dashboard-column-title">Core Competencies</h3>
            <div className="expertise-capabilities-stack">
              {currentDomain.skills.map((skillName, idx) => (
                <div className="expertise-capability-card" key={idx}>
                  <h4 className="capability-name">{skillName}</h4>
                  <p className="capability-description">
                    {skillDescriptions[skillName] || 'Advanced visualization and creative asset delivery.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Toolkit and Project Outcomes */}
          <div className="expertise-right-col">
            {/* Top Widget: Core Tools */}
            <div className="expertise-deck-card tools-deck">
              <h3 className="dashboard-column-title">Core Software</h3>
              <div className="expertise-tools-grid">
                {currentDomain.tools.map((toolClassName) => {
                  const tool = data.tools.find(t => t.className === toolClassName)
                  if (!tool) return null
                  return (
                    <div className={`tool-badge-pill ${toolClassName}`} key={toolClassName}>
                      <div className="tool-icon-mini">
                        <img src={toolIconImages[toolClassName]} alt={tool.name} className="tool-brand-img" />
                      </div>
                      <div className="tool-info-mini">
                        <div className="tool-name-mini">{tool.name}</div>
                        <div className="tool-level-mini">{tool.level}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



