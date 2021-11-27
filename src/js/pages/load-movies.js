import { Loading } from 'notiflix';
import messages from '../common/messages';
import { apiService } from '../api/api-service';
import dataStorage from '../components/data-storage';
import {
  setPaginationMode,
  resetPaginationPage,
  setPaginationTotalItems,
  showPagination,
  hidePagination,
} from '../components/pagination';
import {
  onEmptyLibraryList,
  createGallery,
  clearGalleryContainer,
  onFetchError,
} from '../common/common';
import { onGalleryHover } from '../components/gallery-card';

dataStorage.saveGenresToLS(() => loadMovies('day'));

export function loadMovies(request) {
  Loading.circle('Loading...');
  apiService
    .fetchArticles(request)
    .then(({ results }) => {
      const currentPageMovies = dataStorage.getFilmData(results);
      dataStorage.saveCurrentMovies(currentPageMovies);
      createGallery(currentPageMovies);
      onGalleryHover();
    })
    .catch(onFetchError)
    .finally(Loading.remove(400));
}

export function preloadMoviesTotalItems(request) {
  apiService
    .fetchArticles(request)
    .then(({ total_results }) => {
      if (!total_results) {
        hidePagination();
        clearGalleryContainer();
        onEmptyLibraryList();
        throw messages.searchFailure;
      }
      setPaginationTotalItems(total_results);
      setPaginationMode(request);
      resetPaginationPage();
      showPagination();
    })
    .catch(onFetchError);
}
