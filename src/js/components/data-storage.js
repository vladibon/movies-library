import { genresApiService } from '../api/apiServicePlugin';
import settingsUrl from '../api/settingsURL';

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
          source_list: this.WATCHED,
        };
      });

      return this.watchedList;
    }
  },

  getWatchedPropForMovie(movieId) {
    this.getWatchedMovies();

    if (!this.watchedList.length) {
      return false;
    }
    const idList = this.watchedList.map(el => el.id);
    return idList.includes(movieId);
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
        } else if (!el.watched) {
          this.watchedList = this.watchedList.filter(el => el.id !== obj.id);
        }
        localStorage.setItem(this.WATCHED, JSON.stringify(this.watchedList));
      }
      acc.push(el);
      return acc;
    }, []);

    this.saveCurrentMovies(list);
  },

  // QUEUE movies list data handling
  getQueueMovies() {
    const list = localStorage.getItem(this.QUEUE);
    if (list) {
      this.queueList = JSON.parse(list);
      return this.queueList.map(el => {
        return {
          ...el,
          source_list: 'queue',
        };
      });
    }
  },

  getQueuePropForMovie(movieId) {
    this.getQueueMovies();
    if (!this.queueList.length) {
      return false;
    }
    const idList = this.queueList.map(el => el.id);
    return idList.includes(movieId);
  },

  toggleQueueMovieProp(movieId) {
    this.getCurrentMovies();
    this.getQueueMovies();
    const obj = this.currentList.find(el => el.id === movieId);
    const list = this.currentList.reduce((acc, el) => {
      if (el.id === movieId) {
        el.queue = !el.queue;

        if (el.queue) {
          this.queueList.push(el);
          localStorage.setItem(this.QUEUE, JSON.stringify(this.queueList));
        } else if (!el.queue) {
          this.queueList = this.queueList.filter(el => el.id !== obj.id);
          localStorage.setItem(this.QUEUE, JSON.stringify(this.queueList));
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
        poster_path_W342: el.poster_path
          ? `${settingsUrl.W342_IMG_URL}${el.poster_path}`
          : 'https://teleport360.com.ua/wp-content/themes/Teleport/img/pic/pop.png',
        poster_path_W500: el.poster_path
          ? `${settingsUrl.W500_IMG_URL}${el.poster_path}`
          : 'https://teleport360.com.ua/wp-content/themes/Teleport/img/pic/pop.png',
        poster_path_W780: el.poster_path
          ? `${settingsUrl.W780_IMG_URL}${el.poster_path}`
          : 'https://teleport360.com.ua/wp-content/themes/Teleport/img/pic/pop.png',
        backdrop_path: el.backdrop_path
          ? `${settingsUrl.W780_IMG_URL}${el.backdrop_path}`
          : 'https://teleport360.com.ua/wp-content/themes/Teleport/img/pic/pop.png',
        release_date: el.release_date?.slice(0, 4),
        genres: (() => {
          const genres = JSON.parse(localStorage.getItem(this.GENRES));
          if (el.genre_ids.length) {
            const arr = el.genre_ids.map(id => genres.find(genre => genre.id === id).name);
            if (arr.length > 3) return `${arr.slice(0, 2).join(', ')}, Other`;
            return arr.join(', ');
          } else return 'classic';
        })(),
        watched: this.getWatchedPropForMovie(String(el.id)),
        queue: this.getQueuePropForMovie(String(el.id)),
        source_list: '',
      };

      return movie;
    });

    return movies;
  },

  saveGenresToLS() {
    if (!localStorage.getItem(this.GENRES)) {
      genresApiService
        .fetchArticles()
        .then(genres => {
          localStorage.setItem(this.GENRES, JSON.stringify(genres));
        })
        .catch(err => console.log(err));
    }
  },
};
