import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


const container = document.getElementById('pagination');
const options = {
     totalItems: 20000,
     itemsPerPage: 1000,
     visiblePages: 10,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
};
const myPagination = new Pagination(container, options);