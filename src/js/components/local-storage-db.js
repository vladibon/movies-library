export default {
  CURRENT_PAGE_MOVIES: 'currentPageMovies',
  QUEUE: 'queue',
  WATCHED: 'watched',

  saveCurrentPage(array) {
    localStorage.setItem(this.CURRENT_PAGE_MOVIES, JSON.stringify(array));
  },

  getFilmData(data) {
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
        watched: false,
        queue: false,
      };

      return film;
    });
    return array;
  },

  // Вовина шалость))______________________________
  // Этот url в идеале должен импортироваться из файла apiServicePlagin.js
  BASE_IMG_URL: 'http://image.tmdb.org/t/p/w300',

  // Функция для преобразования данных
  async normalizeMovies(movies) {
    // Фетч жанров
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '037ec70dbdb1dfe68ab8507aed2e070b';
    const api = {
      query_type: 'genre', // trending, search
      media_type: 'movie', // all, tv, pearson
      time_window: 'week', // day
      data_type: 'list',
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },

      createURL() {
        return `${BASE_URL}/${this.query_type}/${this.media_type}/${
          this.data_type
        }?${new URLSearchParams(this.params).toString()}`;
      },

      async fetchGenres() {
        const res = await fetch(this.createURL());
        const { genres } = await res.json();
        return genres;
      },
    };

    // Массив жанров
    const genres = await api.fetchGenres();
    //_______________________________________________

    // Ну и собственно преобразования данных
    return movies.map(mov => {
      return {
        ...mov,
        id: String(mov.id),
        poster_path: `${this.BASE_IMG_URL}${mov.poster_path}`,
        backdrop_path: `${this.BASE_IMG_URL}${mov.backdrop_path}`,
        release_date: mov.release_date.slice(0, 4),
        genres: (() => {
          const arr = mov.genre_ids.map(id => genres.find(genre => genre.id === id).name);
          if (arr.length > 3) return `${arr.slice(0, 2).join(', ')}, Other`;
          return arr.join(', ');
        })(),
        watched: false,
        queue: false,
      };
    });
  },
};
