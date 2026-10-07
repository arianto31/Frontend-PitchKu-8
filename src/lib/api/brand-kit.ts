// =========================================
// FILE: src/lib/api/brand-kit.ts
// API brand kit — upload logo, upsert, get active
// =========================================
import { apiFetch } from "./client";

export type BrandKit = {
  id: string;
  logoUrl: string | null;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  updatedAt: string;
};

export function getActiveBrandKit(): Promise<BrandKit | null> {
  return apiFetch<BrandKit | null>("/brand-kits/active");
}

/** POST /brand-kits/logo-upload — multipart/form-data, field wajib "file". */
export function uploadLogo(file: File): Promise<{ logoUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<{ logoUrl: string }>("/brand-kits/logo-upload", { method: "POST", formData });
}

export function upsertBrandKit(input: {
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}): Promise<BrandKit> {
  return apiFetch<BrandKit>("/brand-kits", { method: "POST", body: input });
}
