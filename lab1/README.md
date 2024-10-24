### Osnovne informacije

Otvoreni skup podaka koji se nalazi u ovom repozitoriju predstavlja podatke o najbogatijim ljudima svijeta koje su svoje bogatstvo stekli u tehnološkoj industriji. Podatci su dostupni za preuzimanje u CSV i JSON formatu.

### Licenca

Otvoreni podatci su dostupni pod licencom [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

### Jezik

Podatci su na hrvatskom jeziku.

### Autor

Autor je Jure Reljanović. Ovaj skup podataka je izrađen kao dio kolegija "Otvoreno računarstvo" na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.

### Verzija

Verzija **1.0**.

### Opis podataka

Skup se sastoji od dva skupa podataka: **BogataOsoba** i **Kompanija**. Skup **BogataOsoba** so bogatim osobama iz tehnološke industrije, dok skup **Kompanija** sadrži podatke o kompanijama koje su povezane s tim osobama. Svaka osoba može biti povezana s jednom ili više kompanija, dok svaka kompanija može biti povezana s jednom ili više osoba.

**BogataOsoba**

ime: Naziv bogate osobe
srednje_ime: Srednje ime bogate osobe (ako postoji)
prezime: Prezime bogate osobe
datum_rodjenja: Datum rođenja bogate (u formatu: yyyy.mm.dd)
drzava_rodjenja: Država rođenja bogate osobe
drzava_stanovanja: Država stanovanja bogate osobe
bogatstvo_u_milijardama_folara: Bogatstvo bogate osobe u milijardama dolara
pohadjao_fakultet: Fakultet koji je bogata osoba pohađala
zavrsio_fakultet: Informacija o tome je li bogata osoba završila fakultet (true ili false)
kompanije_kojime_je_osoba_povezana: Kompanije s kojima je bogata osoba povezana (npr. kao osnivač, suosnivač, zaposlenik, itd.)

**Kompanija**
id: Jedinstveni identifikator kompanije
naziv: Naziv kompanije
godina_osnivanja: Godina osnivanja kompanije
drzava_sjedista: Država u kojoj kompanija ima sjedište
sektor: Sektor u kojem kompanija posluje
broj_zaposlenih: Broj zaposlenih u kompaniji
procijenjena_vrijednost_u_milijardama_dolara: Procijenjena vrijednost kompanije u milijardama dolara
izvrsni_direktor: Ime izvršnog direktora kompanije

### Podatci zadnji put ažurirani

Podatci su zadnji put ažurirani 24. listopada 2024. godine.

### Oznaka kodne stranice

Podatci su u UTF-8 kodnoj stranici.

### Mjesto spremanja podataka

Podatci su spremljeni u datoteci `bogati_ljudi.csv` i `bogati_ljudi.json`.

### Baza podataka korištena za spremanje podataka

Podatci su spremljeni u PostgreSQL bazi podataka.
