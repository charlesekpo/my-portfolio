import {
  useEffect,
  useState
} from "react";

import {
  getSettings,
  saveSettings
} from "../../api/settings.api";

export default function Settings() {
  const [
    isLoading,
    setIsLoading
  ] = useState(true);

  const [
    isSaving,
    setIsSaving
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  const [
    success,
    setSuccess
  ] = useState("");

  const [
    fullName,
    setFullName
  ] = useState("");

  const [
    professionalTitle,
    setProfessionalTitle
  ] = useState("");

  const [
    shortBio,
    setShortBio
  ] = useState("");

  const [
    about,
    setAbout
  ] = useState("");

  const [
    profileImage,
    setProfileImage
  ] = useState("");

  const [
    resumeUrl,
    setResumeUrl
  ] = useState("");

  const [
    email,
    setEmail
  ] = useState("");

  const [
    phone,
    setPhone
  ] = useState("");

  const [
    location,
    setLocation
  ] = useState("");

  const [
    githubUrl,
    setGithubUrl
  ] = useState("");

  const [
    linkedinUrl,
    setLinkedinUrl
  ] = useState("");

  const [
    twitterUrl,
    setTwitterUrl
  ] = useState("");

  const [
    websiteUrl,
    setWebsiteUrl
  ] = useState("");

  const [
    availableForWork,
    setAvailableForWork
  ] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings =
          await getSettings();

        if (settings) {
          setFullName(
            settings.fullName
          );

          setProfessionalTitle(
            settings.professionalTitle
          );

          setShortBio(
            settings.shortBio
          );

          setAbout(
            settings.about
          );

          setProfileImage(
            settings.profileImage ?? ""
          );

          setResumeUrl(
            settings.resumeUrl ?? ""
          );

          setEmail(
            settings.email ?? ""
          );

          setPhone(
            settings.phone ?? ""
          );

          setLocation(
            settings.location ?? ""
          );

          setGithubUrl(
            settings.githubUrl ?? ""
          );

          setLinkedinUrl(
            settings.linkedinUrl ?? ""
          );

          setTwitterUrl(
            settings.twitterUrl ?? ""
          );

          setWebsiteUrl(
            settings.websiteUrl ?? ""
          );

          setAvailableForWork(
            settings.availableForWork
          );
        }
      } catch {
        setError(
          "Failed to load site settings."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadSettings();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<
      HTMLFormElement
    >
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      await saveSettings({
        fullName,
        professionalTitle,
        shortBio,
        about,
        profileImage:
          profileImage || undefined,
        resumeUrl:
          resumeUrl || undefined,
        email:
          email || undefined,
        phone:
          phone || undefined,
        location:
          location || undefined,
        githubUrl:
          githubUrl || undefined,
        linkedinUrl:
          linkedinUrl || undefined,
        twitterUrl:
          twitterUrl || undefined,
        websiteUrl:
          websiteUrl || undefined,
        availableForWork
      });

      setSuccess(
        "Site settings saved successfully."
      );
    } catch {
      setError(
        "Failed to save site settings. Please check your information and try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <section>
        <h2>
          Site Settings
        </h2>

        <p>
          Loading settings...
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>
            Site Settings
          </h2>

          <p>
            Manage your personal and
            professional portfolio information.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="project-form"
      >
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}

        <div className="form-section">
          <h3>
            Personal Information
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="full-name">
                Full Name
              </label>

              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(
                    event.target.value
                  )
                }
                required
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="professional-title">
                Professional Title
              </label>

              <input
                id="professional-title"
                type="text"
                value={professionalTitle}
                onChange={(event) =>
                  setProfessionalTitle(
                    event.target.value
                  )
                }
                required
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="short-bio">
              Short Bio
            </label>

            <textarea
              id="short-bio"
              value={shortBio}
              onChange={(event) =>
                setShortBio(
                  event.target.value
                )
              }
              rows={3}
              required
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">
              About
            </label>

            <textarea
              id="about"
              value={about}
              onChange={(event) =>
                setAbout(
                  event.target.value
                )
              }
              rows={8}
              required
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>
            Portfolio Assets
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="profile-image">
                Profile Image URL
              </label>

              <input
                id="profile-image"
                type="text"
                value={profileImage}
                onChange={(event) =>
                  setProfileImage(
                    event.target.value
                  )
                }
                placeholder="/uploads/profile.jpg"
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume-url">
                Resume URL
              </label>

              <input
                id="resume-url"
                type="text"
                value={resumeUrl}
                onChange={(event) =>
                  setResumeUrl(
                    event.target.value
                  )
                }
                placeholder="/uploads/resume.pdf"
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            Contact Information
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(
                    event.target.value
                  )
                }
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            Social Links
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="github-url">
                GitHub URL
              </label>

              <input
                id="github-url"
                type="url"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(
                    event.target.value
                  )
                }
                placeholder="https://github.com/..."
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedin-url">
                LinkedIn URL
              </label>

              <input
                id="linkedin-url"
                type="url"
                value={linkedinUrl}
                onChange={(event) =>
                  setLinkedinUrl(
                    event.target.value
                  )
                }
                placeholder="https://linkedin.com/in/..."
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="website-url">
                Website URL
              </label>

              <input
                id="website-url"
                type="url"
                value={websiteUrl}
                onChange={(event) =>
                  setWebsiteUrl(
                    event.target.value
                  )
                }
                disabled={isSaving}
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter-url">
                Twitter / X URL
              </label>

              <input
                id="twitter-url"
                type="url"
                value={twitterUrl}
                onChange={(event) =>
                  setTwitterUrl(
                    event.target.value
                  )
                }
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>
            Availability
          </h3>

          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={availableForWork}
                onChange={(event) =>
                  setAvailableForWork(
                    event.target.checked
                  )
                }
                disabled={isSaving}
              />

              <span>
                Available for work
              </span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </form>
    </section>
  );
}