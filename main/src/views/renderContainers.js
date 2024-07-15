import { addImageListener } from "../events/gifdetails.js";
import { isFavorite, toggleFavorite } from "../data/manageFavorites.js";
import { FULL_HEART, EMPTY_HEART } from "../common/common.js";

export function createFavoriteButton(gifId) {
    const addToFavoritesButton = document.createElement('button');
    addToFavoritesButton.className = 'favorite-button';
    addToFavoritesButton.textContent = isFavorite(gifId) ? FULL_HEART : EMPTY_HEART;

    addToFavoritesButton.addEventListener('click', () => {
        toggleFavorite(gifId);
        addToFavoritesButton.textContent = isFavorite(gifId) ? FULL_HEART : EMPTY_HEART;
    });

    return addToFavoritesButton;
};

export function createGifElement(gif, gifContainer, img) {
    const gifWrapper = document.createElement('div');
    gifWrapper.appendChild(img);
    gifWrapper.appendChild(createFavoriteButton(gif.id));
    gifContainer.appendChild(gifWrapper);
};

export function createGifImage(gif) {
    const img = document.createElement('img');
    img.src = gif.images.fixed_height.url;
    img.dataset.gifId = gif.id;
    return img;
};

export const transferToHTML = (data) => {
    gifContainer.innerHTML = '';
    data.data.forEach(gif => {
        const img = createGifImage(gif);
        createGifElement(gif, gifContainer, img);
    });
    addImageListener();
};