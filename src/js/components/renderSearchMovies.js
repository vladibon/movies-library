// Рендеринг кинофильма по ключевому слову на главное странице
import { searchApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs';

// === ВРЕМЕННО, пока нет кнопки поиска ===
document.querySelector('.page-header__search--input').addEventListener('input', onSearch);
// refs.?????????.addEventListener('submit', onSearch);

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
export default function onSearch(e, page) {
  refs.galleryContainer.innerHTML = '';
  refs.pagination.dataset.pagin = 'input';
  console.log(e);
  searchApiService.resetPage();
  searchApiService.query = e.target.value.trim();

  if (searchApiService.query.length < 1) {
    refs.galleryContainer.innerHTML = '';
    alert('Too many matches found. Please enter a more specific query!');
    e.target.value = '';
    return;
  }

  searchApiService
    .fetchArticles(page)
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
    })
    // .then(setObserver)
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
