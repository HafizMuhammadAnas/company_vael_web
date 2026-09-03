export interface User {
  id: number;
  email: string;
  role: "admin" | "editor" | "viewer";
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
