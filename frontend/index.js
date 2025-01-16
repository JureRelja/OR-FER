document.getElementById("refresh").addEventListener("click", async () => {
  window.open("http://localhost:3000/refresh?type=json", "_blank");
  setTimeout(() => {
    window.open("http://localhost:3000/refresh?type=csv", "_blank");
  }, 1000);
  // window.open("http://localhost:3000/refresh?type=csv", "_blank");
  //await fetch("http://localhost:3000/refresh?type=json");
  //await fetch("http://localhost:3000/refresh?type=csv");
});
