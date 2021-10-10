import imagesApiService from './apiServicePlagin';
import imageCardTpl from '../../templates/card-markup.hbs';
import localStorage from '../components/local-storage-db';
import refs from '../components/refs.js';

onTrendingMoviesLoad();

function onTrendingMoviesLoad() {
  imagesApiService
    .fetchArticles()
    .then(data => {
      const currentPageMovies = localStorage.getFilmData(data.results);
      localStorage.saveCurrentPage(currentPageMovies);
      createGallery(currentPageMovies);
    })
    .catch(onFetchError);
}

function createGallery(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}
