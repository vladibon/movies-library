import refs from '../components/refs';
import dataStorage from '../components/data-storage';
import noResultsTpl from '../../templates/no-results.hbs';
import imageCardTpl from '../../templates/card-markup.hbs';

export function onEmptyLibraryList(listName) {
  refs.galleryContainer.innerHTML = '';
  const message = noResultsTpl({ list: listName });
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
