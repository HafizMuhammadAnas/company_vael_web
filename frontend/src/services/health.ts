import { apiClient } from "./apiClient";

export interface HealthResponse {
  status: string;
  app: string;
  environment: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>("/public/health");
  return data;
}
