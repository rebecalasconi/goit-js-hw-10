"use strict";

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_yGwBKUMrcXhogmV162Ec2tfB8vKSitLyBxRV1Q3LGSpM5n65DYe5QjVqNWDhDizS";
const ENDPOINT = 'https://api.thecatapi.com/v1/breeds'; // URL-ul de bază al API-ului de știri.
const API_KEY = axios.defaults.headers.common["x-api-key"]; // Cheia API pentru autentificare.
const breedSelect = document.querySelector("select.breed-select");
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

loaderMessage.style.visibility = 'visible';
errorMessage.style.visibility = 'hidden';


 export function fetchBreeds(event) {
  const headers = new Headers({
    'X-Api-Key': API_KEY,
  });

  return axios
  .get(ENDPOINT)
  .then(response => {
    breedSelect.innerHTML = response.data.map(values => `<option value= ${values.id}>${values.name}</option>`);
    loaderMessage.style.visibility = 'visible';
    errorMessage.style.visibility = 'hidden';
      })
  .catch(error => {
    console.error('Error fetching news:', error); // Afișează eroarea în consolă în caz de eșec.
    errorMessage.style.visibility = 'visible';
    throw error; // Aruncă eroarea mai departe pentru a fi gestionată ulterior.
  })
};

fetchBreeds()
breedSelect.addEventListener("change", fetchNews);

function fetchNews(event) {
  const headers = new Headers({
    'X-Api-Key': API_KEY,
  });

  const currentValue = event.target.value;
  return axios
  .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${currentValue}`)
  .then(res => {
    const catData = res.data[0]; 
    document.querySelector('.cat-info').innerHTML = `
      <img src="${catData.url}" alt="${catData.breeds[0].name} width="500" height="300"">
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;
    loaderMessage.style.visibility = 'hidden';
   })
  .catch(error => {
    console.error('Error fetching data:', error); // Afișează eroarea în consolă în caz de eșec.
    errorMessage.style.visibility = 'visible';
    throw error; // Aruncă eroarea mai departe pentru a fi gestionată ulterior.
  })
}


