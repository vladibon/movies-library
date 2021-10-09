import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
//import modalMovie from '../../templates/modal-movie.hbs';

refs.galleryContainer.addEventListener('click', onOpenModalMovie);
function onOpenModalMovie(e) {
  const modalMovie= e.target;
    
      const instance = basicLightbox.create(
`<div class="modal-movie">
    <button class="modal-movie__close-btn" type="button">
      <svg width="14" height="14">
        <use href=""></use>
      </svg>
    </button>
    <div class="modal-movie__poster">
      <img class="modal-movie__img" src="{{poster_path}}" alt="{{name}}" id={{id}}>
      </div>
      <div class="modal-movie__description">
      <h2 class="movie-name">{{name}} </h2>
      <table>
        <tr>
          <td class="modal-movie__history"> Vote / Votes</td>
          <td class="modal-movie__show"> <span class="vote">{{vote_average}}</span>/{{vote_count}}</td>
        </tr>
        <tr>
          <td class="modal-movie__history">Popularity</td>
          <td class="modal-movie__show">{{popularity}}</td>
        </tr>
        <tr>
          <td class="modal-movie__history">Original Title</td>
          <td class="modal-movie__show">{{original_title}}</td>
        </tr>
        <tr>
          <td class="modal-movie__history">Genre</td>
          <td class="modal-movie__show">
            <ul class="modal-genres">
              {{#each genre_ids}}
              <li class="modal-genres__item">{{this}}</li>
              {{/each}}
            </ul>
          </td>
        </tr>
      </table>
      <h3 class="overviev-title">about</h3>
      <p class="modal-movie__overview">{{overview}}</p>
      </div>
  <div class="modal-movie__btn-list">
    <button class="btn btn--secondary" type="button">add to watched</button>
    <button class="btn btn--secondary" type="button">add to queue</button>
  </div>
</div>`
        );
          instance.show();
}