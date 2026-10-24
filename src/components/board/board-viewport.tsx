import type { BoardNavigation } from "@/hooks/use-board-navigation";
import { CELL_HEIGHT, CELL_WIDTH } from "@/lib/board";
import type { Event } from "@/lib/events";
import { Poster } from "./poster";

type BoardViewportProps = {
  events: Event[];
  navigation: BoardNavigation;
  onSelect: (event: Event) => void;
  onAdd: () => void;
};

export function BoardViewport({ events, navigation, onSelect, onAdd }: BoardViewportProps) {
  const { view, ready, viewportRef, pointerDown, pointerMove, pointerUp, pointerCancel, keyDown } = navigation;

  return (
    <main
      className="board-viewport"
      ref={viewportRef}
      tabIndex={0}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerCancel}
      onKeyDown={keyDown}
      aria-label="Pano događaja u Kutini. Povuci za pomicanje, skrolaj ili stisni prstima za zumiranje. Tipkovnica: strelice za pomicanje, plus i minus za zoom, 0 za prikaz cijelog panoa."
    >
      <div
        className="board-origin"
        style={{
          visibility: ready ? "visible" : "hidden",
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
        }}
      >
        {events.map((event) => (
          <div
            className="poster-position"
            key={event.id}
            style={{ left: event.col * CELL_WIDTH, top: event.row * CELL_HEIGHT }}
          >
            <div
              className="poster-frame"
              data-poster-id={event.id}
              role="button"
              tabIndex={0}
              aria-label={`${event.title}, ${event.dateLabel}, ${event.venue}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(event);
                }
              }}
            >
              <Poster event={event} />
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <div className="empty-board" role="status">
          <p>Pano je prazan.</p>
          <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onAdd}>
            Dodaj prvi plakat
          </button>
        </div>
      )}
    </main>
  );
}
