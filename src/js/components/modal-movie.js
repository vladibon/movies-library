import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';
// import imageCardTpl from '../../templates/card-markup.hbs';
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

  addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
  addToQueueBtn.addEventListener('click', onAddToQueueClick);
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
    window.removeEventListener('keydown', onModalCloseEsc);
    btnCloseModal.removeEventListener('click', onModalClose);
    // const list = dataStorage.getCurrentMovies();
    // refs.galleryContainer.innerHTML = imageCardTpl(list);
  }

  function onAddToWatchedClick(e) {
    const id = e.target.getAttribute('data-id');

    dataStorage.toggleWatchedMovieProp(id);
    dataStorage.getWatchedPropForMovie(id)
      ? (e.target.textContent = 'remove from watched')
      : (e.target.textContent = 'add to watched');

    // dataStorage.saveCurrentMovies(dataStorage.getWatchedMovies());
  }

  function onAddToQueueClick(e) {
    const id = e.target.getAttribute('data-id');
    dataStorage.toggleQueueMovieProp(id);

    dataStorage.getQueuePropForMovie(id)
      ? (e.target.textContent = 'remove from queue')
      : (e.target.textContent = 'add to queue');

    // dataStorage.saveCurrentMovies(dataStorage.getQueueMovies());
  }
}
