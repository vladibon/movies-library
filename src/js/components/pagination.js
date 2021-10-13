import { homeApiService, movieApiService, genresApiService, searchApiService } from '../api/apiServicePlugin';
import onSearch from './renderSearchMovies';
import onTrendingMoviesLoad from '../api/trending-movie-search';
import Pagination from 'tui-pagination';
import refs from '../components/refs.js';
import dataStorage from './data-storage';

import imageCardTpl from '../../templates/card-markup.hbs';
// import 'tui-pagination/dist/tui-pagination.css';

const paginationContainer = document.getElementById('pagination');
const options = {
    totalItems: 20000,
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
            '<a href="#" class="tui-page-btn tui-{{type}} tui-btn">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}} tui-btn">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'
    }
};


const myPagination = new Pagination(paginationContainer, options);

const tuiIcoFirst= document.querySelector('.tui-ico-first');
const tuiIcoLast= document.querySelector('.tui-ico-last');
tuiIcoFirst.textContent = '<';
tuiIcoLast.textContent = '>';

myPagination.on('afterMove', function (eventData) {
    refs.galleryContainer.innerHTML = "";
    if (refs.pagination.dataset.pagin === '') { 
    onTrendingMoviesLoad(eventData.page);
    }
    else {
        onSrh(eventData.page);
        function onSrh(page) {
            refs.galleryContainer.innerHTML = '';
            refs.pagination.dataset.pagin = 'input';
            console.log(searchApiService.query);
  
            searchApiService
                .fetchArticles(page)
                .then(data => {
                    console.log(page);
                    const currentPageMovies = dataStorage.getFilmData(data);
                    dataStorage.saveCurrentMovies(currentPageMovies);
                    crtGal(currentPageMovies);
                })
        }

        function crtGal(data) {
            refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(data));
        }
    }
});


 
