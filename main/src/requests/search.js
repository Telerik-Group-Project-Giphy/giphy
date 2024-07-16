import { apiKey } from "../common/common.js";

/**
 * Fetches GIF data from Giphy API based on the provided query.
 * @param {string} query - The search query string.
 * @returns {Promise} A Promise that resolves with the fetched GIF data.
 */
export async function fetchSearchingGifs(query, gifContainer) {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;

    try {
        const response = await fetch(url);
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
