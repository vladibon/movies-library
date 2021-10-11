import { genresApiService } from '../api/apiServicePlugin';

export default {
  CURRENT_PAGE_MOVIES: 'currentPageMovies',
  QUEUE: 'queue',
  WATCHED: 'watched',
  GENRES: 'genres',

  BASE_IMG_URL: 'http://image.tmdb.org/t/p/w300',

  saveGenresToLS() {
    genresApiService
      .fetchArticles()
      .then(data => {
        localStorage.setItem(this.GENRES, JSON.stringify(data));
      })
      .catch(err => console.log(err));
  },

  saveCurrentPage(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  getFilmData(data) {
    let movies = data.map(el => {
      let movie = {
        ...el,
        id: String(el.id),
        poster_path: `${this.BASE_IMG_URL}${el.poster_path}`,
        release_date: el.release_date.slice(0, 4),
        genres: (() => {
          const genres = JSON.parse(localStorage.getItem(this.GENRES));
          const arr = el.genre_ids.map(id => genres.find(genre => genre.id === id).name);
          if (arr.length > 3) return `${arr.slice(0, 2).join(', ')}, Other`;
          return arr.join(', ');
        })(),
        watched: false,
        queue: false,
      };

      return movie;
    });
    return movies;
  },
};
