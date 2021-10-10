import team from '../../team.json';

import teamItems from '../../templates/team-markup.hbs';

const teamRef = document.querySelector('.js-team');
console.log(teamRef);

const teamMarkup = teamItems(team);
console.log(teamMarkup);

teamRef.insertAdjacentHTML('beforeend', teamMarkup);