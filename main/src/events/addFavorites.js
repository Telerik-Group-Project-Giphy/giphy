import { addImageListener } from "../events/gifdetails.js";

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
                    const img = document.createElement('img');
                    img.src = gif.images.fixed_height.url;
                    img.dataset.gifId = gif.id;

                    const gifWrapper = document.createElement('div');
                    gifWrapper.appendChild(img);
                    gifContainer.appendChild(gifWrapper);
                });
        });

        await Promise.all(gifPromises);
        addImageListener();
    } catch (error) {
        console.error('Error fetching favorite GIFs:', error);
        gifContainer.textContent = 'Failed to load favorite GIFs.';
    }
} //когато добавя гифове във favorites и цъкна на favorites страницата, в конзолата излиза ерор, нещо с id-то става според мен, не можах да го оправя
// също така, няма бутон да се махнат от favorites, ако искате пробвайте да го направите (може би в хакатона ще има нещо което можем да преизползваме)
