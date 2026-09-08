import apiClient from "./client";

export interface Education {
  _id: string;
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  location: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EducationInput {
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  location: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description: string;
  sortOrder: number;
  published: boolean;
}

interface EducationListResponse {
  success: boolean;
  data: Education[];
}

interface EducationResponse {
  success: boolean;
  data: Education;
}

export async function getEducation() {
  const response =
    await apiClient.get<EducationListResponse>(
      "/education"
    );

  return response.data.data;
}

export async function getAdminEducation() {
  const response =
    await apiClient.get<EducationListResponse>(
      "/education/admin"
    );

  return response.data.data;
}

export async function createEducation(
  input: EducationInput
) {
  const response =
    await apiClient.post<EducationResponse>(
      "/education",
      input
    );

  return response.data.data;
}

export async function updateEducation(
  id: string,
  input: EducationInput
) {
  const response =
    await apiClient.put<EducationResponse>(
      `/education/${id}`,
      input
    );

  return response.data.data;
}

export async function deleteEducation(
  id: string
) {
  await apiClient.delete(
    `/education/${id}`
  );
}
