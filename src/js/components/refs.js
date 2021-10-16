export default {
  galleryContainer: document.getElementById('js-gallery'),
  messageContainer: document.getElementById('message-container'),

  // Header Refs
  header: document.querySelector('.page-header'),
  menuNav: document.querySelector('.site-nav__list'),
  titleHomeMenu: document.querySelector('[data-nav="home"]'),
  titleLibraryMenu: document.querySelector('[data-nav="my library"]'),

  logo: document.querySelector('.logo'),
  buttonHomeMenu: document.querySelector('[data-link="home"]'),

  sectionHome: document.querySelector('.page-header__search'),
  sectionMyLibrary: document.querySelector('.page-header__library'),

  buttonWatched: document.querySelector('[data-action="watched"]'),
  buttonQueue: document.querySelector('[data-action="queue"]'),

  pagination: document.querySelector('[data-pagin]'),
  input: document.querySelector('.page-header__search--input'),
  resetBtn: document.querySelector('.page-header__reset--btn'),

  // btn scroll
  rootElement: document.documentElement,
  scrollBtn: document.querySelector('.btn__scroll-top'),

  // Footer
  footerLink: document.querySelector('.js-footer__link'),
};
