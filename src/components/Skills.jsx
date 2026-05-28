import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.skills-grid',
        start: 'top ',
        onEnter: () => {
          document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.classList.add('animate')
          })
        },
      })

      gsap.from('.skill-group', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        },
        y: 40,

        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      })

      gsap.from('.tool-badge', {
        scrollTrigger: {
          trigger: '.tools-grid',
          start: 'top 85%',
        },
        y: 20,

        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="container">
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Skills & Tools</h2>
        <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
          Years of hands-on experience across design, video, and digital marketing.
        </p>

        <div className="skills-grid">
          {data.skillGroups.map((group, i) => (
            <div className="skill-group" key={i}>
              <h3><span>{group.icon}</span> {group.title}</h3>
              {group.skills.map((skill, j) => (
                <div className="skill-bar-container" key={j}>
                  <div className="skill-bar-label">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tools-grid">
          {data.tools.map((tool, i) => (
            <div className="tool-badge" key={i} id={`tool-${tool.className}`}>
              <div className={`tool-icon ${tool.className} ${toolIconImages[tool.className] ? 'has-custom-img' : ''}`}>
                {toolIconImages[tool.className] ? (
                  <img src={toolIconImages[tool.className]} alt={tool.name} className="tool-brand-img" />
                ) : (
                  tool.icon
                )}
              </div>
              <div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-level">{tool.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
