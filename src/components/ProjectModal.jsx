import { useEffect, useRef } from 'react'

export default function ProjectModal({ project, onClose }) {
  const videoRef = useRef(null)

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
            ) : (
              <img
                className="modal-image"
                src={project.image}
                alt={project.title}
              />
            )}
            <div className="modal-content">
              <h2>{project.title}</h2>
              <div className="modal-category">{project.category} Design</div>
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
                {project.likes && (
                  <div className="modal-detail-item">
                    <span className="detail-label">Appreciations</span>
                    <span className="detail-value">{project.likes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
