import {
  useEffect,
  useState
} from "react";

import type { FormEvent } from "react";

import {
  getSettings
} from "../../api/settings.api";

import {
  sendMessage
} from "../../api/messages.api";

export default function Contact() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [settings, setSettings] =
  useState<Awaited<
    ReturnType<typeof getSettings>
  >>(null);

  useEffect(() => {
  getSettings()
    .then(setSettings)
    .catch(() => {
      setSettings(null);
    });
}, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess("");
    setError("");
    setIsSubmitting(true);

    try {
      await sendMessage({
        name,
        email,
        subject,
        message
      });

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setSuccess(
        "Your message has been sent successfully."
      );
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="public-contact">
      <div className="public-contact-container">

        <section className="public-contact-intro">
          <span className="public-section-eyebrow">
            CONTACT
          </span>

          <h1>
            Let's work together.
          </h1>

          <p>
            Have a project in mind, a question,
            or just want to say hello? Send me
            a message and I'll get back to you.
          </p>

          <div className="public-contact-info">

            {settings && (
              <>
                {settings.email && (
                  <div>
                    <span>Email</span>
                    <a
                      href={`mailto:${settings.email}`}
                    >
                      {settings.email}
                    </a>
                  </div>
                )}

                {settings.phone && (
                  <div>
                    <span>Phone</span>
                    <a
                      href={`tel:${settings.phone}`}
                    >
                      {settings.phone}
                    </a>
                  </div>
                )}

                {settings.location && (
                  <div>
                    <span>Location</span>
                    <p>
                      {settings.location}
                    </p>
                  </div>
                )}
              </>
            )}

          </div>
        </section>

        <section className="public-contact-card">
          <form
            onSubmit={handleSubmit}
          >
            <div className="public-contact-form-grid">

              <div className="public-contact-field">
                <label htmlFor="contact-name">
                  Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  required
                  maxLength={100}
                />
              </div>

              <div className="public-contact-field">
                <label htmlFor="contact-email">
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

            </div>

            <div className="public-contact-field">
              <label htmlFor="contact-subject">
                Subject
              </label>

              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(event) =>
                  setSubject(event.target.value)
                }
                placeholder="What is this about?"
                maxLength={200}
              />
            </div>

            <div className="public-contact-field">
              <label htmlFor="contact-message">
                Message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Tell me about your project..."
                rows={7}
                required
                maxLength={5000}
              />
            </div>

            {success && (
              <div className="public-contact-success">
                {success}
              </div>
            )}

            {error && (
              <div className="public-contact-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="public-contact-submit"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}