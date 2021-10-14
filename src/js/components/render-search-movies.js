// Рендеринг кинофильма по ключевому слову на главное странице
import { searchApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs';

refs.sectionHome.addEventListener('submit', onSearch);

// === ВРЕМЕННО, до подключения пагинации - Intersection Observer ===
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

const onEntry = (elements, observer) => {
  elements.forEach(element => {
    if (element.isIntersecting) {
      onLoadMore();
    }
  });
};

const observer = new IntersectionObserver(onEntry, options);

function setObserver() {
  observer.observe(refs.galleryContainer.lastElementChild);
}

function removeObserver(data) {
  observer.unobserve(refs.galleryContainer.lastElementChild);
  return data;
}
// ==============================================================

// --- Функции рендеринга изображений ---
function onSearch(e) {
  e.preventDefault();
  refs.galleryContainer.innerHTML = '';
  searchApiService.resetPage();
  searchApiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (searchApiService.searchQuery.length < 1) {
    refs.galleryContainer.innerHTML = '';
    alert('Too many matches found. Please enter a more specific query!');
    e.target.value = '';
    return;
  }

  searchApiService
    .fetchArticles()
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .then(setObserver)
    .catch(onFetchError);
}

function onLoadMore() {
  searchApiService.incrementPage();
  removeObserver();
  searchApiService
    .fetchArticles()
    .then(removeObserver)
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .then(setObserver)
    .catch(onFetchError);
}

function createGallery(data) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(data));
}

function onFetchError(message) {
  console.log(message);
}
