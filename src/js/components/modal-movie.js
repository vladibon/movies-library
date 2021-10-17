import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';

import { onTrailerPlay } from './modal-trailer';

import { addToWatched } from '../common/common';
import { addToQueue } from '../common/common';

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
  const btnYouTube = document.querySelector('.youtube-btn');
  const btnCloseModal = document.querySelector('.js-modal-movie__close-btn');

  const onAddToWatchedClick = addToWatched.bind(null, movieObj);
  const onAddToQueueClick = addToQueue.bind(null, movieObj);
  const onTrailerPlayClick = onTrailerPlay.bind(null, onModalCloseEsc);

  addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
  addToQueueBtn.addEventListener('click', onAddToQueueClick);
  btnYouTube.addEventListener('click', onTrailerPlayClick);

  btnCloseModal.addEventListener('click', movieLightbox.close);
  window.addEventListener('keydown', onModalCloseEsc);

  function onModalCloseEsc(e) {
    if (e.code === 'Escape') {
      movieLightbox.close();
    }
  }

  function onModalClose() {
    addToWatchedBtn.removeEventListener('click', onAddToWatchedClick);
    addToQueueBtn.removeEventListener('click', onAddToQueueClick);
    btnYouTube.removeEventListener('click', onTrailerPlayClick);

    window.removeEventListener('keydown', onModalCloseEsc);
    btnCloseModal.removeEventListener('click', onModalClose);
  }
}
