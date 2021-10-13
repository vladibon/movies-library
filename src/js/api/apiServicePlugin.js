import URL from './settingsURL';

// Запрос на список самых популярных фильмов НА СЕГОДНЯ для создания коллекции на главной странице
export const homeApiService = {
  PATH: 'trending/movie/day',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&page=${this.page}`;

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

// Запрос на список самых популярных фильмов ЗА НЕДЕЛЮ для создания коллекции на главной странице
export const homeWeekApiService = {
  PATH: 'trending/movie/week',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&page=${this.page}`;

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

// Запрос кинофильма ПО КЛЮЧЕВОМУ СЛОВУ на главное странице
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

// Запрос ТРЕЙЛЕРА кинофильма
export const movieApiService = {
  PATH_1: `movie`,
  PATH_2: `videos`,

  async fetchArticles(id) {
    const url = `${URL.BASE}/${this.PATH_1}/${id}/${this.PATH_2}?${URL.KEY}&language=en-US`;

    const response = await fetch(url);
    const trailer = await response.json();
    const key = trailer.results[0].key;
    return URL.TRAILER + key;
  },
};

// Запрос всех ЖАНРОВ кинофильмов
export const genresApiService = {
  PATH: `genre/movie/list`,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&language=en-US`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies.genres;
  },
};
