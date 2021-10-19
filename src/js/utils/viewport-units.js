const debounce = require('lodash.debounce');

let vh = window.innerHeight * 0.01;

setVh();
window.addEventListener(
  'resize',
  debounce(() => {
    vh = window.innerHeight * 0.01;
    setVh();
  }, 250),
);

function setVh() {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
