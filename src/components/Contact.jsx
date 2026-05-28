import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import data from '../data/data.json'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-grid > *', {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const mailtoLink = `mailto:${data.personal.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi ${data.personal.firstName},\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`)}`
    window.location.href = mailtoLink
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const updateField = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">
          <div>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Let's Create Something Great.</h2>
            <p className="section-subtitle">
              {data.personal.contactCTA}
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <div className="contact-label">Email</div>
                  <a href={`mailto:${data.personal.email}`} className="contact-value">
                    {data.personal.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <div className="contact-label">Phone</div>
                  <a href={`tel:${data.personal.phone}`} className="contact-value">
                    {data.personal.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <div className="contact-label">LinkedIn</div>
                  <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-value">
                    {data.personal.linkedinDisplay}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">{data.personal.location}</div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={updateField('name')}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  placeholder="john@company.com" 
                  value={formData.email}
                  onChange={updateField('email')}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input 
                type="text" 
                id="contact-subject" 
                placeholder="Let's discuss a project" 
                value={formData.subject}
                onChange={updateField('subject')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea 
                id="contact-message" 
                rows="5" 
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={updateField('message')}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit" id="submit-btn">
              {sent ? '✓ Opening Email Client...' : 'Send Message'}
              {!sent && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
