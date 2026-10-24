import type { Event } from "@/lib/events";

export function Poster({ event }: { event: Event }) {
  return (
    <div className="poster-art">
      {event.image ? (
        // Local preview images use a blob URL and retain the source artwork's aspect ratio.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="poster-upload"
          src={event.image}
          alt={`Plakat: ${event.title}`}
          draggable={false}
        />
      ) : (
        <>
          <div className="poster-top">
            <span>{event.eyebrow}</span>
            <span className="poster-mark">✳</span>
          </div>
          <div className="poster-graphic" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="poster-bottom">
            <strong>{event.title}</strong>
            <div className="poster-rule" />
            <span>{event.dateLabel}</span>
            <small>{event.venue}</small>
          </div>
        </>
      )}
    </div>
  );
}
