import { apiFetch } from "./client";

export type OutlineItem = {
  slideNumber: number;
  title: string;
  objective: string;
};

export type Card = { header: string; description: string };

export type Slide =
  | { slideNumber: number; layout: "title_slide"; title: string; subtitle?: string; imageUrl?: string; imageQuery?: string }
  | { slideNumber: number; layout: "title_bullets"; title: string; bullets: string[]; imageUrl?: string; imageQuery?: string }
  | { slideNumber: number; layout: "two_column"; title: string; bullets: string[]; imageUrl?: string; imageQuery?: string }
  | { slideNumber: number; layout: "metrics_grid"; title: string; cards: Card[]; imageUrl?: string; imageQuery?: string }
  | { slideNumber: number; layout: "card_grid"; title: string; cards: Card[]; imageUrl?: string; imageQuery?: string }
  | { slideNumber: number; layout: "contact_closing"; title: string; subtitle?: string; imageUrl?: string; imageQuery?: string };

export type DeckPayload = {
  deckId: string;
  template: string;
  brandKit: { logoUrl: string; primaryColor: string; accentColor: string; fontFamily: string };
  slides: Slide[];
};

export function generateOutline(projectId: string): Promise<OutlineItem[]> {
  return apiFetch<OutlineItem[]>(`/projects/${projectId}/outline`, { method: "POST" });
}

export function confirmOutline(projectId: string, outline: OutlineItem[]): Promise<OutlineItem[]> {
  return apiFetch<OutlineItem[]>(`/projects/${projectId}/outline`, {
    method: "PATCH",
    body: { outline },
  });
}

export function generateContent(projectId: string): Promise<DeckPayload> {
  return apiFetch<DeckPayload>(`/projects/${projectId}/content`, { method: "POST" });
}
