import { addImageListener } from "../events/gifdetails.js";
import { addToFavorites, isFavorite, toggleFavorite } from "../events/manageFavorites.js";
 
document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const gifContainer = document.getElementById('gifContainer');
 
    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
 
    homeButton.addEventListener('click', () => {
      fetchRandomGifs(1); //RETURN TO 5
    });
 
    async function fetchRandomGifs(count) {
      gifContainer.innerHTML = '';
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;
 
      try {
        const gifPromises = Array.from({ length: count }, () => fetch(url).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }));
 
        const gifs = await Promise.all(gifPromises);
        gifs.forEach(data => {
          const gif = data.data;
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url;
          img.dataset.gifId = gif.id;

          const addToFavoritesButton = document.createElement('button');
          addToFavoritesButton.textContent = isFavorite(gif.id) ? `Remove from Favorites` : `Add to favorites`
          addToFavoritesButton.addEventListener('click', () => {
            toggleFavorite(gif.id);
            addToFavoritesButton.textContent = isFavorite(gif.id) ? `Remove from Favorites` : `Add to favorites`
          });

          const gifWrapper = document.createElement('div'); // добавих обвивка която слага бутон на гифа 
          gifWrapper.appendChild(img);
          gifWrapper.appendChild(addToFavoritesButton);
          gifContainer.appendChild(gifWrapper);
        });
        addImageListener();
      } catch (error) {
        console.error('Error fetching GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
      }
    }
  });