"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <Topbar />
        <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">{children}</main>
      </div>
    </AuthGuard>
  );
}

function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/dashboard" className="font-display text-lg font-bold tracking-tight text-ink">
          PitchKu
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/dashboard/brand-kit" className="hidden text-[13px] text-ink-soft transition-colors hover:text-ink sm:inline">Identitas Usaha</Link>
          <span className="hidden text-[13px] text-ink-faint sm:inline">{user?.email}</span>
          <Button variant="ghost" size="md" onClick={handleLogout}>
            Keluar
          </Button>
        </div>
      </div>
    </header>
  );
}
