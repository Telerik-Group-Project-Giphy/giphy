document.addEventListener('DOMContentLoaded', () => {
  const aboutUsButton = document.getElementById('about-us');
  const container = document.getElementById('gifContainer');

  /**
   * Generates HTML content for the About Us view.
   * @returns {string} The HTML content for the About Us view.
   */
  const toAboutView = () => `
  <div id="about">
    <div class="content">
      <h1>About the app</h1>
      <p>This is an app designed to function like Giphy where you can search, upload, discover trending gifs and add them to favorites, created by students of Telerik Academy.</p>
      <h2>Authors:</h2>
      <div>
      <h3>Victor Manin</h3>
      <h3>Viktor Leharov</h3>
      <h3>Trayan Trufev</h3>
      </div>
    </div>
  </div>
  `;

  aboutUsButton.addEventListener('click', () => {
    container.innerHTML = toAboutView();
  });

});



