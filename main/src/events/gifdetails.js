import { apiKey } from "../common/common.js";
import { createFavoriteButton } from "../views/renderContainers.js";

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
          <h3>GIF Details</h3>
          <p><strong>Username:</strong> ${gif.username || 'N/A'} ${gifId}</p>
          <img src="${gif.images.fixed_height.url}" alt="GIF">
        `;
    gifContainer.appendChild(createFavoriteButton(gifId));

  } catch (error) {
    console.error('Error fetching GIF details:', error);
    detailsContainer.textContent = 'Failed to load GIF details.';
  }
};