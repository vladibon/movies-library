import * as basicLightbox from 'basiclightbox';
import refs from '../common/refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';
import { movieApiService } from '../api/api-service';

import { onTrailerPlay } from './modal-trailer';
import { addToWatched, addToQueue, preventPageScroll, setPageScroll } from '../common/common';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);

function onOpenModalMovie(e) {
  if (!e.target.classList.contains('gallery__item')) return;

  preventPageScroll();

  const currentMovies = dataStorage.getCurrentMovies();
  const movieId = e.target.getAttribute('id');
  const movieObj = currentMovies.find(el => el.id === movieId);
  const movieLightbox = basicLightbox.create(modalMovieTemplate(movieObj), {
    onClose: () => {
      onModalClose();
      setPageScroll();
    },
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

  // the link to the trailer is saved to local storage, so we can display the trailer's popup
  movieApiService.fetchArticles(movieObj.id).then(link => {
    if (!link) {
      btnYouTube.classList.add('youtube-btn--inactive');
    }
    localStorage.setItem('trailer_link', link);
  });

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
