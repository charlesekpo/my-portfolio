export type VideoPlatform =
  | "youtube"
  | "vimeo"
  | "direct";

export interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  platform: VideoPlatform;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}