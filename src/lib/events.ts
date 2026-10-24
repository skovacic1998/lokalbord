export type Category = "Glazba" | "Kultura" | "Druženje" | "Sport" | "Za djecu";

export type Event = {
  id: string;
  title: string;
  eyebrow: string;
  dateLabel: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  category: Category;
  description: string;
  image?: string;
  col: number;
  row: number;
};

export type EventDraft = Pick<
  Event,
  "title" | "startsAt" | "endsAt" | "venue" | "category" | "description"
>;

export const categories: Array<Category | "Sve"> = ["Sve", "Glazba", "Kultura", "Druženje", "Sport", "Za djecu"];

