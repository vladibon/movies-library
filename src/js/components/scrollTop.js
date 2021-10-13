document.addEventListener('DOMContentLoaded', scrollTop);

function scrollTop() {
        const btn = document.querySelector('#toTop');
    window.addEventListener('scroll', function () {
        
        if (pageYOffset > 100 && window.innerWidth < 768) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}