import renderWatchedMovies from '../pages/render-watched-movies';
import renderQueueMovies from '../pages/render-queue-movies';
import { preloadMoviesTotalItems } from '../pages/load-movies';
import hideResetBtn from './resetBtn';
import refs from '../common/refs';

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
  !e.target.classList.contains('btnFilter--active')
    ? (loadCardMovies('day'), toTodayActive())
    : null;
});
refs.buttonWeek.addEventListener('click', e => {
  !e.target.classList.contains('btnFilter--active')
    ? (loadCardMovies('week'), toWeekActive())
    : null;
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
  loadCardMovies('day');
  toggleFilter();
}

function loadCardMovies(request) {
  refs.input.value = '';
  preloadMoviesTotalItems(request);
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

export function deactivateFilter() {
  refs.buttonToday.classList.remove('btnFilter--active');
  refs.buttonWeek.classList.remove('btnFilter--active');
}
