import dataStorage from './data-storage';
import messages from '../common/messages.js';

export function onGalleryHover() {
  const cards = document.querySelectorAll('li[data-source]');

  if (window.innerWidth >= 1024) {
    cards.forEach(el => {
      el.addEventListener('mouseover', onCardHover);
      el.addEventListener('mouseout', onMouseLeave);
    });
  }
}

function onCardHover(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  document.querySelectorAll('.gallery__card-nav').forEach(el => {
    el.classList.remove('is-hidden');
  });

  const addWatchedBtnGallery = e.target.querySelector('[data-action="add-watched"]');
  const addQueueBtnGallery = e.target.querySelector('[data-action="add-queue"]');

  addWatchedBtnGallery.addEventListener('click', addToWatched);
  addQueueBtnGallery.addEventListener('click', addToQueue);
}

function addToWatched(e) {
  e.preventDefault();

  const movieId = e.target.getAttribute('data-id');
  const btnTextHelper = e.target.querySelector('.watched-helper');
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
  const btnTextHelper = e.target.querySelector('.queue-helper');
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
