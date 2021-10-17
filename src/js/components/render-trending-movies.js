import { Loading } from 'notiflix';
import { homeApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs.js';
import { setPaginationTotalItems, resetPaginationPage, showPagination } from './pagination.js';
import { onEmptyLibraryList } from '../common/common.js';

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
        onEmptyLibraryList();
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
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = '';
}

function onFetchError(message) {
  Notify.failure(message);
}

// === 2, 11, 37-65 ==============================================

// import { Loading } from 'notiflix';
// import { homeApiService, homeWeekApiService } from '../api/apiServicePlugin';
// import imageCardTpl from '../../templates/card-markup.hbs';
// import dataStorage from './data-storage';
// import { setPaginationTotalItems, resetPaginationPage } from './pagination.js';
// import refs from './refs.js';

// dataStorage.saveGenresToLS();
// loadTrendingMovies();

// // Rendering popular movies TODAY --------------------------------
// export function loadTrendingMovies() {
//   Loading.circle('Loading...');
//   homeApiService
//     .fetchArticles()
//     .then(({ results, total_results }) => {
//       setPaginationTotalItems(total_results);
//       const currentPageMovies = dataStorage.getFilmData(results);
//       dataStorage.saveCurrentMovies(currentPageMovies);

//       createGallery(currentPageMovies);
//       refs.pagination.classList.remove('tui-pagination-is-hidden');
//     })
//     .catch(onFetchError)
//     .finally(Loading.remove(200));
// }

// export function preloadTrendingMoviesTotalItems() {
//   homeApiService
//     .fetchArticles()
//     .then(({ total_results }) => {
//       setPaginationTotalItems(total_results);
//       resetPaginationPage('home');
//     })
//     .catch(console.log);
// }
// // ---------------------------------------------------------------

// // Rendering popular movies THIS WEEK ----------------------------
// export function loadWeekTrendingMovies() {
//   Loading.circle('Loading...');
//   homeWeekApiService
//     .fetchArticles()
//     .then(({ results, total_results }) => {
//       setPaginationTotalItems(total_results);
//       const currentPageMovies = dataStorage.getFilmData(results);
//       dataStorage.saveCurrentMovies(currentPageMovies);

//       createGallery(currentPageMovies);
//       refs.pagination.classList.remove('tui-pagination-is-hidden');
//     })
//     .catch(onFetchError)
//     .finally(Loading.remove(200));
// }

// export function preloadWeekTrendingMoviesTotalItems() {
//   homeWeekApiService
//     .fetchArticles()
//     .then(({ total_results }) => {
//       setPaginationTotalItems(total_results);
//       resetPaginationPage('week');
//     })
//     .catch(console.log);
// }
// // ---------------------------------------------------------------

// function createGallery(movies) {
//   refs.messageContainer.classList.add('visually-hidden');
//   refs.galleryContainer.innerHTML = imageCardTpl(movies);
// }

// function onFetchError(message) {
//   console.log(message);
// }
