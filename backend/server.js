const express = require("express");
require("dotenv").config();
const getCsvData = require("./getCsvData");
const getJsonData = require("./getJsonData");
const fs = require("node:fs");
let converter = require("json-2-csv");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/download", (req, res) => {
  const params = req.query;

  console.log(params);

  //   Downloading csv format
  if (params.type == "csv") {
    let file = `../tehnoloski_bogatasi.csv`;
    res.download(file);

    // Downloading json format
  } else if (params.type == "json") {
    let file = `../tehnoloski_bogatasi.json`;
    res.download(file);

    //Unknown file format
  } else {
    res.send("Format koji ste unijeli ne postoji");
  }
});

app.get("/data", async (req, res) => {
  let result = await getCsvData(req.query);

  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(result));
});

app.get("/downloadFilteredData", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query);
  if (!req.query.type) {
    res.status(400).send("Type query parameter is required");
    return;
  }

  const path = `./generatedFiles/tehnologski_bogatasi${new Date().valueOf()}.${
    req.query.type
  }`;

  if (req.query.type === "csv") {
    const result = await getCsvData(req.query);

    const csv = converter.json2csv(result);

    try {
      fs.writeFileSync(path, csv, {
        flag: "a+",
      });
      res.download(path);
    } catch (error) {
      console.error(error);
    }
  } else if (req.query.type === "json") {
    const result = await getJsonData(req.query);

    try {
      fs.writeFileSync(path, JSON.stringify(result), {
        flag: "a+",
      });

      res.download(path);
    } catch (error) {
      console.error(error);
    }
  }
});