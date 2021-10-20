// Рендеринг кинофильма по ключевому слову на главное странице
import { Notify } from 'notiflix';
import { apiService } from '../api/api-service';
import refs from './refs';
import { preloadMoviesTotalItems } from './load-movies';

refs.sectionHome.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();

  refs.buttonWeek.classList.remove('btnFilter--active');
  refs.buttonToday.classList.remove('btnFilter--active');

  apiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (!apiService.searchQuery) {
    refs.buttonToday.classList.add('btnFilter--active');
    e.currentTarget.firstElementChild.value = '';
    Notify.failure(messages.searchFailure);
    return;
  }

  preloadMoviesTotalItems('search');
}
