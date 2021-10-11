import { genresApiService } from '../api/apiServicePlugin';
import settingsUrl from '../api/settingsURL';

export default {
  // local storage keys names
  CURRENT_PAGE_MOVIES: 'currentPageMovies',
  QUEUE: 'queue',
  WATCHED: 'watched',
  GENRES: 'genres',

  // my transitional arrays of data from local storage
  watchedList: [],

  // current page seves to local storage, so we can render gallery
  saveCurrentMovies(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  // watched movies list data handling
  getWatchedMovies() {
    const list = localStorage.getItem(this.WATCHED);
    if (list) {
      this.watchedList = JSON.parse(list);
    }
  },

  getWatchedPropForMovie(movieId) {
    this.getWatchedMovies();
    if (this.watchedList.length > 0) {
      const idList = this.watchedList.map(el => el.id);
      return idList.includes(movieId);
    }
  },

  addItemToWatchedList(movieId) {
    const currentPage = localStorage.getItem(this.CURRENT_PAGE_MOVIES);
    const obj = JSON.parse(currentPage).find(el => el.id === movieId);
    obj.watched = true;

    this.getWatchedMovies();
    this.watchedList.push(obj);
    localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
  },

  removeItemFromWatchedList(movieId) {
    this.watchedList = this.watchedList.filter(el => el.id !== movieId);
    localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
  },

  // general get data functions
  getFilmData(data) {
    let movies = data.map(el => {
      let movie = {
        ...el,
        id: String(el.id),
        poster_path: `${settingsUrl.BASE_IMG_URL}${el.poster_path}`,
        release_date: el.release_date.slice(0, 4),
        genres: (() => {
          const genres = JSON.parse(localStorage.getItem(this.GENRES));
          const arr = el.genre_ids.map(id => genres.find(genre => genre.id === id).name);
          if (arr.length > 3) return `${arr.slice(0, 2).join(', ')}, Other`;
          return arr.join(', ');
        })(),
        watched: this.getWatchedPropForMovie(String(el.id)),
        queue: false,
      };

      return movie;
    });
    return movies;
  },

  saveGenresToLS() {
    genresApiService
      .fetchArticles()
      .then(data => {
        localStorage.setItem(this.GENRES, JSON.stringify(data));
      })
      .catch(err => console.log(err));
  },
};
