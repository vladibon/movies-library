// Запрос на список самых популярных фильмов на сегодня для создания коллекции на главной странице
import URL from './settingsURL';

export default {
  PATH: 'trending/movie/day',
  page: 1,

  async fetchArticles() {
    const url = `${URL.BASE}/${this.PATH}?${URL.KEY}&page=${this.page}`;

    const response = await fetch(url);
    return await response.json();
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
