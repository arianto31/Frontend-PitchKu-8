import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
      <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
        PitchKu
      </Link>

      <nav className="hidden items-center gap-8 sm:flex">
        <Link href="#cara-kerja" className="text-[15px] text-ink-soft transition-colors hover:text-ink">
          Cara kerja
        </Link>
        <Link href="#template" className="text-[15px] text-ink-soft transition-colors hover:text-ink">
          Template
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="md" asChild>
          <Link href="/masuk">Masuk</Link>
        </Button>
        <Button variant="primary" size="md" asChild>
          <Link href="/daftar">Mulai gratis</Link>
        </Button>
      </div>
    </header>
  );
}
