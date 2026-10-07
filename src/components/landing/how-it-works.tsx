"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  { number: "01", title: "Ceritakan bisnismu", body: "Pilih jenis dokumen — profil usaha, penawaran produk, proposal kerja sama, atau laporan ringkas. Tulis konteks bisnismu dalam beberapa kalimat." },
  { number: "02", title: "Tinjau kerangkanya", body: "PitchKu menyusun urutan dan judul tiap slide lebih dulu. Ubah, tambah, atau hapus sebelum isi lengkapnya dibuat." },
  { number: "03", title: "Unduh siap kirim", body: "Isi tiap slide disusun dengan warna dan logo bisnismu. Unduh sebagai PowerPoint yang tetap bisa diedit, atau PDF." },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.75", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="cara-kerja" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="max-w-md font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        Tiga langkah, bukan tiga puluh menu.
      </motion.h2>

      <div ref={sectionRef} className="relative mt-16">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line sm:block">
          <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-gold" />
        </div>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="flex items-baseline gap-3">
                <span className="relative z-10 bg-paper pr-1 font-mono text-sm text-gold-deep">{step.number}</span>
                <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
              {i < steps.length - 1 && <div className="mt-8 h-px w-full bg-line sm:hidden" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}