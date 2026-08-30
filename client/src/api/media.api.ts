import apiClient from "./client";
import type { Media } from "../types/media";

interface UploadMediaResponse {
  success: boolean;
  message: string;
  data: Media;
}

export async function uploadMedia(
  file: File
): Promise<Media> {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await apiClient.post<UploadMediaResponse>(
      "/media",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

  return response.data.data;
}