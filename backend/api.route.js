const pg = require("pg");
const { Router } = require("express");

const app = Router();

// cijela kolekcija
app.get("/tehnoloski-bogatasi", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    const body = await client.query(`SELECT
      BogataOsoba.id,
      BogataOsoba.ime,
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
                  BogataOsoba.id,
                BogataOsoba.ime,
                BogataOsoba.srednje_Ime,
                BogataOsoba.prezime,
                BogataOsoba.datum_Rodjenja,
                BogataOsoba.drzava_Rodjenja,
                BogataOsoba.drzava_Stanovanja,
                BogataOsoba.bogatstvo_U_Milijardama_Dolara,
                BogataOsoba.pohadjao_Fakultet,
                BogataOsoba.zavrsio_Fakultet,
                BogataOsoba.broj_Djece`);

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvaceni tehnoloski bogatasi",
      body.rows
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    console.log(e);
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Doslo je do problema s dohvacanje tehnoloskih bogatasa",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.post("/tehnoloski-bogatasi", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    const reqBody = req.body;

    const osoba = await client.query(
      `INSERT INTO BogataOsoba(ime, srednje_Ime, prezime, datum_Rodjenja, drzava_Rodjenja, drzava_Stanovanja, bogatstvo_U_Milijardama_Dolara, pohadjao_Fakultet, zavrsio_Fakultet, broj_Djece)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;`,
      [
        reqBody.ime,
        reqBody.srednje_Ime,
        reqBody.prezime,
        reqBody.datum_Rodjenja,
        reqBody.drzava_Rodjenja,
        reqBody.drzava_Stanovanja,
        reqBody.bogatstvo_U_Milijardama_Dolara,
        reqBody.pohadjao_Fakultet,
        reqBody.zavrsio_Fakultet,
        reqBody.broj_Djece,
      ]
    );

    reqBody.kompanije.forEach(async (kompanija) => {
      await client.query(
        `INSERT INTO OsobaKompanija (id_Osoba, id_Kompanija)
        VALUES($1, $2)
      `,
        [osoba.rows[0].id, kompanija]
      );
    });

    const body = await client.query(
      `SELECT
      BogataOsoba.id,
      BogataOsoba.ime,
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
            WHERE BogataOsoba.id = $1
            GROUP BY 
                  BogataOsoba.id,
                BogataOsoba.ime,
                BogataOsoba.srednje_Ime,
                BogataOsoba.prezime,
                BogataOsoba.datum_Rodjenja,
                BogataOsoba.drzava_Rodjenja,
                BogataOsoba.drzava_Stanovanja,
                BogataOsoba.bogatstvo_U_Milijardama_Dolara,
                BogataOsoba.pohadjao_Fakultet,
                BogataOsoba.zavrsio_Fakultet,
                BogataOsoba.broj_Djece`,
      [osoba.rows[0].id]
    );

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvacen tehnoloski bogatas",
      body.rows
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    console.log(e);
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Tehnoloski bogatas nije dodan.",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.get("/tehnoloski-bogatasi/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    const body = await client.query(
      `SELECT
                BogataOsoba.id,
               BogataOsoba.ime,
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
            WHERE BogataOsoba.id  = $1
            GROUP BY 
                  BogataOsoba.id,
                BogataOsoba.ime,
                BogataOsoba.srednje_Ime,
                BogataOsoba.prezime,
                BogataOsoba.datum_Rodjenja,
                BogataOsoba.drzava_Rodjenja,
                BogataOsoba.drzava_Stanovanja,
                BogataOsoba.bogatstvo_U_Milijardama_Dolara,
                BogataOsoba.pohadjao_Fakultet,
                BogataOsoba.zavrsio_Fakultet,
                BogataOsoba.broj_Djece`,
      [req.params.id]
    );

    if (body.rows.length == 0) {
      throw Error("Rich person with entered ID doesn't exist");
    }

    let result = {
      "@context": {
        "@vocab": "http://schema.org/",
        ime: "givenName",
        prezime: "familyName",
      },
    };

    result = { ...result, ...body.rows[0] };

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvacen tehnoloski bogatas",
      result
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Tehnoloski bogatas s unesenim ID-om ne postoji.",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.put("/tehnoloski-bogatasi/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  try {
    console.log(req.body);
    const reqBody = req.body;

    const body = await client.query(
      `UPDATE BogataOsoba
      SET ime = $1,
      srednje_Ime = $2,
      prezime = $3,
      datum_Rodjenja = $4,
      drzava_Rodjenja = $5,
      drzava_Stanovanja = $6,
      bogatstvo_U_Milijardama_Dolara = $7,
      pohadjao_Fakultet = $8,
      zavrsio_Fakultet = $9,
      broj_Djece = $10
      WHERE id = $11`,
      [
        reqBody.ime,
        reqBody.srednje_Ime || null, // Default to null if not provided
        reqBody.prezime,
        reqBody.datum_Rodjenja,
        reqBody.drzava_Rodjenja,
        reqBody.drzava_Stanovanja,
        reqBody.bogatstvo_U_Milijardama_Dolara,
        reqBody.pohadjao_Fakultet,
        reqBody.zavrsio_Fakultet,
        reqBody.broj_Djece,
        req.params.id,
      ]
    );

    if (body.rowCount == 0) {
      throw new Error("Rich person with entered ID doesn't exist");
    }

    await client.query(
      `DELETE FROM OsobaKompanija
      WHERE id_Osoba = $1`,
      [req.params.id]
    );

    await Promise.all(
      reqBody.kompanije.map((kompanija) =>
        client.query(
          `INSERT INTO OsobaKompanija (id_Osoba, id_Kompanija)
          VALUES($1, $2)`,
          [req.params.id, kompanija]
        )
      )
    );

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Ažuriran tehnoloski bogatas",
      null
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    console.error(e);
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Tehnoloski bogatas s unesenim ID-om ne postoji.",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end(); // Ensure connection is closed after all operations
  }
});

app.delete("/tehnoloski-bogatasi/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    await client.query(
      `
      DELETE FROM OsobaKompanija 
      WHERE id_Osoba = $1`,
      [req.params.id]
    );

    const body = await client.query(
      `DELETE FROM BogataOsoba
      WHERE id = $1`,
      [req.params.id]
    );

    if (body.rowCount == 0) {
      throw Error("Rich person with entered ID doesn't exist");
    }

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Obrisan tehnoloski bogatas",
      null
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Tehnoloski bogatas s unesenim ID-om ne postoji.",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

//kompanija
app.get("/kompanije/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  try {
    const body = await client.query(
      `SELECT
          Kompanija.id,
         Kompanija.naziv,
         Kompanija.godina_Osnivanja,
         Kompanija.drzava_Sjedista,
         Kompanija.sektor,
         Kompanija.broj_Zaposlenih,
         Kompanija.procijenjena_Vrijednost_U_Milijardama_Dolara,
         Kompanija.izvrsni_Direktor
     FROM
         Kompanija
     WHERE Kompanija.id  = $1`,
      [req.params.id]
    );

    if (body.rows.length == 0) {
      throw Error("Rich person with entered ID doesn't exist");
    }

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvacena kompanija",
      body.rows
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Kompanija s unesenim ID-om ne postoji.",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.get("/kompanije/", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    const body = await client.query(
      `SELECT
          Kompanija.id,
         Kompanija.naziv,
         Kompanija.godina_Osnivanja,
         Kompanija.drzava_Sjedista,
         Kompanija.sektor,
         Kompanija.broj_Zaposlenih,
         Kompanija.procijenjena_Vrijednost_U_Milijardama_Dolara,
         Kompanija.izvrsni_Direktor
     FROM
         Kompanija`
    );

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvacene kompanije",
      body.rows
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Not found",
      "Kompanije nisu mogle biti dohvacene",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.post("/kompanije/", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();
  try {
    const reqBody = JSON.parse(req.body);

    const body = await client.query(
      `INSERT INTO Kompanija(naziv, godina_Osnivanja, drzava_Sjedista, sektor, broj_Zaposlenih, procijenjena_Vrijednost_U_Milijardama_Dolara, izvrsni_Direktor)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        reqBody.naziv,
        reqBody.godina_Osnivanja,
        reqBody.drzava_Sjedista,
        reqBody.sektor,
        reqBody.broj_Zaposlenih,
        reqBody.procijenjena_Vrijednost_U_Milijardama_Dolara,
        reqBody.izvrsni_Direktor,
      ]
    );

    const responseWrapper = new ResponseWrapper(
      "Created",
      "Pohranjena nova kompanija",
      body.rows
    );

    res.status(201).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Error",
      "Kompanija nije mogla bit dodana",
      null
    );

    res.status(400).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.put("/kompanije/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  try {
    const reqBody = JSON.parse(req.body);

    const body = await client.query(
      `UPDATE Kompanija
      SET naziv = $1,
      godina_Osnivanja = $2, drzava_Sjedista = $3, sektor = $4, broj_Zaposlenih = $5, procijenjena_Vrijednost_U_Milijardama_Dolara = $6, izvrsni_Direktor = $7
      WHERE id = $8`,
      [
        reqBody.naziv,
        reqBody.godina_Osnivanja,
        reqBody.drzava_Sjedista,
        reqBody.sektor,
        reqBody.broj_Zaposlenih,
        reqBody.procijenjena_Vrijednost_U_Milijardama_Dolara,
        reqBody.izvrsni_Direktor,
        reqBody.id,
      ]
    );

    const responseWrapper = new ResponseWrapper(
      "Updated",
      "Ažurirana kompanija",
      null
    );

    res.status(202).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Error",
      "Kompanija nije mogla ažurirana",
      null
    );

    res.status(400).json(responseWrapper);
  } finally {
    await client.end();
  }
});

app.delete("/kompanije/:id", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  try {
    const body = await client.query(
      `DELETE FROM Kompanija
      WHERE id = $1`,
      [req.params.id]
    );

    const responseWrapper = new ResponseWrapper(
      "Deleted",
      "Obrisana kompanija",
      null
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Error",
      "Kompanija s unesenim ID-om nije mogla biti obrisana",
      null
    );

    res.status(400).json(responseWrapper);
  } finally {
    await client.end();
  }
});

//osobe
app.get("/osobe", async (req, res) => {
  const client = new pg.Client(process.env.PGLINK);
  await client.connect();

  try {
    const body = await client.query(
      `SELECT
          BogataOsoba.id,
         BogataOsoba.ime,
         BogataOsoba.srednje_Ime,
         BogataOsoba.prezime,
         to_char(BogataOsoba.datum_Rodjenja, 'yyyy/mm/dd') as datum_Rodjenja,
         BogataOsoba.drzava_Rodjenja,
         BogataOsoba.drzava_Stanovanja,
         BogataOsoba.bogatstvo_U_Milijardama_Dolara,
         BogataOsoba.pohadjao_Fakultet,
         BogataOsoba.zavrsio_Fakultet 
     FROM BogataOsoba`
    );

    const responseWrapper = new ResponseWrapper(
      "OK",
      "Dohvaceni tehnoloski bogatasi",
      body.rows
    );

    res.status(200).json(responseWrapper);
  } catch (e) {
    const responseWrapper = new ResponseWrapper(
      "Error",
      "Tehnoloski bogatas nisu mogli bit dohvaceni",
      null
    );

    res.status(404).json(responseWrapper);
  } finally {
    await client.end();
  }
});

//nepodrzane metode
app.get("/openapi", async (req, res) => {
  const response = await fetch("./openapi.json");

  res.status(200).json(response);
});

//nepodrzane metode
app.all("/*", (req, res) => {
  const responseWrapper = new ResponseWrapper(
    "Error",
    `Ova ruta ne postoji ili metoda ${req.method} nije dopustena.`,
    null
  );

  res.status(405).json(responseWrapper);
});

module.exports = app;

class ResponseWrapper {
  status;
  message;
  response;

  constructor(status, message, response) {
    this.status = status;
    this.message = message;
    this.response = response;
  }
}
