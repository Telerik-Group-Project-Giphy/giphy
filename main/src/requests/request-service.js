import { getCategories, getMoviesGeneralInfo, getMovieById, getCategory, searchMovies } from '../data/movies.js';

// Svetlio
export const loadCategories = () => {
  const category = getCategories();

  return category;
};

export const loadCategory = (id = null) => {
  const category = getCategory(id);

  return category;
}

// Trayan
export const loadMovies = (categoryId = null) => {
  const movies = getMoviesGeneralInfo(categoryId)

  return movies;
};

// Ivo
export const loadSingleMovie = (id) => {
  const movie = getMovieById(id);

  return movie;
};

// Doni
export const loadSearchMovies = (searchTerm = '') => {
  const movies = searchMovies(searchTerm);

  return movies;
};
