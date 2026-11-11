import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = { title: "Kako koristiti — Lokalbord" };

export default function HowToPage() {
  return (
    <InfoPage title="Kako koristiti Lokalbord?" intro="Mali vodič za otkrivanje i dijeljenje događaja u Kutini.">
      <section>
        <h2>Razgledaj pano</h2>
        <p>Povuci pano mišem ili prstom kako bi ga pomaknuo. Za približavanje koristi kotačić miša ili raširi dva prsta na zaslonu. Klikni ili dodirni plakat za više informacija o događaju.</p>
        <p>Klik na LOKALBORD u gornjem lijevom kutu vraća prikaz cijelog panoa. Pano možeš pomicati i strelicama na tipkovnici, približiti ili udaljiti tipkama + i − te vratiti početni prikaz tipkom 0.</p>
      </section>
      <section>
        <h2>Dodaj događaj</h2>
        <ol>
          <li>Klikni <strong>Dodaj plakat</strong> u gornjem desnom kutu.</li>
          <li>Upiši svoje ime, prezime i email te podatke o događaju. Po želji dodaj plakat u JPG, PNG ili WebP formatu, veličine do 5 MB.</li>
          <li>Pošalji prijedlog na pregled. Nakon odobrenja događaj će se pojaviti na panou.</li>
        </ol>
        <p>Početak događaja mora biti u budućnosti, a završetak najmanje sat vremena nakon početka. Vrijeme se bira u razmacima od pet minuta. Položaj plakata na panou određuje aplikacija.</p>
      </section>
      <section>
        <h2>Nakon događaja</h2>
        <p>Kad događaj završi, više se ne prikazuje na panou. Za pitanja ili ispravak objave javi se na <a href="mailto:silviokovacicofficial@gmail.com">silviokovacicofficial@gmail.com</a>.</p>
      </section>
    </InfoPage>
  );
}
