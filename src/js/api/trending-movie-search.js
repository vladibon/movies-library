import { homeApiService, homeWeekApiService, movieApiService } from './apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from '../components/data-storage';
import refs from '../components/refs.js';

dataStorage.saveGenresToLS();
onTrendingMoviesLoad();

export default function onTrendingMoviesLoad(page) {
  homeApiService
    .fetchArticles(page)
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data.results);
      console.log(currentPageMovies);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .catch(onFetchError);
}

// ==============================================================
// ВРЕМЕННЫЙ проект рендеринга самых популярных фильмов ЗА НЕДЕЛЮ
// --------------------------------------------------------------
function onTrendingWeekMoviesLoad() {
  homeWeekApiService
    .fetchArticles()
    .then(data => {
      const currentPageMovies = dataStorage.getFilmData(data.results);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .catch(onFetchError);
}
// // ==============================================================

function createGallery(images) {
  refs.galleryContainer.innerHTML = imageCardTpl(images);
}

function onFetchError(message) {
  console.log(message);
}

// ==============================================================
// ВРЕМЕНАЯ показательная функция - cсылка на ТРЕЙЛЕР кинофильма
// --------------------------------------------------------------
getOneMovie('643532');

function getOneMovie(id) {
  movieApiService
    .fetchArticles(id)
    .then(data => console.log('Ссылка на трейлер фильма:', data))
    .catch(onFetchError);
}
