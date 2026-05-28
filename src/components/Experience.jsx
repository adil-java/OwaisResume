import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
        },
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <span className="section-label">Career Path</span>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
          From agency fast-paced environments to nonprofit impact — here's where I've honed my craft.
        </p>

        <div className="timeline">
          {data.experience.map((exp, i) => (
            <div className="timeline-item" key={i} id={`exp-${i}`}>
              <div className="timeline-dot"></div>
              <span className="timeline-date">{exp.date}</span>
              <div className="timeline-card">
                <h3>{exp.title}</h3>
                <div className="company">{exp.company}</div>
                <div className="location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {exp.location}
                </div>
                <ul>
                  {exp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
