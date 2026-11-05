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

const qualitySlider = document.querySelector('.quality-swiper');
const qualityPagination = document.querySelector('.quality-pagination');

if (qualitySlider && typeof Swiper === 'function') {
  const mobileQuality = window.matchMedia('(max-width: 600px)');
  let qualitySwiper = null;

  const syncQualitySwiper = () => {
    if (mobileQuality.matches && !qualitySwiper) {
      qualitySwiper = new Swiper(qualitySlider, {
        centeredSlides: true,
        slidesPerView: 1.08,
        spaceBetween: 12,
        speed: 650,
        loop: false,
        rewind: true,
        slidesPerGroup: 1,
        grabCursor: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        },
        pagination: {
          el: qualityPagination,
          clickable: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          enabled: true,
        },
      });
    } else if (!mobileQuality.matches && qualitySwiper) {
      qualitySwiper.destroy(true, true);
      qualitySwiper = null;
      if (qualityPagination) qualityPagination.replaceChildren();
    }
  };

  syncQualitySwiper();
  mobileQuality.addEventListener('change', syncQualitySwiper);
}
