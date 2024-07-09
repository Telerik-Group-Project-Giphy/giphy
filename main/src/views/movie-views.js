import { renderFavoriteStatus } from '../events/favorites-events.js';

export const toMoviesFromCategoryView = (category, movies) => `
<div id="movies">
  <h1>${category.name} movies:</h1>
  <div class="content">
    ${movies.map(toMovieSimple).join('\n')}
  </div>
</div>
`;

// Svetlio
export const toSingleMovieView = (movie) => `
<div class="single-movie">
<h1> ${movie.title} (${movie.year}) </h1>
${toMovieDetailed(movie)}
</div>
`;

// Manin
export const toMovieSimple = (movie) => `
<div class="movie-card">
  <h3>${movie.title}</h3>
  <p>${movie.year}</p>
  <img src="${movie.poster}">
  <div class="movie-card-buttons">
  <button class="button-details" type="button" movie-id="${movie.id}" >View details</button>
  ${renderFavoriteStatus(movie.id)}</div>
</div>
`;

// Leharov
const toMovieDetailed = (movie) => `
<div class="movie-detailed">
  <img src="${movie.poster}">
  <div class="movie-detailed-text"
  <p>Genre: ${movie.genre}</p>
  <p>Director: ${movie.director}</p>
  <p>Starring: ${movie.stars.join(', ')}</p>
  <p>Plot: ${movie.description}</p>
  </div>
</div>
`;
