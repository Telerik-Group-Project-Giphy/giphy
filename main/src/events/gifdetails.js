import { isFavorite, toggleFavorite } from "../events/manageFavorites.js";

export function addImageListener(gifId) {
    const images = document.getElementsByTagName('img')
   
   
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', function() {
        const gifId = this.dataset.gifId;
        displayGifDetails(gifId);
      });
    }
  }
  export async function displayGifDetails(gifId) {
      const detailsContainer = document.getElementById('gifContainer');
   
      const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
     
      const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`;
   
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const gif = data.data;
        detailsContainer.innerHTML = `
          <h3>GIF Details</h3>
          <p><strong>Username:</strong> ${gif.username || 'N/A'} ${gifId}</p>
          <img src="${gif.images.fixed_height.url}" alt="GIF">
        `;
        
        const addToFavoritesButton = document.createElement('button'); // the button is not selected by css because its not in a div
        addToFavoritesButton.className = 'favorite-button-details'
        addToFavoritesButton.textContent = isFavorite(gif.id) ? `Remove from Favorites` : `Add to favorites`
        addToFavoritesButton.addEventListener('click', () => {
            toggleFavorite(gif.id);
            addToFavoritesButton.textContent = isFavorite(gif.id) ? `Remove from Favorites` : `Add to favorites`
        });
        gifContainer.appendChild(addToFavoritesButton);
        
      } catch (error) {
        console.error('Error fetching GIF details:', error);
        detailsContainer.textContent = 'Failed to load GIF details.';
      }
    } //просто ги преместих в друга папка за да е по-подредено