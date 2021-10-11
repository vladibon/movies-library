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
  currentList: [],

  // current page seves to local storage, so we can render gallery
  saveCurrentMovies(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  getCurrentMovies() {
    this.currentList = JSON.parse(localStorage.getItem(this.CURRENT_PAGE_MOVIES));
    return this.currentList;
  },

  // watched movies list data handling
  getWatchedMovies() {
    const list = localStorage.getItem(this.WATCHED);
    if (list) {
      this.watchedList = JSON.parse(list);
      return this.watchedList;
    }
  },

  getWatchedPropForMovie(movieId) {
    this.getWatchedMovies();
    if (this.watchedList.length > 0) {
      const idList = this.watchedList.map(el => el.id);
      return idList.includes(movieId);
    } else {
      return false;
    }
  },

  toggleWatchedMovieProp(movieId) {
    this.getCurrentMovies();
    this.getWatchedMovies();
    const obj = this.currentList.find(el => el.id === movieId);
    const list = this.currentList.reduce((acc, el) => {
      if (el.id === movieId) {
        el.watched = !el.watched;

        if (el.watched) {
          this.watchedList.push(el);
          localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
        } else if (!el.watched) {
          this.watchedList = this.watchedList.filter(el => el.id !== obj.id);
          localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
        }
      }
      acc.push(el);
      return acc;
    }, []);

    this.saveCurrentMovies(list);
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
