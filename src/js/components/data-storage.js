import { genresApiService } from '../api/api-service';
import settingsUrl from '../api/settings-url';

const emptyCardPath = 'empty-card.png';

export default {
  // local storage keys names
  CURRENT_PAGE_MOVIES: 'currentPageMovies',
  WATCHED: 'watched',
  QUEUE: 'queue',
  GENRES: 'genres',

  // my transitional arrays of data from local storage
  currentList: [],
  watchedList: [],
  queueList: [],

  // current page saves to local storage, so we can render gallery
  saveCurrentMovies(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  getCurrentMovies() {
    this.currentList = JSON.parse(localStorage.getItem(this.CURRENT_PAGE_MOVIES));
    return this.currentList;
  },

  // WATCHED movies list data handling
  getWatchedMovies() {
    const list = localStorage.getItem(this.WATCHED);
    if (list) {
      this.watchedList = JSON.parse(list).map(el => {
        return {
          ...el,
          queue: this.getQueuePropForMovie(el.id),
          source_list: this.WATCHED,
        };
      });

      return this.watchedList;
    }
  },

  getWatchedPropForMovie(movieId) {
    if (!this.watchedList.length) {
      return false;
    }
    return this.watchedList.some(el => el.id === movieId);
  },

  toggleWatchedMovieProp(movie) {
    this.getWatchedMovies();

    movie.watched = !movie.watched;

    if (movie.watched) {
      this.saveToWatched(movie);
    } else if (!movie.watched) {
      this.watchedList = this.watchedList.filter(el => el.id !== movie.id);
      localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
    }
  },

  saveToWatched(movie) {
    this.getWatchedMovies();

    if (!this.watchedList.length) {
      this.watchedList = [movie];
    } else if (!this.watchedList.some(el => el.id === movie.id)) {
      this.watchedList.push(movie);
    }
    localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
  },

  // QUEUE movies list data handling
  getQueueMovies() {
    const list = localStorage.getItem(this.QUEUE);
    if (list) {
      this.queueList = JSON.parse(list).map(el => {
        return {
          ...el,
          watched: this.getWatchedPropForMovie(el.id),
          source_list: this.QUEUE,
        };
      });
      return this.queueList;
    }
  },

  getQueuePropForMovie(movieId) {
    if (!this.queueList.length) {
      return false;
    }

    return this.queueList.some(el => el.id === movieId);
  },

  toggleQueueMovieProp(movie) {
    this.getQueueMovies();

    movie.queue = !movie.queue;

    if (movie.queue) {
      this.saveToQueue(movie);
    } else if (!movie.queue) {
      this.queueList = this.queueList.filter(el => el.id !== movie.id);
      localStorage.setItem(this.QUEUE, JSON.stringify(this.queueList));
    }
  },

  saveToQueue(movie) {
    this.getQueueMovies();

    if (!this.queueList.length) {
      this.queueList = [movie];
    } else if (!this.queueList.some(el => el.id === movie.id)) {
      this.queueList.push(movie);
    }
    localStorage.setItem(this.QUEUE, JSON.stringify(this.queueList));
  },

  // general get data functions
  getFilmData(data) {
    let movies = data.map(el => {
      let movie = {
        ...el,
        id: String(el.id),
        poster_path_W342: el.poster_path
          ? `${settingsUrl.W342_IMG_URL}${el.poster_path}`
          : emptyCardPath,
        poster_path_W500: el.poster_path
          ? `${settingsUrl.W500_IMG_URL}${el.poster_path}`
          : emptyCardPath,
        poster_path_W780: el.poster_path
          ? `${settingsUrl.W780_IMG_URL}${el.poster_path}`
          : emptyCardPath,
        backdrop_path: el.backdrop_path
          ? `${settingsUrl.W780_IMG_URL}${el.backdrop_path}`
          : emptyCardPath,
        release_date: el.release_date?.slice(0, 4),
        genres: (() => {
          const genres = JSON.parse(localStorage.getItem(this.GENRES));
          if (el.genre_ids.length && genres) {
            const arr = el.genre_ids.map(id => genres.find(genre => genre.id === id).name);
            return arr.length > 3 ? `${arr.slice(0, 2).join(', ')}, Other` : arr.join(', ');
          } else return 'Other';
        })(),
        watched: (() => {
          this.getWatchedMovies();
          return this.getWatchedPropForMovie(String(el.id));
        })(),
        queue: (() => {
          this.getQueueMovies();
          return this.getQueuePropForMovie(String(el.id));
        })(),
        source_list: '',
      };

      return movie;
    });

    return movies;
  },

  saveGenresToLS(loadMovies) {
    if (localStorage.getItem(this.GENRES)) return loadMovies();

    genresApiService
      .fetchArticles()
      .then(genres => {
        localStorage.setItem(this.GENRES, JSON.stringify(genres));
      })
      .then(loadMovies)
      .catch(err => console.log(err));
  },
};
