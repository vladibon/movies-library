// import onSearch from '../api/movies-api';
import svgURL from '../../images/sprite.svg';

const getNavRef = document.querySelector('.site-nav__list');
const getNavHomeRef = document.querySelector('[data-nav="home"]');
const getNavLibraryRef = document.querySelector('[data-nav="my library"]');

const getSectionHeader = document.querySelector('.section-header');

getNavRef.addEventListener('click', goNavLink);

function goNavLink(e) {
    if (e.target.classList.contains('site-nav__link--active') === false) {
        getNavHomeRef.classList.toggle('site-nav__link--active');
        getNavLibraryRef.classList.toggle('site-nav__link--active');

        if (e.target.dataset.nav === "home") {
            getSectionHeader.innerHTML = `
            <div class="page-header__search">
                <input class="page-header__search--input" type="input" placeholder="Поиск фильмов" />
                <svg class="search-img" width="12" height="12">
                    <use href="${svgURL}#icon-search"></use>
                </svg>
            </div >
            `;
            // onSearch();
        } else {
            getSectionHeader.innerHTML = `
            <div class="page-header__buttons">
                <button class="btn btn--primary btn__margin js-btn" type="button" data-action="watched">WATCHED</button>
                <button class="btn btn--primary js-btn" type="button" data-action="queue">QUEUE</button>
            </div>
            `;
        }
    }
}

