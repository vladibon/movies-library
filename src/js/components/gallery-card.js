import dataStorage from './data-storage';
import messages from '../common/messages.js';

export function onGalleryHover() {
  const cards = document.querySelectorAll('li[data-source]');

  cards.forEach(el => {
    el.addEventListener('mouseover', onCardHover);
    el.addEventListener('mouseout', onMouseLeave);
  });
}

function onCardHover(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  const movieId = e.target.getAttribute('id');
  document.querySelectorAll('.gallery__card-nav').forEach(el => {
    el.classList.remove('is-hidden');
  });

  const watchedBtnArray = document.querySelectorAll('[data-action="add-watched"]');
  const addWatchedBtnGallery = Array.from(watchedBtnArray).find(el => el.dataset.id === movieId);
  const queueBtnArray = document.querySelectorAll('[data-action="add-queue"]');
  const addQueueBtnGallery = Array.from(queueBtnArray).find(el => el.dataset.id === movieId);

  addWatchedBtnGallery.addEventListener('click', addToWatched);
  addQueueBtnGallery.addEventListener('click', addToQueue);
}

function addToWatched(e) {
  e.preventDefault();

  const movieId = e.target.getAttribute('data-id');
  const btnTextHelper = Array.from(e.target.children).find(el =>
    el.classList.contains('watched-helper'),
  );
  const movieObj = dataStorage.getCurrentMovies().find(el => el.id === movieId);

  dataStorage.toggleWatchedMovieProp(movieObj);
  e.target.classList.toggle('activated');

  if (dataStorage.getWatchedPropForMovie(movieObj.id)) {
    btnTextHelper.textContent = messages.watchedBtnTrue;
    dataStorage.saveToWatched(movieObj);
  } else {
    btnTextHelper.textContent = messages.watchedBtnFalse;
  }

  const list = dataStorage.getCurrentMovies().map(el => {
    if (el.id === movieObj.id) {
      el.watched = !el.watched;
    }
    return el;
  });

  dataStorage.saveCurrentMovies(list);
}

function addToQueue(e) {
  e.preventDefault();
  const movieId = e.target.getAttribute('data-id');
  const btnTextHelper = Array.from(e.target.children).find(el =>
    el.classList.contains('queue-helper'),
  );
  const movieObj = dataStorage.getCurrentMovies().find(el => el.id === movieId);

  dataStorage.toggleQueueMovieProp(movieObj);
  e.target.classList.toggle('activated');

  if (dataStorage.getQueuePropForMovie(movieObj.id)) {
    btnTextHelper.textContent = messages.queueBtnTrue;
    dataStorage.saveToQueue(movieObj);
  } else {
    btnTextHelper.textContent = messages.queueBtnFalse;
  }

  const list = dataStorage.getCurrentMovies().map(el => {
    if (el.id === movieObj.id) {
      el.queue = !el.queue;
    }
    return el;
  });

  dataStorage.saveCurrentMovies(list);
}

function onMouseLeave(e) {
  e.target.removeEventListener('mouseover', onCardHover);
  e.target.removeEventListener('mouseout', onMouseLeave);
}
