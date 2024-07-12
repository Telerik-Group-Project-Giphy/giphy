const searchButton = document.getElementById("search-button");

const searchInput = document.getElementById("search");

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    if(inputValue){
        fetchSearchingGifs(inputValue);
    }
});

const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';

async function fetchSearchingGifs(query) {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;

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
            gifContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        gifContainer.textContent = 'Failed to load GIFs.';
    }
}