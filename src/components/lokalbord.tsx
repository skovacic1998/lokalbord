"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { BoardViewport } from "@/components/board/board-viewport";
import { EventDetailsDialog } from "@/components/board/event-details-dialog";
import { Modal } from "@/components/board/modal";
import { SubmitEventDialog } from "@/components/board/submit-event-dialog";
import { MissingEventPrompt } from "@/components/board/missing-event-prompt";
import { useBoardEvents } from "@/hooks/use-board-events";
import { useBoardNavigation } from "@/hooks/use-board-navigation";
import type { Event, EventSubmissionDraft } from "@/lib/events";

export function Lokalbord() {
  const [selected, setSelected] = useState<Event | null>(null);
  const [eventUnavailable, setEventUnavailable] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const { activeEvents, submitEvent, notice, isLoading, loadError } =
    useBoardEvents();
  const navigation = useBoardNavigation((id) => {
    const event = activeEvents.find((event) => event.id === id);

    if (event) {
      openEvent(event);
    }
  });

  async function handleSubmit(
    draft: EventSubmissionDraft,
    imageFile: File | null,
  ) {
    await submitEvent(draft, imageFile);
    setSubmitOpen(false);
  }

  function openEvent(event: Event) {
    const url = new URL(window.location.href);
    url.searchParams.set("event", event.id);

    window.history.pushState(null, "", url);
    setEventUnavailable(false);
    setSelected(event);
  }

  function closeEvent() {
    const url = new URL(window.location.href);
    url.searchParams.delete("event");

    window.history.pushState(null, "", url);
    setEventUnavailable(false);
    setSelected(null);
  }

  useEffect(() => {
    function syncSelectedEvent() {
      const url = new URL(window.location.href);
      const eventId = url.searchParams.get("event");
      const event = activeEvents.find((item) => item.id === eventId);

      setSelected(event ?? null);
      setEventUnavailable(eventId !== null && !isLoading && !loadError && !event);
    }

    syncSelectedEvent();
    window.addEventListener("popstate", syncSelectedEvent);
    return () => window.removeEventListener("popstate", syncSelectedEvent);
  }, [activeEvents, isLoading, loadError]);


  return (
    <>
      <header className="wall-bar">
        <button
          type="button"
          onClick={navigation.resetView}
          aria-label="Lokalbord — prikaži cijeli pano"
        >
          LOKALBORD
        </button>
        <button type="button" onClick={() => setSubmitOpen(true)}>
          DODAJ PLAKAT
        </button>
      </header>
      <BoardViewport
        events={activeEvents}
        navigation={navigation}
        onSelect={openEvent}
        onAdd={() => setSubmitOpen(true)}
        isLoading={isLoading}
        loadError={loadError}
      />
      <MissingEventPrompt />
      <nav className="board-footer" aria-label="Informacije o Lokalbordu">
        <Link className="board-news-link" href="/novosti">Što je novo?</Link>
        <Link href="/kako-koristiti">Kako koristiti</Link>
        <Link href="/uvjeti-koristenja">Uvjeti korištenja</Link>
        <Link href="/politika-privatnosti">Privatnost</Link>
      </nav>
      {selected && <EventDetailsDialog event={selected} onClose={closeEvent} />}
      {eventUnavailable && (
        <Modal className="submit-modal" titleId="unavailable-title" onClose={closeEvent}>
          <h2 id="unavailable-title">Ovaj događaj više nije dostupan.</h2>
          <button className="detail-back" type="button" onClick={closeEvent}>
            Natrag na pano
          </button>
        </Modal>
      )}
      <SubmitEventDialog
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={handleSubmit}
      />
      {notice && (
        <div className="toast">
          <Check size={19} /> {notice}
        </div>
      )}
    </>
  );
}
