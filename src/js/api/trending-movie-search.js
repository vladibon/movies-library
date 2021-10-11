import { homeApiService, movieApiService } from './apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from '../components/data-storage';
import refs from '../components/refs.js';

dataStorage.saveGenresToLS();
onTrendingMoviesLoad();
getOneMovie();

export default function onTrendingMoviesLoad() {
  homeApiService
    .fetchArticles()
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data);
      dataStorage.saveCurrentPage(currentPageMovies);

      // todelete
      // dataStorage.saveWatched(currentPageMovies);
      // dataStorage.addToWatchedList('497698');

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

// Временая показательная функция для последующего изменения
function getOneMovie() {
  movieApiService
    .fetchArticles()
    .then(data => console.log('Полная информация о кинофильме для страницы кинофильма:', data))
    .catch(onFetchError);
}
