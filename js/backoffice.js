const params = new URLSearchParams(window.location.search);

const plantId = params.get("plantId;");
console.log(plantId);

const url = plantId ? "https://striveschool-api.herokuapp.com/api/product/" + plantId : "https://striveschool-api.herokuapp.com/api/product/";
const method = plantId ? "PUT" : "POST";
const form = document.getElementById("form");

window.onload = function () {
  const variableH = document.getElementById("variableH");
  const successBtn = document.getElementById("successBtn");
  if (plantId) {
    variableH.innerText = "Aggiorna prodotto";
    successBtn.innerText = "Aggiorna";
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.classList.remove("d-none");

    fetch(url, {
      method: method,
      body: JSON.stringify(addPlant),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI5MjFjMjUwNDAwMTUxYWI2NzAiLCJpYXQiOjE3NDYxNzQ2MTAsImV4cCI6MTc0NzM4NDIxMH0.hYrdAU1LOKDI1x3s7Yk3SD28h29gyID1UzQQHyudOfc",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          //AGGIUNGERE ERRORI SPECIFICI
          throw new Error("Errore nella fetch");
        }
        return resp.json();
      })
      .then((plant) => {
        document.getElementById("plant-name").value = plant.name;
        document.getElementById("plant-description").value = plant.description;
        document.getElementById("plant-origin").value = plant.brand;
        document.getElementById("plant-url").value = plant.imageUrl;
        document.getElementById("plant-price").value = plant.price;
      })
      .catch((error) => console.log(error));
  } else {
    variableH.innerText = "Aggiungi prodotto";
    successBtn.innerText = "Aggiungi";
  }
};

form.onsubmit = function (e) {
  e.preventDefault();
  const plantName = document.getElementById("plant-name");
  const plantDescription = document.getElementById("plant-description");
  const plantOrigin = document.getElementById("plant-origin");
  const plantUrl = document.getElementById("plant-url");
  const plantPrice = document.getElementById("plant-price");

  const addPlant = {
    name: plantName.value,
    description: plantDescription.value,
    brand: plantOrigin.value,
    imageUrl: plantUrl.value,
    price: plantPrice.value,
  };

  fetch(url, {
    method: method,
    body: JSON.stringify(addPlant),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODI5MjFjMjUwNDAwMTUxYWI2NzAiLCJpYXQiOjE3NDYxNzQ2MTAsImV4cCI6MTc0NzM4NDIxMH0.hYrdAU1LOKDI1x3s7Yk3SD28h29gyID1UzQQHyudOfc",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((addedPlant) => {
      if (id) {
        alert("Hai modificato le caratteristiche del prodotto" + addedPlant.name);
      } else {
        alert("Hai aggiunto il prodotto " + addedPlant.name + "alla tua vetrina");
        form.reset();
      }
    })
    .catch((error) => console.log(error));
};

deleteBtn.onclick = function () {
  fetch(url, { method: "DELETE" })
    .then((resp) => {
      if (resp.ok) {
        alert("Hai eliminato il prodotto dalla vetrina");
        window.location.assign("./index.html");
      }
    })
    .catch((error) => console.log(error));
};
