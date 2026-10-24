import { useEffect, useMemo, useRef, useState } from "react";
import { type Event, type EventDraft } from "@/lib/events";
import { findFreeSpot } from "@/lib/board";
import { formatDate } from "@/lib/format-date";

export function useBoardEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [now, setNow] = useState(0);
  const [notice, setNotice] = useState(false);
  const imageUrls = useRef<string[]>([]);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => {
    imageUrls.current.forEach((url) => URL.revokeObjectURL(url));
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const activeEvents = useMemo(
    () => events.filter((event) => !now || new Date(event.endsAt).getTime() > now),
    [events, now],
  );

  function addEvent(draft: EventDraft, imageFile: File | null) {
    const spot = findFreeSpot(activeEvents);
    const image = imageFile ? URL.createObjectURL(imageFile) : undefined;
    if (image) imageUrls.current.push(image);

    const event: Event = {
      ...draft,
      ...spot,
      id: `event-${Date.now()}`,
      eyebrow: "NOVO NA PANOU",
      dateLabel: formatDate(draft.startsAt),
      image,
    };

    setEvents((current) => [...current, event]);
    setNotice(true);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(false), 5500);
    return event;
  }

  return { activeEvents, addEvent, notice };
}
