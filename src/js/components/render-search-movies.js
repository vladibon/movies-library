// Рендеринг кинофильма по ключевому слову на главное странице
import { Notify, Loading } from 'notiflix';
import { searchApiService } from '../api/apiServicePlugin';
import dataStorage from './data-storage';
import refs from './refs';
import {
  resetPaginationPage,
  setPaginationTotalItems,
  showPagination,
  hidePagination,
} from './pagination.js';
import {
  onEmptyLibraryList,
  createGallery,
  clearGalleryContainer,
  onFetchError,
} from '../common/common.js';

const failureMessage = `Sorry, there are no movies matching your search query. Please try again.`;

refs.sectionHome.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();

  refs.buttonWeek.classList.remove('btnFilter--active');
  refs.buttonToday.classList.remove('btnFilter--active');

  searchApiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (!searchApiService.searchQuery) {
    refs.buttonToday.classList.add('btnFilter--active');
    e.currentTarget.firstElementChild.value = '';
    Notify.failure(failureMessage);
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
    .finally(Loading.remove(300));
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
