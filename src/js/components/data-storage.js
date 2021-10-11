import { genresApiService } from '../api/apiServicePlugin';
import settingsUrl from '../api/settingsURL';

export default {
  CURRENT_PAGE_MOVIES: 'currentPageMovies',
  QUEUE: 'queue',
  WATCHED: 'watched',
  GENRES: 'genres',

  // current page seves to local storage, so we can render gallery
  saveCurrentPage(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  // watched list data handling
  saveWatched(array) {
    localStorage.setItem(this.WATCHED, JSON.stringify(array));
  },

  getWatchedProp(movieId) {
    const watchedList = localStorage.getItem(this.WATCHED);
    if (watchedList) {
      const idList = JSON.parse(watchedList).map(el => el.id);
      return idList.includes(movieId);
    }
  },

  addToWatchedList(movieId) {
    const currentPage = localStorage.getItem(this.CURRENT_PAGE_MOVIES);
    const watchedList = localStorage.getItem(this.WATCHED);
    const obj = JSON.parse(currentPage).find(el => el.id === movieId);
    const list = [];
    obj.watched = true;

    if (watchedList) {
      list.push(...JSON.parse(watchedList), obj);
    } else {
      list.push(obj);
    }
    this.saveWatched(list);
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
        watched: this.getWatchedProp(String(el.id)),
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
