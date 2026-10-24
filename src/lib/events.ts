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
  design: number;
  col: number;
  row: number;
  preview?: boolean;
};

export type EventDraft = Pick<
  Event,
  "title" | "startsAt" | "endsAt" | "venue" | "category" | "description"
>;

// Fictional events keep the first screen useful without implying these events are real.
export const demoEvents: Event[] = [
  { id: "1", title: "Večer pod zvijezdama", eyebrow: "LJETNI PROGRAM", dateLabel: "PET 23.10. · 20:00", startsAt: "2026-10-23T20:00:00", endsAt: "2026-10-24T00:00:00", venue: "Gradski park", category: "Glazba", description: "Večer glazbe na otvorenom i druženje u parku.", design: 1, col: 0, row: 0 },
  { id: "2", title: "Mali sajam velikih ideja", eyebrow: "LOKALNO & RUČNO", dateLabel: "SUB 24.10. · 10:00", startsAt: "2026-10-24T10:00:00", endsAt: "2026-10-24T17:00:00", venue: "Trg dr. Franje Tuđmana", category: "Druženje", description: "Upoznaj lokalne kreativce, obrtnike i njihove radove.", design: 2, col: 1, row: 0 },
  { id: "3", title: "Filmska večer", eyebrow: "KINO POD NEBOM", dateLabel: "SUB 24.10. · 19:30", startsAt: "2026-10-24T19:30:00", endsAt: "2026-10-24T22:00:00", venue: "Dom kulture", category: "Kultura", description: "Zajedničko gledanje filma i razgovor nakon projekcije.", design: 3, col: -1, row: 0 },
  { id: "4", title: "Šuma zove!", eyebrow: "VIKEND U PRIRODI", dateLabel: "NED 25.10. · 09:00", startsAt: "2026-10-25T09:00:00", endsAt: "2026-10-25T14:00:00", venue: "Park prirode Lonjsko polje", category: "Sport", description: "Lagana zajednička šetnja i upoznavanje prirode.", design: 4, col: 0, row: -1 },
  { id: "5", title: "Pričaonica", eyebrow: "ZA NAJMLAĐE", dateLabel: "PON 26.10. · 17:00", startsAt: "2026-10-26T17:00:00", endsAt: "2026-10-26T18:30:00", venue: "Gradska knjižnica", category: "Za djecu", description: "Priče, mašta i mala radionica za djecu.", design: 5, col: 1, row: -1 },
  { id: "6", title: "Jazz & razgovori", eyebrow: "U DOBROM RITMU", dateLabel: "UTO 27.10. · 20:00", startsAt: "2026-10-27T20:00:00", endsAt: "2026-10-27T23:00:00", venue: "Klub u centru", category: "Glazba", description: "Opuštena večer uz jazz i dobro društvo.", design: 6, col: -1, row: -1 },
  { id: "7", title: "Boje grada", eyebrow: "IZLOŽBA", dateLabel: "SRI 28.10. · 18:00", startsAt: "2026-10-28T18:00:00", endsAt: "2026-10-28T21:00:00", venue: "Galerija", category: "Kultura", description: "Večer lokalnih autora i pogled na grad kroz njihove radove.", design: 7, col: -1, row: 1 },
  { id: "8", title: "Jutarnji đir", eyebrow: "POKRENI SE", dateLabel: "ČET 29.10. · 08:00", startsAt: "2026-10-29T08:00:00", endsAt: "2026-10-29T10:00:00", venue: "Start: gradski park", category: "Sport", description: "Lagano jutarnje trčanje, otvoreno za sve razine.", design: 8, col: 0, row: 1 },
  { id: "9", title: "Kava i ideje", eyebrow: "SUSRET ZAJEDNICE", dateLabel: "PET 30.10. · 18:00", startsAt: "2026-10-30T18:00:00", endsAt: "2026-10-30T20:00:00", venue: "Centar za mlade", category: "Druženje", description: "Susret ljudi koji žele pokrenuti nešto dobro u gradu.", design: 9, col: 1, row: 1 },
  { id: "10", title: "Ritam ulice", eyebrow: "GLAZBA U GRADU", dateLabel: "SUB 31.10. · 19:00", startsAt: "2026-10-31T19:00:00", endsAt: "2026-10-31T22:00:00", venue: "Gradski trg", category: "Glazba", description: "Glazbeno druženje na otvorenom.", design: 10, col: 2, row: 0 },
  { id: "11", title: "Mali istraživači", eyebrow: "RADIONICA", dateLabel: "NED 01.11. · 11:00", startsAt: "2026-11-01T11:00:00", endsAt: "2026-11-01T13:00:00", venue: "Dom kulture", category: "Za djecu", description: "Igra i kreativno istraživanje za najmlađe.", design: 11, col: -2, row: 0 },
  { id: "12", title: "Subotnja tržnica", eyebrow: "OKUSI LOKALNO", dateLabel: "SUB 07.11. · 09:00", startsAt: "2026-11-07T09:00:00", endsAt: "2026-11-07T14:00:00", venue: "Gradska tržnica", category: "Druženje", description: "Mali susret lokalnih proizvođača.", design: 12, col: 0, row: 2 },
];

export const categories: Array<Category | "Sve"> = ["Sve", "Glazba", "Kultura", "Druženje", "Sport", "Za djecu"];

