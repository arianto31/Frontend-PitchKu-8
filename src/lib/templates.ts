import type { TemplateType } from "@/lib/api/projects";

export const TEMPLATE_OPTIONS: {
  value: TemplateType;
  label: string;
  description: string;
}[] = [
  {
    value: "company_profile",
    label: "Profil Usaha",
    description: "Perkenalkan bisnismu secara menyeluruh — cerita, produk, dan pencapaian.",
  },
  {
    value: "penawaran_produk",
    label: "Penawaran Produk",
    description: "Harga, syarat pemesanan, dan skema kerja sama untuk calon reseller.",
  },
  {
    value: "proposal_kerjasama",
    label: "Proposal Kerja Sama",
    description: "Ajukan kolaborasi atau kemitraan secara terstruktur dan meyakinkan.",
  },
  {
    value: "laporan_ringkas",
    label: "Laporan Ringkas",
    description: "Ringkasan performa bisnis untuk dibagikan secara berkala.",
  },
];
