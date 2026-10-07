import { apiFetch, apiFetchWithMeta } from "./client";

export type TemplateType =
  | "company_profile"
  | "penawaran_produk"
  | "proposal_kerjasama"
  | "laporan_ringkas";

export type ProjectStatus = "draft" | "completed";

export type Project = {
  id: string;
  title: string;
  templateType: TemplateType;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type BusinessContext = {
  businessName: string;
  shortDescription: string;
  rawMaterialText: string;
  [key: string]: unknown;
};

type ListProjectsParams = {
  status?: ProjectStatus;
  page?: number;
  limit?: number;
};

export async function listProjects(
  params: ListProjectsParams = {},
): Promise<{ items: Project[]; total: number }> {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 20));

  const result = await apiFetchWithMeta<Project[]>(`/projects?${query.toString()}`);
  return { items: result.data, total: result.meta?.total ?? result.data.length };
}

export function getProject(id: string): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}`);
}

export function createProject(input: {
  title: string;
  templateType: TemplateType;
  businessContext: BusinessContext;
}): Promise<Project> {
  return apiFetch<Project>("/projects", { method: "POST", body: input });
}

export function deleteProject(id: string): Promise<void> {
  return apiFetch<void>(`/projects/${id}`, { method: "DELETE" });
}

export function duplicateProject(id: string): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}/duplicate`, { method: "POST" });
}
