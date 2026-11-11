import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = { title: "Politika privatnosti — Lokalbord" };

export default function PrivacyPage() {
  return (
    <InfoPage title="Politika privatnosti" intro="Koje podatke koristimo kada posjetiš Lokalbord ili predložiš događaj i koja su tvoja prava.">
      <p className="info-draft"><strong>Nacrt prije objave:</strong> Potrebno je osigurati brisanje odbijenih prijedloga u predviđenom roku te provjeriti rokove čuvanja zapisnika i sigurnosnih kopija, obradu kod pružatelja usluga i eventualne prijenose izvan EGP-a.</p>
      <section>
        <h2>Tko je odgovoran za podatke?</h2>
        <p>Voditelj obrade je Silvio Kovačić. Za pitanja o privatnosti i ostvarivanje prava možeš se javiti na <a href="mailto:silviokovacicofficial@gmail.com">silviokovacicofficial@gmail.com</a>.</p>
      </section>
      <section>
        <h2>Koje podatke prikupljamo?</h2>
        <p>Kada predložiš događaj, tražimo tvoje ime, prezime i email adresu te podatke o događaju: naziv, vrijeme, mjesto, kategoriju, opis i, ako ga dodaš, plakat. Osobni podaci mogu se nalaziti i u tekstu ili na plakatu koje samostalno pošalješ, zato pripazi što u njih uključuješ.</p>
        <p>Pri pristupu stranici i slanju zahtjeva pružatelji tehničkih usluga mogu obrađivati tehničke podatke poput IP adrese. Aplikacija koristi IP adresu i za ograničavanje broja prijedloga radi zaštite od zlouporabe.</p>
      </section>
      <section>
        <h2>Zašto koristimo podatke?</h2>
        <p>Podatke iz prijedloga koristimo za pregled i upravljanje događajem te, prema potrebi, za kontakt u vezi s prijedlogom. Podatke o događaju i plakat koristimo za njegov prikaz nakon odobrenja. Pravna osnova za te radnje i za zaštitu usluge je legitimni interes za rad i sigurnost lokalnog panoa (članak 6. stavak 1. točka (f) GDPR-a), uz uvažavanje tvojih prava i interesa.</p>
        <p>Ime, prezime i email obvezni su za slanje prijedloga; bez njih prijedlog nije moguće poslati. Sama posjeta panou ne zahtijeva ispunjavanje obrasca.</p>
      </section>
      <section>
        <h2>Što je javno?</h2>
        <p>Nakon odobrenja javno su vidljivi podaci o događaju i plakat. Ime, prezime i email iz osobnih informacija obrasca ne prikazuju se na panou. Ipak, sve što upišeš u opis ili staviš na plakat može biti vidljivo drugima. Preneseni plakat pohranjen je na javno dostupnoj poveznici pa mu se može pristupiti i prije objave ako je poveznica poznata.</p>
      </section>
      <section>
        <h2>Koliko dugo čuvamo podatke?</h2>
        <p>Prijedlozi na čekanju i objavljeni događaji čuvaju se do završetka događaja. Nakon toga se događaj, plakat i pripadajući podaci podnositelja koji više nisu potrebni uklanjaju kroz predviđeno dnevno čišćenje. Ako dođe do tehničke poteškoće, brisanje može kasniti.</p>
        <p>Za odbijene prijedloge predviđen je rok čuvanja od najviše 14 dana od odbijanja. [Prije objave potrebno je osigurati brisanje u tom roku i provjeriti rokove čuvanja sigurnosnih kopija, zapisnika i upita.]</p>
      </section>
      <section>
        <h2>Tko ima pristup podacima?</h2>
        <p>Pristup prijedlozima ima voditelj obrade te pružatelji tehničkih usluga prema potrebi za pružanje usluge. Backend je smješten na Hetznerovu poslužitelju u Njemačkoj. Supabase se koristi za bazu podataka i pohranu plakata u regiji Irska, a stranica se isporučuje putem GitHub Pagesa.</p>
        <p>[Potrebno je provjeriti sve pružatelje i njihove uloge, uključujući obradu tehničkih podataka i podršku, te eventualne prijenose izvan EGP-a i primjenjive zaštitne mjere.]</p>
      </section>
      <section>
        <h2>Tvoja prava</h2>
        <p>Možeš zatražiti pristup svojim podacima, njihov ispravak ili brisanje, ograničenje obrade te, kada je primjenjivo, prijenos podataka. Imaš i pravo uložiti prigovor na obradu koja se temelji na legitimnom interesu. Ostvarivanje pojedinog prava ovisi o zakonskim uvjetima.</p>
        <p>Zahtjev pošalji na <a href="mailto:silviokovacicofficial@gmail.com">silviokovacicofficial@gmail.com</a>. Imaš pravo podnijeti pritužbu <a href="https://azop.hr/">Agenciji za zaštitu osobnih podataka (AZOP)</a>.</p>
      </section>
      <section>
        <h2>Kolačići i promjene politike</h2>
        <p>[Potrebno je provjeriti koriste li stranica i svi pružatelji kolačiće ili slične tehnologije te ovdje opisati njihovu svrhu i postavke.] Politiku možemo ažurirati kada se promijeni način rada stranice ili obrade podataka.</p>
      </section>
    </InfoPage>
  );
}
