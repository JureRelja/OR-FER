docker exec -u postgres mojaBazaSpremnik psql -d orbaza -c "
   COPY (
    SELECT
        BogataOsoba.ime,
        BogataOsoba.srednje_Ime,
        BogataOsoba.prezime,
        BogataOsoba.datum_Rodjenja,
        BogataOsoba.drzava_Rodjenja,
        BogataOsoba.drzava_Stanovanja,
        BogataOsoba.bogatstvo_U_Milijardama_Dolara,
        BogataOsoba.pohadjao_Fakultet,
        BogataOsoba.zavrsio_Fakultet,
        BogataOsoba.broj_Djece,
        Kompanija.naziv,
        Kompanija.godina_Osnivanja,
        Kompanija.drzava_Sjedista,
        Kompanija.sektor,
        Kompanija.broj_Zaposlenih,
        Kompanija.procijenjena_Vrijednost_U_Milijardama_Dolara,
        Kompanija.izvrsni_Direktor
    FROM
        OsobaKompanija
        JOIN BogataOsoba ON OsobaKompanija.id_Osoba = BogataOsoba.id
        JOIN Kompanija ON OsobaKompanija.id_Kompanija = Kompanija.id
) TO STDOUT CSV
HEADER" > tehnoloski_bogatasi.csv