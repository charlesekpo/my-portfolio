import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  getProjects,
  type Project
} from "../../api/projects.api";

function getMediaUrl(url: string) {
  if (!url) {
    return "";
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  const apiUrl =
    import.meta.env.VITE_API_URL || "";

  const serverUrl = apiUrl.replace(
    /\/api\/?$/,
    ""
  );

  return `${serverUrl}${url}`;
}

export default function Projects() {
  const {
    data: projects,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["public-projects"],
    queryFn: getProjects
  });

  if (isLoading) {
    return (
      <section className="public-projects-page">
        <div className="public-page-header">
          <h1>Projects</h1>

          <p>
            Things I've built and worked on.
          </p>
        </div>

        <div className="public-projects-loading">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error(
      "Failed to load public projects:",
      error
    );

    return (
      <section className="public-projects-page">
        <div className="public-page-header">
          <h1>Projects</h1>

          <p>
            Things I've built and worked on.
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

  const publishedProjects =
    projects?.filter(
      (project: Project) =>
        project.published
    ) ?? [];

  return (
    <section className="public-projects-page">
      <div className="public-page-header">
        <h1>Projects</h1>

        <p>
          Things I've built and worked on.
        </p>
      </div>

      {publishedProjects.length === 0 ? (
        <div className="public-projects-empty">
          <h2>No projects available</h2>

          <p>
            Projects will appear here once
            they are published.
          </p>
        </div>
      ) : (
        <div className="public-projects-grid">
          {publishedProjects.map(
            (project) => (
              <article
                key={project._id}
                className="public-project-card"
              >
                {project.thumbnail ? (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="public-project-image-link"
                  >
                    <img
                      src={getMediaUrl(
                        project.thumbnail
                      )}
                      alt={project.title}
                      className="public-project-image"
                    />
                  </Link>
                ) : (
                  <div className="public-project-image-placeholder">
                    <span>
                      {project.title}
                    </span>
                  </div>
                )}

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
                    {
                      project.shortDescription
                    }
                  </p>

                  {project.technologies
                    .length > 0 && (
                    <div className="public-project-technologies">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={
                              technology
                            }
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  <div className="public-project-actions">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="primary-button"
                    >
                      View Project
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={
                          project.liveUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-button"
                      >
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}