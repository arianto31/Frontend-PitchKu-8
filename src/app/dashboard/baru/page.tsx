"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject, type TemplateType } from "@/lib/api/projects";
import { friendlyErrorMessage } from "@/lib/friendly-error";
import { TEMPLATE_OPTIONS } from "@/lib/templates";
import { cn } from "@/lib/utils";

const RAW_TEXT_MIN = 50;
const RAW_TEXT_MAX = 2000;

export default function NewProjectPage() {
  const router = useRouter();

  const [templateType, setTemplateType] = useState<TemplateType | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [rawMaterialText, setRawMaterialText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rawTextValid = rawMaterialText.length >= RAW_TEXT_MIN && rawMaterialText.length <= RAW_TEXT_MAX;
  const canSubmit = templateType && businessName && shortDescription && rawTextValid;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!templateType) return;

    setError(null);
    setIsSubmitting(true);
    try {
      await createProject({
        title: `${businessName} - ${TEMPLATE_OPTIONS.find((t) => t.value === templateType)?.label}`,
        templateType,
        businessContext: { businessName, shortDescription, rawMaterialText },
      });
      router.push("/dashboard");
    } catch (err) {
      setError(friendlyErrorMessage(err));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Presentasi baru</h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        Pilih jenis dokumen, lalu ceritakan bisnismu. Kerangka slide akan disusun di langkah berikutnya.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-10">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-ink-soft">Jenis dokumen</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {TEMPLATE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTemplateType(option.value)}
                className={cn(
                  "border p-4 text-left transition-colors",
                  templateType === option.value ? "border-press bg-press-soft" : "border-line hover:border-ink/30",
                )}
              >
                <p className="font-display text-[15px] font-semibold text-ink">{option.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="businessName">Nama usaha</Label>
          <Input id="businessName" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="shortDescription">Deskripsi singkat</Label>
          <Input
            id="shortDescription"
            required
            placeholder="Contoh: Kedai kopi specialty di Bandung"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="rawMaterialText">Ceritakan bisnismu</Label>
            <span className={cn("font-mono text-xs", rawMaterialText.length > 0 && !rawTextValid ? "text-error" : "text-ink-faint")}>
              {rawMaterialText.length}/{RAW_TEXT_MAX}
            </span>
          </div>
          <Textarea
            id="rawMaterialText"
            rows={6}
            placeholder="Sejak kapan berdiri, apa yang membuat bisnismu berbeda, pencapaian yang ingin ditonjolkan..."
            value={rawMaterialText}
            onChange={(e) => setRawMaterialText(e.target.value)}
          />
          <p className="mt-1.5 text-[13px] text-ink-faint">Minimal {RAW_TEXT_MIN} karakter.</p>
        </div>

        {error && <p className="text-[13px] text-error">{error}</p>}

        <Button type="submit" size="lg" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan dan lanjutkan"}
        </Button>
      </form>
    </div>
  );
}
