import {
  useQuery,
  useQueryClient,
  useMutation
} from "@tanstack/react-query";

import {
  getProjects,
  deleteProject
} from "../../api/projects.api";

import ProjectForm from "../../components/admin/ProjectForm";

import { useState } from "react";

import { getMediaUrl } from "../../utils/mediaUrl";

export default function Projects() {
  const [showForm, setShowForm] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState<string | null>(null);

  const queryClient =
    useQueryClient();

  const {
    data: projects,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"]
      });
    }
  });

  async function handleProjectCreated() {
    await queryClient.invalidateQueries({
      queryKey: ["projects"]
    });

    setShowForm(false);
    setEditingProject(null);
  }

  function handleEdit(projectId: string) {
    setEditingProject(projectId);
    setShowForm(true);
  }

  function handleDelete(projectId: string) {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(projectId);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProject(null);
  }

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

  if (showForm) {
    return (
      <section>
        <ProjectForm
          onSuccess={
            handleProjectCreated
          }
          onCancel={handleCancel}
          editingProjectId={editingProject}
        />
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
          onClick={() =>
            setShowForm(true)
          }
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
                  src={getMediaUrl(project.thumbnail)}
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
                    onClick={() => handleEdit(project._id)}
                    disabled={deleteMutation.isPending}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    disabled={deleteMutation.isPending}
                    className="danger-button"
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