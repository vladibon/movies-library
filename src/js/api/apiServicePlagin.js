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

// Запрос кинофильма по ключевому слову на главное странице:
// ${URL.BASE}/search/movie?${URL.KEY}&language=en-US&query=${this.searchQuery}&page=1&include_adult=false

// Запрос о полной информации о кинофильме для страницы кинофильма:
// ${URL.BASE}/movie/{movie_id}?${URL.KEY}&language=en-US
