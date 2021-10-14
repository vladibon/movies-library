import onTrendingMoviesLoad from '../api/trending-movie-search';
import { renderWatchedMovies } from './render-watched-movies';
import { renderQueueMovies } from './render-queue-movies';
import refs from '../components/refs.js';
import movePageOne from './pagination.js';

refs.menuNav.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    if (!e.target.children[0].classList.contains('site-nav__link--active')) toggleNav();
  }
  if (e.target.tagName === 'SPAN') {
    if (!e.target.classList.contains('site-nav__link--active')) toggleNav();
  }
});

refs.logo.addEventListener('click', onLogoClick);
refs.buttonHomeMenu.addEventListener('click', loadTrending);
refs.buttonWatched.addEventListener('click', e => {
  !e.target.classList.contains('btn--primary--active') ? renderWatchedMovies() : null;
});
refs.buttonQueue.addEventListener('click', e => {
  !e.target.classList.contains('btn--primary--active') ? renderQueueMovies() : null;
});

function onLogoClick() {
  refs.titleHomeMenu.classList.add('site-nav__link--active');
  refs.titleLibraryMenu.classList.remove('site-nav__link--active');
  loadTrending();
}
  function loadTrending() {
    refs.input.value = '';
    refs.galleryContainer.innerHTML = "";
    movePageOne();
    refs.pagination.dataset.pagin = 'home';
    onTrendingMoviesLoad();
    refs.sectionHome.classList.remove('page-header--hidden');
    refs.sectionMyLibrary.classList.add('page-header--hidden');
    refs.header.classList.remove('page-header--my-library');
    onTrendingMoviesLoad();
  }

  function toggleNav() {
    refs.titleHomeMenu.classList.toggle('site-nav__link--active');
    refs.titleLibraryMenu.classList.toggle('site-nav__link--active');
    if (refs.titleLibraryMenu.classList.contains('site-nav__link--active')) {
      renderWatchedMovies();
      refs.buttonWatched.classList.add('btn--primary--active');
      refs.buttonQueue.classList.remove('btn--primary--active');
    }

    refs.sectionHome.classList.toggle('page-header--hidden');
    refs.sectionMyLibrary.classList.toggle('page-header--hidden');
    refs.header.classList.toggle('page-header--my-library');
  }