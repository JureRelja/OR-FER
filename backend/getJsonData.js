const pg = require("pg");

const getJsonData = async (params) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  let result;

  if (params.searchInput && params.searchAttribute === "wildcard") {
    result = await client.query(`
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
              WHERE BogataOsoba.ime LIKE '%${params.searchInput}%' or BogataOsoba.srednje_Ime LIKE '%${params.searchInput}%' or BogataOsoba.prezime LIKE '%${params.searchInput}%' or BogataOsoba.drzava_Rodjenja LIKE '%${params.searchInput}%' or BogataOsoba.drzava_Stanovanja LIKE '%${params.searchInput}%' or BogataOsoba.pohadjao_Fakultet LIKE '%${params.searchInput}%'  or Kompanija.naziv LIKE '%${params.searchInput}%' or Kompanija.drzava_Sjedista LIKE '%${params.searchInput}%' or Kompanija.sektor LIKE '%${params.searchInput}%' or Kompanija.izvrsni_Direktor LIKE '%${params.searchInput}%'
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
         `);
  } else if (params.searchInput && params.searchAttribute) {
    result = await client.query(`with
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
             WHERE ${params.searchAttribute} LIKE '%${params.searchInput}%'
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
         `);
  } else {
    result = await client.query(`with
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
         osobe`);
  }

  await client.end();
  return result.rows;
};

module.exports = getJsonData;
