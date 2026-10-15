function animateHeroText(swiper) {
    swiper.slides.forEach((slide) => {
        const content = slide.querySelector('.slide-content');

        if (!content) return;

        content.classList.remove('hero-reveal-left', 'hero-reveal-right', 'hero-text-visible');
        content.classList.add(
            slide.classList.contains('slide-2') || slide.classList.contains('slide-4')
                ? 'hero-reveal-right'
                : 'hero-reveal-left'
        );
    });

    const activeContent = swiper.slides[swiper.activeIndex]?.querySelector('.slide-content');
    activeContent?.classList.add('hero-text-visible');
}

const heroSwiper = new Swiper(".slider-container", {
    loop: true,
    slidesPerView: 1,
    allowTouchMove: true,
    grabCursor: true,
    loopAdditionalSlides: 1,
    effect: "fade",
    speed: 500,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        waitForTransition: false,
    },

    // pagination
    pagination: {
        el: '.hero-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.hero-button-next',
        prevEl: '.hero-button-prev',
    },
    fadeEffect: {
        crossFade: true,
    },
    on: {
        init: animateHeroText,
        slideChangeTransitionStart: animateHeroText,
    },

});

const slider = document.querySelector(".slider-container");

slider.addEventListener("mouseenter", () => {
    heroSwiper.autoplay.stop();
});

slider.addEventListener("mouseleave", () => {
    heroSwiper.autoplay.start();
});

