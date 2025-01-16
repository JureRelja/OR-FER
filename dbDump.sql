DROP TABLE IF EXISTS OsobaKompanija;

DROP TABLE IF EXISTS BogataOsoba;

DROP TABLE IF EXISTS Kompanija;

CREATE TABLE
    BogataOsoba (
        id serial primary key,
        ime varchar(100) NOT NULL,
        srednje_Ime varchar(100),
        prezime varchar(100) NOT NULL,
        datum_Rodjenja date NOT NULL,
        drzava_Rodjenja varchar(100) NOT NULL,
        drzava_Stanovanja varchar(100) NOT NULL,
        bogatstvo_U_Milijardama_Dolara INTEGER NOT NULL,
        pohadjao_Fakultet varchar(100),
        zavrsio_Fakultet BOOLEAN NOT NULL,
        broj_Djece INTEGER
    );

CREATE TABLE
    Kompanija (
        id serial primary key,
        naziv varchar(100) NOT NULL,
        godina_Osnivanja INTEGER NOT NULL,
        drzava_Sjedista varchar(100) NOT NULL,
        sektor varchar(100) NOT NULL,
        broj_Zaposlenih INTEGER NOT NULL,
        procijenjena_Vrijednost_U_Milijardama_Dolara FLOAT NOT NULL,
        izvrsni_Direktor VARCHAR(100) NOT NULL
    );

CREATE TABLE
    OsobaKompanija (
        id_Osoba INTEGER NOT NULL REFERENCES BogataOsoba (id) ON DELETE CASCADE,
        id_Kompanija INTEGER NOT NULL REFERENCES Kompanija (id),
        CONSTRAINT osoba_kompanija_kljuc PRIMARY KEY (id_Osoba, id_Kompanija)
    );

INSERT INTO
    BogataOsoba (ime, srednje_Ime, prezime, datum_Rodjenja, drzava_Rodjenja, drzava_Stanovanja, bogatstvo_U_Milijardama_Dolara, pohadjao_Fakultet, zavrsio_Fakultet, broj_Djece)
VALUES
    ('Elon', 'Reeve', 'Musk', '1971-06-28', 'Južna Afrika', 'SAD', 247, 'Queens University', TRUE, 12),
    ('Jeff', 'Preston', 'Bezos', '1964-01-12', 'SAD', 'SAD', 177, 'Princeton University', TRUE, 4),
    ('Bill', 'Henry', 'Gates', '1955-10-28', 'SAD', 'SAD', 124, 'Harvard University', TRUE, 3),
    ('Mark', 'Elliot', 'Zuckerberg', '1984-05-14', 'SAD', 'SAD', 97, 'Harvard University', TRUE, 3),
    ('Lawrence', 'Joseph', 'Ellison', '1944-08-17', 'SAD', 'SAD', 93, 'University of Illinois at Urbana-Champaign', FALSE, 2),
    ('Larry', 'Edward ', 'Page', '1973-03-26', 'SAD', 'SAD', 91, 'Stanford University', TRUE, 2),
    ('Sergey', 'Mikhailovich', 'Brin', '1973-08-21', 'Rusija', 'SAD', 89, 'Stanford University', TRUE, 3),
    ('Steve', 'Gary', 'Wozniak', '1950-08-11', 'SAD', 'SAD', 100, 'University of California, Berkeley', TRUE, 3),
    ('Wilmot', 'Reed', 'Hastings', '1960-10-08', 'SAD', 'SAD', 5, 'Stanford University', TRUE, 2),
    ('Jen-Hsun', NULL, 'Huang', '1963-02-17', 'Tajvan', 'SAD', 4, 'Stanford University', TRUE, 2);

INSERT INTO
    Kompanija (naziv, godina_Osnivanja, drzava_Sjedista, sektor, broj_Zaposlenih, procijenjena_Vrijednost_U_Milijardama_Dolara, izvrsni_Direktor)
VALUES
    --1.osoba
    ('Tesla, Inc.', 2003, 'SAD', 'Automobili', 48000, 277, 'Elon Musk'),
    ('SpaceX', 2002, 'SAD', 'Svemirske rakete', 8000, 74, 'Elon Musk'),
    ('The Boring Company', 2016, 'SAD', 'Transportacijska infrastruktura', 10, 0.5, 'Steve Davis'),
    ('Neuralink', 2016, 'SAD', 'Neurotehnoologija', 100, 0.1, 'Jared Birchall'),
    ('SolarCity', 2006, 'SAD', 'Solarna energija', 15000, 2.6, 'Lyndon Rive'),
    ('X (bivši Twitter)', 2010, 'SAD', 'Društvena mreža', 100, 0.5, 'Elon Musk'),
    --2. osoba
    ('Amazon', 1994, 'SAD', 'Online trgovina, Hosting, Softvere', 1600000, 1900, 'Jeff Bezos'),
    ('Blue Origin', 2000, 'SAD', 'Svemirske rakete', 11000, 40, 'Dave Limp'),
    ('The Washington Post', 1877, 'SAD', 'Novine', 1050, 0.25, 'Will Lewis'),
    --3. osoba
    ('Microsoft', 1975, 'SAD', 'Softverska kompanija, Mobilni uređaji, Računala', 228000, 3100, 'Satya Nadella'),
    --4.osoba
    ('Facebook', 2004, 'SAD', 'Društvena mreža', 86000, 1100, 'Mark Zuckerberg'),
    --5. osoba
    ('Oracle Corporation', 1977, 'SAD', 'Softverska kompanija', 159000, 481, 'Safra Catz'),
    --6. i 7. osoba
    ('Google', 1998, 'SAD', 'Hosting, Softver, Računala, Mobilni uređaji', 182000, 2000, 'Sundar Pichai'),
    --8. osoba
    ('Apple Inc.', 1976, 'SAD', 'Računala, Mobilni uređaji, Softver', 147000, 2000, 'Tim Cook'),
    --9. osoba
    ('Netflix', 1997, 'SAD', 'Streaming servis', 13000, 320, 'Reed Hastings'),
    --10. osoba
    ('Nvidia', 1993, 'SAD', 'Grafičke kartice', 29600, 3400, 'Jensen Huang');

INSERT INTO
    OsobaKompanija (id_Osoba, id_Kompanija)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (3, 10),
    (4, 11),
    (5, 12),
    (6, 13),
    (7, 13),
    (8, 14),
    (9, 15),
    (10, 16);

-- naredba za export podataka u csv fajl
-- copy (
--     SELECT
--         BogataOsoba.ime,
--         BogataOsoba.srednje_Ime,
--         BogataOsoba.prezime,
--         BogataOsoba.datum_Rodjenja,
--         BogataOsoba.drzava_Rodjenja,
--         BogataOsoba.drzava_Stanovanja,
--         BogataOsoba.bogatstvo_U_Milijardama_Dolara,
--         BogataOsoba.pohadjao_Fakultet,
--         BogataOsoba.zavrsio_Fakultet,
--         BogataOsoba.broj_Djece,
--         Kompanija.naziv,
--         Kompanija.godina_Osnivanja,
--         Kompanija.drzava_Sjedista,
--         Kompanija.sektor,
--         Kompanija.broj_Zaposlenih,
--         Kompanija.procijenjena_Vrijednost_U_Milijardama_Dolara,
--         Kompanija.izvrsni_Direktor
--     FROM
--         OsobaKompanija
--         JOIN BogataOsoba ON OsobaKompanija.id_Osoba = BogataOsoba.id
--         JOIN Kompanija ON OsobaKompanija.id_Kompanija = Kompanija.id
-- ) TO 'C:/tmp/tehnoloski_bogatasi.csv' DELIMITER ',' CSV HEADER;
--naredba za export podataka u json 
-- COPY (
--     with
--         osobe as (
--             SELECT
--                 BogataOsoba.ime,
--                 BogataOsoba.srednje_Ime,
--                 BogataOsoba.prezime,
--                 BogataOsoba.datum_Rodjenja,
--                 BogataOsoba.drzava_Rodjenja,
--                 BogataOsoba.drzava_Stanovanja,
--                 BogataOsoba.bogatstvo_U_Milijardama_Dolara,
--                 BogataOsoba.pohadjao_Fakultet,
--                 BogataOsoba.zavrsio_Fakultet,
--                 BogataOsoba.broj_Djece,
--                 json_agg (row_to_json (t)) as kompanije_S_Kojime_Je_Osoba_Povezana
--             FROM
--                 bogataOsoba
--                 JOIN OsobaKompanija ON BogataOsoba.id = OsobaKompanija.id_Osoba
--                 JOIN Kompanija as t ON OsobaKompanija.id_Kompanija = t.id
--             GROUP BY
--                 BogataOsoba.ime,
--                 BogataOsoba.srednje_Ime,
--                 BogataOsoba.prezime,
--                 BogataOsoba.datum_Rodjenja,
--                 BogataOsoba.drzava_Rodjenja,
--                 BogataOsoba.drzava_Stanovanja,
--                 BogataOsoba.bogatstvo_U_Milijardama_Dolara,
--                 BogataOsoba.pohadjao_Fakultet,
--                 BogataOsoba.zavrsio_Fakultet,
--                 BogataOsoba.broj_Djece
--         )
--     SELECT
--         json_agg (row_to_json (osobe))
--     FROM
--         osobe
-- ) TO 'C:/tmp/tehnoloski_bogatasi.json';