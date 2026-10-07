"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="border border-line p-10 text-center sm:p-16"
      >
        <h2 className="mx-auto max-w-lg font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Presentasi pertamamu siap{" "}
          <span className="relative inline-block">
            dalam beberapa menit
            <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full" aria-hidden>
              <motion.path
                d="M2 8 Q 50 2, 100 7 T 198 6"
                stroke="var(--color-gold)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </span>
          .
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-soft">Tidak perlu kartu kredit untuk mencoba.</p>
        <div className="mt-8">
          <Button variant="primary" size="lg" asChild>
            <Link href="/daftar">Mulai sekarang</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
        <span className="font-display text-base font-bold text-ink">PitchKu</span>
        <p className="text-sm text-ink-faint">© {new Date().getFullYear()} PitchKu.</p>
      </div>
    </footer>
  );
}