import apiClient from "./client";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools"
  | "other";

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  description?: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SkillsResponse {
  success: boolean;
  data: Skill[];
}

interface SkillResponse {
  success: boolean;
  data: Skill;
}

export interface CreateSkillInput {
  name: string;
  category: Skill["category"];
  level: number;
  icon?: string;
  description?: string;
  sortOrder: number;
  published: boolean;
}

export type UpdateSkillInput =
  Partial<CreateSkillInput>;

export async function getSkills() {
  const response =
    await apiClient.get<SkillsResponse>(
      "/skills"
    );

  return response.data.data;
}

export async function getAdminSkills() {
  const response =
    await apiClient.get<SkillsResponse>(
      "/skills/admin"
    );

  return response.data.data;
}

export async function createSkill(
  input: CreateSkillInput
) {
  const response =
    await apiClient.post<SkillResponse>(
      "/skills",
      input
    );

  return response.data.data;
}

export async function updateSkill(
  id: string,
  input: UpdateSkillInput
) {
  const response =
    await apiClient.put<SkillResponse>(
      `/skills/${id}`,
      input
    );

  return response.data.data;
}

export async function deleteSkill(
  id: string
) {
  await apiClient.delete(
    `/skills/${id}`
  );
}