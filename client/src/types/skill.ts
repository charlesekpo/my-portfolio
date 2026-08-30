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
  description: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}