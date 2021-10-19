import { Notify, Loading } from 'notiflix';
import { apiService } from '../api/api-service';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs.js';
import {
  resetPaginationPage,
  setPaginationTotalItems,
  showPagination,
  hidePagination,
} from './pagination.js';
import { onEmptyLibraryList } from '../common/common.js';

const failureMessage = `Sorry, there are no movies matching your search query. Please try again.`;

export function loadMovies(request) {
  Loading.circle('Loading...');
  apiService
    .fetchArticles(request)
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
    })
    .catch(onFetchError)
    .finally(Loading.remove(300));
}

export function preloadMoviesTotalItems(request) {
  apiService
    .fetchArticles(request)
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw failureMessage;
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage(request);
      showPagination();
    })
    .catch(onFetchError);
}

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
