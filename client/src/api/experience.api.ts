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

interface ExperienceResponse {
  success: boolean;
  data: Experience[];
}

export async function getExperience() {
  const response =
    await apiClient.get<ExperienceResponse>(
      "/experience"
    );

  return response.data.data;
}