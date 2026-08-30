import { useState } from "react";

import {
  createProject,
  type CreateProjectData
} from "../../api/projects.api";

import { uploadMedia } from "../../api/media.api";

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
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);

  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [technologies, setTechnologies] =
    useState("");

  const [thumbnail, setThumbnail] =
    useState("");

  const [images, setImages] =
    useState<string[]>([]);

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

  const [uploadingThumbnail, setUploadingThumbnail] =
    useState(false);

  const [uploadingImages, setUploadingImages] =
    useState(false);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  }

  async function handleThumbnailUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingThumbnail(true);
      setError("");

      const media = await uploadMedia(file);

      setThumbnail(media.url);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to upload thumbnail."
      );
    } finally {
      setUploadingThumbnail(false);

      event.target.value = "";
    }
  }

  async function handleImagesUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) return;

    try {
      setUploadingImages(true);
      setError("");

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const media = await uploadMedia(file);

        uploadedUrls.push(media.url);
      }

      setImages((current) => [
        ...current,
        ...uploadedUrls
      ]);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to upload one or more project images."
      );
    } finally {
      setUploadingImages(false);

      event.target.value = "";
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
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

      const imageList = images;

      const data: CreateProjectData = {
        title: title.trim(),

        slug: slug.trim(),

        shortDescription:
          shortDescription.trim(),

        description:
          description.trim(),

        technologies:
          technologyList,

        thumbnail:
          thumbnail.trim(),

        images:
          imageList,

        featured,

        published,

        sortOrder:
          Number(sortOrder) || 0,

        ...(liveUrl.trim()
          ? {
              liveUrl:
                liveUrl.trim()
            }
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

  function removeImage(indexToRemove: number) {
    setImages((current) =>
      current.filter(
        (_image, index) =>
          index !== indexToRemove
      )
    );
  }

  return (
    <div className="project-form-wrapper">

      <div className="project-form-header">

        <div>

          <h2>
            Add Project
          </h2>

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

        {/* ------------------------------------------------ */}
        {/* Project Information */}
        {/* ------------------------------------------------ */}

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
              onChange={(event) => {
                setSlug(
                  generateSlug(
                    event.target.value
                  )
                );

                setSlugManuallyEdited(true);
              }}
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

        {/* ------------------------------------------------ */}
        {/* Technologies */}
        {/* ------------------------------------------------ */}

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

        {/* ------------------------------------------------ */}
        {/* Project Media */}
        {/* ------------------------------------------------ */}

        <div className="form-section">

          <h3>
            Project Media
          </h3>

          {/* Thumbnail */}

          <div className="form-group">

            <label htmlFor="thumbnail">
              Thumbnail
            </label>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={
                handleThumbnailUpload
              }
              disabled={
                uploadingThumbnail ||
                isSubmitting
              }
            />

            {uploadingThumbnail && (
              <p>
                Uploading thumbnail...
              </p>
            )}

            {thumbnail && (
              <div
                style={{
                  marginTop: "12px"
                }}
              >

                <img
                  src={`${
                    import.meta.env.VITE_API_URL
                      .replace("/api", "")
                  }${thumbnail}`}
                  alt="Project thumbnail preview"
                  style={{
                    width: "240px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />

              </div>
            )}

          </div>

          {/* Project Images */}

          <div className="form-group">

            <label htmlFor="images">
              Project Images
            </label>

            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImagesUpload
              }
              disabled={
                uploadingImages ||
                isSubmitting
              }
            />

            <small>
              Select one or more images
              for this project.
            </small>

            {uploadingImages && (
              <p>
                Uploading project images...
              </p>
            )}

            {images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "16px"
                }}
              >

                {images.map(
                  (imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      style={{
                        position:
                          "relative"
                      }}
                    >

                      <img
                        src={`${
                          import.meta.env
                            .VITE_API_URL
                            .replace(
                              "/api",
                              ""
                            )
                        }${imageUrl}`}
                        alt={`Project image ${
                          index + 1
                        }`}
                        style={{
                          width: "180px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        disabled={
                          isSubmitting ||
                          uploadingImages
                        }
                        style={{
                          display: "block",
                          marginTop: "6px"
                        }}
                      >
                        Remove
                      </button>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* Project Links */}
        {/* ------------------------------------------------ */}

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

        {/* ------------------------------------------------ */}
        {/* Publishing */}
        {/* ------------------------------------------------ */}

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

        {/* ------------------------------------------------ */}
        {/* Actions */}
        {/* ------------------------------------------------ */}

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
            disabled={
              isSubmitting ||
              uploadingThumbnail ||
              uploadingImages
            }
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