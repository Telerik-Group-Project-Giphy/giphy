import { ABOUT, CATEGORIES, CONTAINER_SELECTOR, FAVORITES, HOME } from '../common/constants.js';
import { categories } from '../data/movies-data.js';
import { toHomeView } from '../views/home-view.js';
import { toMoviesFromCategoryView } from '../views/movie-views.js';
import { q, setActiveNav } from './helpers.js';
import { toAboutView } from '../views/about-view.js';
import { getCategories } from '../data/movies.js';
import { toCategoriesView } from '../views/category-view.js';
import { getCategory } from '../data/movies.js';
 import { getMoviesGeneralInfo } from '../data/movies.js';
 import { loadCategories, loadCategory, loadMovies, loadSingleMovie } from '../requests/request-service.js';
 import { toSingleMovieView } from '../views/movie-views.js'
import {toFavoritesView} from "../views/favorites-view.js";
import {getFavorites} from "../data/favorites.js";

// public API
// Manin
export const loadPage = (page = '') => {

  switch (page) {

    case HOME:
      setActiveNav(HOME);
      return renderHome();
    case CATEGORIES:
      setActiveNav(CATEGORIES);
      return renderCategories();
    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites();
    case ABOUT:
      setActiveNav(ABOUT);
      return renderAbout();

    /* if the app supports error logging, use default to log mapping errors */
    default: return null;
  }

};

// Leharov
export const renderMovieDetails = (id = null) => {

  q(CONTAINER_SELECTOR).innerHTML = toSingleMovieView(loadSingleMovie(id));
};

// Trayan
export const renderCategory = (categoryId = null) => {

  q(CONTAINER_SELECTOR).innerHTML = toMoviesFromCategoryView(loadCategory(categoryId), loadMovies(categoryId));
};

// private functions

const renderHome = () => {
  q(CONTAINER_SELECTOR).innerHTML = toHomeView();
};

// Ivo
const renderCategories = () => {
  q(CONTAINER_SELECTOR).innerHTML = toCategoriesView(loadCategories());
};

// Doni
const renderFavorites = () => {

  const favouriteIds = getFavorites();
  const movies = favouriteIds.map(id => loadSingleMovie(id));

  q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(movies);
};

// Manin
const renderAbout = () => {
  q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};
