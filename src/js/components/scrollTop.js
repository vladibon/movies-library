import refs from './refs';

refs.scrollBtn.addEventListener('click', scrollTop);

window.onscroll = (e) => {
        e.preventDefault();
        if (window.scrollY > 700) {
            refs.scrollBtn.classList.add('btn__show');
        } else if (window.scrollY < 700) {
            refs.scrollBtn.classList.remove('btn__show');
        };
    };

function scrollTop() {
        refs.rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
}