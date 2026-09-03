import { apiClient, clearTokens, setTokens } from "@/services/apiClient";
import type { LoginResponse, TokenResponse, User } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", { email, password });
  setTokens(data.access_token, data.refresh_token);
  return data;
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>("/auth/me");
  return data;
}

export async function refreshSession(): Promise<TokenResponse | null> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const { data } = await apiClient.post<TokenResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
    setTokens(data.access_token, data.refresh_token);
    return data;
  } catch {
    clearTokens();
    return null;
  }
}

export function logout(): void {
  clearTokens();
}
