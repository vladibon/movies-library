import refs from '../components/refs';
import noResultsTpl from '../../templates/no-results.hbs';

export function onEmptyLibraryList(listName) {
  refs.galleryContainer.innerHTML = '';
  const message = noResultsTpl({ list: listName });
  refs.messageContainer.innerHTML = message;
  refs.messageContainer.classList.remove('visually-hidden');
}
