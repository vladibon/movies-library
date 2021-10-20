import dataStorage from '../components/data-storage';
import { onEmptyLibraryList } from '../common/common';
import refs from '../common/refs';
import imageCardTpl from '../../templates/card-markup.hbs';

export default function renderQueueMovies() {
  const queueListMovies = dataStorage.getQueueMovies();

  refs.buttonWatched.classList.toggle('btn--primary--active');
  refs.buttonQueue.classList.toggle('btn--primary--active');

  refs.messageContainer.classList.add('visually-hidden');
  if (!queueListMovies || !queueListMovies.length) {
    onEmptyLibraryList(dataStorage.QUEUE);
  } else {
    dataStorage.saveCurrentMovies(queueListMovies);
    refs.galleryContainer.innerHTML = imageCardTpl(queueListMovies);
  }
}
