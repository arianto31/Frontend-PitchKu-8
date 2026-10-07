"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function BackgroundMarks() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <motion.svg
      style={{ y }}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140vh] w-full opacity-[0.07]"
    >
      <defs>
        <pattern id="pk-marks" width="88" height="88" patternUnits="userSpaceOnUse">
          <path d="M8 0 V16 M0 8 H16" stroke="currentColor" strokeWidth="1" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pk-marks)" className="text-ink" />
    </motion.svg>
  );
}