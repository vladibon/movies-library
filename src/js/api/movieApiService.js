// Запрос о полной информации о кинофильме для страницы кинофильма - movieApiService
import URL from './settingsURL';

export default {
  PATH: `movie/${movie_id}`,
  query: '',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&language=en-US`;

    const response = await fetch(url);
    return await response.json();
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
