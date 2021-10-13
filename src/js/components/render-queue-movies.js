import dataStorage from './data-storage';
import refs from './refs';
import imageCardTpl from '../../templates/card-markup.hbs';
import noResultsTpl from '../../templates/no-results.hbs';

export function renderQueueMovies() {
  const queueListMovies = dataStorage.getQueueMovies();

  refs.buttonWatched.classList.toggle('btn--primary--active');
  refs.buttonQueue.classList.toggle('btn--primary--active');

  refs.galleryContainer.innerHTML = '';
  if (!queueListMovies || !queueListMovies.length) {
    const message = noResultsTpl({ list: 'watched' });
    // refs.messageContainer.innerHTML = message;
  } else {
    dataStorage.saveCurrentMovies(queueListMovies);
    refs.galleryContainer.innerHTML = imageCardTpl(queueListMovies);
  }
}
