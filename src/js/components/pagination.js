import { homeApiService, movieApiService, genresApiService, searchApiService } from '../api/apiServicePlugin';

import onTrendingMoviesLoad from '../api/trending-movie-search';
import Pagination from 'tui-pagination';
import refs from '../components/refs.js';
import dataStorage from './data-storage';

import imageCardTpl from '../../templates/card-markup.hbs';

const paginationContainer = document.getElementById('pagination');
const options = {
    totalItems: 10000,
    itemsPerPage: 20,
    visiblePages: 7,
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
            '</a>'
    }
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
    const tuiIcoFirst = document.querySelector('.tui-ico-first');
    const tuiIcoLast = document.querySelector('.tui-ico-last');
    const tuiIcoPrev = document.querySelector('.tui-ico-prev');
    const tuiIcoNext = document.querySelector('.tui-ico-next');
    tuiIcoFirst.textContent = '<<';
    tuiIcoLast.textContent = '>>';
    tuiIcoPrev.textContent = '<';
    tuiIcoNext.textContent = '>';

    refs.galleryContainer.innerHTML = "";
    if (refs.pagination.dataset.pagin === 'home') {
        refs.pagination.dataset.pagin = 'home';
        onTrendingMoviesLoad(eventData.page);
    }
    else {
        refs.galleryContainer.innerHTML = '';
        refs.pagination.dataset.pagin = 'input';
    
        searchApiService
            .fetchArticles(eventData.page)
            .then(({ results, total_results }) => {
            if (searchApiService.page === 1) pagination.setTotalItems(total_results);
            const currentPageMovies = dataStorage.getFilmData(results);
            dataStorage.saveCurrentMovies(currentPageMovies);
            refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(currentPageMovies));
            })  
    }
        
});

// refs.input.addEventListener('input', movePageOne);

export default function movePageOne() {
    pagination.movePageTo(1);
};