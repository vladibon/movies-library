import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import modalMovieTemplate from '../../templates/modal-movie.hbs';
import dataStorage from '../components/data-storage';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);

function onOpenModalMovie(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__item')) return;

  const movieId = e.target.getAttribute('id');
  const currentMovies = dataStorage.getCurrentMovies();
  const movieObj = currentMovies.find(el => el.id === movieId);

  const movieLightbox = basicLightbox.create(modalMovieTemplate(movieObj));
  movieLightbox.show();

  const addToWatchedBtn = document.querySelector('[data-action="add-to-watched"]');
  addToWatchedBtn.addEventListener(
    'click',
    onAddToWatchedClick.bind(null, movieId, addToWatchedBtn),
  );
}

function onAddToWatchedClick(movieId, btn, e) {
  const id = e.target.getAttribute('data-id');
  dataStorage.toggleWatchedMovieProp(id);

  dataStorage.getWatchedPropForMovie(movieId)
    ? (btn.textContent = 'remove from watched')
    : (btn.textContent = 'add to watched');
}
