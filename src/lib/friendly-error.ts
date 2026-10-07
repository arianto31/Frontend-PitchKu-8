import { ApiRequestError } from "@/lib/api/types";

const FRIENDLY_MESSAGES: Partial<Record<string, string>> = {
  AUTH_UNAUTHORIZED: "Email atau kata sandi salah.",
  VALIDATION_INVALID_INPUT: "Periksa kembali data yang kamu isi.",
  RESOURCE_STATE_CONFLICT: "Data belum lengkap untuk melanjutkan langkah ini.",
};

export function friendlyErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    return FRIENDLY_MESSAGES[error.code] ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan. Coba lagi sebentar.";
}
