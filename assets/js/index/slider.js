// accommodation-slider.js

function initSingleSlider(sliderEl) {
  const $slider = $(sliderEl);
  const nextBtn = $slider.find(".swiper-button-next")[0];
  const prevBtn = $slider.find(".swiper-button-prev")[0];
  const pagination = $slider.find(".swiper-pagination")[0];

  function resetSlideText(slide) {
    if (!slide) return;
    const groups = [
      slide.querySelectorAll(".ac-text-one"),
      slide.querySelectorAll(".ac-text-two"),
      slide.querySelectorAll(".ac-text-three"),
      slide.querySelectorAll(".ac-text-four"),
      slide.querySelectorAll(".ac-text-five"),
    ];
    groups.forEach((group) => {
      if (group.length) gsap.set(group, { y: 20, opacity: 0 });
    });
  }

  function animateSlideText(slide) {
    if (!slide) return;
    const acTextOne = slide.querySelectorAll(".ac-text-one");
    const acTextTwo = slide.querySelectorAll(".ac-text-two");
    const acTextThree = slide.querySelectorAll(".ac-text-three");
    const acTextFour = slide.querySelectorAll(".ac-text-four");
    const acTextFive = slide.querySelectorAll(".ac-text-five");

    const animFrom = { y: 20, opacity: 0 };
    const animTo = { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" };

    const tl = gsap.timeline();
    if (acTextOne.length) tl.fromTo(acTextOne, animFrom, animTo);
    if (acTextTwo.length) tl.fromTo(acTextTwo, animFrom, animTo, "-=0.4");
    if (acTextThree.length) tl.fromTo(acTextThree, animFrom, animTo, "-=0.4");
    if (acTextFour.length) tl.fromTo(acTextFour, animFrom, animTo, "-=0.4");
    if (acTextFive.length) tl.fromTo(acTextFive, animFrom, animTo, "-=0.4");
  }

  const swiper = new Swiper(sliderEl, {
    slidesPerView: 1,
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: { crossFade: true },
    pagination: { el: pagination, type: "fraction" },
    navigation: { nextEl: nextBtn, prevEl: prevBtn },
    on: {
      init(swiper) {
        swiper.slides.forEach((slide) => resetSlideText(slide));

        ScrollTrigger.create({
          trigger: sliderEl,
          start: "top 65%",
          once: true,
          onEnter: () => {
            animateSlideText(swiper.slides[swiper.activeIndex]);
          },
        });
      },
      slideChangeTransitionStart(swiper) {
        resetSlideText(swiper.slides[swiper.activeIndex]);
      },
      slideChangeTransitionEnd(swiper) {
        animateSlideText(swiper.slides[swiper.activeIndex]);
      },
    },
  });

  sliderEl.swiperInstance = swiper;
}

export function accommodationSlider() {
  if ($(".accommodations-slider").length < 1) return;

  $(".accommodations-slider").each(function () {
    initSingleSlider(this);
  });
}

// Destroy + re-init 1 slider cụ thể (dùng khi filter làm slider visible trở lại)
export function reinitAccommodationSlider(sliderEl) {
  if (sliderEl.swiperInstance) {
    sliderEl.swiperInstance.destroy(true, true);
    sliderEl.swiperInstance = null;
  }
  initSingleSlider(sliderEl);
}
