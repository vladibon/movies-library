import { Loading } from 'notiflix';
import { homeApiService } from '../api/apiServicePlugin';
import imageCardTpl from '../../templates/card-markup.hbs';
import dataStorage from './data-storage';
import refs from './refs.js';

dataStorage.saveGenresToLS();
onTrendingMoviesLoad();

export default function onTrendingMoviesLoad() {
  Loading.circle('Loading...');
  homeApiService
    .fetchArticles()
    .then(({ results, total_results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);

      createGallery(currentPageMovies);
    })
    .catch(onFetchError)
    .finally(Loading.remove(200));
}

function createGallery(images) {
  refs.galleryContainer.innerHTML = imageCardTpl(images);
}

function onFetchError(message) {
  console.log(message);
}
