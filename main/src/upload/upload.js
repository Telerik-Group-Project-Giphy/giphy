document.addEventListener('DOMContentLoaded', () => {
    const gifFileInput = document.getElementById('gifFile');
    const uploadButton = document.getElementById('uploadGif');
    const uploadStatus = document.getElementById('uploadStatus');

    const apiKey = 'EOtMOyfgb7swQVKzeUpvw3IDeR1XT48M';

    async function uploadGif() {
        const file = gifFileInput.files[0];

        if (!file) {
            uploadStatus.textContent = 'Please select a GIF file to upload.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);

        const url = 'https://upload.giphy.com/v1/gifs';

        try {
            uploadStatus.textContent = `Uploading`;
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            uploadStatus.textContent = `Upload successful! GIF ID: ${data.data.id}`;
        } catch (error) {
            console.error('Error uploading GIF:', error);
            uploadStatus.textContent = 'Failed to upload GIF.';
        }
    }

    uploadButton.addEventListener('click', uploadGif);
});