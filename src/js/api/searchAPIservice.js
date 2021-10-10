// Запрос кинофильма по ключевому слову на главное странице
import URL from './settingsURL';

export default {
  PATH: 'search/movie',
  query: '',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`;

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
