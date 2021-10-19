import * as basicLightbox from 'basiclightbox';
import Splide from '@splidejs/splide';
import refs from './refs';
import { preventPageScroll, setPageScroll } from '../common/common';
import team from '../db/team.json';
import teamSplideOptions from './splide-options';
import teamCardsTemplate from '../../templates/team-markup.hbs';

refs.footerLink.addEventListener('click', e => {
  e.preventDefault();
  preventPageScroll();

  window.addEventListener('keydown', onKeydown);

  const teamLightbox = basicLightbox.create(teamCardsTemplate(team), {
    onClose: () => {
      window.removeEventListener('keydown', onKeydown);
      setPageScroll();
    },
  });
  teamLightbox.show();

  new Splide('.splide', teamSplideOptions).mount();

  function onKeydown(e) {
    if (e.code !== 'Escape') return;
    teamLightbox.close();
  }
});
