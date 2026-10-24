import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import type { Event } from "@/lib/events";
import { formatDate } from "@/lib/format-date";
import { Modal } from "./modal";
import { Poster } from "./poster";

type EventDetailsDialogProps = {
  event: Event;
  onClose: () => void;
};

export function EventDetailsDialog({ event, onClose }: EventDetailsDialogProps) {
  return (
    <Modal className="detail-modal" titleId="detail-title" onClose={onClose}>
      <div className="detail-poster">
        <Poster event={event} />
      </div>
      <div className="detail-copy">
        <span className="eyebrow">
          {event.category.toUpperCase()} / KUTINA {event.preview ? "/ PREGLED" : ""}
        </span>
        <h2 id="detail-title">{event.title}</h2>
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
