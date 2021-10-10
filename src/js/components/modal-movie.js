import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);

function onOpenModalMovie(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__item')) return;

  // Временный код ---------
  const img = e.target.firstElementChild.firstElementChild;

  const options = {
    poster_path: img.src,
    title: img.alt,
  };
  // -----------------------

  const movieLightbox = basicLightbox.create(modalMovieTemplate(options));
  movieLightbox.show();
}
 