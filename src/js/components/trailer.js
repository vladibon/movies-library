import * as basicLightbox from 'basiclightbox';
import trailerTemplate from '../../templates/trailer.hbs';
import  {movieApiService}  from '../api/apiServicePlugin';

export function onTrailerPlay(e) {
         const trailerId = e.target.getAttribute('data-id');
     movieApiService.fetchArticles(trailerId)
     .then(link => { 
    const trailerLightbox = basicLightbox.create(trailerTemplate({trailer_link:link}))
       trailerLightbox.show();
       
 const btnYouTubeClose = document.querySelector('.modal-youtube__close-btn');
      btnYouTubeClose.addEventListener('click', onTrailerModalClose);
  function onTrailerModalClose() {
  trailerLightbox.close();
       }
    //      window.addEventListener('keydown', onTrailerModalCloseEsc);
    //    function onTrailerModalCloseEsc(e) {
    // if (e.code === 'Escape') {
    //  trailerLightbox .close();
    // }
  // }
  })
       .catch()
  
  
}
 
