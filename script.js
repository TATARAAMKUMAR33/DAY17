// Heading Element Creation
let heading = document.createElement("h1");
heading.id = "title";
heading.className = "text-center";
heading.innerHTML = "RestCountries Weather";

// Container Element Creation
let container = document.createElement("div");
container.className = "container";

// Row Element Creation
let row = document.createElement("div");
row.className = "row";

// Append the element into document
container.append(row);
document.body.append(heading, container);

// Fetching data from rescountries API
let res = fetch("https://restcountries.com/v3.1/all")
  .then((data) => data.json())
  .then((country) => cardGenerate(country))
  .catch(() => console.log("API Not working"));


// Function to Generate cards
function cardGenerate(country) {
  for (let i = 0; i < country.length; i++) {
    let col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-4 col-sm-12 col-xl-4";
    col.innerHTML += `<div class="card h-100">
        <div class="card-header text-center">
        <h5>
        ${country[i].name.common}
        </h5></div>
        <img src=${country[i].flags.png} class="card-img-top card-img" alt="flags"/>
        <div class="card-body text-center" >
          <div class="card-text">
          <p>Capital : ${country[i].capital}</p>
          <p>Region : ${country[i].region}</p>
          <p>Country Code : ${country[i].cca2}</p>
          <p>Latlng : ${country[i].latlng}</p>
          </div>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="checkWeather('${country[i].capital}')">
          Check for Weather
          </button>
        </div>
      </div>`;
    row.append(col);
  }
}

//===================================================

// Bootstrap Modal Element creation
let modal_dialog = document.createElement("div");
modal_dialog.className = "modal-dialog";

var modal = document.createElement("div");
modal.className = "modal face";
modal.id = "exampleModal";
modal.setAttribute("tabindex", "-1");
modal.setAttribute("aria-labelledby", "staticBackdropLabel");
modal.setAttribute("aria-hidden", "true");

// Append modal element into document
modal.append(modal_dialog);
document.body.append(modal);


// Function to checking weather details from given input
function checkWeather(city) {
  // Weather API KEY
  const wheatherAPIKey = "5dbbbdb19a15927fa1338b574ea61c22";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${wheatherAPIKey}`)
    .then((data) => data.json())
    .then((weatherdata) => {
      modal_dialog.innerHTML = ` <div class="modal-content">
        <div class="modal-header modal-background">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Weather Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body modal-background">
          <p>City : ${weatherdata.name}</p>
          <p>Weather : ${weatherdata.weather[0].main}</p>
          <p>Description : ${weatherdata.weather[0].description}</p>
          <p>Temperature : ${weatherdata.main.temp}°C</p>
          <p>Wind Speed : ${weatherdata.wind.speed} mph</p>
        </div>
        <div class="modal-footer modal-background">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
      </div>`;
    })
    .catch(() => {
      console.log("Details Not Found for the city");
    });
}