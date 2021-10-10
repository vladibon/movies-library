import imagesApiService from './api/homeAPIservice';
import imageCardTpl from '../templates/card-markup.hbs';

const imagesContainer = document.querySelector('#js-gallery');

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
function onSearch() {
  imagesApiService.fetchArticles().then(createGallery).then(setObserver).catch(onFetchError);
}

function onLoadMore() {
  imagesApiService.incrementPage();
  removeObserver();
  imagesApiService
    .fetchArticles()
    .then(removeObserver)
    .then(createGallery)
    .then(setObserver)
    .catch(onFetchError);
}

function createGallery(images) {
  console.log(images);
  imagesContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}

onSearch();
