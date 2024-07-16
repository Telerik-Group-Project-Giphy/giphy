import { apiKey, EMPTY_HEART, FULL_HEART } from "../common/common.js";
import { isFavorite } from "../data/manageFavorites.js";

/**
 * Attaches click event listeners to all <img> elements to display GIF details.
 */
export function addImageListener(gifId) {
  const images = document.getElementsByTagName('img')

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function () {
      const gifId = this.dataset.gifId;
      displayGifDetails(gifId);
    });
  }
}
/**
 * Fetches and displays detailed information about a GIF.
 * @param {string} gifId - The ID of the GIF to fetch details for.
 * @returns {Promise} A Promise that resolves when the GIF details are displayed.
 */
export async function displayGifDetails(gifId) {
  const detailsContainer = document.getElementById('gifContainer');
  const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const gif = data.data;
    detailsContainer.innerHTML = `
          <div id="details-container">
          <h3>GIF Details</h3>
          <p>By ${gif.username || 'N/A'}</p>
          <p>Gif title: ${gif.title || 'N/A'}</p>
          <p>Uploaded on: ${gif.import_datetime}</p>
          <img src="${gif.images.fixed_height.url}" alt="GIF">
        <button id="favourite-btn-${gifId}" class="favorite-button">${isFavorite(gifId) ? FULL_HEART : EMPTY_HEART}</button>
        </div>`;
  } catch (error) {
    console.error('Error fetching GIF details:', error);
    detailsContainer.textContent = 'Failed to load GIF details.';
  }
};