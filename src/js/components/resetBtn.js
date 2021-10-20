import refs from '../common/refs';

refs.input.addEventListener('input', inputIsActive);

function inputIsActive() {
  refs.resetBtn.addEventListener('click', hideResetBtn, { once: true });

  if (refs.input.value.trim()) {
    refs.resetBtn.classList.add('reset__btn--show');
  } else {
    refs.resetBtn.classList.remove('reset__btn--show');
  }
}

export default function hideResetBtn() {
  refs.input.value = '';
  refs.resetBtn.classList.remove('reset__btn--show');
}
