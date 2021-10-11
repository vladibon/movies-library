// import onSearch from '../api/movies-api';
import refs from '../components/refs.js';

refs.buttonWatched.click();

refs.menuNav.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        if (!e.target.children[0].classList.contains('site-nav__link--active')) toggleNav();
    }
    if (e.target.tagName === 'SPAN') {
        if (!e.target.classList.contains('site-nav__link--active')) toggleNav();
    }
});

function toggleNav() {
    refs.buttonHomeMenu.classList.toggle('site-nav__link--active');
    refs.buttonLibraryMenu.classList.toggle('site-nav__link--active');
    
    refs.sectionHome.classList.toggle('page-header--hidden');
    refs.sectionMyLibrary.classList.toggle('page-header--hidden');
}

