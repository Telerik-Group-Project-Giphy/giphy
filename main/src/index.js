import {toggleFavorite, displayFavorites, isFavorite } from "./data/manageFavorites.js"
import { transferToHTML } from "./views/renderContainers.js";
import { loadTrending } from "./requests/trending.js";
import {apiKey, EMPTY_HEART, FULL_HEART} from "./common/common.js";
import { fetchSearchingGifs } from "./requests/search.js";
import { displayUploadedGifs } from "./requests/uploaded.js";
import { uploadGif } from "./upload/upload.js";
 
 
document.addEventListener('DOMContentLoaded', async () => {
 
    const gifContainer = document.getElementById("gifContainer");
    const favoritesButton = document.getElementById('favorites-button');
    const trendingButton = document.getElementById("trending-button");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search");
    const uploadedButton = document.getElementById('uploaded-button');
    const gifFileInput = document.getElementById('gifFile');
    const uploadGifButton = document.getElementById('uploadGif');
 
    const data = await loadTrending(gifContainer);
    transferToHTML(data, gifContainer);
 
    document.addEventListener('click', (event) => {
 
        if(event.target.id.includes('favourite-btn-')) {
            const gifId = event.target.id.split('-')[2];
            toggleFavorite(gifId);
            event.target.textContent = isFavorite(gifId) ? FULL_HEART : EMPTY_HEART;
        }
 
    });
 
    uploadGifButton.addEventListener('click', () => {
      const file = gifFileInput.files[0];
      if (file) {
        uploadGif(file);
      }
    });
 
    uploadedButton.addEventListener('click', () => {
      displayUploadedGifs(gifContainer);
    });
 
    searchButton.addEventListener('click', async () => {
    const inputValue = searchInput.value;
    if (inputValue) {
       const data = await fetchSearchingGifs(inputValue, gifContainer);
       transferToHTML(data,gifContainer);
       searchInput.value = '';
    }
    });
 
    favoritesButton.addEventListener('click', async() => {
      await displayFavorites(apiKey);
    });
 
    trendingButton.addEventListener('click', async () => {
        const data = await loadTrending(gifContainer);
       transferToHTML(data, gifContainer);
    });
 
});
 