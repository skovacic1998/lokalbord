import Link from "next/link";
import type { ReactNode } from "react";

export function InfoPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="info-page">
      <div className="info-inner">
        <Link className="info-back" href="/">← Natrag na pano</Link>
        <header className="info-header">
          <span>LOKALBORD / INFO</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        <article className="info-content">{children}</article>
        <nav className="info-nav" aria-label="Informacije o Lokalbordu">
          <Link href="/kako-koristiti">Kako koristiti</Link>
          <Link href="/uvjeti-koristenja">Uvjeti korištenja</Link>
          <Link href="/politika-privatnosti">Privatnost</Link>
        </nav>
      </div>
    </main>
  );
}
