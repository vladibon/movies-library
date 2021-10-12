import URL from './settingsURL';

// Запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице
export const homeApiService = {
  PATH: 'trending/movie/day',
  // page: 1,

  async fetchArticles(page = 1) {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&page=${page}`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies.results;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};

// Запрос кинофильма по ключевому слову на главное странице
export const searchApiService = {
  PATH: 'search/movie',
  query: '',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies.results;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(newQuery) {
    this.query = newQuery;
  },
};

// Запрос о полной информации о кинофильме для страницы кинофильма
export const movieApiService = {
  PATH: `movie`,
  movieId: '5',

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}/${this.movieId}?${URL.KEY}&language=en-US`;

    const response = await fetch(url);
    return await response.json();
  },
};

// Запрос всех жанров кинофильмов
export const genresApiService = {
  PATH: `genre/movie/list`,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&language=en-US`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies.genres;
  },
};
