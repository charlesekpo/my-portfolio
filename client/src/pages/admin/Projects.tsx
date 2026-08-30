import {
  useQuery
} from "@tanstack/react-query";

import {
  getProjects
} from "../../api/projects.api";

export default function Projects() {
  const {
    data: projects,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  if (isLoading) {
    return (
      <section>
        <h2>Projects</h2>
        <p>Loading projects...</p>
      </section>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <section>
        <h2>Projects</h2>

        <p>
          Failed to load projects.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Projects</h2>

          <p>
            Manage the projects displayed
            on your portfolio.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
        >
          Add Project
        </button>
      </div>

      {projects &&
      projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) => (
            <article
              key={project._id}
              className="project-admin-card"
            >
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="project-admin-image"
                />
              )}

              <div className="project-admin-content">
                <div className="project-admin-title">
                  <h3>
                    {project.title}
                  </h3>

                  {project.featured && (
                    <span className="badge featured">
                      Featured
                    </span>
                  )}

                  {project.published ? (
                    <span className="badge published">
                      Published
                    </span>
                  ) : (
                    <span className="badge draft">
                      Draft
                    </span>
                  )}
                </div>

                <p>
                  {project.shortDescription}
                </p>

                <div className="technology-list">
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

                <div className="project-admin-actions">
                  <button
                    type="button"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>
            No projects yet
          </h3>

          <p>
            Create your first project
            to display it on your
            portfolio.
          </p>
        </div>
      )}
    </section>
  );
}