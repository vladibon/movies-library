import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';
import { onTrailerPlay } from '../components/trailer';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);

function onOpenModalMovie(e) {
  if (!e.target.classList.contains('gallery__item')) return;

  const currentMovies = dataStorage.getCurrentMovies();
  const movieId = e.target.getAttribute('id');
  const movieObj = currentMovies.find(el => el.id === movieId);
  const movieLightbox = basicLightbox.create(modalMovieTemplate(movieObj));
  movieLightbox.show();

  const addToWatchedBtn = document.querySelector('[data-action="add-to-watched"]');
  const addToQueueBtn = document.querySelector('[data-action="add-to-queue"]');
  const btnYouTube = document.querySelector('.modal-movie__youtube');
  const btnCloseModal = document.querySelector('.js-modal-movie__close-btn');

  addToWatchedBtn.addEventListener(
    'click',
    onAddToWatchedClick.bind(null, movieId, addToWatchedBtn),
  );
  addToQueueBtn.addEventListener('click', onAddToQueueClick.bind(null, movieId, addToQueueBtn));
  btnYouTube.addEventListener('click', onTrailerPlay);
  btnCloseModal.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onModalCloseEsc);

  function onModalCloseEsc(e) {
    if (e.code === 'Escape') {
      movieLightbox.close();
      window.removeEventListener('keydown', onModalCloseEsc);
    }
  }

  function onModalClose() {
    movieLightbox.close();
    window.removeEventListener('keydown', onModalCloseEsc);
  }

  function onAddToWatchedClick(movieId, btn, e) {
    const id = e.target.getAttribute('data-id');
    dataStorage.toggleWatchedMovieProp(id);

    dataStorage.getWatchedPropForMovie(movieId)
      ? (btn.textContent = 'remove from watched')
      : (btn.textContent = 'add to watched');
  }

  function onAddToQueueClick(movieId, btn, e) {
    const id = e.target.getAttribute('data-id');
    dataStorage.toggleQueueMovieProp(id);

    dataStorage.getQueuePropForMovie(movieId)
      ? (btn.textContent = 'remove from queue')
      : (btn.textContent = 'add to queue');
  }
}
