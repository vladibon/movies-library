import imagesApiService from './apiServicePlagin';
import imageCardTpl from '../../templates/card-markup.hbs';

const imagesContainer = document.querySelector('#js-gallery');

export default function onSearch() {
  imagesApiService.fetchArticles().then(createGallery).catch(onFetchError);
}

function createGallery(images) {
  console.log(images);
  imagesContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}

onSearch();
