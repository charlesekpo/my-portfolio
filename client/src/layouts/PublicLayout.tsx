import {
  useQuery
} from "@tanstack/react-query";

import {
  Link,
  NavLink,
  Outlet
} from "react-router-dom";

import {
  getSettings
} from "../api/settings.api";

export default function PublicLayout() {
  const {
    data: settings
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings
  });

  const socialLinks = [
    {
      label: "GitHub",
      url: settings?.githubUrl
    },
    {
      label: "LinkedIn",
      url: settings?.linkedinUrl
    },
    {
      label: "Twitter",
      url: settings?.twitterUrl
    }
  ].filter(
    (link) => Boolean(link.url)
  );

  return (
    <div className="public-layout">

      {/* ==========================================
          Header
      ========================================== */}

      <header className="public-header">
        <div className="public-header-inner">

          <Link
            to="/"
            className="public-logo"
          >
            <img
            src="/favicon.svg"
            alt="TechX"
            className="public-logo-image"
          />

          <span>TechX</span>
          </Link>

          <nav className="public-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "public-nav-link active"
                  : "public-nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "public-nav-link active"
                  : "public-nav-link"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "public-nav-link active"
                  : "public-nav-link"
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "public-nav-link active"
                  : "public-nav-link"
              }
            >
              Contact
            </NavLink>
          </nav>

          <Link
            to="/contact"
            className="public-header-button"
          >
            Let's talk
          </Link>

        </div>
      </header>


      {/* ==========================================
          Main Content
      ========================================== */}

      <main className="public-main">
        <Outlet />
      </main>


      {/* ==========================================
          Footer
      ========================================== */}

      <footer className="public-footer">
        <div className="public-footer-inner">

          <div className="public-footer-main">

            <div>
              <Link
                to="/"
                className="public-footer-logo"
              >
                <img
                src="/favicon.svg"
                alt="TechX"
                className="public-logo-image"
              />

              <span>TechX</span>
              </Link>

              <p>
                {settings?.professionalTitle ??
                  "Full-Stack Developer"}
              </p>
            </div>

            <div className="public-footer-links">

              <NavLink to="/about">
                About
              </NavLink>

              <NavLink to="/projects">
                Projects
              </NavLink>

  

              <NavLink to="/contact">
                Contact
              </NavLink>

            </div>

            {socialLinks.length > 0 && (
              <div className="public-footer-socials">

                {socialLinks.map(
                  (link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  )
                )}

              </div>
            )}

          </div>

          <div className="public-footer-bottom">
            <span>
              © {new Date().getFullYear()}{" "}
              <img
                src="/favicon.svg"
                alt="TechX"
                className="public-logo-image"
              />

              <span>TechX</span>
            </span>

            <Link to="/admin/login">
              Admin
            </Link>
          </div>

        </div>
      </footer>

    </div>
  );
}