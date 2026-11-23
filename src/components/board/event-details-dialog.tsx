import { useState } from "react";
import { ArrowLeft, CalendarDays, MapPin, Share2 } from "lucide-react";
import type { Event } from "@/lib/events";
import { formatDate } from "@/lib/format-date";
import { Modal } from "./modal";
import { Poster } from "./poster";

type EventDetailsDialogProps = {
  event: Event;
  onClose: () => void;
};

export function EventDetailsDialog({
  event,
  onClose,
}: EventDetailsDialogProps) {
  const [copyStatus, setCopyStatus] = useState("");

  async function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set("event", event.id);

    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, url: url.toString() });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCopyStatus("Dijeljenje nije uspjelo.");
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopyStatus("Poveznica je kopirana.");
    } catch (error) {
      console.error("Kopiranje poveznice nije uspjelo", error);
      setCopyStatus("Poveznicu nije moguće kopirati.");
    }
  }

  return (
    <Modal className="detail-modal" titleId="detail-title" onClose={onClose}>
      <div className="detail-poster">
        <Poster event={event} />
      </div>
      <div className="detail-copy">
        <span className="eyebrow">{event.category.toUpperCase()} / KUTINA</span>
        <div className="detail-title-row">
          <h2 id="detail-title">{event.title}</h2>
          <button className="detail-share" type="button" onClick={handleShare}>
            <Share2 size={16} /> Podijeli
          </button>
        </div>
        {copyStatus && <div className="detail-copy-status" role="status">{copyStatus}</div>}
        <p>{event.description}</p>
        <div className="detail-facts">
          <div>
            <CalendarDays size={19} />
            <span>
              <small>DATUM I VRIJEME</small>
              {formatDate(event.startsAt)}
            </span>
          </div>
          <div>
            <MapPin size={19} />
            <span>
              <small>LOKACIJA</small>
              {event.venue}
            </span>
          </div>
        </div>
        <button className="detail-back" type="button" onClick={onClose}>
          <ArrowLeft size={18} /> Natrag na pano
        </button>
      </div>
    </Modal>
  );
}
