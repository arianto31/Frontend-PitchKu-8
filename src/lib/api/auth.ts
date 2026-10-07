import { apiFetch } from "./client";

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
  email: string;
};

export type Profile = {
  id: string;
  fullName: string | null;
  companyName: string | null;
  createdAt: string;
};

export function login(email: string, password: string): Promise<AuthSession> {
  return apiFetch<AuthSession>("/auth/login", {
    method: "POST",
    body: { email, password },
    skipAuth: true,
  });
}

export function signup(email: string, password: string): Promise<AuthSession> {
  return apiFetch<AuthSession>("/auth/signup", {
    method: "POST",
    body: { email, password },
    skipAuth: true,
  });
}

export function logout(): Promise<void> {
  return apiFetch<void>("/auth/logout", { method: "POST" });
}

export function syncProfile(fullName: string, companyName: string): Promise<Profile> {
  return apiFetch<Profile>("/auth/sync-profile", {
    method: "POST",
    body: { fullName, companyName },
  });
}
