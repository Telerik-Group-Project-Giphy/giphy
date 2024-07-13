import { displayFavorites } from "../events/manageFavorites.js"
import { apiKey } from "../common/common.js";

document.addEventListener('DOMContentLoaded', () => {
    const favoritesButton = document.getElementById('favorites-button');
  
    favoritesButton.addEventListener('click', () => {
      displayFavorites(apiKey);
    });
  });