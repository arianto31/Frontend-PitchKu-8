"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectRow } from "@/components/dashboard/project-row";
import * as projectsApi from "@/lib/api/projects";
import type { Project } from "@/lib/api/projects";
import { friendlyErrorMessage } from "@/lib/friendly-error";

type LoadState = "loading" | "ready" | "error";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setState("loading");
    try {
      const { items } = await projectsApi.listProjects();
      setProjects(items);
      setState("ready");
    } catch (err) {
      setError(friendlyErrorMessage(err));
      setState("error");
    }
  }, []);

  useEffect(() => {
    // Pola "fetch data saat mount" standar — loadProjects sendiri sudah
    // handle loading/error state secara async, bukan setState sinkron
    // yang bikin cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProjects();
  }, [loadProjects]);

  async function handleDuplicate(id: string) {
    try {
      await projectsApi.duplicateProject(id);
      await loadProjects();
    } catch (err) {
      window.alert(friendlyErrorMessage(err));
    }
  }

  async function handleDelete(id: string) {
    const previous = projects;
    setProjects((current) => current.filter((p) => p.id !== id));
    try {
      await projectsApi.deleteProject(id);
    } catch (err) {
      setProjects(previous);
      window.alert(friendlyErrorMessage(err));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Presentasimu</h1>
        <Button variant="primary" size="md" asChild>
          <Link href="/dashboard/baru">Buat presentasi baru</Link>
        </Button>
      </div>

      <div className="mt-8">
        {state === "loading" && (
          <p className="py-12 text-center text-sm text-ink-faint">Memuat presentasimu...</p>
        )}

        {state === "error" && (
          <div className="py-12 text-center">
            <p className="text-sm text-error">{error}</p>
            <Button variant="outline" size="md" className="mt-4" onClick={() => void loadProjects()}>
              Coba lagi
            </Button>
          </div>
        )}

        {state === "ready" && projects.length === 0 && (
          <div className="border border-dashed border-line py-16 text-center">
            <p className="text-[15px] text-ink-soft">Belum ada presentasi.</p>
            <p className="mt-1 text-sm text-ink-faint">Mulai dari cerita singkat tentang usahamu.</p>
            <Button variant="primary" size="md" className="mt-5" asChild>
              <Link href="/dashboard/baru">Buat presentasi pertama</Link>
            </Button>
          </div>
        )}

        {state === "ready" && projects.length > 0 && (
          <div>
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} onDuplicate={handleDuplicate} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
