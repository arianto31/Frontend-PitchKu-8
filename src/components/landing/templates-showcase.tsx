"use client";

import { motion } from "motion/react";
import { TEMPLATE_OPTIONS } from "@/lib/templates";

export function TemplatesShowcase() {
  return (
    <section id="template" className="bg-forest px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-lg font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl"
        >
          Empat jenis dokumen yang paling sering dibutuhkan usaha kecil.
        </motion.h2>

        <div className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATE_OPTIONS.map((t, i) => (
            <motion.div
              key={t.value}
              initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -2 : 2, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: "easeOut" }}
              className="border border-paper/15 p-6 sm:p-7"
            >
              <h3 className="font-display text-lg font-semibold text-paper">{t.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}