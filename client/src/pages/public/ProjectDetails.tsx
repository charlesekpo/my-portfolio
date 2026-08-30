import {
  Link,
  useParams
} from "react-router-dom";

import {
  useQuery
} from "@tanstack/react-query";

import {
  type Project
} from "../../api/projects.api";

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

  const {
    data: project,
    isLoading,
    isError
  } = useQuery<Project>({
    queryKey: ["project", slug],
    queryFn: () =>
      getProjectBySlug(slug as string),
    enabled: Boolean(slug)
  });

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
    </main>
  );
}

async function getProjectBySlug(
  projectSlug: string
): Promise<Project> {
  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/projects/slug/${projectSlug}`
    );

  if (!response.ok) {
    throw new Error(
      "Failed to load project"
    );
  }

  const result: {
    success: boolean;
    data: Project;
  } = await response.json();

  return result.data;
}