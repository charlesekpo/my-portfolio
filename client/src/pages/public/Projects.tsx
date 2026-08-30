import {
  useQuery
} from "@tanstack/react-query";

import {
  Link
} from "react-router-dom";

import {
  getPublicProjects
} from "../../api/projects.api";

function getMediaUrl(
  path: string
) {
  if (!path) {
    return "";
  }

  const apiUrl =
    import.meta.env.VITE_API_URL;

  const baseUrl =
    apiUrl.replace("/api", "");

  return `${baseUrl}${path}`;
}

export default function Projects() {
  const {
    data: projects,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["public-projects"],
    queryFn: getPublicProjects
  });

  if (isLoading) {
    return (
      <section className="public-projects-page">
        <div className="public-page-header">
          <h1>Projects</h1>

          <p>
            A selection of my work and
            projects.
          </p>
        </div>

        <div className="public-projects-loading">
          <p>
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="public-projects-page">
        <div className="public-page-header">
          <h1>Projects</h1>

          <p>
            A selection of my work and
            projects.
          </p>
        </div>

        <div className="public-projects-error">
          <p>
            Failed to load projects.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="public-projects-page">
      <div className="public-page-header">
        <h1>Projects</h1>

        <p>
          A selection of my work and
          projects.
        </p>
      </div>

      {projects &&
      projects.length > 0 ? (
        <div className="public-projects-grid">
          {projects.map((project) => (
            <article
              key={project._id}
              className="public-project-card"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="public-project-image-link"
              >
                {project.thumbnail ? (
                  <img
                    src={getMediaUrl(
                      project.thumbnail
                    )}
                    alt={project.title}
                    className="public-project-image"
                  />
                ) : (
                  <div className="public-project-image-placeholder">
                    No image
                  </div>
                )}
              </Link>

              <div className="public-project-content">
                <div className="public-project-title-row">
                  <h2>
                    {project.title}
                  </h2>

                  {project.featured && (
                    <span className="public-project-badge">
                      Featured
                    </span>
                  )}
                </div>

                <p className="public-project-description">
                  {project.shortDescription}
                </p>

                <div className="public-project-technologies">
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

                <div className="public-project-actions">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="primary-button"
                  >
                    View Project
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button"
                    >
                      Live Site
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="public-projects-empty">
          <h2>
            No projects yet
          </h2>

          <p>
            Projects will appear here
            once they are published.
          </p>
        </div>
      )}
    </section>
  );
}