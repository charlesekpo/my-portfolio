export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
  videoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}