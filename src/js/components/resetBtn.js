import refs from './refs';
import { preloadTrendingMoviesTotalItems } from './render-trending-movies';

refs.resetBtn.addEventListener('click', onReset);
refs.input.addEventListener('input', inputIsActive);

function onReset() {
  refs.input.value = '';
  preloadTrendingMoviesTotalItems();
  refs.resetBtn.disabled = true;
}

function inputIsActive() {
  if (refs.input.value.lenght === '') {
    refs.resetBtn.disabled = true;
  } else {
    refs.resetBtn.disabled = false;
  }
}
