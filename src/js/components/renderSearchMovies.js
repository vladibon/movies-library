// ЭТОТ ФАЙЛ ДЛЯ ВАЛЕРЫ!!!

import { searchApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';

// --- Подключение плагина debounce ---
const debounce = require('lodash.debounce');

const imagesContainer = document.querySelector('#js-gallery');
const searchForm = document.querySelector('.page-header__search--input');

searchForm.addEventListener('input', debounce(onSearch, 1000));

// --- Intersection Observer ---
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
  observer.observe(imagesContainer.lastElementChild);
}

function removeObserver(data) {
  observer.unobserve(imagesContainer.lastElementChild);
  return data;
}

// --- Функции рендеринга изображений ---
function onSearch(e) {
  imagesContainer.innerHTML = '';
  searchApiService.resetPage();
  searchApiService.query = e.target.value.trim();

  if (searchApiService.query.length < 1) {
    imagesContainer.innerHTML = '';
    alert('Too many matches found. Please enter a more specific query!');
    e.target.value = '';
    return;
  }

  searchApiService.fetchArticles().then(createGallery).then(setObserver).catch(onFetchError);
  e.target.value = '';
}

function onLoadMore() {
  searchApiService.incrementPage();
  removeObserver();
  searchApiService
    .fetchArticles()
    .then(removeObserver)
    .then(createGallery)
    .then(setObserver)
    .catch(onFetchError);
}

function createGallery(images) {
  imagesContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}
