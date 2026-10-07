import { ApiRequestError, type ApiResponse, type ApiSuccess } from "./types";
import { getToken } from "./token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL && typeof window !== "undefined") {
  console.error(
    "NEXT_PUBLIC_API_BASE_URL belum diset. Salin .env.local.example ke .env.local.",
  );
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  formData?: FormData;
  skipAuth?: boolean;
};

async function request<T>(path: string, options: RequestOptions): Promise<ApiSuccess<T>> {
  const { method = "GET", body, formData, skipAuth = false } = options;

  const headers: HeadersInit = {};
  if (!formData) headers["Content-Type"] = "application/json";

  if (!skipAuth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: formData ?? (body ? JSON.stringify(body) : undefined),
  });

  const json = (await response.json()) as ApiResponse<T>;

  if (!json.success) {
    throw new ApiRequestError(json.error.code, json.error.message, json.error.details);
  }

  return json;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const result = await request<T>(path, options);
  return result.data;
}

export async function apiFetchWithMeta<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  return request<T>(path, options);
}
