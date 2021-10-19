import refs from '../components/refs';
import dataStorage from '../components/data-storage';
import noResultsTpl from '../../templates/no-results.hbs';
import imageCardTpl from '../../templates/card-markup.hbs';

export function onEmptyLibraryList(listName) {
  refs.galleryContainer.innerHTML = '';
  let messageTxt = '';
  if (listName) {
    messageTxt = `Sorry, it seems like you don't have any saved movies in ${listName} list.`;
  }
  const message = noResultsTpl({ messageTxt: messageTxt });
  refs.messageContainer.innerHTML = message;
  refs.messageContainer.classList.remove('visually-hidden');
}

export function addToWatched(movieObj, e) {
  dataStorage.toggleWatchedMovieProp(movieObj);
  if (dataStorage.getWatchedPropForMovie(movieObj.id)) {
    e.target.textContent = 'remove from watched';
    dataStorage.saveToWatched(movieObj);
  } else {
    e.target.textContent = 'add to watched';
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
    e.target.textContent = 'remove from queue';
    dataStorage.saveToQueue(movieObj);
  } else {
    e.target.textContent = 'add to queue';
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
