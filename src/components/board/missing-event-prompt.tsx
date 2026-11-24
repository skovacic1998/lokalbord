import { useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { Modal } from "./modal";

export function MissingEventPrompt() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  function openPrompt() {
    setMessage(`Bok! Naišao/la sam na Lokalbord, online pano za događaje u Kutini. Bilo bi super vidjeti i vaš događaj tamo. Objavljivanje je besplatno, a možete dodati isti plakat koji već imate. 😊\n\n${window.location.origin}/`);
    setStatus("");
    setOpen(true);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Poruka je kopirana.");
    } catch {
      setStatus("Kopiranje nije uspjelo. Označi i kopiraj poruku iznad.");
    }
  }

  async function shareMessage() {
    try {
      await navigator.share({ text: message });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Dijeljenje nije uspjelo. Možeš kopirati poruku.");
    }
  }

  return (
    <>
      <button className="missing-event-trigger" type="button" onClick={openPrompt}>
        Nedostaje neki događaj? <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <Modal className="submit-modal missing-event-modal" titleId="missing-event-title" onClose={() => setOpen(false)}>
          <h2 id="missing-event-title">Nedostaje neki događaj?</h2>
          <p className="form-intro">Znaš za događaj kojeg nema na panou? Pošalji organizatoru poruku i pozovi ga da doda svoj plakat.</p>
          <label htmlFor="organiser-message">Poruka za organizatora</label>
          <textarea id="organiser-message" rows={7} value={message} onChange={(event) => setMessage(event.target.value)} />
          <div className="missing-event-actions">
            <button className="primary-button" type="button" onClick={copyMessage}><Copy size={16} /> Kopiraj poruku</button>
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <button className="missing-event-share" type="button" onClick={shareMessage}><Share2 size={16} /> Podijeli</button>
            )}
          </div>
          <p className="missing-event-status" role="status">{status}</p>
        </Modal>
      )}
    </>
  );
}
