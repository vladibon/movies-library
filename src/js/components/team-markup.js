import team from '../db/team.json';
import teamCardsTemplate from '../../templates/team-markup.hbs';

const teamRef = document.querySelector('.js-team');

teamRef.insertAdjacentHTML('beforeend', teamCardsTemplate(team));
