import { homeApiService, movieApiService, genresApiService } from './apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import localStorage from '../components/local-storage-db';
import refs from '../components/refs.js';

onTrendingMoviesLoad();
getOneMovie();
getGenresMovies();

export default function onTrendingMoviesLoad(page) {
  homeApiService
    .fetchArticles(page)
    .then(data => {
      const currentPageMovies = localStorage.getFilmData(data);
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

// Временая показательная функция для последующего изменения
function getOneMovie() {
  movieApiService
    .fetchArticles()
    .then(data => console.log('Полная информация о кинофильме для страницы кинофильма:', data))
    .catch(onFetchError);
}

// Временая показательная функция для Лены
function getGenresMovies() {
  genresApiService
    .fetchArticles()
    .then(data => console.log('Жанры фильмов (ДЛЯ ЛЕНЫ):', data))
    .catch(onFetchError);
}
