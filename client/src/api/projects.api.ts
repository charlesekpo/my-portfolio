import apiClient from "./client";

export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  success: boolean;
  data: {
    projects: Project[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

interface ProjectResponse {
  success: boolean;
  data: Project;
}

export interface CreateProjectData {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

export type UpdateProjectData =
  Partial<CreateProjectData>;

export async function getProjects() {
  const response =
    await apiClient.get<ProjectsResponse>(
      "/projects"
    );

  return response.data.data.projects;
}

export async function getProject(
  id: string
) {
  const response =
    await apiClient.get<ProjectResponse>(
      `/projects/${id}`
    );

  return response.data.data;
}

export async function createProject(
  data: CreateProjectData
) {
  const response =
    await apiClient.post<ProjectResponse>(
      "/projects",
      data
    );

  return response.data.data;
}

export async function updateProject(
  id: string,
  data: UpdateProjectData
) {
  const response =
    await apiClient.patch<ProjectResponse>(
      `/projects/${id}`,
      data
    );

  return response.data.data;
}

export async function deleteProject(
  id: string
) {
  await apiClient.delete(
    `/projects/${id}`
  );
}

export async function getPublicProjectBySlug(
  slug: string
) {
  const response =
    await apiClient.get<ProjectResponse>(
      `/projects/slug/${slug}`
    );

  return response.data.data;
}

export async function getPublicProjects() {
  const response =
    await apiClient.get<{
      success: boolean;
      data: Project[];
    }>("/projects/public");

  return response.data.data;
}
