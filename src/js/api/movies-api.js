import imagesApiService from './apiServicePlagin';
import imageCardTpl from '../../templates/card-markup.hbs';

const imagesContainer = document.querySelector('#js-gallery');

function onSearch() {
  imagesApiService
    .fetchArticles()
    .then(data => {
      const currentPage = getFilmData(data.results);

      createGallery(currentPage);
    })
    .catch(onFetchError);
}

function createGallery(images) {
  imagesContainer.insertAdjacentHTML('beforeend', imageCardTpl(images));
}

function onFetchError(message) {
  console.log(message);
}

onSearch();

function getFilmData(data) {
  let array = data.map(el => {
    let film = {
      id: String(el.id),
      title: el.title,
      original_title: el.original_title,
      poster_path: `http://image.tmdb.org/t/p/w300${el.poster_path}`,
      vote_average: el.vote_average,
      vote_count: el.vote_count,
      overview: el.overview,
      popularity: el.popularity,
      release_date: el.release_date.slice(0, 4),
      genres: 'action, comedy',
    };

    return film;
  });
  return array;
}
