import * as basicLightbox from 'basiclightbox';
import trailerTemplate from '../../templates/trailer.hbs';

export function onTrailerPlay(cb, e) {
  window.removeEventListener('keydown', cb);

  const link = localStorage.getItem('trailer_link');

  const trailerLightbox = basicLightbox.create(trailerTemplate({ trailer_link: link }), {
    onClose: onTrailerClose,
    className: 'trailer',
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
}
