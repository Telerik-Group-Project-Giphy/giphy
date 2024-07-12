async function displayGifDetails(gifId) {
    const detailsContainer = document.getElementById('gifDetails');

    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';
    
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
        <p><strong>Username:</strong> ${gif.username || 'N/A'}</p>
        <img src="${gif.images.fixed_height.url}" alt="GIF">
      `;
    } catch (error) {
      console.error('Error fetching GIF details:', error);
      detailsContainer.textContent = 'Failed to load GIF details.';
    }
  }
  