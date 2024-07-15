import { addImageListener } from "../events/gifdetails.js";
import { fetchRandomGif } from "../requests/random.js";
import { createGifElement, createGifImage } from "../views/renderContainers.js";

/**
 * Adds a GIF to the favorites list in localStorage.
 * @param {string} gifId - The ID of the GIF to add to favorites.
 * @returns {Promise} A Promise that resolves after updating the favorites list.
 */
export async function addToFavorites(gifId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(gifId)) {
        favorites.push(gifId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('GIF added to favorites!');
    } else {
        alert('GIF already in favorites!');
    }
}

/**
 * Displays favorite GIFs in the GIF container.
 * @param {string} apiKey - The API key for Giphy API requests.
 * @returns {Promise} A Promise that resolves after displaying favorite GIFs.
 */
export async function displayFavorites(apiKey) {
    const gifContainer = document.getElementById('gifContainer');
    gifContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        fetchRandomGif();
        return;
    }

    try {
        const gifPromises = favorites.map(gifId => {
            const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`;
            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const gif = data.data;
                    const img = createGifImage(gif);
                    createGifElement(gif, gifContainer, img);
                });
        });

        await Promise.all(gifPromises);
        addImageListener();
    } catch (error) {
        console.error('Error fetching favorite GIFs:', error);
        gifContainer.textContent = 'Failed to load favorite GIFs.';
    }
}

/**
 * Checks if a GIF with the given ID is in the favorites list.
 * @param {string} gifId - The ID of the GIF to check.
 * @returns {boolean} Returns true if the GIF is in favorites, false otherwise.
 */
export function isFavorite(gifId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(gifId);
}

/**
 * Toggles the favorite status of a GIF.
 * If the GIF is already in favorites, it removes it; otherwise, it adds it.
 * @param {string} gifId - The ID of the GIF to toggle favorite status for.
 * @returns {void}
 */
export function toggleFavorite(gifId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(gifId)) {
        favorites = favorites.filter(id => id !== gifId);
    } else {
        favorites.push(gifId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
