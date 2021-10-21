import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '8px',
  opacity: 1,
  timeout: 2000,
  fontSize: '14px',
  cssAnimationDuration: 450,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  useIcon: true,
  clickToClose: true,
  showOnlyTheLastOne: true,

  failure: {
    background: '#ff6b08',
  },
});

Notiflix.Loading.init({
  backgroundColor: 'none',
  cssAnimationDuration: 450,
  svgSize: '100px',
  svgColor: '#ff6b08',
  messageFontSize: '18px',
  messageColor: '#ff6b08',
});
