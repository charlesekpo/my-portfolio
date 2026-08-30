import apiClient from "./client";

export interface Video {
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
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface VideosResponse {
  success: boolean;
  data: Video[];
}

export async function getVideos() {
  const response =
    await apiClient.get<VideosResponse>(
      "/videos"
    );

  return response.data.data;
}