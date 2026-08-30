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