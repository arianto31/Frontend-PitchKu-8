"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { TransformVisual } from "./transform-visual";

const headlineLines = ["Dari cerita bisnis", "jadi presentasi", "yang dipercaya."];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-6 pb-20 pt-8 lg:px-8 lg:pb-28 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <h1 className="font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem]">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Susun profil usaha, penawaran, dan laporan bisnis jadi deck siap
            kirim. Brand, warna, dan struktur usahamu terjaga konsisten di
            setiap slide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button variant="primary" size="lg" asChild>
              <Link href="/daftar">Buat presentasi pertama</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#cara-kerja">Lihat cara kerja</Link>
            </Button>
          </motion.div>
        </div>

        <TransformVisual />
      </div>
    </section>
  );
}