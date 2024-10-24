## Osnovne informacije

Otvoreni skup podaka koji se nalazi u ovom repozitoriju predstavlja podatke o najbogatijim ljudima svijeta koje su svoje bogatstvo stekli u tehnološkoj industriji. Podatci su dostupni za preuzimanje u CSV i JSON formatu.

## Licenca

Otvoreni podatci su dostupni pod licencom [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## Jezik

Podatci su na hrvatskom jeziku.

## Autor

Autor je Jure Reljanović. Ovaj skup podataka je izrađen kao dio kolegija "Otvoreno računarstvo" na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.

## Verzija

Verzija **1.0**.

## Opis podataka

Skup se sastoji od dva skupa podataka: **BogataOsoba** i **Kompanija**. Skup **BogataOsoba** so bogatim osobama iz tehnološke industrije, dok skup **Kompanija** sadrži podatke o kompanijama koje su povezane s tim osobama. Svaka osoba može biti povezana s jednom ili više kompanija, dok svaka kompanija može biti povezana s jednom ili više osoba.

**BogataOsoba**

_id_: Jedinstveni identifikator bogate osobe  
_ime_: Naziv bogate osobe  
_srednje_ime_: Srednje ime bogate osobe (ako postoji)  
_prezime_: Prezime bogate osobe  
_datum_rodjenja_: Datum rođenja bogate  
_drzava_rodjenja_: Država rođenja bogate osobe  
_drzava_stanovanja_: Država stanovanja bogate osobe  
_bogatstvo_u_milijardama_folara_: Bogatstvo bogate osobe u milijardama dolara  
_pohadjao_fakultet_: Fakultet koji je bogata osoba pohađala  
_zavrsio_fakultet_: Informacija o tome je li bogata osoba završila fakultet (true ili false)  
_kompanije_kojime_je_osoba_povezana_: Kompanije s kojima je bogata osoba povezana (npr. kao osnivač, suosnivač, zaposlenik, itd.)

**Kompanija**

_id_: Jedinstveni identifikator kompanije  
_naziv_: Naziv kompanije  
_godina_osnivanja_: Godina osnivanja kompanije  
_drzava_sjedista_: Država u kojoj kompanija ima sjedište  
_sektor_: Sektor u kojem kompanija posluje  
_broj_zaposlenih_: Broj zaposlenih u kompaniji  
_procijenjena_vrijednost_u_milijardama_dolara_: Procijenjena vrijednost kompanije u milijardama dolara  
_izvrsni_direktor_: Ime izvršnog direktora kompanije

## Datum objave

24. listopada 2024.

## Format datuma

ISO 8601

## Podatci zadnji put ažurirani

¸¸
Podatci su zadnji put ažurirani 24. listopada 2024. godine.

## Oznaka kodne stranice

Podatci su u UTF-8 kodnoj stranici.

## Mjesto spremanja podataka

Podatci su spremljeni u datoteci `bogati_ljudi.csv` i `bogati_ljudi.json`.

## Baza podataka korištena za spremanje podataka

Podatci su spremljeni u PostgreSQL bazi podataka.
