import Pagination from 'tui-pagination';
import { homeApiService, homeWeekApiService, searchApiService } from '../api/apiServicePlugin';
import { loadTrendingMovies, loadWeekTrendingMovies } from './render-trending-movies';
import { loadSearchedMovies } from './render-search-movies';
import refs from './refs';

const paginationContainer = document.getElementById('pagination');
const options = {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-num">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected tui-num">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} tui-btn tui-{{type}}-is-hidden">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} tui-btn tui-{{type}}-is-hidden">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip tui-ellip-is-hidden">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(paginationContainer, options);

const tuiIcoFirst = document.querySelector('.tui-ico-first');
const tuiIcoLast = document.querySelector('.tui-ico-last');
const tuiIcoPrev = document.querySelector('.tui-ico-prev');
const tuiIcoNext = document.querySelector('.tui-ico-next');
tuiIcoFirst.textContent = '<<';
tuiIcoLast.textContent = '>>';
tuiIcoPrev.textContent = '<';
tuiIcoNext.textContent = '>';

pagination.on('afterMove', function (eventData) {
  if (refs.pagination.dataset.pagin === 'home') {
    homeApiService.page = eventData.page;
    loadTrendingMovies();
    scrollTop();
  }

  if (refs.pagination.dataset.pagin === 'week') {
    homeWeekApiService.page = eventData.page;
    loadWeekTrendingMovies();
    scrollTop();
  }

  if (refs.pagination.dataset.pagin === 'input') {
    searchApiService.page = eventData.page;
    loadSearchedMovies();
    scrollTop();
  }
});

export function setPaginationTotalItems(total_results) {
  pagination.setTotalItems(total_results);
}

export function resetPaginationPage(mode) {
  refs.pagination.dataset.pagin = mode;
  pagination.movePageTo(1);
}

export function showPagination() {
  refs.pagination.classList.remove('tui-pagination-is-hidden');
}

export function hidePagination() {
  refs.pagination.classList.add('tui-pagination-is-hidden');
}

function scrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
