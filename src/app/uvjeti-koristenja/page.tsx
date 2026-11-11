import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = { title: "Uvjeti korištenja — Lokalbord" };

export default function TermsPage() {
  return (
    <InfoPage title="Uvjeti korištenja" intro="Pravila koja pomažu da Lokalbord ostane koristan i ugodan prostor za lokalne događaje.">
      <section>
        <h2>O Lokalbordu</h2>
        <p>Lokalbord je digitalni pano za pregled i predlaganje lokalnih događaja. Pregledavanje i slanje prijedloga trenutačno su besplatni. Korištenjem stranice prihvaćaš ove uvjete.</p>
      </section>
      <section>
        <h2>Slanje događaja</h2>
        <p>Pošalji točne i ažurne podatke te događaje koji su relevantni za lokalnu zajednicu. Prije slanja provjeri datum, vrijeme i mjesto. Za sadržaj prijedloga odgovorna je osoba koja ga šalje.</p>
        <p>Šalji samo plakate i drugi sadržaj za koji imaš pravo korištenja i objavljivanja. Nemoj uključivati tuđe osobne podatke bez odgovarajuće osnove ili potrebnog dopuštenja. Slanjem sadržaja dopuštaš njegov prikaz na Lokalbordu radi objave događaja.</p>
        <p>Nije dopušteno slati nezakonit, obmanjujući, uvredljiv ili diskriminirajući sadržaj, neželjene oglase ni sadržaj koji krši tuđa prava. Nije dopuštena ni zlouporaba stranice, uključujući automatizirano preopterećivanje ili pokušaje neovlaštenog pristupa.</p>
      </section>
      <section>
        <h2>Pregled i uklanjanje objava</h2>
        <p>Prijedlozi se pregledavaju prije objave. Možemo odbiti ili ukloniti sadržaj koji ne odgovara svrsi panoa, krši ove uvjete ili zakon, sadrži netočne podatke ili za koji nemamo dovoljno informacija. Slanje prijedloga ne jamči objavu. Događaj se nakon završetka prestaje prikazivati na panou.</p>
        <p>Ako želiš prijaviti sadržaj, zatražiti ispravak ili uklanjanje svoje objave ili imaš pitanje o odluci, javi se na <a href="mailto:silviokovacicofficial@gmail.com">silviokovacicofficial@gmail.com</a>. Navedi da se radi o Lokalbordu, naziv događaja, gdje se sadržaj nalazi i razlog prijave ili zahtjeva.</p>
      </section>
      <section>
        <h2>Točnost i dostupnost</h2>
        <p>Trudimo se održavati informacije korisnima, ali ne možemo jamčiti da su sve objave točne, potpune ili ažurne. Prije odlaska provjeri pojedinosti s organizatorom. Organizatori su odgovorni za svoje događaje; objava na panou sama po sebi ne znači da ih Lokalbord organizira ili preporučuje.</p>
        <p>Stranica može povremeno biti nedostupna ili se promijeniti. Ovi uvjeti ne isključuju odgovornost ni prava koja se prema primjenjivom pravu ne mogu isključiti.</p>
      </section>
      <section>
        <h2>Privatnost i promjene uvjeta</h2>
        <p>Kako obrađujemo osobne podatke možeš pročitati u <Link href="/politika-privatnosti">politici privatnosti</Link>. Uvjete možemo ažurirati; važeća verzija bit će dostupna na ovoj stranici.</p>
      </section>
    </InfoPage>
  );
}
