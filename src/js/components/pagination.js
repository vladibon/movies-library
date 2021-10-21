import Pagination from 'tui-pagination';
import { apiService } from '../api/api-service';
import { loadMovies } from '../pages/load-movies';
import scrollTop from './scrollTop';
import refs from '../common/refs';

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
      '<span class="tui-ico-{{type}} tui-ico-dark">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} tui-btn tui-{{type}}-is-hidden">' +
      '<span class="tui-ico-{{type}} tui-ico-dark">{{type}}</span>' +
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
  apiService.page = eventData.page;
  loadMovies(refs.pagination.dataset.pagin);
  scrollTop();
});

export function setPaginationTotalItems(total_results) {
  pagination.setTotalItems(total_results);
}

export function setPaginationMode(mode) {
  refs.pagination.dataset.pagin = mode;
}

export function resetPaginationPage() {
  pagination.movePageTo(1);
}

export function showPagination() {
  refs.pagination.classList.remove('tui-pagination-is-hidden');
}

export function hidePagination() {
  refs.pagination.classList.add('tui-pagination-is-hidden');
}
