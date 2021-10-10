import homeAPIservice from '../api/homeApiService';
import imageCardTpl from '../../templates/card-markup.hbs';

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
  homeAPIservice.fetchArticles().then(createGallery).then(setObserver).catch(onFetchError);
}

function onLoadMore() {
  homeAPIservice.incrementPage();
  removeObserver();
  homeAPIservice
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

onSearch();
