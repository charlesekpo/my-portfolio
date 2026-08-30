import apiClient from "./client";

export interface SiteSettings {
  _id: string;
  fullName: string;
  professionalTitle: string;
  shortBio: string;
  about: string;
  profileImage?: string;
  resumeUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  availableForWork: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SettingsResponse {
  success: boolean;
  data: SiteSettings | null;
}

export async function getSettings() {
  const response =
    await apiClient.get<SettingsResponse>(
      "/settings"
    );

  return response.data.data;
}