docker exec -u postgres mojaBazaSpremnik psql -d orbaza -c "
COPY (
    with
        osobe as (
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
                json_agg (row_to_json (t)) as kompanije_S_Kojime_Je_Osoba_Povezana
            FROM
                bogataOsoba
                JOIN OsobaKompanija ON BogataOsoba.id = OsobaKompanija.id_Osoba
                JOIN Kompanija as t ON OsobaKompanija.id_Kompanija = t.id
            GROUP BY
                BogataOsoba.ime,
                BogataOsoba.srednje_Ime,
                BogataOsoba.prezime,
                BogataOsoba.datum_Rodjenja,
                BogataOsoba.drzava_Rodjenja,
                BogataOsoba.drzava_Stanovanja,
                BogataOsoba.bogatstvo_U_Milijardama_Dolara,
                BogataOsoba.pohadjao_Fakultet,
                BogataOsoba.zavrsio_Fakultet,
                BogataOsoba.broj_Djece
        )
    SELECT
        json_agg (row_to_json (osobe))
    FROM
        osobe
)  TO STDOUT" > tehnoloski_bogatasi.json