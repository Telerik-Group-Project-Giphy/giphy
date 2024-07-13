import { apiKey } from "../common/common";

document.addEventListener('DOMContentLoaded', () => {
    const gifFileInput = document.getElementById('gifFile');
    const uploadGifButton = document.getElementById('uploadGif');
    const uploadStatus = document.getElementById('uploadStatus');

    uploadGifButton.addEventListener('click', () => {
      const file = gifFileInput.files[0];
      if (file) {
        uploadGif(file);
      }
    });
  
    async function uploadGif(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
  
      try {
        const response = await fetch('https://upload.giphy.com/v1/gifs', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const gifId = data.data.id;
        let storedGifIds = localStorage.getItem('uploadedGifIds');
        if (storedGifIds) {
          storedGifIds = storedGifIds.split(',');
          storedGifIds.push(gifId);
        } else {
          storedGifIds = [gifId];
        }
        localStorage.setItem('uploadedGifIds', storedGifIds.join(','));
        uploadStatus.textContent = 'GIF uploaded successfully!';
      } catch (error) {
        console.error('Error uploading GIF:', error);
        uploadStatus.textContent = 'Failed to upload GIF.';
      }
    }
  });