import { apiFetch } from "./client";

export type ExportFormat = "pptx" | "pdf";
export type ExportResult = { downloadUrl: string; fileName: string };

export function exportDeck(projectId: string, format: ExportFormat): Promise<ExportResult> {
  return apiFetch<ExportResult>(`/projects/${projectId}/export/${format}`, { method: "POST" });
}
