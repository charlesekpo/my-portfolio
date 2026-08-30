import apiClient from "./client";

export interface DashboardStats {
  projects: number;
  skills: number;
  experience: number;
  videos: number;
  messages: number;
  media: number;
}

export async function getDashboardStats() {
  const response = await apiClient.get<{
    success: boolean;
    data: DashboardStats;
  }>("/dashboard/stats");

  return response.data.data;
}