import apiClient from "./client";
import type {
  LoginResponse
} from "../types/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response =
    await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

  return response.data;
}