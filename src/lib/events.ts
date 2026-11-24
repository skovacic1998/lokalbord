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
  previewImage?: string;
  col: number;
  row: number;
};

export type EventDraft = Pick<
  Event,
  "title" | "startsAt" | "endsAt" | "venue" | "category" | "description"
>;

export type EventSubmissionDraft = EventDraft & {
  submitterName: string;
  submitterLastName: string;
  submitterEmail: string;
};

export const categories: Array<Category | "Sve"> = ["Sve", "Glazba", "Kultura", "Druženje", "Sport", "Za djecu"];


const kutinaDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Zagreb",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function isEventToday(event: Pick<Event, "startsAt" | "endsAt">, now: number): boolean {
  const startsAt = new Date(event.startsAt);
  const endsAt = new Date(event.endsAt);
  if (!now || !Number.isFinite(startsAt.getTime()) || !Number.isFinite(endsAt.getTime())) return false;

  const today = kutinaDate.format(now);
  return endsAt.getTime() > now && kutinaDate.format(startsAt) <= today && kutinaDate.format(endsAt) >= today;
}
