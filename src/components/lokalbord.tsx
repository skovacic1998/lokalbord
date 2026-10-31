"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BoardViewport } from "@/components/board/board-viewport";
import { EventDetailsDialog } from "@/components/board/event-details-dialog";
import { SubmitEventDialog } from "@/components/board/submit-event-dialog";
import { useBoardEvents } from "@/hooks/use-board-events";
import { useBoardNavigation } from "@/hooks/use-board-navigation";
import type { Event, EventDraft } from "@/lib/events";

export function Lokalbord() {
  const [selected, setSelected] = useState<Event | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const { activeEvents, addEvent, notice, boardFull, isLoading, loadError } = useBoardEvents();
  const navigation = useBoardNavigation((id) => {
    setSelected(activeEvents.find((event) => event.id === id) ?? null);
  });

  function handleSubmit(draft: EventDraft, imageFile: File | null) {
    const event = addEvent(draft, imageFile);
    if (!event) return;
    setSubmitOpen(false);
    navigation.focusEvent(event);
  }

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
        onSelect={setSelected}
        onAdd={() => setSubmitOpen(true)}
        isLoading={isLoading}
        loadError={loadError}
      />
      {selected && (
        <EventDetailsDialog event={selected} onClose={() => setSelected(null)} />
      )}
      <SubmitEventDialog
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={handleSubmit}
      />
      {notice && (
        <div className="toast">
          <Check size={19} /> Plakat je dodan na pano.
        </div>
      )}
      {boardFull && <div className="toast">Pano je pun.</div>}
    </>
  );
}
