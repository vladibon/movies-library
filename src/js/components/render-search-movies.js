// Рендеринг кинофильма по ключевому слову на главное странице
import { Notify, Loading } from 'notiflix';
import { searchApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs';
import {
  resetPaginationPage,
  setPaginationTotalItems,
  showPagination,
  hidePagination,
} from './pagination.js';
import { onEmptyLibraryList } from '../common/common.js';

const failureMessage = `Sorry, there are no movies matching your search query. Please try again.`;

refs.sectionHome.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();

  searchApiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (!searchApiService.searchQuery) {
    e.currentTarget.firstElementChild.value = '';
    onSearchError();
    return;
  }

  preloadSearchedMoviesTotalItems();
}

export function loadSearchedMovies() {
  Loading.circle('Loading...');
  searchApiService
    .fetchArticles()
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
    })
    .catch(onFetchError)
    .finally(Loading.remove(200));
}

function preloadSearchedMoviesTotalItems() {
  searchApiService
    .fetchArticles()
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw failureMessage;
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage('input');
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

function onSearchError() {
  Notify.failure(failureMessage);
}
