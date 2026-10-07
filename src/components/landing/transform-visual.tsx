"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function TransformVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const leftRotateX = useTransform(springY, [-40, 40], [6, -6]);
  const leftRotateY = useTransform(springX, [-40, 40], [-6, 6]);
  const rightRotateX = useTransform(springY, [-40, 40], [4, -4]);
  const rightRotateY = useTransform(springX, [-40, 40], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center py-6 [perspective:1000px] lg:py-0"
    >
      <div className="relative flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ rotateX: leftRotateX, rotateY: leftRotateY, borderRadius: "var(--radius-sheet)" }}
          className="relative w-[180px] shrink-0 border border-line bg-white p-4 sm:w-[210px]"
        >
          <CropMarks />
          <p className="font-mono text-[10px] leading-relaxed text-ink-faint sm:text-[11px]">
            Kopi Nusantara, berdiri 2020 di Bandung. Biji kopi lokal dari
            petani Jawa Barat. 3 cabang aktif, rating 4.8 di GoFood...
          </p>
        </motion.div>

        <Connector />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.65, ease: "easeOut" },
            y: { duration: 4, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ rotateX: rightRotateX, rotateY: rightRotateY, borderRadius: "var(--radius-sheet)" }}
          className="relative w-[200px] shrink-0 border border-line bg-white p-4 shadow-[3px_3px_0_0_var(--color-press)] sm:w-[240px]"
        >
          <CropMarks />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
            className="mb-2 h-1 w-8 origin-left bg-gold"
          />
          <p className="font-display text-[13px] font-semibold leading-tight text-ink sm:text-sm">
            Kopi Nusantara
          </p>
          <p className="mb-2.5 text-[10px] text-ink-soft sm:text-[11px]">
            Cita rasa lokal, standar specialty
          </p>
          <div className="space-y-1">
            <div className="h-1 w-full bg-press-soft" />
            <div className="h-1 w-4/5 bg-press-soft" />
            <div className="h-1 w-3/5 bg-press-soft" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <svg width="40" height="16" viewBox="0 0 40 16" className="shrink-0 overflow-visible">
      <motion.path
        d="M0 8 H32"
        stroke="var(--color-ink-faint)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M28 4 L34 8 L28 12"
        stroke="var(--color-ink-faint)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.3, delay: 0.95 }}
      />
    </svg>
  );
}

function CropMarks() {
  return (
    <>
      <span className="absolute -left-[3px] -top-[3px] h-2 w-2 border-l border-t border-ink/25" />
      <span className="absolute -right-[3px] -top-[3px] h-2 w-2 border-r border-t border-ink/25" />
      <span className="absolute -bottom-[3px] -left-[3px] h-2 w-2 border-b border-l border-ink/25" />
      <span className="absolute -bottom-[3px] -right-[3px] h-2 w-2 border-b border-r border-ink/25" />
    </>
  );
}