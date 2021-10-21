import { Notify } from 'notiflix';
import refs from './refs';
import dataStorage from '../components/data-storage';
import noResultsTpl from '../../templates/no-results.hbs';
import imageCardTpl from '../../templates/card-markup.hbs';
import messages from './messages.js';
import { onGalleryHover } from '../components/gallery-card';

export function onEmptyLibraryList(listName) {
  refs.galleryContainer.innerHTML = '';
  let messageTxt = '';
  if (listName) {
    messageTxt = messages.emptyLibraryList(listName);
  }
  const message = noResultsTpl({ messageTxt: messageTxt });
  refs.messageContainer.innerHTML = message;
  refs.messageContainer.classList.remove('visually-hidden');
}

export function addToWatched(movieObj, e) {
  dataStorage.toggleWatchedMovieProp(movieObj);
  if (dataStorage.getWatchedPropForMovie(movieObj.id)) {
    e.target.textContent = messages.watchedBtnTrue;
    dataStorage.saveToWatched(movieObj);
  } else {
    e.target.textContent = messages.watchedBtnFalse;
  }

  if (!movieObj.source_list || movieObj.source_list !== 'watched') {
    const list = dataStorage.getCurrentMovies().map(el => {
      if (el.id === movieObj.id) {
        el.watched = !el.watched;
      }
      return el;
    });

    dataStorage.saveCurrentMovies(list);
    refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    onGalleryHover();
    return;
  } else {
    const list = dataStorage.getWatchedMovies();
    dataStorage.saveCurrentMovies(list);

    if (list.length) {
      refs.messageContainer.classList.add('visually-hidden');
      refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    } else onEmptyLibraryList(dataStorage.WATCHED);
  }
}

export function addToQueue(movieObj, e) {
  dataStorage.toggleQueueMovieProp(movieObj);
  if (dataStorage.getQueuePropForMovie(movieObj.id)) {
    e.target.textContent = messages.queueBtnTrue;
    dataStorage.saveToQueue(movieObj);
  } else {
    e.target.textContent = messages.queueBtnFalse;
  }

  if (!movieObj.source_list || movieObj.source_list !== 'queue') {
    const list = dataStorage.getCurrentMovies().map(el => {
      if (el.id === movieObj.id) {
        el.queue = !el.queue;
      }
      return el;
    });

    dataStorage.saveCurrentMovies(list);
    refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    onGalleryHover();
    return;
  } else {
    const list = dataStorage.getQueueMovies();
    dataStorage.saveCurrentMovies(list);

    if (list.length) {
      refs.messageContainer.classList.add('visually-hidden');
      refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    } else onEmptyLibraryList(dataStorage.QUEUE);
  }
}

export function preventPageScroll() {
  document.body.classList.add('modal-open');
}

export function setPageScroll() {
  document.body.classList.remove('modal-open');
}

export function createGallery(movies) {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = imageCardTpl(movies);
}

export function clearGalleryContainer() {
  refs.messageContainer.classList.add('visually-hidden');
  refs.galleryContainer.innerHTML = '';
}

export function onFetchError(message) {
  Notify.failure(message);
}
