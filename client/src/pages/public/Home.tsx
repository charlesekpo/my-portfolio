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

import {
  getExperience
} from "../../api/experience.api";

import {
  getVideos
} from "../../api/videos.api";

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

function formatDate(
  value?: string
) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      year: "numeric"
    }
  ).format(new Date(value));
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

  const experienceQuery =
    useQuery({
      queryKey: ["experience"],
      queryFn: getExperience
    });

  const videosQuery =
    useQuery({
      queryKey: ["videos"],
      queryFn: getVideos
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

  const visibleExperience =
    experienceQuery.data?.slice(0, 3) ?? [];

  const featuredVideos =
    videosQuery.data
      ?.filter(
        (video) =>
          video.featured
      )
      .slice(0, 3) ?? [];

  const isLoading =
    settingsQuery.isLoading ||
    projectsQuery.isLoading ||
    skillsQuery.isLoading ||
    experienceQuery.isLoading ||
    videosQuery.isLoading;

  if (isLoading) {
    return (
      <main className="home-page">
        <section className="home-loading">
          <div className="home-loading-spinner" />
          <p>Loading portfolio...</p>
        </section>
      </main>
    );
  }

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
          Experience
      ===================================================== */}

      {visibleExperience.length > 0 && (
        <section className="home-section">

          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                My journey
              </p>

              <h2>
                Experience
              </h2>

              <p>
                Where I've worked and what
                I've been building.
              </p>
            </div>

            <Link
              to="/about"
              className="home-section-link"
            >
              More about me →
            </Link>
          </div>

          <div className="home-experience-list">

            {visibleExperience.map(
              (experience) => (
                <article
                  key={experience._id}
                  className="home-experience-card"
                >
                  <div className="home-experience-date">
                    <span>
                      {formatDate(
                        experience.startDate
                      )}
                    </span>

                    <span>
                      —
                    </span>

                    <span>
                      {experience.current
                        ? "Present"
                        : formatDate(
                            experience.endDate
                          )}
                    </span>
                  </div>

                  <div className="home-experience-content">
                    <h3>
                      {experience.position}
                    </h3>

                    <h4>
                      {experience.company}
                    </h4>

                    {experience.location && (
                      <p className="home-experience-location">
                        {experience.location}
                      </p>
                    )}

                    <p>
                      {experience.description}
                    </p>

                    <div className="home-experience-technologies">
                      {experience.technologies.map(
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
                  </div>
                </article>
              )
            )}

          </div>
        </section>
      )}


      {/* =====================================================
          Videos
      ===================================================== */}

      {featuredVideos.length > 0 && (
        <section className="home-section">

          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">
                Watch & learn
              </p>

              <h2>
                Featured Videos
              </h2>

              <p>
                Tutorials, technical content
                and other videos.
              </p>
            </div>

            <Link
              to="/videos"
              className="home-section-link"
            >
              View all videos →
            </Link>
          </div>

          <div className="home-videos-grid">

            {featuredVideos.map(
              (video) => (
                <article
                  key={video._id}
                  className="home-video-card"
                >
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="home-video-thumbnail"
                  >
                    {video.thumbnail ? (
                      <img
                        src={getMediaUrl(
                          video.thumbnail
                        )}
                        alt={
                          video.title
                        }
                      />
                    ) : (
                      <div>
                        Watch video
                      </div>
                    )}

                    <span className="home-video-play">
                      ▶
                    </span>
                  </a>

                  <div className="home-video-content">
                    <span className="home-video-platform">
                      {video.platform}
                    </span>

                    <h3>
                      {video.title}
                    </h3>

                    <p>
                      {video.description}
                    </p>
                  </div>
                </article>
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