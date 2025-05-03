const params = new URLSearchParams(window.location.search);

const plantId = new URLSearchParams(window.location.search).get("plantId");
console.log(plantId);

const url = "https://striveschool-api.herokuapp.com/api/product/" + plantId;

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
        //AGGIUNGERE ERRORI SPECIFICI
        throw new Error("Errore nel caricamento");
      }
      return resp.json();
    })
    .then((plant) => {
      const detailContainer = document.getElementById("detail-container");

      const flex = document.createElement("div");
      flex.className = "d-flex justify-content-between";

      const img = document.createElement("img");
      img.src = plant.imageUrl;
      img.className = "rounded";
      img.style.width = "400px";
      img.style.maxWidth = "50%";

      const textArea = document.createElement("div");
      textArea.style.maxWidth = "50%";

      const title = document.createElement("h1");
      title.className = "card-title display-4 mb-3";
      title.innerText = plant.name;

      const p = document.createElement("p");
      p.className = "card-text";
      p.innerText = plant.description;

      const addP = document.createElement("p");
      addP.className = "card-text";
      addP.innerText = "Bolla di accompagnamento n." + plant._id;

      const backofficePrice = document.createElement("small");
      backofficePrice.className = "font-monospace d-block";
      backofficePrice.innerText = "Prezzo di acquisto: " + plant.price * 0.8 + "€";

      const publicPrice = document.createElement("small");
      publicPrice.className = "font-monospace d-block";
      publicPrice.innerText = "Prezzo al pubblico: " + plant.price + "€";

      textArea.appendChild(title);
      textArea.appendChild(p);
      textArea.appendChild(addP);
      textArea.appendChild(backofficePrice);
      textArea.appendChild(publicPrice);

      /* flex.appendChild(img);
      flex.appendChild(textArea);

       col.appendChild(flex); */

      detailContainer.appendChild(img);
      detailContainer.appendChild(textArea);
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

window.onload = () => {
  getDetails();
};
