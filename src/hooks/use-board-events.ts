import { useEffect, useMemo, useRef, useState } from "react";
import { type Event, type EventSubmissionDraft } from "@/lib/events";
import { getCurrentEvents, submitEvent as sendEventSubmission } from "@/lib/events-api";

export function useBoardEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [now, setNow] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getCurrentEvents(controller.signal)
      .then(setEvents)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(true);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const activeEvents = useMemo(
    () => events.filter((event) => !now || new Date(event.endsAt).getTime() > now),
    [events, now],
  );

  async function submitEvent(draft: EventSubmissionDraft, imageFile: File | null) {
    const result = await sendEventSubmission(draft, imageFile);
    setNotice(result.posterUploaded
      ? "Prijedlog je poslan na pregled. Nakon odobrenja pojavit će se na panou."
      : "Prijedlog je poslan na pregled, ali plakat nije učitan.");
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 6500);
  }

  return { activeEvents, submitEvent, notice, isLoading, loadError };
}
