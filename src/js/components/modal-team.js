import * as basicLightbox from 'basiclightbox';
import Splide from '@splidejs/splide';
import refs from './refs';
import teamCardsTemplate from '../../templates/team-markup.hbs';
import team from '../db/team.json';

let teamLightbox = null;
let teamSplide = null;
const teamSplideOptions = {
  perPage: 3,
  breakpoints: {
    767: {
      perPage: 1,
    },
    1023: {
      perPage: 2,
    },
  },
  focus: 'left',
  gap: '30px',
  speed: 700,
  // type: 'loop',
  // autoplay: true,
  // interval: 3000,
};

refs.footerLink.addEventListener('click', e => {
  e.preventDefault();
  window.addEventListener('keydown', onKeydown);

  teamLightbox = basicLightbox.create(teamCardsTemplate(team), {
    onClose: () => window.removeEventListener('keydown', onKeydown),
  });
  teamLightbox.show();

  teamSplide = new Splide('.splide', teamSplideOptions);
  teamSplide.mount();
});

function onKeydown(e) {
  console.log(e);
  if (e.code !== 'Escape') return;

  teamLightbox.close();
}
