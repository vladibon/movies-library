import { Loading } from 'notiflix';
import messages from '../utils/messages';
import { homeApiService, homeWeekApiService } from '../api/apiServicePlugin';
import dataStorage from './data-storage';
import { setPaginationTotalItems, resetPaginationPage, showPagination } from './pagination';
import {
  onEmptyLibraryList,
  createGallery,
  clearGalleryContainer,
  onFetchError,
} from '../common/common';
import { onGalleryHover } from './gallery-card';

dataStorage.saveGenresToLS();
loadTrendingMovies();

// Rendering popular movies TODAY --------------------------------
export function loadTrendingMovies() {
  Loading.circle('Loading...');
  homeApiService
    .fetchArticles()
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);

      onGalleryHover();
    })
    .catch(onFetchError)
    .finally(Loading.remove(300));
}

export function preloadTrendingMoviesTotalItems() {
  homeApiService
    .fetchArticles()
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw messages.failure;
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage('home');
      showPagination();
    })
    .catch(onFetchError);
}
// ---------------------------------------------------------------

// Rendering popular movies THIS WEEK ----------------------------
export function loadWeekTrendingMovies() {
  Loading.circle('Loading...');
  homeWeekApiService
    .fetchArticles()
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);

      onGalleryHover();
    })
    .catch(onFetchError)
    .finally(Loading.remove(300));
}

export function preloadWeekTrendingMoviesTotalItems() {
  homeWeekApiService
    .fetchArticles()
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw messages.failure;
      }
      setPaginationTotalItems(total_results);
      resetPaginationPage('week');
      showPagination();
    })
    .catch(onFetchError);
}
// ---------------------------------------------------------------
