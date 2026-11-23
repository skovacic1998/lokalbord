import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Što je novo? — Lokalbord",
  description: "Novosti i promjene na Lokalbordu.",
};

const updates = [
  {
    date: "2026-11-23",
    dateLabel: "23. 11. 2026.",
    title: "Pošalji plakat ekipi",
    description: "Našao si nešto zanimljivo? Otvori plakat i klikni na Podijeli. Poveznicu možeš poslati ekipi, a otvorit će ih direktno na tom događaju.",
  },
  {
    date: "2026-11-22",
    dateLabel: "22. 11. 2026.",
    title: "Pano se brže učitava",
    description: "Plakati na panou sada se učitavaju u manjoj veličini, pa možeš brže pogledati što se događa u gradu.",
  },
  {
    date: "2026-11-10",
    dateLabel: "10. 11. 2026.",
    title: "Lakši unos vremena događaja",
    description: "Vrijeme se sada bira u razmacima od pet minuta, a završetak događaja postavlja se najmanje sat vremena nakon početka.",
  },
];

export default function NewsPage() {
  return (
    <main className="news-page">
      <div className="news-inner">
        <Link className="info-back" href="/">← Natrag na pano</Link>
        <header className="news-header">
          <div>
            <span>LOKALBORD / KUTINA</span>
            <h1>Što je novo?</h1>
          </div>
          <p>Male i velike promjene na Lokalbordu, na jednom mjestu.</p>
        </header>
        <div className="news-feed">
          {updates.map((update) => (
            <article className="news-entry" key={update.date}>
              <time dateTime={update.date}>{update.dateLabel}</time>
              <div>
                <h2>{update.title}</h2>
                <p>{update.description}</p>
              </div>
            </article>
          ))}
        </div>
        <nav className="info-nav" aria-label="Informacije o Lokalbordu">
          <Link href="/kako-koristiti">Kako koristiti</Link>
          <Link href="/uvjeti-koristenja">Uvjeti korištenja</Link>
          <Link href="/politika-privatnosti">Privatnost</Link>
        </nav>
      </div>
    </main>
  );
}
