import { addImageListener, displayGifDetails } from "../events/gifdetails.js";
import { isFavorite, toggleFavorite } from "../events/manageFavorites.js";
export const transferToHTML = (data) => {
    gifContainer.innerHTML = '';
    data.data.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.dataset.gifId = gif.id;

        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.className = 'favorite-button';
        addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
        addToFavoritesButton.addEventListener('click', () => {
            toggleFavorite(gif.id);
            addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
        });
        const gifWrapper = document.createElement('div');
        gifWrapper.appendChild(img);
        gifWrapper.appendChild(addToFavoritesButton);
        gifContainer.appendChild(gifWrapper);

        //remove from 33 to 44
    })
    addImageListener();
};