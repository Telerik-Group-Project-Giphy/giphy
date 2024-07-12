import { addImageListener, displayGifDetails } from "../events/gifdetails.js";
// import { addToFavorites } from "../events/addFavorites.js";


document.addEventListener('DOMContentLoaded', () => {
    const uploadedButton = document.getElementById('uploaded-button');
    const gifContainer = document.getElementById('gifContainer');
    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
  
    uploadedButton.addEventListener('click', () => {
      displayUploadedGifs();
    });
  
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
        gifContainer.innerHTML = '';
        data.data.forEach(gif => {
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url;
          img.dataset.gifId = gif.id;
          gifContainer.appendChild(img);
        });
        addImageListener();
      } catch (error) {
        console.error('Error fetching uploaded GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
      }
    }
  });
  