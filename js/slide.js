function animateHeroText(swiper) {
    if (!swiper || !swiper.slides) return;

    // Swiper loop mode can reorder/clone slides while a finger swipe is in
    // progress, so always use the slide carrying the active class in the DOM.
    const slides = Array.from(swiper.slides);
    slides.forEach((slide) => {
        const content = slide.querySelector('.slide-content');
        if (!content) return;
        content.classList.remove('hero-reveal-left', 'hero-reveal-right', 'hero-text-visible');
    });

    const activeSlide = swiper.el.querySelector('.swiper-slide-active');
    const activeContent = activeSlide?.querySelector('.slide-content');
    if (!activeContent) return;

    activeContent.classList.add(
        activeSlide.classList.contains('slide-2') || activeSlide.classList.contains('slide-4')
            ? 'hero-reveal-right'
            : 'hero-reveal-left'
    );

    // Restart the reveal after Swiper has applied its active-slide classes.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (activeSlide.classList.contains('swiper-slide-active')) {
                activeContent.classList.add('hero-text-visible');
            }
        });
    });
}

const slider = document.querySelector(".slider-container");

if (slider && typeof Swiper === "function") {
const heroSwiper = new Swiper(".slider-container", {
    loop: true,
    slidesPerView: 1,
    allowTouchMove: true,
    touchStartPreventDefault: false,
    threshold: 8,
    longSwipesRatio: 0.35,
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
        slideChangeTransitionEnd: animateHeroText,
        slideChange: (swiper) => {
            // Covers quick pagination/navigation changes and reduced-motion
            // cases where a transition may complete immediately.
            requestAnimationFrame(() => animateHeroText(swiper));
        },
    },

});

slider.addEventListener("mouseenter", () => {
    heroSwiper.autoplay.stop();
});

slider.addEventListener("mouseleave", () => {
    heroSwiper.autoplay.start();
});
}

