import { addImageListener } from "../events/gifdetails.js";
import { apiKey } from "../common/common.js";
import { createGifElement, createGifImage } from "../views/renderContainers.js";

export async function fetchRandomGif() {
  gifContainer.innerHTML = '';
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const gif = data.data;

    const img = createGifImage(gif);
    createGifElement(gif, gifContainer, img);
    addImageListener();
  } catch (error) {
    console.error('Error fetching GIF:', error);
    gifContainer.textContent = 'Failed to load GIF.';
  }
}
