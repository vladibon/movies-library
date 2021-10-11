// import onSearch from '../api/movies-api';
import refs from '../components/refs.js';

refs.menuNav.addEventListener('click', goNavLink);

function goNavLink(e) {
    console.log(e.target.classList);
    if (!e.target.classList.contains('site-nav__link--active') || !e.target.classList.contains('site-nav__link--active')) {
        refs.buttonHomeMenu.classList.toggle('site-nav__link--active');
        refs.buttonLibraryMenu.classList.toggle('site-nav__link--active');

        refs.sectionHome.classList.toggle('page-header--hidden');
        refs.sectionMyLibrary.classList.toggle('page-header--hidden');
    }
}

