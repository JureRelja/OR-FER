const pg = require("pg");

const getCsvData = async (params) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  let result;

  if (params.searchInput && params.searchAttribute === "wildcard") {
    result = await client.query(`SELECT
         BogataOsoba.ime,
         BogataOsoba.srednje_Ime,
         BogataOsoba.prezime,
         to_char(BogataOsoba.datum_Rodjenja, 'yyyy/mm/dd') as datum_Rodjenja,
         BogataOsoba.drzava_Rodjenja,
         BogataOsoba.drzava_Stanovanja,
         BogataOsoba.bogatstvo_U_Milijardama_Dolara,
         BogataOsoba.pohadjao_Fakultet,
          CASE
            WHEN BogataOsoba.zavrsio_Fakultet THEN 'Da'
          ELSE
            'Ne'
          END AS "zavrsio_fakultet",
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
         JOIN BogataOsoba ON OsobaKompanija.id_osoba = BogataOsoba.id
         JOIN Kompanija ON OsobaKompanija.id_Kompanija = Kompanija.id
          WHERE BogataOsoba.ime LIKE '%${params.searchInput}%' or BogataOsoba.srednje_Ime LIKE '%${params.searchInput}%' or BogataOsoba.prezime LIKE '%${params.searchInput}%' or BogataOsoba.drzava_Rodjenja LIKE '%${params.searchInput}%' or BogataOsoba.drzava_Stanovanja LIKE '%${params.searchInput}%' or BogataOsoba.pohadjao_Fakultet LIKE '%${params.searchInput}%'  or Kompanija.naziv LIKE '%${params.searchInput}%' or Kompanija.drzava_Sjedista LIKE '%${params.searchInput}%' or Kompanija.sektor LIKE '%${params.searchInput}%' or Kompanija.izvrsni_Direktor LIKE '%${params.searchInput}%'
         `);
  } else if (params.searchInput && params.searchAttribute) {
    result = await client.query(`SELECT
         BogataOsoba.ime,
         BogataOsoba.srednje_Ime,
         BogataOsoba.prezime,
         to_char(BogataOsoba.datum_Rodjenja, 'yyyy/mm/dd') as datum_Rodjenja,
         BogataOsoba.drzava_Rodjenja,
         BogataOsoba.drzava_Stanovanja,
         BogataOsoba.bogatstvo_U_Milijardama_Dolara,
         BogataOsoba.pohadjao_Fakultet,
          CASE
            WHEN BogataOsoba.zavrsio_Fakultet THEN 'Da'
          ELSE
            'Ne'
          END AS "zavrsio_fakultet",
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
         JOIN BogataOsoba ON OsobaKompanija.id_osoba = BogataOsoba.id
         JOIN Kompanija ON OsobaKompanija.id_Kompanija = Kompanija.id
         WHERE ${params.searchAttribute} LIKE '%${params.searchInput}%'
         `);
  } else {
    result = await client.query(`SELECT
         BogataOsoba.ime,
         BogataOsoba.srednje_Ime,
         BogataOsoba.prezime,
         to_char(BogataOsoba.datum_Rodjenja, 'yyyy/mm/dd') as datum_Rodjenja,
         BogataOsoba.drzava_Rodjenja,
         BogataOsoba.drzava_Stanovanja,
         BogataOsoba.bogatstvo_U_Milijardama_Dolara,
         BogataOsoba.pohadjao_Fakultet,
          CASE
            WHEN BogataOsoba.zavrsio_Fakultet THEN 'Da'
          ELSE
            'Ne'
          END AS "zavrsio_fakultet",
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
         JOIN BogataOsoba ON OsobaKompanija.id_osoba = BogataOsoba.id
         JOIN Kompanija ON OsobaKompanija.id_Kompanija = Kompanija.id`);
  }

  await client.end();
  return result.rows;
};

module.exports = getCsvData;
