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
};
