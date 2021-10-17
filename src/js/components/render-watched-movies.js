import dataStorage from './data-storage';
import refs from './refs';
import imageCardTpl from '../../templates/card-markup.hbs';
import { onEmptyLibraryList } from '../common/common.js';

export default function renderWatchedMovies() {
  const watchedListMovies = dataStorage.getWatchedMovies();

  refs.buttonWatched.classList.toggle('btn--primary--active');
  refs.buttonQueue.classList.toggle('btn--primary--active');

  refs.messageContainer.classList.add('visually-hidden');
  if (!watchedListMovies || !watchedListMovies.length) {
    onEmptyLibraryList(dataStorage.WATCHED);
  } else {
    dataStorage.saveCurrentMovies(watchedListMovies);
    refs.galleryContainer.innerHTML = imageCardTpl(watchedListMovies);
  }
}
