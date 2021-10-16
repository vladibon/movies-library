import * as basicLightbox from 'basiclightbox';
import trailerTemplate from '../../templates/trailer.hbs';
import { movieApiService } from '../api/apiServicePlugin';

export function onTrailerPlay(cb, e) {
  window.removeEventListener('keydown', cb);

  const trailerId = e.target.getAttribute('data-id');
  movieApiService
    .fetchArticles(trailerId)
    .then(link => {
      const trailerLightbox = basicLightbox.create(trailerTemplate({ trailer_link: link }), {
        onClose: onTrailerClose,
      });

      trailerLightbox.show();

      const btnYouTubeClose = document.querySelector('.modal-youtube__close-btn');

      btnYouTubeClose.addEventListener('click', onTrailerModalClose);
      window.addEventListener('keydown', onTrailerModalCloseEsc);

      function onTrailerModalClose() {
        trailerLightbox.close();
      }

      function onTrailerModalCloseEsc(e) {
        if (e.code === 'Escape') {
          trailerLightbox.close();
        }
      }

      function onTrailerClose(e) {
        window.addEventListener('keydown', cb);
        btnYouTubeClose.removeEventListener('click', onTrailerModalClose);
        window.removeEventListener('keydown', onTrailerModalCloseEsc);
      }
    })
    .catch();
}
