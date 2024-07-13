import { transferToHTML } from "../views/renderContainers.js";
import { apiKey } from "../common/common.js";


document.addEventListener('DOMContentLoaded', () => {
    const trendingButton = document.getElementById("trending-button");
    const gifContainer = document.getElementById("gifContainer");
    
    const loadTrending = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending/?api_key=${apiKey}`)
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

trendingButton.addEventListener('click', async () => {
     const data = await loadTrending();
    transferToHTML(data);
    });
});
