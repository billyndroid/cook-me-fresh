const carouselContainer = document.querySelector('.carousel-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 100; // Adjust based on image width
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
    updateCarousel();
});

rightArrow.addEventListener('click', () => {
    const totalImages = document.querySelectorAll('.carousel-container img').length;
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : totalImages - 1;
    updateCarousel();
});