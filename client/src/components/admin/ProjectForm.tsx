import {
  useState,
  type FormEvent
} from "react";

import {
  createProject,
  type CreateProjectData
} from "../../api/projects.api";

interface ProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({
  onSuccess,
  onCancel
}: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [technologies, setTechnologies] =
    useState("");
  const [thumbnail, setThumbnail] =
    useState("");
  const [images, setImages] =
    useState("");
  const [liveUrl, setLiveUrl] =
    useState("");
  const [githubUrl, setGithubUrl] =
    useState("");
  const [videoUrl, setVideoUrl] =
    useState("");
  const [featured, setFeatured] =
    useState(false);
  const [published, setPublished] =
    useState(true);
  const [sortOrder, setSortOrder] =
    useState("0");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(
    value: string
  ) {
    setTitle(value);

    if (!slug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const technologyList =
        technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

      const imageList =
        images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

      const data: CreateProjectData = {
        title: title.trim(),
        slug: slug.trim(),
        shortDescription:
          shortDescription.trim(),
        description: description.trim(),
        technologies: technologyList,
        thumbnail: thumbnail.trim(),
        images: imageList,
        featured,
        published,
        sortOrder:
          Number(sortOrder) || 0,

        ...(liveUrl.trim()
          ? { liveUrl: liveUrl.trim() }
          : {}),

        ...(githubUrl.trim()
          ? {
              githubUrl:
                githubUrl.trim()
            }
          : {}),

        ...(videoUrl.trim()
          ? {
              videoUrl:
                videoUrl.trim()
            }
          : {})
      };

      await createProject(data);

      onSuccess();
    } catch (err) {
      console.error(
        "Failed to create project:",
        err
      );

      setError(
        "Failed to create project. Please check your information and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="project-form-wrapper">
      <div className="project-form-header">
        <div>
          <h2>Add Project</h2>

          <p>
            Add a new project to your
            portfolio.
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
          <h3>
            Project Information
          </h3>

          <div className="form-group">
            <label htmlFor="title">
              Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="My Portfolio Website"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">
              Slug
            </label>

            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(
                  generateSlug(
                    event.target.value
                  )
                )
              }
              placeholder="my-portfolio-website"
              required
            />

            <small>
              Used in the project URL.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">
              Short Description
            </label>

            <input
              id="shortDescription"
              type="text"
              value={shortDescription}
              onChange={(event) =>
                setShortDescription(
                  event.target.value
                )
              }
              placeholder="A short summary of the project"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Describe the project..."
              rows={6}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>
            Technologies
          </h3>

          <div className="form-group">
            <label htmlFor="technologies">
              Technologies
            </label>

            <input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(event) =>
                setTechnologies(
                  event.target.value
                )
              }
              placeholder="React, Node.js, MongoDB, TypeScript"
              required
            />

            <small>
              Separate technologies with
              commas.
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>
            Project Media
          </h3>

          <div className="form-group">
            <label htmlFor="thumbnail">
              Thumbnail URL
            </label>

            <input
              id="thumbnail"
              type="text"
              value={thumbnail}
              onChange={(event) =>
                setThumbnail(
                  event.target.value
                )
              }
              placeholder="/uploads/images/project.jpg"
            />

            <small>
              We'll connect this field
              to the media uploader next.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="images">
              Project Image URLs
            </label>

            <input
              id="images"
              type="text"
              value={images}
              onChange={(event) =>
                setImages(
                  event.target.value
                )
              }
              placeholder="/uploads/images/image1.jpg, /uploads/images/image2.jpg"
            />

            <small>
              Separate image URLs with
              commas.
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>
            Project Links
          </h3>

          <div className="form-group">
            <label htmlFor="liveUrl">
              Live URL
            </label>

            <input
              id="liveUrl"
              type="url"
              value={liveUrl}
              onChange={(event) =>
                setLiveUrl(
                  event.target.value
                )
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubUrl">
              GitHub URL
            </label>

            <input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(event) =>
                setGithubUrl(
                  event.target.value
                )
              }
              placeholder="https://github.com/username/project"
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">
              Video URL
            </label>

            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(event) =>
                setVideoUrl(
                  event.target.value
                )
              }
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>
            Publishing
          </h3>

          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) =>
                  setFeatured(
                    event.target.checked
                  )
                }
              />

              <span>
                Featured project
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={published}
                onChange={(event) =>
                  setPublished(
                    event.target.checked
                  )
                }
              />

              <span>
                Published
              </span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="sortOrder">
              Sort Order
            </label>

            <input
              id="sortOrder"
              type="number"
              min="0"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  event.target.value
                )
              }
            />
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
              : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}