import { addImageListener } from "../events/gifdetails.js";
import { isFavorite, toggleFavorite } from "../data/manageFavorites.js";
import { FULL_HEART, EMPTY_HEART } from "../common/common.js";

/**
 * Creates a button to add or remove a GIF from favorites.
 * @param {string} gifId - The ID of the GIF.
 * @returns {HTMLButtonElement} The button element.
 */
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

/**
 * Creates a GIF element and appends it to the container.
 * @param {Object} gif - The GIF object.
 * @param {HTMLElement} gifContainer - The container to append the GIF element to.
 * @param {HTMLImageElement} img - The image element for the GIF.
 */
export function createGifElement(gif, gifContainer, img) {
    const gifWrapper = document.createElement('div');
    gifWrapper.appendChild(img);
    gifWrapper.appendChild(createFavoriteButton(gif.id));
    gifContainer.appendChild(gifWrapper);
};

/**
 * Creates an image element for a GIF.
 * @param {Object} gif - The GIF object.
 * @returns {HTMLImageElement} The image element.
 */
export function createGifImage(gif) {
    const img = document.createElement('img');
    img.src = gif.images.fixed_height.url;
    img.dataset.gifId = gif.id;
    return img;
};

/**
 * Transfers the fetched GIFs to HTML and displays them.
 * @param {Object} data - The data object containing GIFs.
 */
export const transferToHTML = (data) => {
    gifContainer.innerHTML = '';
    data.data.forEach(gif => {
        const img = createGifImage(gif);
        createGifElement(gif, gifContainer, img);
    });
    addImageListener();
};