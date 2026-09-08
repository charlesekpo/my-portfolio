import apiClient from "./client";

export type MediaType =
  | "image"
  | "document";

export interface Media {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  type: MediaType;
  createdAt: string;
  updatedAt: string;
}

interface MediaResponse {
  success: boolean;
  data: Media[];
}

interface SingleMediaResponse {
  success: boolean;
  message?: string;
  data: Media;
}

export async function getMedia() {
  const response =
    await apiClient.get<MediaResponse>(
      "/media"
    );

  return response.data.data;
}

export async function uploadMedia(
  file: File
): Promise<Media> {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await apiClient.post<SingleMediaResponse>(
      "/media",
      formData
    );

  return response.data.data;
}

export async function deleteMedia(
  id: string
) {
  await apiClient.delete(
    `/media/${id}`
  );
}