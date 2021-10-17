import renderWatchedMovies from './render-watched-movies';
import renderQueueMovies from './render-queue-movies';
import {
  preloadTrendingMoviesTotalItems,
  preloadWeekTrendingMoviesTotalItems,
} from './render-trending-movies';
import hideResetBtn from './resetBtn';
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
refs.buttonHomeMenu.addEventListener('click', onStartMenu);
refs.buttonToday.addEventListener('click', e => {
  !e.target.classList.contains('btnFilter--active') ? (loadTrending(), toTodayActive()) : null;
});
refs.buttonWeek.addEventListener('click', e => {
  !e.target.classList.contains('btnFilter--active') ? (loadWeekTrending(), toWeekActive()) : null;
});
refs.buttonWatched.addEventListener('click', e => {
  !e.target.classList.contains('btn--primary--active') ? renderWatchedMovies() : null;
});
refs.buttonQueue.addEventListener('click', e => {
  !e.target.classList.contains('btn--primary--active') ? renderQueueMovies() : null;
});

function onLogoClick() {
  refs.titleHomeMenu.classList.add('site-nav__link--active');
  refs.titleLibraryMenu.classList.remove('site-nav__link--active');
  refs.sectionHome.classList.remove('page-header--hidden');
  refs.sectionSearchFilter.classList.remove('page-header--hidden');
  refs.sectionMyLibrary.classList.add('page-header--hidden');
  refs.header.classList.remove('page-header--my-library');
  onStartMenu();
}

function onStartMenu() {
  loadTrending();
  toggleFilter();
}

function loadTrending() {
  refs.input.value = '';
  preloadTrendingMoviesTotalItems();
  hideResetBtn();
}

function loadWeekTrending() {
  refs.input.value = '';
  preloadWeekTrendingMoviesTotalItems();
  hideResetBtn();
}

function toggleNav() {
  refs.pagination.classList.add('tui-pagination-is-hidden');

  refs.titleHomeMenu.classList.toggle('site-nav__link--active');
  refs.titleLibraryMenu.classList.toggle('site-nav__link--active');
  if (refs.titleLibraryMenu.classList.contains('site-nav__link--active')) {
    renderWatchedMovies();
    refs.buttonWatched.classList.add('btn--primary--active');
    refs.buttonQueue.classList.remove('btn--primary--active');
  }

  refs.sectionHome.classList.toggle('page-header--hidden');
  refs.sectionSearchFilter.classList.toggle('page-header--hidden');
  refs.sectionMyLibrary.classList.toggle('page-header--hidden');
  refs.header.classList.toggle('page-header--my-library');
}

function toTodayActive() {
  refs.buttonWeek.classList.remove('btnFilter--active');
  refs.buttonToday.classList.add('btnFilter--active');
}

function toWeekActive() {
  refs.buttonToday.classList.remove('btnFilter--active');
  refs.buttonWeek.classList.add('btnFilter--active');
}

function toggleFilter() {
  if (refs.buttonWeek.classList.contains('btnFilter--active')) {
    refs.buttonToday.classList.toggle('btnFilter--active');
    refs.buttonWeek.classList.toggle('btnFilter--active');
  }
  refs.buttonToday.classList.add('btnFilter--active');
}
