const detailId = new URLSearchParams(window.location.search).get("plant.id");
console.log(detailId);
const url = new URLSearchParams(window.location.search);
console.log(url);

const getDetails = () => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI5MjFjMjUwNDAwMTUxYWI2NzAiLCJpYXQiOjE3NDYxNzQ2MTAsImV4cCI6MTc0NzM4NDIxMH0.hYrdAU1LOKDI1x3s7Yk3SD28h29gyID1UzQQHyudOfc",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Errore nel caricamento");
      }
      return resp.json();
    })
    .then((plant) => {
      const container = document.getElementById("details-container");

      const title = document.createElement("h1");
      title.className = "card-title";
      title.innerText = plant.name;

      const img = document.createElement("img");
      img.src = plant.imageUrl;
      img.style.width = "400px";
      img.style.maxWidth = "100%";

      const text = document.createElement("p");
      text.className = "card-text";
      text.innerText = plant.description;

      const addText = document.createElement("p");
      addText.className = "card-text";
      addText.innerText = "Bolla di accompagnamento n." + plant._id;

      container.appendChild(title);
      container.appendChild(img);
      container.appendChild(description);
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

window.onload = () => {
  getDetails();
};
