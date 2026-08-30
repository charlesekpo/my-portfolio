import apiClient from "./client";

export interface Skill {
  _id: string;
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "tools"
    | "other";
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

export async function getSkills() {
  const response =
    await apiClient.get<SkillsResponse>(
      "/skills"
    );

  return response.data.data;
}