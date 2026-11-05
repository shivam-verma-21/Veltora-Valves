const cardSlider = document.querySelector('.wrapper');

if (cardSlider && typeof Swiper === 'function') {
const swiper = new Swiper('.wrapper', {
  loop: true,
  spaceBetween: 30,
  touchStartPreventDefault: false,
  touchAngle: 45,

  autoplay:{
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  //Responsive Breakpoints
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 3
    }
  }
});
}
