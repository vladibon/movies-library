export default {
  galleryContainer: document.getElementById('js-gallery'),
  messageContainer: document.getElementById('message-container'),

  // Header
  header: document.querySelector('.page-header'),
  menuNav: document.querySelector('.site-nav__list'),
  titleHomeMenu: document.querySelector('[data-nav="home"]'),
  titleLibraryMenu: document.querySelector('[data-nav="my library"]'),

  logo: document.querySelector('.logo'),
  buttonHomeMenu: document.querySelector('[data-link="home"]'),

  sectionHome: document.querySelector('.page-header__search'),
  sectionSearchFilter: document.querySelector('.page-header__filter'),
  sectionMyLibrary: document.querySelector('.page-header__library'),

  buttonToday: document.querySelector('[data-action="today"]'),
  buttonWeek: document.querySelector('[data-action="week"]'),
  buttonWatched: document.querySelector('[data-action="watched"]'),
  buttonQueue: document.querySelector('[data-action="queue"]'),

  pagination: document.querySelector('[data-pagin]'),
  input: document.querySelector('.page-header__search--input'),
  resetBtn: document.querySelector('.page-header__box-btn--reset-btn'),

  // btn scroll
  scrollBtn: document.querySelector('.btn__scroll-top'),

  // Footer
  footerLink: document.querySelector('.js-footer__link'),
};
