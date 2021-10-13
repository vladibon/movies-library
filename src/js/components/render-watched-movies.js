import dataStorage from './data-storage';
import refs from './refs';
import imageCardTpl from '../../templates/card-markup.hbs';

export function renderWatchedMovies() {
  const watchedListMovies = dataStorage.getWatchedMovies();
  console.log(watchedListMovies);
  refs.galleryContainer.innerHTML = '';
  if (watchedListMovies.length) {
    dataStorage.saveCurrentMovies(watchedListMovies);
    refs.galleryContainer.innerHTML = imageCardTpl(watchedListMovies);
  } else {
    refs.galleryContainer.innerHTML = '';
    console.log('sorry');
  }
}
