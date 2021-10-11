// import onSearch from '../api/movies-api';
import refs from '../components/refs.js';
import svgURL from '../../images/sprite.svg';

refs.menuNav.addEventListener('click', goNavLink);

function goNavLink(e) {
    if (!e.target.classList.contains('site-nav__link--active')) {
        refs.buttonHomeMenu.classList.toggle('site-nav__link--active');
        refs.buttonLibraryMenu.classList.toggle('site-nav__link--active');

        if (e.target.dataset.nav === "home") {
           
            // onSearch();
        } else {
           
        }
    }
}

