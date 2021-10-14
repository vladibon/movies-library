import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';
import imageCardTpl from '../../templates/card-markup.hbs';
import { onTrailerPlay } from '../components/trailer';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);

function onOpenModalMovie(e) {
  if (!e.target.classList.contains('gallery__item')) return;

  const currentMovies = dataStorage.getCurrentMovies();
  const movieId = e.target.getAttribute('id');
  const movieObj = currentMovies.find(el => el.id === movieId);
  const movieLightbox = basicLightbox.create(modalMovieTemplate(movieObj), {
    onClose: onModalClose,
  });
  movieLightbox.show();

  const addToWatchedBtn = document.querySelector('[data-action="add-to-watched"]');
  const addToQueueBtn = document.querySelector('[data-action="add-to-queue"]');
  const btnYouTube = document.querySelector('.modal-movie__youtube');
  const btnCloseModal = document.querySelector('.js-modal-movie__close-btn');

  const onAddToWatchedClick = addToWatched.bind(null, movieObj);
  const onAddToQueueClick = addToQueue.bind(null, movieObj);

  addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
  addToQueueBtn.addEventListener('click', onAddToQueueClick);
  btnYouTube.addEventListener('click', onTrailerPlay);

  btnCloseModal.addEventListener('click', movieLightbox.close);
  window.addEventListener('keydown', movieLightbox.close);

  function onModalCloseEsc(e) {
    if (e.code === 'Escape') {
      movieLightbox.close();
    }
  }

  function onModalClose() {
    addToWatchedBtn.removeEventListener('click', onAddToWatchedClick);
    addToQueueBtn.removeEventListener('click', onAddToQueueClick);
    btnYouTube.removeEventListener('click', onTrailerPlay);

    window.removeEventListener('keydown', onModalCloseEsc);
    btnCloseModal.removeEventListener('click', onModalClose);
  }

  function addToWatched(movieObj, e) {
    dataStorage.toggleWatchedMovieProp(movieObj.id);
    dataStorage.getWatchedPropForMovie(movieObj.id)
      ? (e.target.textContent = 'remove from watched')
      : (e.target.textContent = 'add to watched');

    if (!movieObj.source_list || movieObj.source_list !== 'watched') {
      // dataStorage.getWatchedMovies();
      return;
    } else {
      dataStorage.saveCurrentMovies(dataStorage.getWatchedMovies());
      refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    }
  }

  function addToQueue(movieObj, e) {
    dataStorage.toggleQueueMovieProp(movieObj.id);
    dataStorage.getQueuePropForMovie(movieObj.id)
      ? (e.target.textContent = 'remove from queue')
      : (e.target.textContent = 'add to queue');

    if (!movieObj.source_list || movieObj.source_list !== 'queue') {
      // dataStorage.getQueueMovies();
      return;
    } else {
      dataStorage.saveCurrentMovies(dataStorage.getQueueMovies());
      refs.galleryContainer.innerHTML = imageCardTpl(dataStorage.getCurrentMovies());
    }
  }
}
