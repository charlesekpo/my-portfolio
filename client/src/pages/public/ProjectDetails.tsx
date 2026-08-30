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
    queryKey: [
      "project",
      slug
    ],
    queryFn: () =>
      getProjectBySlug(slug as string),
    enabled: Boolean(slug)
  });

  if (isLoading) {
    return (
      <main className="public-project-details">
        <p>
          Loading project...
        </p>
      </main>
    );
  }

  if (isError || !project) {
    return (
      <main className="public-project-details">
        <h1>
          Project not found
        </h1>

        <Link to="/projects">
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="public-project-details">
      <div className="public-project-details-header">
        <Link
          to="/projects"
          className="public-project-back"
        >
          ← Back to Projects
        </Link>

        <div className="public-project-details-title">
          <h1>
            {project.title}
          </h1>

          {project.featured && (
            <span className="public-project-badge">
              Featured
            </span>
          )}
        </div>

        <p className="public-project-details-short-description">
          {project.shortDescription}
        </p>
      </div>

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

      <div className="public-project-details-body">
        <section>
          <h2>
            About This Project
          </h2>

          <p>
            {project.description}
          </p>
        </section>

        {project.technologies.length >
          0 && (
          <section>
            <h2>
              Technologies
            </h2>

            <div className="public-project-details-technologies">
              {project.technologies.map(
                (
                  technology: string
                ) => (
                  <span
                    key={technology}
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          </section>
        )}

        {project.images.length >
          0 && (
          <section>
            <h2>
              Project Images
            </h2>

            <div className="public-project-details-gallery">
              {project.images.map(
                (
                  image: string,
                  index: number
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

        {(project.liveUrl ||
          project.githubUrl ||
          project.videoUrl) && (
          <section>
            <h2>
              Project Links
            </h2>

            <div className="public-project-details-links">
              {project.liveUrl && (
                <a
                  href={
                    project.liveUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Project
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={
                    project.githubUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {project.videoUrl && (
                <a
                  href={
                    project.videoUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Video
                </a>
              )}
            </div>
          </section>
        )}
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