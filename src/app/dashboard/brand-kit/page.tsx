"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ColorField } from "@/components/dashboard/color-field";
import * as brandKitApi from "@/lib/api/brand-kit";
import { friendlyErrorMessage } from "@/lib/friendly-error";

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];
const MAX_SIZE_MB = 2;

export default function BrandKitPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#0F4C81");
  const [accentColor, setAccentColor] = useState("#F2A007");
  const [fontFamily, setFontFamily] = useState("Inter");

  const [isLoadingExisting, setIsLoadingExisting] = useState(true);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExisting() {
      try {
        const existing = await brandKitApi.getActiveBrandKit();
        if (existing) {
          setLogoUrl(existing.logoUrl);
          setPrimaryColor(existing.primaryColor);
          setAccentColor(existing.accentColor);
          setFontFamily(existing.fontFamily);
        }
      } catch (err) {
        setError(friendlyErrorMessage(err));
      } finally {
        setIsLoadingExisting(false);
      }
    }
    void loadExisting();
  }, []);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Logo harus berformat PNG, JPG, atau SVG.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran logo maksimal ${MAX_SIZE_MB}MB.`);
      return;
    }

    setIsUploadingLogo(true);
    try {
      const result = await brandKitApi.uploadLogo(file);
      setLogoUrl(result.logoUrl);
    } catch (err) {
      setError(friendlyErrorMessage(err));
    } finally {
      setIsUploadingLogo(false);
    }
  }

  const colorsValid = HEX_PATTERN.test(primaryColor) && HEX_PATTERN.test(accentColor);
  const canSave = logoUrl && colorsValid && !isUploadingLogo;

  async function handleSave() {
    if (!logoUrl) return;
    setError(null);
    setIsSaving(true);
    try {
      await brandKitApi.upsertBrandKit({ logoUrl, primaryColor, accentColor, fontFamily });
      setSavedAt(Date.now());
    } catch (err) {
      setError(friendlyErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoadingExisting) {
    return <p className="py-16 text-center text-sm text-ink-faint">Memuat...</p>;
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Identitas Usaha</h1>
      <p className="mt-2 text-[15px] text-ink-soft">
        Logo dan warna ini dipakai di setiap slide yang dibuat. Wajib diisi sebelum presentasi
        bisa dibuat.
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-ink-soft">Logo usaha</p>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-line bg-white">
              {logoUrl ? (
                <Image src={logoUrl} alt="Logo usaha" width={80} height={80} className="h-full w-full object-contain p-2" unoptimized />
              ) : (
                <Upload size={20} className="text-ink-faint" strokeWidth={1.5} />
              )}
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={(e) => void handleFileSelect(e)}
                className="hidden"
              />
              <Button type="button" variant="outline" size="md" onClick={() => fileInputRef.current?.click()} disabled={isUploadingLogo}>
                {isUploadingLogo ? "Mengunggah..." : logoUrl ? "Ganti logo" : "Unggah logo"}
              </Button>
              <p className="mt-1.5 text-[12px] text-ink-faint">PNG, JPG, atau SVG. Maks {MAX_SIZE_MB}MB.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <ColorField id="primaryColor" label="Warna utama" value={primaryColor} onChange={setPrimaryColor} />
          <ColorField id="accentColor" label="Warna aksen" value={accentColor} onChange={setAccentColor} />
        </div>

        <div>
          <Label htmlFor="fontFamily">Jenis huruf</Label>
          <Input id="fontFamily" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />
        </div>

        {error && <p className="text-[13px] text-error">{error}</p>}

        <div className="flex items-center gap-4">
          <Button variant="primary" size="lg" onClick={() => void handleSave()} disabled={!canSave || isSaving}>
            {isSaving ? "Menyimpan..." : "Simpan Identitas Usaha"}
          </Button>
          {savedAt && <span key={savedAt} className="text-[13px] text-success">Tersimpan.</span>}
        </div>
      </div>
    </div>
  );
}
