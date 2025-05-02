const row = document.getElementById("row");
const url = "https://striveschool-api.herokuapp.com/api/product/";

const ul = document.getElementById("dropdown-menu");

const getPlants = () => {
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
    .then((plants) => {
      plants.forEach((plant) => {
        const col = document.createElement("div");
        col.className = " col-12 col-sm-6 col-lg-4 col-xl-3";

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const img = document.createElement("img");
        img.className = "bd-placeholder-img card-img-top";
        img.src = plant.imageUrl;

        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = plant.name;

        const text = document.createElement("p");
        text.className = "card-text text-truncate";
        text.innerText = plant.description;

        const flex = document.createElement("div");
        flex.className = "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group d-flex";

        const viewBtn = document.createElement("a");
        viewBtn.href = "./details.html";
        viewBtn.className = "btn btn-outline-secondary";
        viewBtn.innerText = "Scopri di più";

        const editBtn = document.createElement("a");
        editBtn.href = "./backoffice.html";
        editBtn.className = "btn btn-outline-secondary";
        editBtn.innerText = "Modifica";

        /*const selectBtn = document.createElement("button");
        selectBtn.classList.add("btn");
        selectBtn.classList.add("btn-outline-danger");
        selectBtn.innerText = "<i class="bi bi-plus-lg"></i>";

         selectBtn.onclick = function (e) {
          e.preventDefault();

          const li = document.createElement("li");
          li.innerText = plant.name;
          ul.appendChild(li);
        }; */

        const price = document.createElement("small");
        price.className = "text-muted display-6";
        price.innerText = plant.price + "€";

        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(editBtn);
        //btnGroup.appendChild(selectBtn);

        flex.appendChild(btnGroup);
        flex.appendChild(price);

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(flex);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

window.onload = () => {
  getPlants();
};
