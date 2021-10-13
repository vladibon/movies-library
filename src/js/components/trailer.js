import * as basicLightbox from 'basiclightbox';
import trailerTemplate from '../../templates/trailer.hbs';

export function onTrailerPlay(e) {
  // Рендерим разметку из шаблона .hbs
  // const instance = basicLightbox.create(trailerTemplate());

  const instance = basicLightbox.create(
    `
  <div>
      <button class='modal-youtube__close-btn' type='button'>
        <svg width='30' height='30'>
          <path d='M8 8L22 22' stroke='white' stroke-width='2'></path>
          <path d='M8 22L22 8' stroke='white' stroke-width='2'></path>
        </svg>
    <div>
      <iframe src="https://www.youtube.com/embed/E1oZhEIrer4" width="560" height="315" frameborder="0"></iframe>
  </div>
  </div>
      `,
  );
  console.log(1111);
  instance.show();
}
