import dataStorage from '../components/data-storage';
import { onEmptyLibraryList } from '../common/common';
import refs from '../common/refs';
import imageCardTpl from '../../templates/card-markup.hbs';

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
