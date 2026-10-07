// =========================================
// FILE: src/components/dashboard/color-field.tsx
// Swatch color picker + input hex tersinkron, validasi ^#[0-9A-Fa-f]{6}$
// =========================================
"use client";

import { Input, Label } from "@/components/ui/input";

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const isValid = HEX_PATTERN.test(value);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          aria-label={`${label} (swatch)`}
          value={isValid ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-11 shrink-0 cursor-pointer border border-line bg-transparent p-1"
        />
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#26466E"
          error={value.length > 0 && !isValid ? "Format harus #RRGGBB" : undefined}
          className="font-mono"
        />
      </div>
    </div>
  );
}