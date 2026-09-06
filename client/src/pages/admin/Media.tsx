import {
  useEffect,
  useState
} from "react";

import {
  deleteMedia,
  getMedia,
  uploadMedia,
  type Media
} from "../../api/media.api";

function getMediaUrl(
  url: string
) {
  if (url.startsWith("http")) {
    return url;
  }

  const apiUrl =
    import.meta.env.VITE_API_URL;

  const serverUrl =
    apiUrl.replace("/api", "");

  return `${serverUrl}${url}`;
}

function formatFileSize(
  bytes: number
) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB"
  ];

  const index =
    Math.floor(
      Math.log(bytes) /
        Math.log(1024)
    );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(1)} ${units[index]}`;
}

export default function Media() {
  const [media, setMedia] =
    useState<Media[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function loadMedia() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getMedia();

      setMedia(data);
    } catch {
      setError(
        "Failed to load media."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedia();
  }, []);

  async function handleFileChange(
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const uploadedMedia =
        await uploadMedia(file);

      setMedia((current) => [
        uploadedMedia,
        ...current
      ]);

      setSuccess(
        `${file.name} uploaded successfully.`
      );
    } catch {
      setError(
        "Failed to upload file."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  async function handleDelete(
    item: Media
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.originalName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteMedia(item._id);

      setMedia((current) =>
        current.filter(
          (mediaItem) =>
            mediaItem._id !== item._id
        )
      );

      setSuccess(
        "Media deleted successfully."
      );
    } catch {
      setError(
        "Failed to delete media."
      );
    }
  }

  return (
    <section className="admin-media">

      <div className="admin-page-header">
        <div>
          <h2>
            Media Library
          </h2>

          <p>
            Upload and manage images and
            documents used in your portfolio.
          </p>
        </div>
      </div>

      <div className="admin-media-upload-card">
        <div>
          <h3>
            Upload Media
          </h3>

          <p>
            Upload images, CV documents,
            certificates, and other files.
          </p>
        </div>

        <label
          className={
            uploading
              ? "admin-media-upload-button disabled"
              : "admin-media-upload-button"
          }
        >
          {uploading
            ? "Uploading..."
            : "Choose File"}

          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
        </label>
      </div>

      {success && (
        <div className="admin-alert admin-alert-success">
          {success}
        </div>
      )}

      {error && (
        <div className="admin-alert admin-alert-error">
          {error}
        </div>
      )}

      <div className="admin-media-section-header">
        <div>
          <h3>
            Your Media
          </h3>

          <p>
            {media.length}{" "}
            {media.length === 1
              ? "file"
              : "files"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="admin-empty-state">
          Loading media...
        </div>
      ) : media.length === 0 ? (
        <div className="admin-empty-state">
          <h3>
            No media uploaded yet
          </h3>

          <p>
            Upload images or documents to
            start building your media library.
          </p>
        </div>
      ) : (
        <div className="admin-media-grid">
          {media.map((item) => {
            const fileUrl =
              getMediaUrl(item.url);

            return (
              <article
                key={item._id}
                className="admin-media-card"
              >
                <div className="admin-media-preview">

                  {item.type ===
                  "image" ? (
                    <img
                      src={fileUrl}
                      alt={item.originalName}
                    />
                  ) : (
                    <div className="admin-media-document">
                      <span>
                        DOC
                      </span>
                    </div>
                  )}

                </div>

                <div className="admin-media-content">

                  <h4>
                    {item.originalName}
                  </h4>

                  <p>
                    {formatFileSize(
                      item.size
                    )}
                  </p>

                  <div className="admin-media-actions">

                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-media-view"
                    >
                      View
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item)
                      }
                      className="admin-media-delete"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}