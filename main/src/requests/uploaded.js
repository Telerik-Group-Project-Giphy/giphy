import { addImageListener } from "../events/gifdetails.js";
import { apiKey } from "../common/common.js";
import { transferToHTML } from "../views/renderContainers.js";

document.addEventListener('DOMContentLoaded', () => {
    const uploadedButton = document.getElementById('uploaded-button');
    const gifContainer = document.getElementById('gifContainer');
  
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
        transferToHTML(data);
        addImageListener();
      } catch (error) {
        console.error('Error fetching uploaded GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
      }
    }
  });

// Това отдолу трябва да е кода, но по някаква причина не показва ъплоаднатия гиф при мен

// import { addImageListener, displayGifDetails } from "../events/gifdetails.js";
// import { isFavorite, toggleFavorite } from "../events/manageFavorites.js";
// import { transferToHTML } from "../views/renderContainers.js";


// document.addEventListener('DOMContentLoaded', () => {
//     const uploadedButton = document.getElementById('uploaded-button');
//     //const gifContainer = document.getElementById('gifContainer');
//     const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
  
//     uploadedButton.addEventListener('click', async () => {
//       const data = await displayUploadedGifs();
//       transferToHTML(data);
//     });

//   //   searchButton.addEventListener('click', async () => {
//   //     const inputValue = searchInput.value;
//   //     if (inputValue) {
//   //        const data = await fetchSearchingGifs(inputValue);
//   //        transferToHTML(data);
//   //     }
//   // });
  
//     async function displayUploadedGifs() {
//       const storedGifIds = localStorage.getItem('uploadedGifIds');
//       // if (!storedGifIds) {
//       //   gifContainer.textContent = 'No uploaded GIFs found.';
//       //   return;
//       // }
  
//       const ids = storedGifIds.split(',');
//       const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids.join(',')}`;
  
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const fetchedData = await response.json();
//         return fetchedData;

//       } catch (error) {
//         console.error('Error fetching uploaded GIFs:', error);
//         gifContainer.textContent = 'Failed to load GIFs.';
//       }
//     }
//   });
  
  
//my old code

// document.addEventListener('DOMContentLoaded', () => {
//   const uploadedButton = document.getElementById('uploaded-button');
//   const gifContainer = document.getElementById('gifContainer');
//   //const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';

//   uploadedButton.addEventListener('click', () => {
//     displayUploadedGifs();
//   });

//   async function displayUploadedGifs() {
//     const storedGifIds = localStorage.getItem('uploadedGifIds');
//     if (!storedGifIds) {
//       gifContainer.textContent = 'No uploaded GIFs found.';
//       return;
//     }

//     const ids = storedGifIds.split(',');
//     const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids.join(',')}`;

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       gifContainer.innerHTML = '';
//       data.data.forEach(gif => {
//         const img = document.createElement('img');
//         img.src = gif.images.fixed_height.url;
//         img.dataset.gifId = gif.id;

//         const addToFavoritesButton = document.createElement('button');
//           addToFavoritesButton.className = 'favorite-button';
//           addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
//           addToFavoritesButton.addEventListener('click', () => {
//               toggleFavorite(gif.id);
//               addToFavoritesButton.textContent = isFavorite(gif.id) ? 'Remove from Favorites' : 'Add to Favorites';
//           });
//           const gifWrapper = document.createElement('div');
//           gifWrapper.appendChild(img);
//           gifWrapper.appendChild(addToFavoritesButton);
//           gifContainer.appendChild(gifWrapper);
//       });
//       addImageListener();
//     } catch (error) {
//       console.error('Error fetching uploaded GIFs:', error);
//       gifContainer.textContent = 'Failed to load GIFs.';
//     }
//   }
// });