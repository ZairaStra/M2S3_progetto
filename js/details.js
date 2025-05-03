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
      const row = document.getElementById("row");

      const imgCol = document.createElement("div");
      imgCol.className = "col-9 col-sm-8 col-lg-6";

      const img = document.createElement("img");
      img.src = plant.imageUrl;
      img.className = "rounded";
      img.style.width = "100%";

      const textCol = document.createElement("div");
      textCol.className = "col-12 col-sm-4 col-lg-6";

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

      imgCol.appendChild(img);

      textCol.appendChild(title);
      textCol.appendChild(p);
      textCol.appendChild(addP);
      textCol.appendChild(backofficePrice);
      textCol.appendChild(publicPrice);

      row.appendChild(imgCol);
      row.appendChild(textCol);
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

window.onload = () => {
  getDetails();
};
