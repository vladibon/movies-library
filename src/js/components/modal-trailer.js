import * as basicLightbox from 'basiclightbox';
import trailerTemplate from '../../templates/trailer.hbs';

// export function onTrailerPlay(cb, e) {
//   window.removeEventListener('keydown', cb);

//   const trailerId = e.target.getAttribute('data-id');
//   movieApiService
//     .fetchArticles(trailerId)
//     .then(link => {
//       const trailerLightbox = basicLightbox.create(trailerTemplate({ trailer_link: link }), {
//         onClose: onTrailerClose,
//         className: 'trailer',
//       });

//       trailerLightbox.show();

//       const btnYouTubeClose = document.querySelector('.modal-youtube__close-btn');

//       btnYouTubeClose.addEventListener('click', onTrailerModalClose);
//       window.addEventListener('keydown', onTrailerModalCloseEsc);

//       function onTrailerModalClose() {
//         trailerLightbox.close();
//       }

//       function onTrailerModalCloseEsc(e) {
//         if (e.code === 'Escape') {
//           trailerLightbox.close();
//         }
//       }

//       function onTrailerClose(e) {
//         window.addEventListener('keydown', cb);
//         btnYouTubeClose.removeEventListener('click', onTrailerModalClose);
//         window.removeEventListener('keydown', onTrailerModalCloseEsc);
//       }
//     })
//     .catch(console.log);
// }

export function onTrailerPlay(cb, e) {
  window.removeEventListener('keydown', cb);

  const link = localStorage.getItem('trailer_link');

  const trailerLightbox = basicLightbox.create(
    `<div class='modal-youtube'>
  <button class='modal-youtube__close-btn' type='button'>
    <svg width='30' height='30'>
      <use href='sprite.svg#icon-close'></use>
    </svg>
  </button>
  <div>
    <div class='modal-youtube__iframe-container'>
      <iframe
        class='modal-youtube__iframe'
        frameborder='0'
        src=${link}
        title='YouTube video player'
        allow='accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      ></iframe>
    </div>
  </div>
</div>`,
    {
      onClose: onTrailerClose,
      className: 'trailer',
    },
  );

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
