"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Trash2 } from "lucide-react";
import type { Project } from "@/lib/api/projects";
import { TEMPLATE_OPTIONS } from "@/lib/templates";

const STATUS_LABEL: Record<Project["status"], string> = {
  draft: "Draf",
  completed: "Selesai",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function ProjectRow({
  project,
  onDuplicate,
  onDelete,
}: {
  project: Project;
  onDuplicate: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isBusy, setIsBusy] = useState(false);
  const templateLabel = TEMPLATE_OPTIONS.find((t) => t.value === project.templateType)?.label;

  async function handleDuplicate() {
    setIsBusy(true);
    await onDuplicate(project.id);
    setIsBusy(false);
  }

  async function handleDelete() {
    if (!window.confirm(`Hapus "${project.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setIsBusy(true);
    await onDelete(project.id);
  }

  return (
    <div className="group flex items-center justify-between gap-4 border-b border-line py-4">
      <div className="min-w-0">
        <Link
          href={`/dashboard/proyek/${project.id}`}
          className="truncate font-display text-[15px] font-semibold text-ink hover:underline"
        >
          {project.title}
        </Link>
        <p className="mt-1 flex items-center gap-2 font-mono text-xs text-ink-faint">
          <span>{templateLabel}</span>
          <span aria-hidden>·</span>
          <span className={project.status === "completed" ? "text-success" : "text-ink-faint"}>
            {STATUS_LABEL[project.status]}
          </span>
          <span aria-hidden>·</span>
          <span>{formatDate(project.updatedAt)}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button type="button" onClick={handleDuplicate} disabled={isBusy} title="Duplikat" className="p-2 text-ink-faint transition-colors hover:text-ink disabled:opacity-40">
          <Copy size={16} strokeWidth={1.75} />
        </button>
        <button type="button" onClick={handleDelete} disabled={isBusy} title="Hapus" className="p-2 text-ink-faint transition-colors hover:text-error disabled:opacity-40">
          <Trash2 size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
