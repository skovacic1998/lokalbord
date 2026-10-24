import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Plus, UploadCloud } from "lucide-react";
import { categories, type Category, type EventDraft } from "@/lib/events";
import { Modal } from "./modal";

type SubmitEventDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: EventDraft, imageFile: File | null) => void;
};

export function SubmitEventDialog({ open, onClose, onSubmit }: SubmitEventDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 8 * 1024 * 1024) {
      e.target.value = "";
      setImageFile(null);
      setFormError("Plakat može imati najviše 8 MB.");
      return;
    }
    setImageFile(file);
    setFormError("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const startsAt = String(form.get("startsAt") ?? "");
    const endsAt = String(form.get("endsAt") ?? "");
    const venue = String(form.get("venue") ?? "").trim();
    if (!title || !venue || !startsAt || !endsAt) return;

    if (new Date(endsAt) <= new Date(startsAt) || new Date(endsAt).getTime() <= Date.now()) {
      setFormError("Završetak mora biti nakon početka i u budućnosti.");
      return;
    }

    setFormError("");
    onSubmit({
      title,
      startsAt,
      endsAt,
      venue,
      category: String(form.get("category")) as Category,
      description: String(form.get("description") ?? "").trim() || "Detalji događaja uskoro.",
    }, imageFile);
    setImageFile(null);
  }

  if (!open) return null;

  return (
    <Modal className="submit-modal" titleId="submit-title" onClose={onClose}>
      <h2 id="submit-title">Dodaj plakat</h2>
      <p className="form-intro">
        Dodaj događaj i pogledaj kako bi izgledao na panou. Ovo je lokalni prototip;
        objava se ne sprema nakon osvježavanja stranice.
      </p>
      <form onSubmit={handleSubmit}>
        <h4>
          Osobne informacije  
        </h4>
        <div className="form-row">
          <label>
            Ime
            <input name="name" type="text" required />
          </label>
          <label>
            Prezime
            <input name="lastName" type="text" required />
          </label>
        </div>
         <label>
          Email
          <input name="email" type="email" required maxLength={80} placeholder="tvrtko@gmail.com" />
        </label>
        <hr ></hr>
         <h4>
           Informacije o događaju
        </h4>
        <label>
          Naziv događaja
          <input name="title" required maxLength={80} placeholder="Npr. Koncert u parku" />
        </label>
        <div className="form-row">
          <label>
            Početak
            <input name="startsAt" type="datetime-local" required />
          </label>
          <label>
            Završetak
            <input name="endsAt" type="datetime-local" required />
          </label>
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
          <textarea name="description" rows={2} maxLength={280} placeholder="Što posjetitelji mogu očekivati?" />
        </label>
        <label className="file-field">
          <span>Plakat (JPG, PNG ili WebP)</span>
          <span className="file-drop">
            <UploadCloud size={21} /> {imageFile ? imageFile.name : "Odaberi sliku plakata"}
          </span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} />
        </label>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button className="primary-button submit-button" type="submit">
          <Plus size={19} /> Dodaj na pano <ArrowRight size={18} />
        </button>
      </form>
    </Modal>
  );
}
