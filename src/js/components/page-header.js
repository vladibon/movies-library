import onTrendingMoviesLoad from '../api/trending-movie-search';
import { renderWatchedMovies } from './render-watched-movies';
import { renderQueueMovies } from './render-queue-movies';
import refs from '../components/refs.js';

refs.menuNav.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    if (!e.target.children[0].classList.contains('site-nav__link--active')) toggleNav();
  }
  if (e.target.tagName === 'SPAN') {
    if (!e.target.classList.contains('site-nav__link--active')) toggleNav();
  }
});

refs.logo.addEventListener('click', onLogoClick);
refs.buttonHomeMenu.addEventListener('click', onTrendingMoviesLoad);
refs.buttonWatched.addEventListener('click', renderWatchedMovies);
refs.buttonQueue.addEventListener('click', renderQueueMovies);

function onLogoClick() {
  refs.titleHomeMenu.classList.add('site-nav__link--active');
  refs.titleLibraryMenu.classList.remove('site-nav__link--active');
  toggleHeader();
  onTrendingMoviesLoad();
}

function toggleHeader() {
  refs.sectionHome.classList.toggle('page-header--hidden');
  refs.sectionMyLibrary.classList.toggle('page-header--hidden');
  refs.header.classList.toggle('page-header--my-library');
}

function toggleNav() {
  refs.titleHomeMenu.classList.toggle('site-nav__link--active');
  refs.titleLibraryMenu.classList.toggle('site-nav__link--active');
  if (refs.titleLibraryMenu.classList.contains('site-nav__link--active')) {
    renderWatchedMovies();
    refs.buttonWatched.classList.add('btn--primary--active');
    refs.buttonQueue.classList.remove('btn--primary--active');
  }

  toggleHeader();
}
