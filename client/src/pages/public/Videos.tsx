import {
  useQuery
} from "@tanstack/react-query";

import {
  getVideos
} from "../../api/videos.api";

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

export default function Videos() {
  const {
    data: videos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos
  });

  if (isLoading) {
    return (
      <main className="videos-page">
        <div className="videos-loading">
          <div className="videos-loading-spinner" />
          <p>
            Loading videos...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="videos-page">
        <section className="videos-state">
          <h1>
            Videos
          </h1>

          <p>
            We couldn't load the videos
            right now. Please try again
            later.
          </p>
        </section>
      </main>
    );
  }

  const allVideos =
    videos ?? [];

  const featuredVideos =
    allVideos.filter(
      (video) => video.featured
    );

  const regularVideos =
    allVideos.filter(
      (video) => !video.featured
    );

  return (
    <main className="videos-page">

      {/* ==========================================
          Header
      ========================================== */}

      <section className="videos-header">

        <p className="videos-eyebrow">
          Watch & learn
        </p>

        <h1>
          Videos
        </h1>

        <p>
          Tutorials, technical content
          and other videos I've created
          or found useful to share.
        </p>

      </section>


      {/* ==========================================
          Empty State
      ========================================== */}

      {allVideos.length === 0 && (
        <section className="videos-state">
          <h2>
            No videos yet
          </h2>

          <p>
            Videos will appear here once
            they have been published.
          </p>
        </section>
      )}


      {/* ==========================================
          Featured Videos
      ========================================== */}

      {featuredVideos.length > 0 && (
        <section className="videos-section">

          <div className="videos-section-heading">
            <h2>
              Featured
            </h2>

            <p>
              A few videos worth checking
              out.
            </p>
          </div>

          <div className="videos-grid">

            {featuredVideos.map(
              (video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  featured
                />
              )
            )}

          </div>

        </section>
      )}


      {/* ==========================================
          All Videos
      ========================================== */}

      {regularVideos.length > 0 && (
        <section className="videos-section">

          <div className="videos-section-heading">
            <h2>
              More Videos
            </h2>
          </div>

          <div className="videos-grid">

            {regularVideos.map(
              (video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                />
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
}


function VideoCard({
  video,
  featured = false
}: {
  video: {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    platform:
      | "youtube"
      | "vimeo"
      | "direct";
    featured: boolean;
  };
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "video-card video-card-featured"
          : "video-card"
      }
    >

      <a
        href={video.videoUrl}
        target="_blank"
        rel="noreferrer"
        className="video-thumbnail"
      >

        {video.thumbnail ? (
          <img
            src={getMediaUrl(
              video.thumbnail
            )}
            alt={video.title}
          />
        ) : (
          <div className="video-thumbnail-placeholder">
            <span>
              No thumbnail
            </span>
          </div>
        )}

        <span className="video-play-button">
          ▶
        </span>

        {video.featured && (
          <span className="video-featured-badge">
            Featured
          </span>
        )}

      </a>

      <div className="video-card-content">

        <span className="video-platform">
          {video.platform}
        </span>

        <h3>
          {video.title}
        </h3>

        {video.description && (
          <p>
            {video.description}
          </p>
        )}

        <a
          href={video.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="video-watch-link"
        >
          Watch video →
        </a>

      </div>

    </article>
  );
}