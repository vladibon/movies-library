import URL from './settingsURL';

// Запрос на список самых популярных фильмов НА СЕГОДНЯ для создания коллекции на главной странице
export const homeApiService = {
  PATH: 'trending/movie/day',
  params: {
    api_key: `${URL.KEY}`,
    page: 10,
  },

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${new URLSearchParams(this.params).toString()}`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies;
  },

  incrementPage() {
    this.params.page += 1;
  },

  resetPage() {
    this.params.page = 1;
  },
};

// Запрос на список самых популярных фильмов ЗА НЕДЕЛЮ для создания коллекции на главной странице
export const homeWeekApiService = {
  PATH: 'trending/movie/week',
  params: {
    api_key: `${URL.KEY}`,
    page: 1,
  },

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${new URLSearchParams(this.params).toString()}`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies;
  },

  incrementPage() {
    this.params.page += 1;
  },

  resetPage() {
    this.params.page = 1;
  },
};

// Запрос кинофильма ПО КЛЮЧЕВОМУ СЛОВУ на главное странице
export const searchApiService = {
  PATH: 'search/movie',
  params: {
    api_key: `${URL.KEY}`,
    language: 'en-US',
    query: '',
    page: 1,
    include_adult: false,
  },

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${new URLSearchParams(this.params).toString()}`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies;
  },

  incrementPage() {
    this.params.page += 1;
  },

  resetPage() {
    this.params.page = 1;
  },

  get searchQuery() {
    return this.params.query;
  },

  set searchQuery(newQuery) {
    this.params.query = newQuery;
  },
};

// Запрос ТРЕЙЛЕРА кинофильма
export const movieApiService = {
  PATH_1: `movie`,
  PATH_2: `videos`,
  params_1: {
    api_key: `${URL.KEY}`,
    language: 'en-US',
  },
  params_2: {
    autoplay: 1,
    mute: 1,
  },

  async fetchArticles(id) {
    const url = `${URL.BASE}/${this.PATH_1}/${id}/${this.PATH_2}?${new URLSearchParams(
      this.params_1,
    ).toString()}`;

    const response = await fetch(url);
    const trailer = await response.json();
    const key = trailer.results[0].key;
    return `${URL.TRAILER}${key}?${new URLSearchParams(this.params_2).toString()}`;
  },
};

// Запрос всех ЖАНРОВ кинофильмов
export const genresApiService = {
  PATH: `genre/movie/list`,
  params: {
    api_key: `${URL.KEY}`,
    language: 'en-US',
  },

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${new URLSearchParams(this.params).toString()}`;

    const response = await fetch(url);
    const movies = await response.json();
    return movies.genres;
  },
};
