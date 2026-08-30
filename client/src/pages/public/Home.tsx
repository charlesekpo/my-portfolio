import {
  useQuery
} from "@tanstack/react-query";

import {
  Link
} from "react-router-dom";

import {
  getSettings
} from "../../api/settings.api";

import {
  getPublicProjects
} from "../../api/projects.api";

import {
  getSkills
} from "../../api/skills.api";

import {
  getExperience
} from "../../api/experience.api";

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

  const apiUrl =
    import.meta.env.VITE_API_URL || "";

  return `${apiUrl.replace(/\/api\/?$/, "")}${path}`;
}

function formatDate(
  value?: string
) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric"
    }
  );
}

export default function Home() {
  const settingsQuery =
    useQuery({
      queryKey: ["public-settings"],
      queryFn: getSettings
    });

  const projectsQuery =
    useQuery({
      queryKey: ["public-projects"],
      queryFn: getPublicProjects
    });

  const skillsQuery =
    useQuery({
      queryKey: ["public-skills"],
      queryFn: getSkills
    });

  const experienceQuery =
    useQuery({
      queryKey: ["public-experience"],
      queryFn: getExperience
    });

  const settings =
    settingsQuery.data;

  const projects =
    projectsQuery.data ?? [];

  const skills =
    (skillsQuery.data ?? [])
      .filter(
        (skill) => skill.published
      )
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder
      );

  const experience =
    (experienceQuery.data ?? [])
      .filter(
        (item) => item.published
      )
      .sort(
        (a, b) =>
          a.sortOrder - b.sortOrder
      );

  const featuredProjects =
    projects
      .filter(
        (project) => project.featured
      )
      .slice(0, 3);

  const displayedProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : projects.slice(0, 3);

  const skillsByCategory =
    skills.reduce<
      Record<string, typeof skills>
    >(
      (groups, skill) => {
        if (!groups[skill.category]) {
          groups[skill.category] = [];
        }

        groups[skill.category].push(
          skill
        );

        return groups;
      },
      {}
    );

  if (
    settingsQuery.isLoading ||
    projectsQuery.isLoading ||
    skillsQuery.isLoading ||
    experienceQuery.isLoading
  ) {
    return (
      <div className="public-home-loading">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="public-home">
      <section className="home-hero">
        <div className="home-hero-content">
          {settings?.availableForWork && (
            <div className="availability-badge">
              <span />
              Available for work
            </div>
          )}

          <p className="home-eyebrow">
            {settings?.professionalTitle ||
              "Software Developer"}
          </p>

          <h1>
            {settings?.fullName ||
              "Welcome to my portfolio"}
          </h1>

          <p className="home-hero-bio">
            {settings?.shortBio ||
              "I build modern web applications and digital experiences."}
          </p>

          <div className="home-hero-actions">
            <Link
              to="/projects"
              className="primary-button"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="secondary-button"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {settings?.profileImage && (
          <div className="home-hero-image-wrapper">
            <img
              src={getMediaUrl(
                settings.profileImage
              )}
              alt={
                settings.fullName
              }
              className="home-hero-image"
            />
          </div>
        )}
      </section>

      {displayedProjects.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                Selected work
              </p>

              <h2>
                Featured Projects
              </h2>
            </div>

            <Link to="/projects">
              View all projects →
            </Link>
          </div>

          <div className="home-project-grid">
            {displayedProjects.map(
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
                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {
                        project.shortDescription
                      }
                    </p>

                    <div className="home-project-technologies">
                      {project.technologies
                        .slice(0, 5)
                        .map(
                          (
                            technology
                          ) => (
                            <span
                              key={
                                technology
                              }
                            >
                              {
                                technology
                              }
                            </span>
                          )
                        )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-link"
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

      {Object.keys(
        skillsByCategory
      ).length > 0 && (
        <section className="home-section home-skills-section">
          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                What I work with
              </p>

              <h2>
                Skills & Technologies
              </h2>
            </div>
          </div>

          <div className="home-skills-grid">
            {Object.entries(
              skillsByCategory
            ).map(
              ([
                category,
                categorySkills
              ]) => (
                <div
                  key={category}
                  className="home-skill-group"
                >
                  <h3>
                    {category
                      .charAt(0)
                      .toUpperCase() +
                      category.slice(
                        1
                      )}
                  </h3>

                  <div className="home-skill-list">
                    {categorySkills.map(
                      (skill) => (
                        <div
                          key={
                            skill._id
                          }
                          className="home-skill"
                        >
                          <div className="home-skill-top">
                            <span>
                              {
                                skill.name
                              }
                            </span>

                            <span>
                              {
                                skill.level
                              }%
                            </span>
                          </div>

                          <div className="skill-bar">
                            <div
                              className="skill-bar-fill"
                              style={{
                                width: `${skill.level}%`
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                My background
              </p>

              <h2>
                Experience
              </h2>
            </div>
          </div>

          <div className="home-experience-list">
            {experience
              .slice(0, 4)
              .map((item) => (
                <article
                  key={item._id}
                  className="home-experience-item"
                >
                  <div className="home-experience-date">
                    <span>
                      {formatDate(
                        item.startDate
                      )}
                    </span>

                    <span>
                      {item.current
                        ? "Present"
                        : formatDate(
                            item.endDate
                          )}
                    </span>
                  </div>

                  <div className="home-experience-content">
                    <h3>
                      {item.position}
                    </h3>

                    <p className="home-experience-company">
                      {item.company}
                      {item.location
                        ? ` · ${item.location}`
                        : ""}
                    </p>

                    <p>
                      {item.description}
                    </p>

                    {item.technologies
                      .length > 0 && (
                      <div className="home-experience-technologies">
                        {item.technologies.map(
                          (
                            technology
                          ) => (
                            <span
                              key={
                                technology
                              }
                            >
                              {
                                technology
                              }
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}

      {settings?.about && (
        <section className="home-about-section">
          <div>
            <p className="home-section-eyebrow">
              About me
            </p>

            <h2>
              Building useful things
              with technology.
            </h2>
          </div>

          <div>
            <p>
              {settings.about}
            </p>

            <Link
              to="/about"
              className="text-link"
            >
              More about me →
            </Link>
          </div>
        </section>
      )}

      <section className="home-contact-cta">
        <p className="home-section-eyebrow">
          Let's work together
        </p>

        <h2>
          Have a project in mind?
        </h2>

        <p>
          Let's talk about how we can
          build something great.
        </p>

        <Link
          to="/contact"
          className="primary-button"
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}