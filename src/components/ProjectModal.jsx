import { useEffect, useRef, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const videoRef = useRef(null)
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  // Reset image slider index when project changes
  useEffect(() => {
    setActiveImgIndex(0)
  }, [project])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div
      className={`project-modal-overlay ${project ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      id="project-modal"
    >
      {project && (
        <>
          <button className="modal-close" onClick={onClose} aria-label="Close modal" id="modal-close">
            ✕
          </button>
          <div className="project-modal">
            {project.video ? (
              <video
                ref={videoRef}
                className="modal-image"
                src={project.video}
                controls
                playsInline
                autoPlay
                muted
                poster={project.image}
              />
            ) : project.images && project.images.length > 0 ? (
              <div className="modal-slider">
                <div
                  className="modal-slider-track"
                  onScroll={(e) => {
                    const track = e.currentTarget
                    const index = Math.round(track.scrollLeft / track.clientWidth)
                    setActiveImgIndex(index)
                  }}
                >
                  {project.images.map((imgUrl, idx) => (
                    <div className="modal-slide" key={idx}>
                      <img
                        className="modal-image slide-image"
                        src={imgUrl}
                        alt={`${project.title} - Slide ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                {project.images.length > 1 && (
                  <div className="modal-slider-dots">
                    {project.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`slider-dot ${activeImgIndex === idx ? 'active' : ''}`}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <img
                className="modal-image"
                src={project.image}
                alt={project.title}
              />
            )}
            <div className="modal-content">
              <h2>{project.title}</h2>
              <div className="modal-category-row">
                <span className="modal-category">{project.category}</span>
                {project.skills && (
                  <div className="modal-skills">
                    {project.skills.map((skill) => (
                      <span key={skill} className="modal-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p>{project.description}</p>

              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-submit"
                  style={{ marginTop: 'var(--space-md)', textDecoration: 'none' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View on Behance →
                </a>
              )}

              <div className="modal-details">
                {project.client && (
                  <div className="modal-detail-item">
                    <span className="detail-label">Client</span>
                    <span className="detail-value">{project.client}</span>
                  </div>
                )}
                <div className="modal-detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{project.year}</span>
                </div>
                <div className="modal-detail-item">
                  <span className="detail-label">Role</span>
                  <span className="detail-value">{project.role}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
