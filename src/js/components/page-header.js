import renderWatchedMovies from './render-watched-movies';
import renderQueueMovies from './render-queue-movies';
import { preloadTrendingMoviesTotalItems } from './render-trending-movies';
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
  refs.sectionHome.classList.remove('page-header--hidden');
  refs.sectionMyLibrary.classList.add('page-header--hidden');
  refs.header.classList.remove('page-header--my-library');
  loadTrending();
}
function loadTrending() {
  refs.input.value = '';
  preloadTrendingMoviesTotalItems();
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
  refs.sectionMyLibrary.classList.toggle('page-header--hidden');
  refs.header.classList.toggle('page-header--my-library');
}

// === 3-6, 20-25, 37, 42, 46-52, 67, 72-75 =======================

// import renderWatchedMovies from './render-watched-movies';
// import renderQueueMovies from './render-queue-movies';
// import {
//   preloadTrendingMoviesTotalItems,
//   preloadWeekTrendingMoviesTotalItems,
// } from './render-trending-movies';
// import refs from '../components/refs.js';

// refs.menuNav.addEventListener('click', e => {
//   if (e.target.tagName === 'BUTTON') {
//     if (!e.target.children[0].classList.contains('site-nav__link--active')) toggleNav();
//   }
//   if (e.target.tagName === 'SPAN') {
//     if (!e.target.classList.contains('site-nav__link--active')) toggleNav();
//   }
// });

// refs.logo.addEventListener('click', onLogoClick);
// refs.buttonHomeMenu.addEventListener('click', loadTrending);
// refs.buttonToday.addEventListener('click', e => {
//   !e.target.classList.contains('btn--primary--active') ? loadTrending() : null;
// });
// refs.buttonWeek.addEventListener('click', e => {
//   !e.target.classList.contains('btn--primary--active') ? loadWeekTrending() : null;
// });
// refs.buttonWatched.addEventListener('click', e => {
//   !e.target.classList.contains('btn--primary--active') ? renderWatchedMovies() : null;
// });
// refs.buttonQueue.addEventListener('click', e => {
//   !e.target.classList.contains('btn--primary--active') ? renderQueueMovies() : null;
// });

// function onLogoClick() {
//   refs.titleHomeMenu.classList.add('site-nav__link--active');
//   refs.titleLibraryMenu.classList.remove('site-nav__link--active');
//   refs.sectionHome.classList.remove('page-header--hidden');
//   refs.sectionSearchFilter.classList.remove('page-header--hidden');
//   refs.sectionMyLibrary.classList.add('page-header--hidden');
//   refs.header.classList.remove('page-header--my-library');
//   loadTrending();
// }

// function loadTrending() {
//   refs.input.value = '';
//   preloadTrendingMoviesTotalItems();
//   toggleFilter();
// }

// function loadWeekTrending() {
//   refs.input.value = '';
//   preloadWeekTrendingMoviesTotalItems();
//   toggleFilter();
// }

// function toggleNav() {
//   refs.pagination.classList.add('tui-pagination-is-hidden');

//   refs.titleHomeMenu.classList.toggle('site-nav__link--active');
//   refs.titleLibraryMenu.classList.toggle('site-nav__link--active');
//   if (refs.titleLibraryMenu.classList.contains('site-nav__link--active')) {
//     renderWatchedMovies();
//     refs.buttonWatched.classList.add('btn--primary--active');
//     refs.buttonQueue.classList.remove('btn--primary--active');
//   }

//   refs.sectionHome.classList.toggle('page-header--hidden');
//   refs.sectionSearchFilter.classList.toggle('page-header--hidden');
//   refs.sectionMyLibrary.classList.toggle('page-header--hidden');
//   refs.header.classList.toggle('page-header--my-library');
// }

// function toggleFilter() {
//   refs.buttonToday.classList.toggle('btn--primary--active');
//   refs.buttonWeek.classList.toggle('btn--primary--active');
// }
