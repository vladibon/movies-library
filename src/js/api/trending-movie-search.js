import { homeApiService, movieApiService } from './apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from '../components/data-storage';
import refs from '../components/refs.js';

dataStorage.saveGenresToLS();
onTrendingMoviesLoad();

export default function onTrendingMoviesLoad() {
  homeApiService
    .fetchArticles()
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .catch(onFetchError);
}

function createGallery(images) {
  refs.galleryContainer.innerHTML = imageCardTpl(images);
}

function onFetchError(message) {
  console.log(message);
}

// Это можно удалить потом
// Временая показательная функция для последующего изменения
// getOneMovie();

function getOneMovie() {
  movieApiService
    .fetchArticles()
    .then(data => console.log('Полная информация о кинофильме для страницы кинофильма:', data))
    .catch(onFetchError);
}

// ВАЛЕРА, это тебе 🌷🌷🌷 (потом удалишь отсюда)
function renderWatchedMovies() {
  const watchedListMovies = dataStorage.getWatchedMovies();
  console.log(watchedListMovies);

  dataStorage.saveCurrentMovies(watchedListMovies);
  createGallery(watchedListMovies);
}
