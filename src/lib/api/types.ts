export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: { page?: number; limit?: number; total?: number };
};

export type ApiErrorCode =
  | "AUTH_UNAUTHORIZED"
  | "AUTH_FORBIDDEN"
  | "VALIDATION_INVALID_INPUT"
  | "VALIDATION_FILE_TOO_LARGE"
  | "VALIDATION_FILE_TYPE_INVALID"
  | "VALIDATION_HEX_INVALID"
  | "VALIDATION_CHAR_LIMIT_EXCEEDED"
  | "VALIDATION_SLIDE_COUNT_OUT_OF_RANGE"
  | "AI_OUTLINE_GENERATION_FAILED"
  | "AI_CONTENT_GENERATION_FAILED"
  | "AI_PROVIDER_TIMEOUT"
  | "AI_RATE_LIMITED"
  | "EXPORT_RENDER_FAILED"
  | "RESOURCE_NOT_FOUND"
  | "RESOURCE_STATE_CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export type ApiError = {
  success: false;
  error: { code: ApiErrorCode; message: string; details?: unknown };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export class ApiRequestError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
