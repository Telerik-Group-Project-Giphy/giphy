document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home-button');
    const gifContainer = document.getElementById('gifContainer');

    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';

    homeButton.addEventListener('click', () => {
      fetchRandomGifs(5); 
    });

    async function fetchRandomGifs(count) {
      gifContainer.innerHTML = ''; 
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

      try {
        const gifPromises = Array.from({ length: count }, () => fetch(url).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }));

        const gifs = await Promise.all(gifPromises);
        gifs.forEach(data => {
          const gif = data.data;
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url;
          gifContainer.appendChild(img);
        });
      } catch (error) {
        console.error('Error fetching GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
      }
    }
  });