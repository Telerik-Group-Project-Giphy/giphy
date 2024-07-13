import { addImageListener, displayGifDetails } from "../events/gifdetails.js";
import { isFavorite, toggleFavorite } from "../events/manageFavorites.js";

const searchButton = document.getElementById("search-button");

const searchInput = document.getElementById("search");

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    if (inputValue) {
        fetchSearchingGifs(inputValue);
    }
});

const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';

async function fetchSearchingGifs(query) {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        gifContainer.innerHTML = '';
        data.data.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.dataset.gifId = gif.id;
            
            const addToFavoritesButton = document.createElement('button');
            addToFavoritesButton.className = 'favourites-button';
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