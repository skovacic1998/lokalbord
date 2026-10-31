import { formatDate } from "@/lib/format-date";
import { type Category, type Event } from "@/lib/events";

type CurrentEventDto = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location?: { name?: string };
  venue?: string;
  category: "GLAZBA" | "KULTURA" | "DRUZENJE" | "SPORT" | "ZA_DJECU";
  description?: string;
  posterImage?: string;
  boardCol?: number;
  boardRow?: number;
};

const eventsEndpoint =
  process.env.NEXT_PUBLIC_EVENTS_API_URL ?? "/backend/api/events/kutina";

const categoryLabels: Record<CurrentEventDto["category"], Category> = {
  GLAZBA: "Glazba",
  KULTURA: "Kultura",
  DRUZENJE: "Druženje",
  SPORT: "Sport",
  ZA_DJECU: "Za djecu",
};

function resolvePosterImage(value: string | undefined) {
  if (!value) return undefined;
  if (value.startsWith("data:") || value.startsWith("http://") || value.startsWith("https://")) return value;
  if (eventsEndpoint.startsWith("/")) {
    return value.startsWith("/") ? `/backend${value}` : `/backend/${value}`;
  }

  try {
    return new URL(value, eventsEndpoint).toString();
  } catch {
    return value;
  }
}

function toEvent(event: CurrentEventDto, index: number): Event {
  return {
    id: event.id,
    title: event.title,
    eyebrow: "NA PANOU",
    dateLabel: formatDate(event.startsAt),
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    venue: event.venue || event.location?.name || "Lokacija uskoro",
    category: categoryLabels[event.category],
    description: event.description || "Detalji događaja uskoro.",
    image: resolvePosterImage(event.posterImage),
    col: typeof event.boardCol === "number" && Number.isFinite(event.boardCol) ? event.boardCol : index,
    row: typeof event.boardRow === "number" && Number.isFinite(event.boardRow) ? event.boardRow : 0,
  };
}

export async function getCurrentEvents(signal?: AbortSignal): Promise<Event[]> {
  const response = await fetch(eventsEndpoint, { signal });
  if (!response.ok) throw new Error(`Dohvaćanje događaja nije uspjelo (${response.status}).`);

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Poslužitelj je vratio neispravan popis događaja.");

  return data.map((event, index) => toEvent(event as CurrentEventDto, index));
}
