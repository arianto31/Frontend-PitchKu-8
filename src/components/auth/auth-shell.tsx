import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 lg:py-12">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          PitchKu
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-[15px] text-ink-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>

        <p className="text-center text-sm text-ink-faint lg:text-left">{footer}</p>
      </div>

      <div className="hidden bg-press-deep px-16 py-12 lg:flex lg:flex-col lg:justify-end">
        <p className="max-w-sm font-display text-2xl font-medium leading-snug text-paper">
          Presentasi yang baik bukan soal desain rumit — tapi soal cerita bisnis yang tersusun
          jelas.
        </p>
      </div>
    </div>
  );
}
