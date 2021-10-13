import onTrendingMoviesLoad from '../api/trending-movie-search';
import { renderWatchedMovies } from './render-watched-movies';
import refs from '../components/refs.js';

refs.menuNav.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    if (!e.target.children[0].classList.contains('site-nav__link--active')) toggleNav();
  }
  if (e.target.tagName === 'SPAN') {
    if (!e.target.classList.contains('site-nav__link--active')) toggleNav();
  }
});

refs.logo.addEventListener('click', loadTrending);
refs.buttonHomeMenu.addEventListener('click', loadTrending);
refs.buttonWatched.addEventListener('click', renderWatchedMovies);

function loadTrending() {
  refs.galleryContainer.innerHTML = '';
  onTrendingMoviesLoad();
}

function toggleNav() {
  refs.titleHomeMenu.classList.toggle('site-nav__link--active');
  refs.titleLibraryMenu.classList.toggle('site-nav__link--active');

  refs.sectionHome.classList.toggle('page-header--hidden');
  refs.sectionMyLibrary.classList.toggle('page-header--hidden');
}
