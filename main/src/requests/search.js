import { transferToHTML } from "../views/renderContainers.js";
import { apiKey } from "../common/common.js";

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");

searchButton.addEventListener('click', async () => {
    const inputValue = searchInput.value;
    if (inputValue) {
       const data = await fetchSearchingGifs(inputValue);
       transferToHTML(data);
    }
});

async function fetchSearchingGifs(query) {

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
}

//not sure if needed v.manin

// searchButton.addEventListener('click', () => {
//     const inputValue = searchInput.value;
//     if (inputValue) {
//         fetchSearchingGifs(inputValue);
//     }
// });