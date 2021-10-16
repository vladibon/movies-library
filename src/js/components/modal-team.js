import * as basicLightbox from 'basiclightbox';
import Splide from '@splidejs/splide';
import refs from './refs';
import team from '../db/team.json';
import teamSplideOptions from './splide-options';
import teamCardsTemplate from '../../templates/team-markup.hbs';

let teamLightbox = null;

refs.footerLink.addEventListener('click', openTeamLightbox);

function openTeamLightbox(e) {
  e.preventDefault();

  window.addEventListener('keydown', onKeydown);

  teamLightbox = basicLightbox.create(teamCardsTemplate(team), { onClose: removeListener });
  teamLightbox.show();

  const teamSplide = new Splide('.splide', teamSplideOptions);
  teamSplide.mount();
}

function onKeydown(e) {
  if (e.code !== 'Escape') return;
  teamLightbox.close();
}

function removeListener() {
  window.removeEventListener('keydown', onKeydown);
}
