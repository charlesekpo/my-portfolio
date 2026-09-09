import {
  useQuery
} from "@tanstack/react-query";

import {
  Link
} from "react-router-dom";

import {
  getPublicProjects
} from "../../api/projects.api";

import {
  getSettings
} from "../../api/settings.api";

import {
  getSkills
} from "../../api/skills.api";

const API_URL =
  import.meta.env.VITE_API_URL?.replace(
    /\/api\/?$/,
    ""
  ) ?? "";

function getMediaUrl(
  path?: string
) {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${API_URL}${path}`;
}

export default function Home() {
  const settingsQuery =
    useQuery({
      queryKey: ["settings"],
      queryFn: getSettings
    });

  const projectsQuery =
    useQuery({
      queryKey: ["public-projects"],
      queryFn: getPublicProjects
    });

  const skillsQuery =
    useQuery({
      queryKey: ["skills"],
      queryFn: getSkills
    });

  const settings =
    settingsQuery.data;

  const featuredProjects =
    projectsQuery.data
      ?.filter(
        (project) =>
          project.featured
      )
      .slice(0, 3) ?? [];

  const visibleSkills =
    skillsQuery.data?.slice(0, 8) ?? [];

  return (
    <main className="home-page">

      {/* =====================================================
          Hero
      ===================================================== */}

      <section className="home-hero">
        <div className="home-hero-content">

          <div className="home-hero-copy">

            {settings?.availableForWork && (
              <div className="home-availability">
                <span />
                Available for work
              </div>
            )}

            <p className="home-eyebrow">
              Welcome to my portfolio
            </p>

            <h1>
              {settings?.fullName ??
                "Your Name"}
            </h1>

            <h2>
              {settings?.professionalTitle ??
                "Full-Stack Developer"}
            </h2>

            <p className="home-hero-bio">
              {settings?.shortBio ??
                "I build modern, scalable and user-focused web applications."}
            </p>

            <div className="home-hero-actions">
              <Link
                to="/projects"
                className="home-button home-button-primary"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="home-button home-button-secondary"
              >
                Contact Me
              </Link>
            </div>

            <div className="home-social-links">

              {settings?.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {settings?.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              )}

            </div>
          </div>

          <div className="home-hero-visual">
            {settings?.profileImage ? (
              <img
                src={getMediaUrl(
                  settings.profileImage
                )}
                alt={
                  settings.fullName
                }
                className="home-profile-image"
              />
            ) : (
              <div className="home-profile-placeholder">
                <span>
                  {(
                    settings?.fullName ??
                    "YN"
                  )
                    .split(" ")
                    .map(
                      (part) =>
                        part[0]
                    )
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* =====================================================
          Featured Projects
      ===================================================== */}

      {featuredProjects.length > 0 && (
        <section className="home-section">

          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                Selected work
              </p>

              <h2>
                Featured Projects
              </h2>

              <p>
                A selection of projects I've
                built and worked on.
              </p>
            </div>

            <Link
              to="/projects"
              className="home-section-link"
            >
              View all projects →
            </Link>
          </div>

          <div className="home-projects-grid">

            {featuredProjects.map(
              (project) => (
                <article
                  key={project._id}
                  className="home-project-card"
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="home-project-image-link"
                  >
                    {project.thumbnail ? (
                      <img
                        src={getMediaUrl(
                          project.thumbnail
                        )}
                        alt={
                          project.title
                        }
                        className="home-project-image"
                      />
                    ) : (
                      <div className="home-project-placeholder">
                        Project
                      </div>
                    )}
                  </Link>

                  <div className="home-project-content">

                    <div className="home-project-heading">
                      <h3>
                        {project.title}
                      </h3>

                      <span>
                        Featured
                      </span>
                    </div>

                    <p>
                      {
                        project.shortDescription
                      }
                    </p>

                    <div className="home-project-technologies">
                      {project.technologies
                        .slice(0, 5)
                        .map(
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

                    <Link
                      to={`/projects/${project.slug}`}
                      className="home-project-link"
                    >
                      View project →
                    </Link>

                  </div>
                </article>
              )
            )}

          </div>
        </section>
      )}


      {/* =====================================================
          Skills
      ===================================================== */}

      {visibleSkills.length > 0 && (
        <section className="home-section home-skills-section">

          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                What I work with
              </p>

              <h2>
                Skills & Technologies
              </h2>

              <p>
                Technologies and tools I use
                to build reliable applications.
              </p>
            </div>
          </div>

          <div className="home-skills-grid">

            {visibleSkills.map(
              (skill) => (
                <div
                  key={skill._id}
                  className="home-skill-card"
                >
                  <div className="home-skill-top">
                    <div>
                      <h3>
                        {skill.name}
                      </h3>

                      <span>
                        {skill.category}
                      </span>
                    </div>

                    <strong>
                      {skill.level}%
                    </strong>
                  </div>

                  <div className="home-skill-bar">
                    <span
                      style={{
                        width: `${skill.level}%`
                      }}
                    />
                  </div>

                  {skill.description && (
                    <p>
                      {skill.description}
                    </p>
                  )}
                </div>
              )
            )}

          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="home-cta">

        <div>
          <p className="home-section-eyebrow">
            Let's work together
          </p>

          <h2>
            Have a project in mind?
          </h2>

          <p>
            I'm always open to discussing
            new projects, ideas and
            opportunities.
          </p>
        </div>

        <Link
          to="/contact"
          className="home-button home-button-primary"
        >
          Get in touch →
        </Link>

      </section>

    </main>
  );
}