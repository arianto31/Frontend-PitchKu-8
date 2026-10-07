"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenerationLoading } from "@/components/wizard/generation-loading";
import { OutlineEditor } from "@/components/wizard/outline-editor";
import { SlidePreview } from "@/components/wizard/slide-preview";
import * as projectsApi from "@/lib/api/projects";
import type { Project } from "@/lib/api/projects";
import * as aiEngineApi from "@/lib/api/ai-engine";
import type { DeckPayload, OutlineItem } from "@/lib/api/ai-engine";
import * as exportApi from "@/lib/api/export";
import * as brandKitApi from "@/lib/api/brand-kit";
import { friendlyErrorMessage } from "@/lib/friendly-error";

type Stage =
  | "loading-project"
  | "start"
  | "generating-outline"
  | "reviewing-outline"
  | "generating-content"
  | "done"
  | "already-completed";

const OUTLINE_LOADING_MESSAGES = [
  "Membaca cerita bisnismu...",
  "Menyusun urutan slide...",
  "Menentukan judul tiap bagian...",
];

const CONTENT_LOADING_MESSAGES = [
  "Menulis isi tiap slide...",
  "Menyesuaikan dengan warna dan logo bisnismu...",
  "Mencari gambar yang relevan...",
  "Hampir selesai...",
];

export default function ProjectWizardPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [stage, setStage] = useState<Stage>("loading-project");
  const [error, setError] = useState<string | null>(null);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [deck, setDeck] = useState<DeckPayload | null>(null);
  const [hasBrandKit, setHasBrandKit] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const [p, brandKit] = await Promise.all([
          projectsApi.getProject(projectId),
          brandKitApi.getActiveBrandKit(),
        ]);
        setProject(p);
        setHasBrandKit(Boolean(brandKit?.logoUrl));
        setStage(p.status === "completed" ? "already-completed" : "start");
      } catch (err) {
        setError(friendlyErrorMessage(err));
      }
    }
    void loadProject();
  }, [projectId]);

  async function handleGenerateOutline() {
    setError(null);
    setStage("generating-outline");
    try {
      const result = await aiEngineApi.generateOutline(projectId);
      setOutline(result);
      setStage("reviewing-outline");
    } catch (err) {
      setError(friendlyErrorMessage(err));
      setStage("start");
    }
  }

  async function handleConfirmAndGenerateContent() {
    setError(null);
    setStage("generating-content");
    try {
      await aiEngineApi.confirmOutline(projectId, outline);
      const result = await aiEngineApi.generateContent(projectId);
      setDeck(result);
      setStage("done");
    } catch (err) {
      setError(friendlyErrorMessage(err));
      setStage("reviewing-outline");
    }
  }

  if (stage === "loading-project") {
    return <p className="py-16 text-center text-sm text-ink-faint">Memuat...</p>;
  }

  if (!project) {
    return (
      <p className="py-16 text-center text-sm text-error">
        {error ?? "Project tidak ditemukan."}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-[13px] text-ink-faint transition-colors hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke daftar
      </Link>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">
        {project.title}
      </h1>

      {error && <p className="mt-4 text-[13px] text-error">{error}</p>}

      <div className="mt-8">
        {stage === "start" && (
          <div className="border border-dashed border-line py-14 text-center">
            <p className="text-[15px] text-ink-soft">Siap menyusun kerangka presentasimu.</p>
            <Button variant="primary" size="lg" className="mt-5" onClick={() => void handleGenerateOutline()}>
              Buat kerangka slide
            </Button>
          </div>
        )}

        {stage === "generating-outline" && <GenerationLoading messages={OUTLINE_LOADING_MESSAGES} />}

        {stage === "reviewing-outline" && (
          <div>
            <p className="mb-5 text-[15px] text-ink-soft">
              Tinjau urutan dan judul slide. Ubah, hapus, atau susun ulang sebelum isi lengkapnya dibuat.
            </p>
            <OutlineEditor outline={outline} onChange={setOutline} />

            {!hasBrandKit && (
              <p className="mt-4 text-[13px] text-error">
                Identitas usaha (logo) belum diisi.{" "}
                <Link href="/dashboard/brand-kit" className="underline">
                  Lengkapi dulu di sini
                </Link>{" "}
                sebelum lanjut.
              </p>
            )}

            <Button
              variant="primary"
              size="lg"
              className="mt-6"
              onClick={() => void handleConfirmAndGenerateContent()}
              disabled={!hasBrandKit}
            >
              Buat isi lengkap
            </Button>
          </div>
        )}

        {stage === "generating-content" && <GenerationLoading messages={CONTENT_LOADING_MESSAGES} />}

        {stage === "done" && deck && (
          <div>
            <div className="space-y-4">
              {deck.slides.map((slide) => (
                <SlidePreview key={slide.slideNumber} slide={slide} />
              ))}
            </div>
            <ExportButtons projectId={projectId} />
          </div>
        )}

        {stage === "already-completed" && (
          <div className="border border-line p-8">
            <p className="text-[15px] text-ink-soft">
              Presentasi ini sudah selesai dibuat sebelumnya. Unduh kembali kapan saja di bawah ini.
            </p>
            <ExportButtons projectId={projectId} />
          </div>
        )}
      </div>
    </div>
  );
}

function ExportButtons({ projectId }: { projectId: string }) {
  const [loadingFormat, setLoadingFormat] = useState<"pptx" | "pdf" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleExport(format: "pptx" | "pdf") {
    setError(null);
    setLoadingFormat(format);
    try {
      const result = await exportApi.exportDeck(projectId, format);
      window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(friendlyErrorMessage(err));
    } finally {
      setLoadingFormat(null);
    }
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
      <Button variant="primary" size="lg" onClick={() => void handleExport("pptx")} disabled={loadingFormat !== null}>
        <Download size={16} />
        {loadingFormat === "pptx" ? "Menyiapkan..." : "Unduh PowerPoint"}
      </Button>
      <Button variant="outline" size="lg" onClick={() => void handleExport("pdf")} disabled={loadingFormat !== null}>
        <Download size={16} />
        {loadingFormat === "pdf" ? "Menyiapkan..." : "Unduh PDF"}
      </Button>
      {error && <p className="w-full text-[13px] text-error">{error}</p>}
    </div>
  );
}
