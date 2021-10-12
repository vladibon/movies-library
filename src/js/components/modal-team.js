import * as basicLightbox from 'basiclightbox';
import Splide from '@splidejs/splide';

import refs from './refs';
import teamCardsTemplate from '../../templates/team-markup.hbs';
import team from '../db/team.json';

const splideOptions = {
  perPage: 3,
  breakpoints: {
    768: {
      perPage: 1,
    },
    1024: {
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

refs.footerLink.addEventListener('click', openModalTeam);

function openModalTeam(e) {
  e.preventDefault();

  basicLightbox.create(teamCardsTemplate(team)).show();
  new Splide('.splide', splideOptions).mount();
}
