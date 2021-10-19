import { Notify, Loading } from 'notiflix';
import { homeApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs.js';
import { setPaginationTotalItems, resetPaginationPage, showPagination } from './pagination.js';
import { onEmptyLibraryList } from '../common/common.js';

const failureMessage = `Sorry, there are no movies matching your search query. Please try again.`;

dataStorage.saveGenresToLS();
loadTrendingMovies('day');

// Rendering popular movies --------------------------------------
export function loadTrendingMovies(timeUnits) {
  Loading.circle('Loading...');
  homeApiService
    .fetchArticles(timeUnits)
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
    })
    .catch(onFetchError)
    .finally(Loading.remove(300));
}

export function preloadTrendingMoviesTotalItems(timeUnits) {
  homeApiService
    .fetchArticles(timeUnits)
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw failureMessage;
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage(timeUnits);
      showPagination();
    })
    .catch(onFetchError);
}
// ---------------------------------------------------------------

function createGallery(movies) {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = imageCardTpl(movies);
}

function clearGalleryContainer() {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = '';
}

function onFetchError(message) {
  Notify.failure(message);
}
