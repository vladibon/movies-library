import refs from './refs';
import { preloadTrendingMoviesTotalItems } from './render-trending-movies';

refs.input.addEventListener('input', inputIsActive);

function inputIsActive() {
  refs.resetBtn.addEventListener('click', onReset, { once: true });
  refs.resetBtn.disabled = !refs.input.value;
}

function onReset() {
  refs.input.value = '';
  refs.resetBtn.disabled = true;
  // preloadTrendingMoviesTotalItems();
}
