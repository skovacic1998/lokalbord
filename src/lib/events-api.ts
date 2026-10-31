import { formatDate } from "@/lib/format-date";
import { type Category, type Event, type EventSubmissionDraft } from "@/lib/events";

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

const categoryCodes: Record<Category, CurrentEventDto["category"]> = {
  Glazba: "GLAZBA",
  Kultura: "KULTURA",
  Druženje: "DRUZENJE",
  Sport: "SPORT",
  "Za djecu": "ZA_DJECU",
};

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

type SubmissionResponse = {
  submissionId: string;
  status: "PENDING";
};

export class SubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SubmissionError";
  }
}

function apiUrl(path: string) {
  if (eventsEndpoint.startsWith("/")) return `/backend${path}`;
  return new URL(path, eventsEndpoint).toString();
}

async function errorMessage(response: Response) {
  if (response.status === 429) {
    return "Previše je prijedloga poslano s ove mreže. Pokušajte ponovno kasnije.";
  }

  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object") {
      const message = "detail" in body ? body.detail : "message" in body ? body.message : undefined;
      if (typeof message === "string" && message.trim()) return message;
    }
  } catch {
    // The server may return an empty or non-JSON error response.
  }
  return "Slanje prijedloga nije uspjelo. Pokušajte ponovno.";
}

export async function submitEvent(
  draft: EventSubmissionDraft,
  poster: File | null,
): Promise<{ posterUploaded: boolean }> {
  const response = await fetch(apiUrl("/api/events/kutina/submissions"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: draft.title,
      startsAt: new Date(draft.startsAt).toISOString(),
      endsAt: new Date(draft.endsAt).toISOString(),
      venue: draft.venue,
      category: categoryCodes[draft.category],
      description: draft.description || undefined,
      submitterName: draft.submitterName,
      submitterLastName: draft.submitterLastName,
      submitterEmail: draft.submitterEmail,
    }),
  });

  if (!response.ok) throw new SubmissionError(await errorMessage(response));
  const submission = (await response.json()) as SubmissionResponse;

  if (!poster) return { posterUploaded: true };

  const formData = new FormData();
  formData.append("file", poster);
  const posterResponse = await fetch(
    apiUrl(`/api/event-submissions/${submission.submissionId}/poster`),
    { method: "POST", body: formData },
  );

  // The event is already safely pending if the optional poster upload fails.
  return { posterUploaded: posterResponse.ok };
}
