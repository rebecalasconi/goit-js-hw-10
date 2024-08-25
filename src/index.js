"use strict";

import Notiflix from 'notiflix';
import axios from "axios";

axios.defaults.headers.common['x-api-key'] = "live_yGwBKUMrcXhogmV162Ec2tfB8vKSitLyBxRV1Q3LGSpM5n65DYe5QjVqNWDhDizS";
const breedSelect = document.querySelector('.breed-select');
const loadingMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catDiv = document.querySelector('.cat-info');


errorMessage.textContent = 'Loading data, please wait...';

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;  
      option.textContent = breed.name;
      breedSelect.appendChild(option);  
  });

  loadingMessage.style.visibility = 'hidden';
  breedSelect.style.visibility = 'visible';

}catch (error) {
  Notiflix.Notify.failure('Failed to fetch breeds. Please try again later.');
  errorMessage.style.visibility = 'visible';
  loadingMessage.style.visibility = 'hidden';
}
}

async function fetchCatByBreed(breedId) {
  try {
    loadingMessage.style.visibility = 'visible';
    errorMessage.style.visibility = 'hidden';

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    console.log(response.data)
    const catData = response.data[0]; 

    catDiv.innerHTML = `
      <img src="${catData.url}" alt="${catData.breeds[0].name} width="500" height="300"">
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p>Temperament: ${catData.breeds[0].temperament}</p>
    `;

    loadingMessage.style.visibility = 'hidden'

  } catch (error) {
    Notiflix.Notify.failure('Failed to fetch cat information. Please try again.');
    errorMessage.style.visibility = 'visible';
    
  } finally {
    loadingMessage.style.visibility = 'hidden'
  }
};


breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();