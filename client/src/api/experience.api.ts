import apiClient from "./client";

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceInput {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  sortOrder: number;
  published: boolean;
}

interface ExperienceResponse {
  success: boolean;
  data: Experience[];
}

interface SingleExperienceResponse {
  success: boolean;
  data: Experience;
}

export async function getExperience() {
  const response =
    await apiClient.get<ExperienceResponse>(
      "/experience"
    );

  return response.data.data;
}

export async function getAdminExperience() {
  const response =
    await apiClient.get<ExperienceResponse>(
      "/experience/admin"
    );

  return response.data.data;
}

export async function createExperience(
  input: ExperienceInput
) {
  const response =
    await apiClient.post<SingleExperienceResponse>(
      "/experience",
      input
    );

  return response.data.data;
}

export async function updateExperience(
  id: string,
  input: ExperienceInput
) {
  const response =
    await apiClient.put<SingleExperienceResponse>(
      `/experience/${id}`,
      input
    );

  return response.data.data;
}

export async function deleteExperience(
  id: string
) {
  await apiClient.delete(
    `/experience/${id}`
  );
}