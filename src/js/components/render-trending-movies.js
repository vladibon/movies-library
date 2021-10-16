import { Loading } from 'notiflix';
import { homeApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs.js';
import { setPaginationTotalItems, resetPaginationPage, showPagination } from './pagination.js';

dataStorage.saveGenresToLS();
loadTrendingMovies();

export function loadTrendingMovies() {
  Loading.circle('Loading...');
  homeApiService
    .fetchArticles()
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
    })
    .catch(onFetchError)
    .finally(Loading.remove(200));
}

export function preloadTrendingMoviesTotalItems() {
  homeApiService
    .fetchArticles()
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        throw 'Nothing found';
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage('home');
      showPagination();
    })
    .catch(onFetchError);
}

function createGallery(movies) {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = imageCardTpl(movies);
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onFetchError(message) {
  Notify.failure(message);
}
