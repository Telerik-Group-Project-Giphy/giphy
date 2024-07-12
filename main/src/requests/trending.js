document.addEventListener('DOMContentLoaded', () => {
const trendingButton = document.getElementById("trending-button");
const gifContainer = document.getElementById("gifContainer");
const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M'



const loadTrending = async () => {
    // const categories = getCategories();
    
    // return categories;
    try {
        const response = await fetch (`https://api.giphy.com/v1/gifs/trending/?api_key=${apiKey}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
    }

  };

  const transferToHTML = (data) => {
    gifContainer.innerHTML = ''; // Clear previous results
        data.data.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        gifContainer.appendChild(img);
  })
}



trendingButton.addEventListener('click', async () => {
    const data = await loadTrending();
    transferToHTML(data);
});
});
