import refs from './refs';

refs.input.addEventListener('input', inputIsActive);

function inputIsActive() {
  refs.resetBtn.addEventListener('click', hideResetBtn, { once: true });

  if (refs.input.value.trim()) {
    refs.resetBtn.classList.remove('reset__btn--hide');
  } else {
    refs.resetBtn.classList.add('reset__btn--hide');
  }
}

export default function hideResetBtn() {
  refs.input.value = '';
  refs.resetBtn.classList.add('reset__btn--hide');
}
