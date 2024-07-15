import { addImageListener } from "../events/gifdetails.js";
import { createGifElement, createGifImage } from "../views/renderContainers.js";

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

export async function displayFavorites(apiKey) {
    const gifContainer = document.getElementById('gifContainer');
    gifContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        gifContainer.textContent = 'No favorite GIFs found.';
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
                // .then(data => {
                //     const gif = data.data;
                //     const img = document.createElement('img');
                //     img.src = gif.images.fixed_height.url;
                //     img.dataset.gifId = gif.id;

                //     const addToFavoritesButton = document.createElement('button');
                //     addToFavoritesButton.className = 'favorite-button';
                //     addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
                //     addToFavoritesButton.addEventListener('click', () => {
                //         toggleFavorite(gif.id);
                //         addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
                //     });
                //     const gifWrapper = document.createElement('div');
                //     gifWrapper.appendChild(img);
                //     gifWrapper.appendChild(addToFavoritesButton);
                //     gifContainer.appendChild(gifWrapper);
                // });
        });

        await Promise.all(gifPromises);
        addImageListener();
    } catch (error) {
        console.error('Error fetching favorite GIFs:', error);
        gifContainer.textContent = 'Failed to load favorite GIFs.';
    }
}

export function isFavorite(gifId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(gifId);
}

export function toggleFavorite(gifId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(gifId)) {
        favorites = favorites.filter(id => id !== gifId);
    } else {
        favorites.push(gifId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
