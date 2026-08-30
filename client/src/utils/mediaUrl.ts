export function getMediaUrl(
  mediaPath: string
): string {
  if (!mediaPath) {
    return "";
  }

  if (
    mediaPath.startsWith("http://") ||
    mediaPath.startsWith("https://")
  ) {
    return mediaPath;
  }

  const apiUrl =
    import.meta.env.VITE_API_URL;

  const serverUrl =
    apiUrl.replace(/\/api\/?$/, "");

  return `${serverUrl}${mediaPath}`;
}