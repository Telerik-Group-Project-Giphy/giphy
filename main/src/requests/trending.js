import { addImageListener, displayGifDetails } from "../events/gifdetails.js";
import { isFavorite, toggleFavorite } from "../events/manageFavorites.js";


document.addEventListener('DOMContentLoaded', () => {
    const trendingButton = document.getElementById("trending-button");
    const gifContainer = document.getElementById("gifContainer");
    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M'



    const loadTrending = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending/?api_key=${apiKey}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const fetchedData = await response.json();
            return fetchedData;
        } catch (error) {
            console.error('Error fetching GIFs:', error);
            gifContainer.textContent = 'Failed to load GIFs.';
        }

    };

    const transferToHTML = (data) => {
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
    }



    trendingButton.addEventListener('click', async () => {
        const data = await loadTrending();
        transferToHTML(data);
    });
});
