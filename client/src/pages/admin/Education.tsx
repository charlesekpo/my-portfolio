import {
  useEffect,
  useState
} from "react";

import type {
  ChangeEvent,
  FormEvent
} from "react";

import {
  createEducation,
  deleteEducation,
  getAdminEducation,
  updateEducation,
  type Education,
  type EducationInput
} from "../../api/education.api";

const initialForm: EducationInput = {
  institution: "",
  qualification: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  sortOrder: 0,
  published: true
};

export default function Education() {
  const [education, setEducation] =
    useState<Education[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState<EducationInput>(
      initialForm
    );

  const [editingId, setEditingId] =
    useState<string | null>(null);

  async function loadEducation() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminEducation();

      setEducation(data);
    } catch {
      setError(
        "Failed to load education records."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEducation();
  }, []);

  function handleChange(
    event: ChangeEvent<
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
    event: ChangeEvent<HTMLInputElement>
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
    setEditingId(null);
    setError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setError("");

      const input: EducationInput = {
        ...form,
        startDate:
          form.startDate || undefined,
        endDate:
          form.current
            ? undefined
            : form.endDate || undefined
      };

      if (editingId) {
        await updateEducation(
          editingId,
          input
        );
      } else {
        await createEducation(input);
      }

      resetForm();
      await loadEducation();
    } catch {
      setError(
        "Failed to save education record."
      );
    }
  }

  function handleEdit(
    item: Education
  ) {
    setEditingId(item._id);

    setForm({
      institution: item.institution,
      qualification:
        item.qualification,
      fieldOfStudy:
        item.fieldOfStudy,
      location: item.location,

      startDate:
        item.startDate
          ? item.startDate.slice(0, 10)
          : "",

      endDate:
        item.endDate
          ? item.endDate.slice(0, 10)
          : "",

      current: item.current,

      description:
        item.description,

      sortOrder:
        item.sortOrder,

      published:
        item.published
    });

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
        "Delete this education record?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEducation(id);
      await loadEducation();
    } catch {
      setError(
        "Failed to delete education record."
      );
    }
  }

  return (
    <section className="admin-management-page">

      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">
            PORTFOLIO
          </span>

          <h2>
            Education
          </h2>

          <p>
            Manage your educational
            background and qualifications.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}

      <div className="admin-management-grid">

        <section className="admin-form-card">

          <div className="admin-form-card-header">
            <h3>
              {editingId
                ? "Edit Education"
                : "Add Education"}
            </h3>

            <p>
              Add qualifications,
              certifications or academic
              education.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            <label>
              <span>
                Institution *
              </span>

              <input
                name="institution"
                value={form.institution}
                onChange={handleChange}
                placeholder="University or institution"
                required
              />
            </label>

            <label>
              <span>
                Qualification *
              </span>

              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Bachelor's Degree"
                required
              />
            </label>

            <label>
              <span>
                Field of Study
              </span>

              <input
                name="fieldOfStudy"
                value={form.fieldOfStudy}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </label>

            <label>
              <span>
                Location
              </span>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </label>

            <div className="admin-form-row">

              <label>
                <span>
                  Start Date
                </span>

                <input
                  type="date"
                  name="startDate"
                  value={
                    form.startDate || ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>
                  End Date
                </span>

                <input
                  type="date"
                  name="endDate"
                  value={
                    form.endDate || ""
                  }
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
                onChange={
                  handleCheckboxChange
                }
              />

              <span>
                I am currently studying here
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
                placeholder="Relevant achievements, focus areas or additional information"
                rows={5}
              />
            </label>

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
                onChange={
                  handleCheckboxChange
                }
              />

              <span>
                Published
              </span>
            </label>

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-primary-button"
              >
                {editingId
                  ? "Update Education"
                  : "Add Education"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        <section className="admin-list-card">

          <div className="admin-list-card-header">
            <h3>
              Your Education
            </h3>

            <span>
              {education.length} record
              {education.length === 1
                ? ""
                : "s"}
            </span>
          </div>

          {loading ? (
            <p className="admin-empty-state">
              Loading education...
            </p>
          ) : education.length === 0 ? (
            <p className="admin-empty-state">
              No education records yet.
            </p>
          ) : (
            <div className="admin-record-list">

              {education.map((item) => (
                <article
                  key={item._id}
                  className="admin-record"
                >

                  <div className="admin-record-content">

                    <h4>
                      {item.qualification}
                    </h4>

                    <strong>
                      {item.institution}
                    </strong>

                    {item.fieldOfStudy && (
                      <p>
                        {item.fieldOfStudy}
                      </p>
                    )}

                    <div className="admin-record-meta">
                      {item.startDate &&
                        new Date(
                          item.startDate
                        ).getFullYear()}

                      {item.endDate &&
                        ` — ${new Date(
                          item.endDate
                        ).getFullYear()}`}

                      {item.current &&
                        " — Present"}
                    </div>

                    {!item.published && (
                      <span className="admin-status-badge">
                        Draft
                      </span>
                    )}

                  </div>

                  <div className="admin-record-actions">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="admin-danger-button"
                    >
                      Delete
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>

    </section>
  );
}