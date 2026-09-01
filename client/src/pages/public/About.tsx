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
  getSkills
} from "../../api/skills.api";

import {
  getExperience
} from "../../api/experience.api";

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

const categoryLabels: Record<
  string,
  string
> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  tools: "Tools",
  other: "Other"
};

export default function About() {
  const settingsQuery =
    useQuery({
      queryKey: ["settings"],
      queryFn: getSettings
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

  const settings =
    settingsQuery.data;

  const skills =
    skillsQuery.data ?? [];

  const experience =
    experienceQuery.data ?? [];

  const skillGroups =
    Object.entries(
      skills.reduce(
        (
          groups,
          skill
        ) => {
          if (!groups[skill.category]) {
            groups[skill.category] = [];
          }

          groups[skill.category].push(
            skill
          );

          return groups;
        },
        {} as Record<
          string,
          typeof skills
        >
      )
    );

  const isLoading =
    settingsQuery.isLoading ||
    skillsQuery.isLoading ||
    experienceQuery.isLoading;

  if (isLoading) {
    return (
      <main className="about-page">
        <section className="about-loading">
          <div className="about-loading-spinner" />
          <p>
            Loading about page...
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="about-page">

      {/* ==========================================
          Page Header
      ========================================== */}

      <section className="about-intro">

        <div className="about-intro-copy">

          <p className="about-eyebrow">
            About me
          </p>

          <h1>
            {settings?.fullName ??
              "About Me"}
          </h1>

          <h2>
            {settings?.professionalTitle ??
              "Full-Stack Developer"}
          </h2>

          <p className="about-short-bio">
            {settings?.shortBio ??
              "I build modern and reliable web applications."}
          </p>

        </div>

        {settings?.profileImage && (
          <div className="about-profile-wrapper">
            <img
              src={getMediaUrl(
                settings.profileImage
              )}
              alt={
                settings.fullName
              }
              className="about-profile-image"
            />
          </div>
        )}

      </section>


      {/* ==========================================
          About
      ========================================== */}

      <section className="about-section about-story">

        <div className="about-section-heading">
          <p className="about-eyebrow">
            My story
          </p>

          <h2>
            A little more about me
          </h2>
        </div>

        <div className="about-story-content">

          <div className="about-story-text">
            {settings?.about ? (
              settings.about
                .split(/\n\s*\n/)
                .map(
                  (
                    paragraph,
                    index
                  ) => (
                    <p
                      key={index}
                    >
                      {paragraph}
                    </p>
                  )
                )
            ) : (
              <p>
                More information about
                my background and
                experience will be
                available here soon.
              </p>
            )}
          </div>

          <div className="about-details">

            {settings?.location && (
              <div className="about-detail">
                <span>
                  Location
                </span>

                <strong>
                  {settings.location}
                </strong>
              </div>
            )}

            {settings?.email && (
              <div className="about-detail">
                <span>
                  Email
                </span>

                <a
                  href={`mailto:${settings.email}`}
                >
                  {settings.email}
                </a>
              </div>
            )}

            {settings?.phone && (
              <div className="about-detail">
                <span>
                  Phone
                </span>

                <a
                  href={`tel:${settings.phone}`}
                >
                  {settings.phone}
                </a>
              </div>
            )}

            {settings?.availableForWork && (
              <div className="about-detail about-detail-available">
                <span>
                  Availability
                </span>

                <strong>
                  Available for work
                </strong>
              </div>
            )}

            {settings?.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="about-resume-button"
              >
                View Resume →
              </a>
            )}

          </div>

        </div>

      </section>


      {/* ==========================================
          Skills
      ========================================== */}

      {skillGroups.length > 0 && (
        <section className="about-section">

          <div className="about-section-heading">
            <p className="about-eyebrow">
              My toolkit
            </p>

            <h2>
              Skills & Technologies
            </h2>

            <p>
              The technologies and tools I
              use to turn ideas into working
              products.
            </p>
          </div>

          <div className="about-skill-groups">

            {skillGroups.map(
              ([
                category,
                categorySkills
              ]) => (
                <div
                  key={category}
                  className="about-skill-group"
                >
                  <h3>
                    {categoryLabels[
                      category
                    ] ?? category}
                  </h3>

                  <div className="about-skill-list">

                    {categorySkills.map(
                      (skill) => (
                        <article
                          key={
                            skill._id
                          }
                          className="about-skill"
                        >
                          <div className="about-skill-header">

                            <div>
                              {skill.icon && (
                                <span className="about-skill-icon">
                                  {skill.icon}
                                </span>
                              )}

                              <strong>
                                {skill.name}
                              </strong>
                            </div>

                            <span>
                              {skill.level}%
                            </span>

                          </div>

                          <div className="about-skill-bar">
                            <span
                              style={{
                                width: `${skill.level}%`
                              }}
                            />
                          </div>

                          {skill.description && (
                            <p>
                              {
                                skill.description
                              }
                            </p>
                          )}

                        </article>
                      )
                    )}

                  </div>
                </div>
              )
            )}

          </div>

        </section>
      )}


      {/* ==========================================
          Experience
      ========================================== */}

      {experience.length > 0 && (
        <section className="about-section">

          <div className="about-section-heading">
            <p className="about-eyebrow">
              Career
            </p>

            <h2>
              Professional Experience
            </h2>

            <p>
              A timeline of my professional
              experience and the work I've
              contributed to.
            </p>
          </div>

          <div className="about-experience">

            {experience.map(
              (item) => (
                <article
                  key={item._id}
                  className="about-experience-item"
                >

                  <div className="about-experience-period">
                    <span>
                      {formatDate(
                        item.startDate
                      )}
                    </span>

                    <span>
                      —
                    </span>

                    <span>
                      {item.current
                        ? "Present"
                        : formatDate(
                            item.endDate
                          )}
                    </span>
                  </div>

                  <div className="about-experience-body">

                    <div className="about-experience-heading">
                      <div>
                        <h3>
                          {item.position}
                        </h3>

                        <h4>
                          {item.company}
                        </h4>
                      </div>

                      {item.current && (
                        <span className="about-current-badge">
                          Current
                        </span>
                      )}
                    </div>

                    {item.location && (
                      <p className="about-experience-location">
                        {item.location}
                      </p>
                    )}

                    <p className="about-experience-description">
                      {
                        item.description
                      }
                    </p>

                    {item.technologies
                      .length > 0 && (
                      <div className="about-experience-technologies">
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
              )
            )}

          </div>

        </section>
      )}


      {/* ==========================================
          Contact CTA
      ========================================== */}

      <section className="about-cta">

        <div>
          <p className="about-eyebrow">
            Let's connect
          </p>

          <h2>
            Interested in working together?
          </h2>

          <p>
            Have an idea, project or
            opportunity you'd like to
            discuss?
          </p>
        </div>

        <Link
          to="/contact"
          className="about-cta-button"
        >
          Contact Me →
        </Link>

      </section>

    </main>
  );
}