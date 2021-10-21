// Рендеринг кинофильма по ключевому слову на главное странице
import { Notify } from 'notiflix';
import { apiService } from '../api/api-service';
import messages from '../common/messages';
import refs from '../common/refs';
import { preloadMoviesTotalItems } from './load-movies';
import { deactivateFilter } from '../components/page-header';

refs.sectionHome.addEventListener('submit', onSearch);

export function onSearch(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.firstElementChild.value.trim();

  if (!apiService.searchQuery) {
    e.currentTarget.firstElementChild.value = '';
    Notify.failure(messages.searchFailure);
    return;
  }

  preloadMoviesTotalItems('search');
  deactivateFilter();
}
