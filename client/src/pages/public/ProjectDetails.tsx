import {
  Link,
  useParams
} from "react-router-dom";

import {
  useQuery
} from "@tanstack/react-query";

import {
  type Project,
  getPublicProjectBySlug
} from "../../api/projects.api";

import { useState, useEffect } from "react";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(
    "/api",
    ""
  ) ?? "";

function getMediaUrl(
  path: string
) {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function ProjectDetails() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    data: project,
    isLoading,
    isError
  } = useQuery<Project>({
    queryKey: ["project", slug],
    queryFn: () =>
      getPublicProjectBySlug(slug || ""),
    enabled: Boolean(slug)
  });

  // Close lightbox on Escape key and handle navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage || !project) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
        return;
      }

      const currentIndex = project.images.indexOf(selectedImage);

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setSelectedImage(project.images[currentIndex - 1]);
      } else if (e.key === "ArrowRight" && currentIndex < project.images.length - 1) {
        setSelectedImage(project.images[currentIndex + 1]);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage, project]);

  if (isLoading) {
    return (
      <main className="public-project-details">
        <div className="public-project-details-container">
          <p className="public-project-details-status">
            Loading project...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !project) {
    return (
      <main className="public-project-details">
        <div className="public-project-details-container">
          <div className="public-project-details-not-found">
            <h1>Project not found</h1>

            <p>
              The project you're looking for
              doesn't exist or is no longer
              available.
            </p>

            <Link
              to="/projects"
              className="public-project-back"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="public-project-details">
      <div className="public-project-details-container">

        <Link
          to="/projects"
          className="public-project-back"
        >
          ← Back to Projects
        </Link>

        <header className="public-project-details-header">

          <div className="public-project-details-title">
            <h1>{project.title}</h1>

            {project.featured && (
              <span className="public-project-badge">
                Featured
              </span>
            )}
          </div>

          <p className="public-project-details-short-description">
            {project.shortDescription}
          </p>

          {project.technologies.length > 0 && (
            <div className="public-project-details-technologies">
              {project.technologies.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                )
              )}
            </div>
          )}

        </header>

        {project.thumbnail && (
          <div className="public-project-details-thumbnail">
            <img
              src={getMediaUrl(
                project.thumbnail
              )}
              alt={project.title}
            />
          </div>
        )}

        <div className="public-project-details-layout">

          <article className="public-project-details-main">

            <section className="public-project-details-section">
              <h2>About This Project</h2>

              <p>
                {project.description}
              </p>
            </section>

            {project.videoUrl && (
              <section className="public-project-details-section">
                <h2>Demo Video</h2>

                <div className="public-project-details-video">
                  <video
                    controls
                    width="100%"
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <source
                      src={getMediaUrl(
                        project.videoUrl
                      )}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>
            )}

            {project.images.length > 0 && (
              <section className="public-project-details-section">
                <h2>Project Screenshots</h2>

                <div className="public-project-details-gallery">
                  {project.images.map(
                    (
                      image,
                      index
                    ) => (
                      <img
                        key={`${image}-${index}`}
                        src={getMediaUrl(
                          image
                        )}
                        alt={`${project.title} screenshot ${
                          index + 1
                        }`}
                        onClick={() => setSelectedImage(image)}
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    )
                  )}
                </div>
              </section>
            )}

          </article>

          <aside className="public-project-details-sidebar">

            <div className="public-project-details-card">
              <h2>Project Details</h2>

              <div className="public-project-detail-item">
                <span>Technologies</span>

                <div className="public-project-details-technologies">
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>

              {(project.liveUrl ||
                project.githubUrl ||
                project.videoUrl) && (
                <div className="public-project-detail-item">
                  <span>Links</span>

                  <div className="public-project-details-links">

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="public-project-details-link primary"
                      >
                        View Live Project
                        <span>↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="public-project-details-link"
                      >
                        View on GitHub
                        <span>↗</span>
                      </a>
                    )}

                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="public-project-details-link"
                      >
                        Watch Video
                        <span>↗</span>
                      </a>
                    )}

                  </div>
                </div>
              )}

            </div>

          </aside>

        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && project && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={getMediaUrl(selectedImage)}
              alt="Enlarged screenshot"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />

            {/* Close button */}
            <button className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
              title="Close"
              style={{
                position: "absolute",
                top: "-55px",
                right: "-10px",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                background: "rgba(0, 0, 0, 0.75)",
                color: "white",
                fontSize: "28px",
                fontWeight: "600",
                lineHeight: "1",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                transition: "all 0.2s ease"
              }}
            >
              ×
            </button>

            {/* Previous button */}
            {project.images.indexOf(selectedImage) > 0 && (
              <button className="lightbox-nav lightbox-nav-prev"
                onClick={() => {
                  const currentIndex =
                    project.images.indexOf(selectedImage);

                  setSelectedImage(
                    project.images[currentIndex - 1]
                  );
                }}
                aria-label="Previous image"
                title="Previous image"
                style={{
                  position: "absolute",
                  left: "-75px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.2s ease"
                }}
              >
                ←
              </button>
            )}

            {/* Next button */}
            {project.images.indexOf(selectedImage) <
              project.images.length - 1 && (
              <button className="lightbox-nav lightbox-nav-next"
                onClick={() => {
                  const currentIndex =
                    project.images.indexOf(selectedImage);

                  setSelectedImage(
                    project.images[currentIndex + 1]
                  );
                }}
                aria-label="Next image"
                title="Next image"
                style={{
                  position: "absolute",
                  right: "-75px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  background: "rgba(0, 0, 0, 0.75)",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.2s ease"
                }}
              >
                →
              </button>
            )}

            {/* Image counter */}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: "14px"
              }}
            >
              {project.images.indexOf(selectedImage) + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}