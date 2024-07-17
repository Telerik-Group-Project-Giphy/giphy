import { apiKey } from "../common/common.js";


//     /**
//      * Fetches trending GIF data from Giphy API.
//      * @returns {Promise} A Promise that resolves with the fetched GIF data.
//      */
export const loadTrending = async (gifContainer) => {

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
