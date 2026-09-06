import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import { useState } from "react";

import {
  createSkill,
  deleteSkill,
  getAdminSkills,
  updateSkill,
  type Skill,
  type SkillCategory
} from "../../api/skills.api";

interface SkillFormProps {
  skill?: Skill | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const categories: {
  value: SkillCategory;
  label: string;
}[] = [
  {
    value: "frontend",
    label: "Frontend"
  },
  {
    value: "backend",
    label: "Backend"
  },
  {
    value: "database",
    label: "Database"
  },
  {
    value: "devops",
    label: "DevOps"
  },
  {
    value: "tools",
    label: "Tools"
  },
  {
    value: "other",
    label: "Other"
  }
];

function SkillForm({
  skill,
  onSuccess,
  onCancel
}: SkillFormProps) {
  const isEditing = Boolean(skill);

  const [name, setName] = useState(
    skill?.name ?? ""
  );

  const [category, setCategory] =
    useState<SkillCategory>(
      skill?.category ?? "frontend"
    );

  const [level, setLevel] = useState(
    String(skill?.level ?? 50)
  );

  const [icon, setIcon] = useState(
    skill?.icon ?? ""
  );

  const [description, setDescription] =
    useState(skill?.description ?? "");

  const [sortOrder, setSortOrder] =
    useState(
      String(skill?.sortOrder ?? 0)
    );

  const [published, setPublished] =
    useState(
      skill?.published ?? true
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const numericLevel = Number(level);
    const numericSortOrder = Number(sortOrder);

    if (
      !name.trim() ||
      Number.isNaN(numericLevel) ||
      numericLevel < 0 ||
      numericLevel > 100
    ) {
      setError(
        "Please enter a valid skill name and level between 0 and 100."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        name: name.trim(),
        category,
        level: numericLevel,
        icon: icon.trim(),
        description: description.trim(),
        sortOrder: Number.isNaN(
          numericSortOrder
        )
          ? 0
          : numericSortOrder,
        published
      };

      if (skill) {
        await updateSkill(
          skill._id,
          data
        );
      } else {
        await createSkill(data);
      }

      onSuccess();
    } catch (err) {
      console.error(
        "Failed to save skill:",
        err
      );

      setError(
        "Failed to save skill. Please check your information and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="project-form-wrapper">
      <div className="project-form-header">
        <div>
          <h2>
            {isEditing
              ? "Edit Skill"
              : "Add Skill"}
          </h2>

          <p>
            {isEditing
              ? "Update this skill in your portfolio."
              : "Add a skill to your portfolio."}
          </p>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="project-form"
      >
        <div className="form-section">
          <h3>Skill Information</h3>

          <div className="form-group">
            <label htmlFor="skill-name">
              Skill Name
            </label>

            <input
              id="skill-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="React"
              maxLength={100}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skill-category">
              Category
            </label>

            <select
              id="skill-category"
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target
                    .value as SkillCategory
                )
              }
              disabled={isSubmitting}
            >
              {categories.map(
                (item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skill-level">
              Proficiency Level
            </label>

            <input
              id="skill-level"
              type="number"
              min="0"
              max="100"
              value={level}
              onChange={(event) =>
                setLevel(
                  event.target.value
                )
              }
              required
              disabled={isSubmitting}
            />

            <small>
              Enter a value from 0 to 100.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="skill-icon">
              Icon
            </label>

            <input
              id="skill-icon"
              type="text"
              value={icon}
              onChange={(event) =>
                setIcon(
                  event.target.value
                )
              }
              placeholder="react"
              disabled={isSubmitting}
            />

            <small>
              Optional icon name or identifier.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="skill-description">
              Description
            </label>

            <textarea
              id="skill-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Describe your experience with this technology..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Publishing</h3>

          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={published}
                onChange={(event) =>
                  setPublished(
                    event.target.checked
                  )
                }
                disabled={isSubmitting}
              />

              <span>
                Published
              </span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="skill-sort-order">
              Sort Order
            </label>

            <input
              id="skill-sort-order"
              type="number"
              min="0"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  event.target.value
                )
              }
              disabled={isSubmitting}
            />

            <small>
              Lower numbers appear first.
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="secondary-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-button"
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Update Skill"
                : "Save Skill"}
          </button>
        </div>
      </form>
    </div>
  );
}

function getCategoryLabel(
  category: SkillCategory
) {
  return (
    categories.find(
      (item) =>
        item.value === category
    )?.label ?? category
  );
}

function getLevelLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 50) return "Intermediate";
  if (level >= 25) return "Basic";

  return "Beginner";
}

export default function Skills() {
  const queryClient =
    useQueryClient();

  const [showForm, setShowForm] =
    useState(false);

  const [editingSkill, setEditingSkill] =
    useState<Skill | null>(null);

  const {
    data: skills,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["admin-skills"],
    queryFn: getAdminSkills
  });

  async function refreshSkills() {
    await queryClient.invalidateQueries({
      queryKey: ["admin-skills"]
    });

    await queryClient.invalidateQueries({
      queryKey: ["dashboard-stats"]
    });

    setShowForm(false);
    setEditingSkill(null);
  }

  function handleEdit(skill: Skill) {
    setEditingSkill(skill);
    setShowForm(true);
  }

  async function handleDelete(skill: Skill) {
    const confirmed =
      window.confirm(
        `Delete "${skill.name}"? This cannot be undone.`
      );

    if (!confirmed) return;

    try {
      await deleteSkill(
        skill._id
      );

      await refreshSkills();
    } catch (err) {
      console.error(
        "Failed to delete skill:",
        err
      );

      window.alert(
        "Failed to delete skill. Please try again."
      );
    }
  }

  if (isLoading) {
    return (
      <section>
        <h2>Skills</h2>
        <p>Loading skills...</p>
      </section>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <section>
        <div className="page-header">
          <div>
            <h2>Skills</h2>

            <p>
              Manage the technologies and
              skills displayed on your
              portfolio.
            </p>
          </div>
        </div>

        <div className="form-error">
          Failed to load skills.
          Please make sure you are
          logged in.
        </div>
      </section>
    );
  }

  if (showForm) {
    return (
      <section>
        <SkillForm
          skill={editingSkill}
          onSuccess={refreshSkills}
          onCancel={() => {
            setShowForm(false);
            setEditingSkill(null);
          }}
        />
      </section>
    );
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Skills</h2>

          <p>
            Manage the technologies and
            skills displayed on your
            portfolio.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setEditingSkill(null);
            setShowForm(true);
          }}
        >
          Add Skill
        </button>
      </div>

      {skills &&
      skills.length > 0 ? (
        <div className="skills-admin-list">
          {skills.map((skill) => (
            <article
              key={skill._id}
              className="skill-admin-card"
            >
              <div className="skill-admin-content">
                <div className="skill-admin-title">
                  <div>
                    <h3>
                      {skill.name}
                    </h3>

                    <span className="skill-category">
                      {getCategoryLabel(
                        skill.category
                      )}
                    </span>
                  </div>

                  {skill.published ? (
                    <span className="badge published">
                      Published
                    </span>
                  ) : (
                    <span className="badge draft">
                      Draft
                    </span>
                  )}
                </div>

                {skill.description && (
                  <p>
                    {skill.description}
                  </p>
                )}

                <div className="skill-level-row">
                  <div>
                    <strong>
                      {skill.level}%
                    </strong>

                    <span>
                      {" "}
                      {getLevelLabel(
                        skill.level
                      )}
                    </span>
                  </div>

                  <div className="skill-level-track">
                    <div
                      className="skill-level-fill"
                      style={{
                        width: `${skill.level}%`
                      }}
                    />
                  </div>
                </div>

                <div className="skill-admin-meta">
                  <span>
                    Category:{" "}
                    {getCategoryLabel(
                      skill.category
                    )}
                  </span>

                  <span>
                    Order:{" "}
                    {skill.sortOrder}
                  </span>
                </div>

                <div className="project-admin-actions">
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(skill)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(skill)
                    }
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
            No skills yet
          </h3>

          <p>
            Add your first skill to
            start building your
            portfolio profile.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setShowForm(true)
            }
          >
            Add Your First Skill
          </button>
        </div>
      )}
    </section>
  );
}
