import {
  useEffect,
  useState
} from "react";

import {
  createExperience,
  deleteExperience,
  getAdminExperience,
  updateExperience,
  type Experience,
  type ExperienceInput
} from "../../api/experience.api";

const initialForm: ExperienceInput = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  technologies: [],
  sortOrder: 0,
  published: true
};

export default function Experience() {
  const [experiences, setExperiences] =
    useState<Experience[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState<ExperienceInput>(
      initialForm
    );

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [technologiesInput, setTechnologiesInput] =
    useState("");

  async function loadExperiences() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminExperience();

      setExperiences(data);
    } catch {
      setError(
        "Failed to load experience."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  function handleChange(
  event: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement
  >
) {
  const {
    name,
    value
  } = event.target;

  setForm((current) => ({
    ...current,
    [name]:
      name === "sortOrder"
        ? Number(value)
        : value
  }));
}

function handleCheckboxChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const {
    name,
    checked
  } = event.target;

  setForm((current) => ({
    ...current,
    [name]: checked
  }));
}

  function resetForm() {
    setForm(initialForm);
    setTechnologiesInput("");
    setEditingId(null);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const technologies =
      technologiesInput
        .split(",")
        .map((technology) =>
          technology.trim()
        )
        .filter(Boolean);

    const input: ExperienceInput = {
      ...form,
      technologies,

      ...(form.current ||
      !form.endDate
        ? {}
        : {
            endDate: form.endDate
          })
    };

    try {
      setError("");

      if (editingId) {
        await updateExperience(
          editingId,
          input
        );
      } else {
        await createExperience(
          input
        );
      }

      resetForm();

      await loadExperiences();
    } catch {
      setError(
        "Failed to save experience."
      );
    }
  }

  function handleEdit(
    experience: Experience
  ) {
    setEditingId(experience._id);

    setForm({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate:
        experience.startDate.slice(0, 10),
      endDate:
        experience.endDate?.slice(0, 10) ??
        "",
      current: experience.current,
      description: experience.description,
      technologies:
        experience.technologies,
      sortOrder:
        experience.sortOrder,
      published:
        experience.published
    });

    setTechnologiesInput(
      experience.technologies.join(", ")
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this experience?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteExperience(id);

      setExperiences((current) =>
        current.filter(
          (experience) =>
            experience._id !== id
        )
      );
    } catch {
      setError(
        "Failed to delete experience."
      );
    }
  }

  if (loading) {
    return (
      <section>
        <p>
          Loading experience...
        </p>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>
            Experience
          </h2>

          <p>
            Manage your professional
            experience and employment
            history.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      <div className="admin-form-card">
        <h3>
          {editingId
            ? "Edit Experience"
            : "Add Experience"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="admin-form"
        >
          <div className="admin-form-grid">
            <label>
              <span>
                Company
              </span>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>
                Position
              </span>

              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            <span>
              Location
            </span>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="City, Country"
            />
          </label>

          <div className="admin-form-grid">
            <label>
              <span>
                Start Date
              </span>

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>
                End Date
              </span>

              <input
                type="date"
                name="endDate"
                value={form.endDate ?? ""}
                onChange={handleChange}
                disabled={form.current}
              />
            </label>
          </div>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleCheckboxChange}
            />

            <span>
              This is my current position
            </span>
          </label>

          <label>
            <span>
              Description
            </span>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </label>

          <label>
            <span>
              Technologies
            </span>

            <input
              value={technologiesInput}
              onChange={(event) =>
                setTechnologiesInput(
                  event.target.value
                )
              }
              placeholder="React, Node.js, TypeScript"
            />
          </label>

          <div className="admin-form-grid">
            <label>
              <span>
                Sort Order
              </span>

              <input
                type="number"
                name="sortOrder"
                value={form.sortOrder}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label className="admin-checkbox">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleCheckboxChange}
              />

              <span>
                Published
              </span>
            </label>
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="admin-primary-button"
            >
              {editingId
                ? "Update Experience"
                : "Add Experience"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="admin-secondary-button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h3>
            Your Experience
          </h3>

          <span>
            {experiences.length} entries
          </span>
        </div>

        {experiences.length === 0 ? (
          <div className="admin-empty-state">
            <h3>
              No experience yet
            </h3>

            <p>
              Add your professional
              experience using the form
              above.
            </p>
          </div>
        ) : (
          <div className="admin-experience-list">
            {experiences.map(
              (experience) => (
                <article
                  key={experience._id}
                  className="admin-experience-item"
                >
                  <div>
                    <div className="admin-experience-heading">
                      <div>
                        <h3>
                          {experience.position}
                        </h3>

                        <p>
                          {experience.company}
                          {" · "}
                          {experience.location}
                        </p>
                      </div>

                      <span
                        className={
                          experience.published
                            ? "admin-status admin-status-published"
                            : "admin-status"
                        }
                      >
                        {experience.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    <p>
                      {experience.description}
                    </p>

                    {experience.technologies
                      .length > 0 && (
                      <div className="admin-tags">
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
                    )}
                  </div>

                  <div className="admin-item-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          experience
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          experience._id
                        )
                      }
                      className="admin-danger-button"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}