import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Animation
      gsap.from('.about-text > *', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })

      // 2. Service Cards Animation (Slightly modified for responsiveness)
      // This check ensures GSAP only animates if the laptop-view container is visible
      if (window.innerWidth >= 768) {
        gsap.from('.service-card', {
          scrollTrigger: {
            trigger: '.about-services',
            start: 'top 80%',
          },
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Design isn't decoration, it's communication.</h2>
            {data.personal.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <div className="about-quote">
              "{data.personal.quote}"
            </div>
            <div className="about-gadgets">
              <div className="gadgets-label">My Gadgets</div>
              <ul className="gadgets-list">
                <li>MacBook Pro 15 inch (2019)</li>
                <li>Logitech Mouse</li>
                <li>JBL Headphones</li>
              </ul>
            </div>
          </div>

          {/* TAILWIND FIX: 
            'hidden' keeps it completely removed on mobile devices.
            'md:grid' or 'md:block' makes it reappear starting at tablets/laptops (768px+).
            Change 'md:grid' to 'md:flex' depending on your design needs!
          */}
   <div className="about-services">
  {data.services.map((s, i) => (
    <div className="service-card" key={i}>
      <div className="service-icon">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.description}</p>
    </div>
  ))}
</div>
          
        </div>
      </div>
    </section>
  )
}