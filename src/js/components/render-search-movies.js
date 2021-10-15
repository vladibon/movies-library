// Рендеринг кинофильма по ключевому слову на главное странице
import { Notify, Loading } from 'notiflix';
import { searchApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs';
import {
  resetPaginationPage,
  setPaginationTotalItems,
  cleanGalleryContainer,
} from './pagination.js';

refs.sectionHome.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();

  searchApiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (!searchApiService.searchQuery) {
    e.currentTarget.firstElementChild.value = '';
    onFetchError();
    return;
  }

  preloadSearchedMoviesTotalItems();
}

export function loadSearchedMovies() {
  Loading.circle('Loading...');
  cleanGalleryContainer();
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
      setPaginationTotalItems(total_results);
      resetPaginationPage('input');
    })
    .catch(console.log);
}

function createGallery(movies) {
  refs.galleryContainer.innerHTML = imageCardTpl(movies);
  refs.messageContainer.classList.add('visually-hidden');
}

function onFetchError() {
  Notify.failure('Search result not successful. Enter the correct movie name');
}
