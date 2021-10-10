import imagesApiService from './apiServicePlagin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataBase from '../components/local-storage-db';

const imagesContainer = document.querySelector('#js-gallery');

function onSearch() {
  imagesApiService
    .fetchArticles()
    .then(data => {
      const currentPage = dataBase.getFilmData(data.results);
      dataBase.saveCurrentPage(currentPage);
      createGallery(currentPage);
    })
    .catch(onFetchError);
}

function createGallery(images) {
  imagesContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}

onSearch();
