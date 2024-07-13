import { displayFavorites } from "../events/manageFavorites.js"

document.addEventListener('DOMContentLoaded', () => {
    const favoritesButton = document.getElementById('favorites-button');
    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
  
    favoritesButton.addEventListener('click', () => {
      displayFavorites(apiKey);
    });
  }); // това зарежда страницата с favorites 