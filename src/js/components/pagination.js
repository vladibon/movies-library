import Pagination from 'tui-pagination';
import onTrendingMoviesLoad from '../api/trending-movie-search';
// import 'tui-pagination/dist/tui-pagination.css';


// import apiServicePlagin from '../api/apiServicePlagin'


const options = {
    totalItems: 500,
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

const paginationContainer = document.getElementById('pagination');
const myPagination = new Pagination(paginationContainer, options);

myPagination.on('afterMove', function (eventData) {
    onTrendingMoviesLoad(eventData.page);
    console.log(eventData.page);
    });
    



 
