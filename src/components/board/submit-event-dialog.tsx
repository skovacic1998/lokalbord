import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Plus, UploadCloud } from "lucide-react";
import Link from "next/link";
import { categories, type Category, type EventSubmissionDraft } from "@/lib/events";
import { Modal } from "./modal";
import { EventDateTimeField } from "./event-date-time-field";

const minimumDuration = 60 * 60 * 1000;

function minimumEndTime(startsAt: string) {
  if (!startsAt) return "";
  const date = new Date(new Date(startsAt).getTime() + minimumDuration);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

type SubmitEventDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: EventSubmissionDraft, imageFile: File | null) => Promise<void>;
};

export function SubmitEventDialog({ open, onClose, onSubmit }: SubmitEventDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const minEndsAt = minimumEndTime(startsAt);

  function handleStartChange(value: string) {
    setStartsAt(value);
    const minimum = minimumEndTime(value);
    if (minimum && (!endsAt || new Date(endsAt).getTime() < new Date(minimum).getTime())) {
      setEndsAt(minimum);
    }
  }

  function handleEndChange(value: string) {
    setEndsAt(value && new Date(value).getTime() < new Date(minEndsAt).getTime() ? minEndsAt : value);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      e.target.value = "";
      setImageFile(null);
      setFormError("Plakat može imati najviše 5 MB.");
      return;
    }
    setImageFile(file);
    setFormError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const startsAt = String(form.get("startsAt") ?? "");
    const endsAt = String(form.get("endsAt") ?? "");
    const venue = String(form.get("venue") ?? "").trim();
    if (!title || !venue || !startsAt || !endsAt) return;

    const startTime = new Date(startsAt).getTime();
    const endTime = new Date(endsAt).getTime();
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
      setFormError("Odaberite ispravan datum i vrijeme.");
      return;
    }

    if ([startsAt, endsAt].some((value) => Number(value.slice(14, 16)) % 5 !== 0)) {
      setFormError("Vrijeme odaberite u razmacima od 5 minuta.");
      return;
    }

    if (startTime <= Date.now()) {
      setFormError("Početak događaja mora biti u budućnosti.");
      return;
    }

    if (endTime - startTime < minimumDuration) {
      setFormError("Završetak mora biti najmanje sat vremena nakon početka.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        startsAt,
        endsAt,
        venue,
        category: String(form.get("category")) as Category,
        description: String(form.get("description") ?? "").trim(),
        submitterName: String(form.get("name") ?? "").trim(),
        submitterLastName: String(form.get("lastName") ?? "").trim(),
        submitterEmail: String(form.get("email") ?? "").trim(),
      }, imageFile);
      setImageFile(null);
      setStartsAt("");
      setEndsAt("");
    } catch (error: unknown) {
      setFormError(error instanceof Error ? error.message : "Slanje prijedloga nije uspjelo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <Modal className="submit-modal" titleId="submit-title" onClose={onClose}>
      <h2 id="submit-title">Dodaj plakat</h2>
      <p className="form-intro">
        Pošalji prijedlog događaja na pregled. Nakon odobrenja pojavit će se na panou.
      </p>
      <form onSubmit={handleSubmit}>
        <h4>Osobne informacije</h4>
        <div className="form-row">
          <label>
            Ime
          <input name="name" type="text" required maxLength={100} />
          </label>
          <label>
            Prezime
          <input name="lastName" type="text" required maxLength={100} />
          </label>
        </div>
        <label>
          Email
          <input name="email" type="email" required maxLength={320} placeholder="tvrtko@gmail.com" />
        </label>
        <hr />
        <h4>Informacije o događaju</h4>
        <label>
          Naziv događaja
          <input name="title" required maxLength={100} placeholder="Npr. Koncert u parku" />
        </label>
        <div className="form-row">
          <EventDateTimeField name="startsAt" label="Početak" value={startsAt} onChange={handleStartChange} />
          <EventDateTimeField
            name="endsAt"
            label="Završetak"
            value={endsAt}
            min={minEndsAt}
            disabled={!startsAt}
            onChange={handleEndChange}
          />
        </div>
        <div className="form-row">
          <label>
            Lokacija
            <input name="venue" required maxLength={100} placeholder="Npr. Gradski park" />
          </label>
          <label>
            Kategorija
            <select name="category">
              {categories.filter((item) => item !== "Sve").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Kratki opis
          <textarea name="description" rows={2} maxLength={500} placeholder="Što posjetitelji mogu očekivati?" />
        </label>
        <label className="file-field">
          <span>Plakat (JPG, PNG ili WebP)</span>
          <span className="file-drop">
            <UploadCloud size={21} /> {imageFile ? imageFile.name : "Odaberi sliku plakata"}
          </span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} />
        </label>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <p className="form-legal">
          Podatke koristimo za pregled prijedloga i kontakt u vezi s događajem. Više u{" "}
          <Link href="/politika-privatnosti">politici privatnosti</Link> i{" "}
          <Link href="/uvjeti-koristenja">uvjetima korištenja</Link>.
        </p>
        <button className="primary-button submit-button" type="submit" disabled={isSubmitting}>
          <Plus size={19} /> {isSubmitting ? "Šaljem…" : "Pošalji na pregled"} <ArrowRight size={18} />
        </button>
      </form>
    </Modal>
  );
}
