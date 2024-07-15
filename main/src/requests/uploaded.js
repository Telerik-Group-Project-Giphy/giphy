import { addImageListener } from "../events/gifdetails.js";
import { apiKey } from "../common/common.js";
import { transferToHTML } from "../views/renderContainers.js";

document.addEventListener('DOMContentLoaded', () => {
  const uploadedButton = document.getElementById('uploaded-button');
  const gifContainer = document.getElementById('gifContainer');

  uploadedButton.addEventListener('click', () => {
    displayUploadedGifs();
  });
  /**
 * Displays uploaded GIFs stored in localStorage.
 * Retrieves GIF data from Giphy API using stored IDs.
 * @returns {Promise} A Promise that resolves when the GIFs are displayed.
 */
  async function displayUploadedGifs() {
    const storedGifIds = localStorage.getItem('uploadedGifIds');
    if (!storedGifIds) {
      gifContainer.textContent = 'No uploaded GIFs found.';
      return;
    }

    const ids = storedGifIds.split(',');
    const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids.join(',')}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      transferToHTML(data);
      addImageListener();
    } catch (error) {
      console.error('Error fetching uploaded GIFs:', error);
      gifContainer.textContent = 'Failed to load GIFs.';
    }
  }
});
