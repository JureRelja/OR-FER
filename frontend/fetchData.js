window.onload = async (event) => {
  await fetchData();
};

const fetchData = async (searchAttribute, searchInput) => {
  let url = "http://localhost:3000/data";

  if (searchAttribute && searchInput) {
    url += `?searchAttribute=${searchAttribute}&searchInput=${searchInput}`;
  }
  const response = await fetch(url);

  const data = await response.json();

  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  data.forEach((element) => {
    const htmlElement = `
        <tr>
            <td>${element.ime}</td>
            <td>${element.srednje_ime}</td>
            <td>${element.prezime}</td>
            <td>${element.datum_rodjenja}</td>
            <td>${element.drzava_rodjenja}</td>
            <td>${element.drzava_stanovanja}</td>
            <td>${element.bogatstvo_u_milijardama_dolara}</td>
            <td>${element.pohadjao_fakultet}</td>
            <td>${element.zavrsio_fakultet}</td>
            <td>${element.broj_djece}</td>
            <td>${element.naziv}</td>
            <td>${element.godina_osnivanja}</td>
            <td>${element.drzava_sjedista}</td>
            <td>${element.sektor}</td>
            <td>${element.broj_zaposlenih}</td>
            <td>${element.procijenjena_vrijednost_u_milijardama_dolara}</td>
            <td>${element.izvrsni_direktor}</td>
          </tr>`;

    tableBody.innerHTML += htmlElement;
  });
};

// Search button
const searchButton = document.querySelector("#gumb");

searchButton.addEventListener("click", (event) => {
  const searchInput = document.querySelector("#pretraga").value;

  const searchAttribute = document.querySelector("#atribut").value;

  fetchData(searchAttribute, searchInput);
});

// Reset button
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", (event) => {
  const searchInput = document.querySelector("#pretraga");

  searchInput.value = "";

  const searchAttribute = document.querySelector("#atribut");

  searchAttribute.value = "wildcard";

  fetchData();
});

const downloadData = async (searchAttribute, searchInput, format) => {
  let url = "http://localhost:3000/downloadFilteredData";

  url += `?searchAttribute=${searchAttribute}&searchInput=${searchInput}&type=${format}`;

  window.open(url);
};

// CSV download button
const csvDownload = document.querySelector("#download-csv");
csvDownload.addEventListener("click", (event) => {
  event.preventDefault();

  const searchInput = document.querySelector("#pretraga").value;

  const searchAttribute = document.querySelector("#atribut").value;

  downloadData(searchAttribute, searchInput, "csv");
});

// JSON download button
const jsonDownload = document.querySelector("#download-json");
jsonDownload.addEventListener("click", (event) => {
  event.preventDefault();

  const searchInput = document.querySelector("#pretraga").value;

  const searchAttribute = document.querySelector("#atribut").value;

  downloadData(searchAttribute, searchInput, "json");
});
