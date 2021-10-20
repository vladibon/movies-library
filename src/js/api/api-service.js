const axios = require('axios');
import URL from './settings-url';

// Запросы на списки популярных фильмов НА СЕГОДНЯ, ЗА НЕДЕЛЮ или ПО КЛЮЧЕВОМУ СЛОВУ для создания коллекции на главной странице
export const apiService = {
  url: '',
  PATH_HOME: 'trending/movie',
  PATH_SEARCH: 'search/movie',
  params: {
    api_key: `${URL.KEY}`,
    page: 1,
  },
  params_search: {
    language: 'en-US',
    query: '',
    include_adult: false,
  },

  async fetchArticles(request) {
    if (request === 'search') {
      this.url = `${URL.BASE}/${this.PATH_SEARCH}?${new URLSearchParams(
        this.params,
      ).toString()}&${new URLSearchParams(this.params_search).toString()}`;
    } else {
      this.url = `${URL.BASE}/${this.PATH_HOME}/${request}?${new URLSearchParams(
        this.params,
      ).toString()}`;
    }

    const { data } = await axios.get(this.url);
    return data;
  },

  incrementPage() {
    this.params.page += 1;
  },

  resetPage() {
    this.params.page = 1;
  },

  get page() {
    return this.params.page;
  },

  set page(newPage) {
    this.params.page = newPage;
  },

  get searchQuery() {
    return this.params_search.query;
  },

  set searchQuery(newQuery) {
    this.params_search.query = newQuery;
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

    const { data } = await axios.get(url);
    const key = data.results[0]?.key;
    if (!key) return;
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

    const {
      data: { genres },
    } = await axios.get(url);
    return genres;
  },
};
