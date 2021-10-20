import refs from '../common/refs';

refs.scrollBtn.addEventListener('click', scrollTop);

window.onscroll = e => {
  e.preventDefault();
  if (window.scrollY > 700) {
    refs.scrollBtn.classList.add('btn__show');
  } else if (window.scrollY < 700) {
    refs.scrollBtn.classList.remove('btn__show');
  }
};

export default function scrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
