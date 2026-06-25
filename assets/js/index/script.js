import {
  dropdownRegion,
  dropdownPhoneCode,
  customDropdown,
  createFilterTab,
  sliderParallax,
  initGuestSelector,
  formNewsletter,
  getTime
} from "../../main/js/global.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function headerScroll() {
  const header = document.getElementById("header");
  const headerTop = document.querySelector(".header-top");
  if (!header) return null;

  if (!header || header.classList.contains("without-home")) return;

  if (header.classList.contains("header-theme-light-active")) return;

  gsap.to(header, {
    scrollTrigger: {
      trigger: "body",
      start: "top -10px",
      end: "+=100",
      onEnter: () => header.classList.add("header-theme-light-active"),
      onLeaveBack: () => header.classList.remove("header-theme-light-active")
    }
  });

  // return trigger;
}
function heroSection() {
  if (!document.querySelector(".hero-slider")) return;

  $(".hero-slider").each(function () {
    let $slider = $(this);

    let $dataSpeed;
    let $dataLoop = $slider.attr("data-loop");
    let $dataAutoplay = $slider.data("autoplay")
      ? { delay: $slider.data("autoplay") }
      : $slider.data("autoplay");
    if ($slider.is("[data-speed]")) {
      $dataSpeed = $slider.data("speed");
    } else {
      $dataSpeed = 900; // by default
    }

    new Swiper($slider[0], {
      direction: "vertical",
      speed: $dataSpeed,
      loop: $dataLoop,
      autoplay: $dataAutoplay,
      preloadImages: true,
      parallax: true,
      lazy: {
        loadPrevNext: true
      },
      allowTouchMove: false,
      simulateTouch: false,
      mousewheel: false,
      navigation: {
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev"
      },
      on: {
        init: function () {
          let $this = this;
          $($this.slides[$this.activeIndex]);
        }
      }
    });
  });
}
function readMore() {
  const btnViewMore = document.querySelector(".overview-detail .btn-read-more");
  if (!btnViewMore) return;

  const moreContent = document.querySelector(".overview-detail .desc-more");
  if (!moreContent) return;

  const introRight = document.querySelector(".overview-detail .content-right ");

  const textMore = btnViewMore.dataset.readMore;
  const textLess = btnViewMore.dataset.readLess;
  const duration = 300;

  btnViewMore.textContent = textMore;

  function checkScreenSize() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 768 && windowWidth <= 991) {
      moreContent.classList.add("is-open");
      moreContent.style.height = "auto";
      moreContent.style.overflow = "visible";
      btnViewMore.style.display = "none";
    } else {
      btnViewMore.style.display = "";

      if (!moreContent.classList.contains("is-open")) {
        moreContent.style.overflow = "hidden";
        moreContent.style.height = "0";
        moreContent.style.transition = `height ${duration}ms ease`;
      }
    }
  }

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  btnViewMore.addEventListener("click", function (e) {
    e.preventDefault();

    const windowWidth = window.innerWidth;
    if (windowWidth >= 768 && windowWidth <= 991) return;

    const isOpen = moreContent.classList.contains("is-open");
    btnViewMore.classList.toggle("active");

    if (!isOpen) {
      // OPEN
      moreContent.classList.add("is-open");
      introRight?.classList.add("sticky-col");
      const fullHeight = moreContent.scrollHeight;
      moreContent.style.overflow = "hidden";
      moreContent.style.transition = `height ${duration}ms ease`;
      moreContent.style.height = fullHeight + "px";

      setTimeout(() => {
        moreContent.style.height = "auto";
      }, duration);

      btnViewMore.textContent = textLess;
      btnViewMore.style.marginTop = "24px";
    } else {
      // CLOSE
      introRight?.classList.remove("sticky-col");
      const currentHeight = moreContent.scrollHeight;
      moreContent.style.height = currentHeight + "px";
      moreContent.offsetHeight;
      moreContent.style.transition = `height ${duration}ms ease`;
      moreContent.style.height = "0";
      btnViewMore.style.marginTop = "0";
      setTimeout(() => {
        moreContent.classList.remove("is-open");
      }, duration);

      btnViewMore.textContent = textMore;
    }
  });
}
function imageZoom() {
  gsap.registerPlugin(ScrollTrigger);

  const imageZoom = document.querySelector(".image-zoom img");
  if (!imageZoom) return;

  gsap.to(
    imageZoom,

    {
      scale: 1,
      duration: 0.8,
      ease: "none",
      scrollTrigger: {
        trigger: imageZoom,
        start: "top 70%",
        end: "top 70%"
      }
    }
  );
}
function sliderDining() {
  if (!document.querySelector(".dining-swiper")) return;

  const titleService = document.querySelectorAll(
    ".dining-list-title .dining-title"
  );
  let activeElms = titleService[0];

  function setActiveTitle(index) {
    if (activeElms) activeElms.classList.remove("active");
    activeElms = titleService[index];
    if (activeElms) activeElms.classList.add("active");
  }

  const swiperService = new Swiper(".dining-swiper", {
    effect: "fade",
    // slidesPerView: 1,
    // spaceBetween: 0,
    loop: true,
    speed: 1500,

    on: {
      slideChange: function () {
        setActiveTitle(this.realIndex);
      }
    }
  });

  setActiveTitle(0);

  titleService.forEach((el, index) => {
    el.addEventListener("mouseover", function () {
      swiperService.slideToLoop(index);
      setActiveTitle(index);
    });
  });

  const allSplitLines = [];
}
function animationText() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".tl-text").forEach((el) => {
    const tlTextOne = el.querySelectorAll(".tl-text-one");
    const tlTextTwo = el.querySelectorAll(".tl-text-two");
    const tlTextThree = el.querySelectorAll(".tl-text-three");
    const tlTextFour = el.querySelectorAll(".tl-text-four");
    const tlTextFive = el.querySelectorAll(".tl-text-five");
    const tlTextSix = el.querySelectorAll(".tl-text-six");

    // [tlTextOne, tlTextTwo, tlTextThree, tlTextFour, tlTextFive].forEach(
    //   (group) => {
    //     if (group.length) gsap.set(group, { y: 20, opacity: 0 });
    //   },
    // );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 65%",
        once: true
        // markers: true,
      }
    });

    const animFrom = { y: 20, opacity: 0 };
    const animTo = {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    };

    if (tlTextOne.length) tl.fromTo(tlTextOne, animFrom, animTo);
    if (tlTextTwo.length) tl.fromTo(tlTextTwo, animFrom, animTo, "-=0.4");
    if (tlTextThree.length) tl.fromTo(tlTextThree, animFrom, animTo, "-=0.4");
    if (tlTextFour.length) tl.fromTo(tlTextFour, animFrom, animTo, "-=0.4");
    if (tlTextFive.length) tl.fromTo(tlTextFive, animFrom, animTo, "-=0.4");
    if (tlTextSix.length) tl.fromTo(tlTextSix, animFrom, animTo, "-=0.4");
  });
}

function accommodationSlider() {
  if ($(".accommodations-slider").length < 1) return;

  $(".accommodations-slider").each(function () {
    const $slider = $(this);
    const nextBtn = $slider.find(".swiper-button-next")[0];
    const prevBtn = $slider.find(".swiper-button-prev")[0];
    const pagination = $slider.find(".swiper-pagination")[0];
    const sliderEl = this;

    function resetSlideText(slide) {
      const groups = [
        slide.querySelectorAll(".ac-text-one"),
        slide.querySelectorAll(".ac-text-two"),
        slide.querySelectorAll(".ac-text-three"),
        slide.querySelectorAll(".ac-text-four"),
        slide.querySelectorAll(".ac-text-five")
      ];
      groups.forEach((group) => {
        if (group.length) gsap.set(group, { y: 20, opacity: 0 });
      });
    }

    function animateSlideText(slide) {
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

    const swiper = new Swiper(this, {
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
            }
          });
        },
        slideChangeTransitionStart(swiper) {
          resetSlideText(swiper.slides[swiper.activeIndex]);
        },
        slideChangeTransitionEnd(swiper) {
          animateSlideText(swiper.slides[swiper.activeIndex]);
        }
      }
    });
  });
}
function eventSlider() {
  if (!document.querySelector(".event-swiper")) return;

  var swiperEvent = new Swiper(".event-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 1000,
    pagination: {
      el: ".event-right .swiper-pagination",
      type: "progressbar"
    },
    navigation: {
      nextEl: ".event-right .swiper-button-next",
      prevEl: ".event-right .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1025: {
        slidesPerView: 2,
        spaceBetween: 40
      }
    },
    on: {
      init(swiper) {
        updateFraction(swiper);
      },
      slideChange(swiper) {
        updateFraction(swiper);
      }
    }
  });

  function updateFraction(swiper) {
    const el = document.querySelector(".event-right .swiper-fraction");
    if (!el) return;

    const total = swiper.slides.length;
    const perView = swiper.params.slidesPerView || 1;
    const current = swiper.isEnd ? total : swiper.realIndex + perView;

    el.textContent = `${current} / ${total}`;
  }
}
function animationAccommodationCard() {
  const cards = document.querySelectorAll(".accommodationCard");
  if (!cards.length) return;

  gsap.registerPlugin(ScrollTrigger);

  cards.forEach((card) => {
    const media = card.querySelector(".card-media");
    const title = card.querySelector(".card-content .title");
    const info = card.querySelector(".card-content .info");
    const desc = card.querySelector(".card-content .desc");
    const cta = card.querySelector(".card-content .cta");

    const contentEls = [title, info, desc, cta].filter(Boolean);

    gsap.set(media, { y: 20, opacity: 0 });
    gsap.set(contentEls, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: media,
      start: "top 65%",
      once: true,
      onEnter: () => {
        gsap.to(media, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });

    const tl = gsap.timeline({ paused: true });
    const animFrom = { y: 20, opacity: 0 };
    const animTo = { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" };

    contentEls.forEach((el) => {
      tl.fromTo(el, animFrom, animTo, "-=0.4");
    });

    ScrollTrigger.create({
      trigger: card.querySelector(".card-content"),
      start: "top 65%",
      once: true,
      onEnter: () => tl.play()
    });
  });
}
function animationWeddingItem() {
  const items = document.querySelectorAll(".weddings-list__item");
  if (!items.length) return;

  gsap.registerPlugin(ScrollTrigger);

  items.forEach((item) => {
    const media = item.querySelector(".item-media");
    const title = item.querySelector(".item-content .title");
    const desc = item.querySelector(".item-content .desc");

    const contentEls = [title, desc].filter(Boolean);

    // Set trạng thái ban đầu
    gsap.set(media, { y: 30, opacity: 0 });
    gsap.set(contentEls, { y: 20, opacity: 0 });

    // Animate media
    ScrollTrigger.create({
      trigger: media,
      start: "top 65%",
      once: true,
      onEnter: () => {
        gsap.to(media, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

    // Animate content dùng stagger thay vì timeline
    ScrollTrigger.create({
      trigger: item.querySelector(".item-content"),
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(contentEls, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15 // delay nhẹ giữa các el, không bị overlap cứng
        });
      }
    });
  });
}
function header() {
  const btnHambuger = document.querySelectorAll(".header-hamburger");
  const headerMenu = document.querySelector(".header-main--popup");
  const headerOvl = document.querySelector(".header-overlay");

  if (!btnHambuger.length || !headerMenu) return;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" }
  });

  tl.from(".header-main--popup__top .logo", {
    x: -20,
    opacity: 0,
    duration: 0.3,
    delay: 0.1
  })
    .from(".header-main--popup > ul > li, .main-sub-menu  ", {
      x: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4
    })
    .from(
      ".header-main--popup__bottom",
      {
        x: -20,
        opacity: 0,
        duration: 0.3
      },
      "-=0.2"
    );

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function openMenu() {
    const scrollbarWidth = getScrollbarWidth();

    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

    headerMenu.classList.add("active");

    headerOvl.classList.add("active");

    lenis.stop();

    tl.play(0);
  }

  function closeMenu() {
    tl.reverse();

    tl.eventCallback("onReverseComplete", () => {
      headerMenu.classList.remove("active");

      document.documentElement.style.paddingRight = "";

      headerOvl.classList.remove("active");

      // mở scroll lại
      lenis.start();
    });
  }

  btnHambuger.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (headerMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  headerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    const clickedHamburger = [...btnHambuger].some((btn) =>
      btn.contains(e.target)
    );

    if (
      !clickedHamburger &&
      !headerMenu.contains(e.target) &&
      headerMenu.classList.contains("active")
    ) {
      closeMenu();
    }
  });
}

function setOfferDescHeight() {
  const items = document.querySelectorAll(".moreInfo-list__item");

  if ($("window").width() < 992 || !items.length) return;

  items.forEach((item) => {
    const desc = item.querySelector(".desc");
    if (!desc) return;

    const height = desc.offsetHeight;

    item.style.setProperty("--height-desc", `${height}px`);
  });
}

function animationItemsSection() {
  const isMobile = $(window).width() < 992;

  const MOVE_Y = 20;
  const TRANSFORM_DURATION = 0.8;
  const OPACITY_DURATION = 0.6;
  const ITEM_STAGGER = 0.2;

  gsap.utils.toArray("[section-fade-each-item]").forEach((section) => {
    const items = section.querySelectorAll("[data-fade-item]");
    const isFadeInMobile = section.hasAttribute("enabled-fade-each-mobile");

    gsap.set(items, {
      y: MOVE_Y,
      opacity: 0,
      force3D: true,
      willChange: "transform, opacity"
    });

    // ── Mobile: mỗi item tự trigger khi scroll tới ──
    if (isMobile) {
      console.log("mobile");
      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item, // trigger theo từng item
            start: "top 83%",
            toggleActions: "play none none none",
            once: true
            // markers: true,
          }
        });

        tl.to(
          item,
          {
            y: 0,
            duration: TRANSFORM_DURATION,
            ease: "power3.out",
            force3D: true
          },
          0
        ).to(
          item,
          {
            opacity: 1,
            duration: OPACITY_DURATION,
            ease: "power2.out",
            clearProps: "willChange"
          },
          0
        );
      });

      return; // bỏ qua phần desktop bên dưới
    }

    // ── Desktop: stagger toàn bộ items cùng lúc ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        toggleActions: "play none none none",
        once: true
      }
    });

    tl.to(
      items,
      {
        y: 0,
        duration: TRANSFORM_DURATION,
        stagger: ITEM_STAGGER,
        ease: "power3.out",
        force3D: true
      },
      0
    ).to(
      items,
      {
        opacity: 1,
        duration: OPACITY_DURATION,
        stagger: ITEM_STAGGER,
        ease: "power2.out",
        clearProps: "willChange"
      },
      0
    );
  });
}
function animationItemRow() {
  const rowItems = document.querySelectorAll(".list-detail-item");
  if (!rowItems.length) return;
  gsap.registerPlugin(ScrollTrigger);
  rowItems.forEach((item) => {
    const listDOne = item.querySelector(".list-detail-one");
    const listDTwo = item.querySelector(".list-detail-two");
    const listDThree = item.querySelector(".list-detail-three");
    const listDFour = item.querySelector(".list-detail-four");

    const contentEls = [listDOne, listDTwo, listDThree, listDFour].filter(
      Boolean
    );

    gsap.set(contentEls, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    const animFrom = { y: 20, opacity: 0 };
    const animTo = { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" };

    contentEls.forEach((el) => {
      tl.fromTo(el, animFrom, animTo, "-=0.4");
    });

    ScrollTrigger.create({
      trigger: item.querySelector(".list-detail-box"),
      start: "top 50%",
      once: true,
      onEnter: () => tl.play()
    });
  });
}
export function bookAtable() {
  if (!$("#dateBookTable").length) return;

  const locales = {
    en: {
      format: "DD/MM/YYYY",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      firstDay: 1
    },

    vi: {
      format: "DD/MM/YYYY",
      applyLabel: "Áp dụng",
      cancelLabel: "Huỷ",
      daysOfWeek: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ],
      firstDay: 1
    },

    ko: {
      format: "DD/MM/YYYY",
      applyLabel: "적용",
      cancelLabel: "취소",
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      firstDay: 1
    },

    ja: {
      format: "DD/MM/YYYY",
      applyLabel: "適用",
      cancelLabel: "キャンセル",
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      monthNames: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      firstDay: 1
    },

    zh: {
      format: "DD/MM/YYYY",
      applyLabel: "应用",
      cancelLabel: "取消",
      daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      firstDay: 1
    }
  };

  let currentLang = "en";
  const htmlLang = $("html").attr("lang") || "";

  if (htmlLang.startsWith("vi")) {
    currentLang = "vi";
  } else if (htmlLang.startsWith("ko")) {
    currentLang = "ko";
  } else if (htmlLang.startsWith("ja")) {
    currentLang = "ja";
  } else if (htmlLang.startsWith("zh")) {
    currentLang = "zh";
  }

  const localeConfig = locales[currentLang] || locales.en;

  function getDrops() {
    const rect = document
      .getElementById("dateBookTable")
      .getBoundingClientRect();

    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $("#dateBookTable").daterangepicker({
    singleDatePicker: true,
    showDropdowns: false,
    autoApply: true,
    minDate: moment().startOf("day"),
    startDate: moment().startOf("day"),
    opens: window.innerWidth <= 992 ? "left" : "right",
    drops: getDrops(),
    locale: localeConfig
  });

  $("#dateBookTable").on("focus", function () {
    const picker = $(this).data("daterangepicker");

    if (picker) {
      picker.drops = getDrops();
    }
  });
}
function wonderGallery() {
  const mediaItems = document.querySelectorAll(".wonderfulGallery .item-media");
  if (!mediaItems.length) return;

  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector(".wonderfulGallery-container");

  if (container) {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .wonderfulGallery-container::before {
        height: var(--line-height, 0%) !important;
      }
    `;
    document.head.appendChild(styleEl);

    const textContent = document.querySelector(
      ".wonderfulGallery .content-text .title"
    );

    if (textContent) {
      gsap.set(textContent, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 90%",
        scrub: 1,
        // markers: true,

        onLeave: (self) => {
          self.kill();

          gsap.set(container, { "--line-height": "100%" });
          if (textContent) {
            gsap.set(textContent, { opacity: 1, y: 0 });
          }
        }
      }
    });

    tl.to(container, {
      "--line-height": "100%",
      ease: "none"
    });

    if (textContent) {
      tl.to(
        textContent,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        },
        "<13%"
      );
    }
  }

  mediaItems.forEach((item) => {
    const image = item.querySelector("img");
    const text = item.querySelector(".text");

    gsap.set(image, { y: 20, opacity: 0 });
    gsap.set(text, { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        once: true
      }
    });

    tl.to(image, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }).to(
      text,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      },
      "-=0.4"
    );
  });
}
function swiperThreeCol() {
  if (!$(".swiper-three-col").length) return;
  const isMobile = window.innerWidth <= 991;
  const slides = $(".swiper-three-col .swiper-slide").length;
  const perView = isMobile ? 1 : $(".swiper-three-col").data("per-view") || 3;
  const spaceBetween = $(".swiper-three-col").data("space-between") || 30;

  let swiper;

  function initSwiper() {
    // if (isMobile) {
    //   if (swiper) swiper.destroy(true, true);
    //   swiper = null;
    //   document
    //     .querySelector(".main-swiper .swiper-nav")
    //     ?.classList.add("hidden");
    //   return;
    // }

    // if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".swiper-three-col", {
      slidesPerView: perView,
      spaceBetween: spaceBetween,
      pagination: {
        el: ".main-swiper .swiper-pagination",
        type: "progressbar",
        enabled: !isMobile
      },
      navigation: {
        nextEl: ".main-swiper .swiper-button-next",
        prevEl: ".main-swiper .swiper-button-prev"
      },
      on: {
        init(swiper) {
          updateFraction(swiper);
          setOfferDescHeight();
        },
        slideChange(swiper) {
          updateFraction(swiper);
        }
      }
    });

    if (slides <= perView) {
      document
        .querySelector(".main-swiper .swiper-nav")
        ?.classList.add("hidden");
    }
  }

  function updateFraction(swiper) {
    const el = document.querySelector(".main-swiper .swiper-fraction");
    if (!el) return;

    const total = swiper.slides.length;
    const current = swiper.isEnd ? total : swiper.realIndex + perView;

    el.textContent = `${current} / ${total}`;
  }

  initSwiper();
  window.addEventListener("resize", initSwiper);
}
// ================================
// PARALLAX SWIPER
// ================================
function initParallaxSwiper(swiperEl, options = {}) {
  const interleaveOffset = 0.8;

  return new Swiper(swiperEl, {
    slidesPerView: 1,
    loop: true,
    speed: 1500,
    watchSlidesProgress: true,
    grabCursor: true,
    roundLengths: true,
    ...options,
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const slideProgress = slide.progress || 0;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;

          if (!isNaN(innerTranslate)) {
            const image = slide.querySelector(".image");
            if (image) {
              image.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          }
        });
      },
      touchStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.style.transition = "";
        });
      },
      setTransition(swiper, speed) {
        const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach((slide) => {
          slide.style.transition = `${speed}ms ${easing}`;
          const image = slide.querySelector(".image");
          if (image) {
            image.style.transition = `${speed}ms ${easing}`;
          }
        });
      },
      ...(options.on || {})
    }
  });
}

// ================================
// GALLERY LIGHTBOX
// ================================
function galleryLightbox() {
  const lightbox = document.querySelector(".gallery-lightbox");
  if (!lightbox) return;

  const swiperEl = lightbox.querySelector(".swiper-lightbox");
  const wrapper = swiperEl.querySelector(".swiper-wrapper");
  const titleEl = lightbox.querySelector(".swiper-slide-title");

  let swiperLightbox = null;
  let rafId = null;
  let isInitializing = false;
  let isTitleAnimating = false;

  function updateTitle(swiper) {
    if (!titleEl || !swiper || isTitleAnimating) return;

    const activeSlide = swiper.slides[swiper.activeIndex];
    const title = activeSlide?.dataset.title ?? "";

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    isTitleAnimating = true;

    titleEl.style.transition = "none";
    titleEl.style.transform = "translateY(20px)";
    titleEl.style.opacity = "0";
    titleEl.textContent = title;

    rafId = requestAnimationFrame(() => {
      titleEl.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      titleEl.style.transform = "translateY(0)";
      titleEl.style.opacity = "1";
      rafId = null;

      setTimeout(() => {
        isTitleAnimating = false;
      }, 400);
    });
  }

  function destroySwiper() {
    if (swiperLightbox) {
      isInitializing = true;
      swiperLightbox.destroy(true, true);
      swiperLightbox = null;
      isInitializing = false;
    }
  }

  function buildSlides() {
    const items = document.querySelectorAll(".gallery-grid .grid-item");
    wrapper.innerHTML = "";

    items.forEach((item) => {
      const img = item.querySelector("img");
      const src = img?.getAttribute("src") || "";
      const title = item.dataset.title || "Gallery Image";

      const slide = document.createElement("div");
      slide.className = "swiper-slide overflow-hidden";
      slide.dataset.title = title;
      slide.innerHTML = `<div class="image"><img src="${src}" alt="${title}" /></div>`;
      wrapper.appendChild(slide);
    });
  }

  function initSwiper(startIndex = 0) {
    destroySwiper();

    swiperLightbox = initParallaxSwiper(swiperEl, {
      navigation: {
        nextEl: lightbox.querySelector(".swiper-button-next"),
        prevEl: lightbox.querySelector(".swiper-button-prev")
      },
      pagination: {
        el: lightbox.querySelector(".swiper-fraction"),
        type: "fraction"
      },
      initialSlide: startIndex,
      on: {
        init(swiper) {
          updateTitle(swiper);
        },
        slideChange(swiper) {
          if (isInitializing) return;
          updateTitle(swiper);
        }
      }
    });
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    destroySwiper();
    isTitleAnimating = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  document.querySelectorAll(".gallery-grid .grid-item").forEach((item) => {
    item.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);

      buildSlides();
      lightbox.classList.remove("hidden");

      setTimeout(() => {
        initSwiper(index);
      }, 50);
    });
  });

  lightbox
    .querySelector(".icon-close-lightbox")
    ?.addEventListener("click", closeLightbox);
  lightbox
    .querySelector(".lightbox-overlay")
    ?.addEventListener("click", closeLightbox);
}

function galleryTabLightbox() {
  const section = document.querySelector(".galleryTab");
  if (!section) return;

  const lightbox = document.querySelector(".gallery-lightbox");
  if (!lightbox) return;

  const swiperEl = lightbox.querySelector(".swiper-lightbox");
  const titleEl = lightbox.querySelector(
    ".swiper-nav-inner .swiper-slide-title"
  );
  const fractionEl = lightbox.querySelector(".swiper-fraction");
  let swiperLightbox = null;

  function updateTitle(swiper) {
    if (!titleEl) return;
    const realSlides = swiperEl.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );
    const title = realSlides[swiper.realIndex]?.dataset?.title || "";

    // Reset
    titleEl.style.transition = "none";
    titleEl.style.transform = "translateY(20px)";
    titleEl.style.opacity = "0";

    // Force reflow
    titleEl.offsetHeight;

    // Animate
    titleEl.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    titleEl.style.transform = "translateY(0)";
    titleEl.style.opacity = "1";
    titleEl.textContent = title;
  }

  function buildSlides(items) {
    const wrapper = swiperEl.querySelector(".swiper-wrapper");
    wrapper.innerHTML = "";

    items.forEach((item) => {
      const img = item.querySelector("img");
      const src = img?.getAttribute("src") || "";
      const title = item.dataset.title || "";

      const slide = document.createElement("div");
      slide.className = "swiper-slide overflow-hidden";
      slide.dataset.title = title;
      slide.innerHTML = `<div class="image"><img src="${src}" /></div>`;
      wrapper.appendChild(slide);
    });
  }

  function destroySwiper() {
    if (swiperLightbox) {
      swiperLightbox.destroy(true, true);
      swiperLightbox = null;
    }
  }

  function initSwiper() {
    swiperLightbox = initParallaxSwiper(swiperEl, {
      navigation: {
        nextEl: lightbox.querySelector(".swiper-button-next"),
        prevEl: lightbox.querySelector(".swiper-button-prev")
      },
      pagination: {
        el: fractionEl,
        type: "fraction"
      },
      on: {
        init(swiper) {
          updateTitle(swiper);
        },
        slideChange(swiper) {
          updateTitle(swiper);
        }
      }
    });
  }

  section.querySelectorAll(".filter-item").forEach((item) => {
    item.addEventListener("click", function () {
      const activeBtn = section.querySelector(".filter-button.active");
      const activeType = activeBtn?.dataset?.type || "all";

      let visibleItems;
      if (activeType === "all") {
        visibleItems = [...section.querySelectorAll(".filter-item")];
      } else {
        visibleItems = [
          ...section.querySelectorAll(`.filter-item.${activeType}`)
        ];
      }

      const index = visibleItems.indexOf(this);

      destroySwiper();
      buildSlides(visibleItems);

      lightbox.classList.remove("hidden");
      initSwiper();
      swiperLightbox.slideTo(index, 0);
      updateTitle(swiperLightbox);
    });
  });

  lightbox
    .querySelector(".icon-close-lightbox")
    ?.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });

  lightbox.querySelector(".lightbox-overlay")?.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });
}

function formBookingEvent() {
  if ($("#modalBookingEvents").length < 1) return;

  const defaultStart = moment().startOf("day");

  const locales = {
    en: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      firstDay: 1
    },

    vi: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "Áp dụng",
      cancelLabel: "Huỷ",
      daysOfWeek: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ],
      firstDay: 1
    },

    ko: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "적용",
      cancelLabel: "취소",
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      firstDay: 1
    },

    ja: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "適用",
      cancelLabel: "キャンセル",
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      monthNames: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      firstDay: 1
    },

    zh: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "应用",
      cancelLabel: "取消",
      daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      firstDay: 1
    }
  };

  let currentLang = "en";
  const htmlLang = $("html").attr("lang") || "";

  if (htmlLang.startsWith("vi")) {
    currentLang = "vi";
  } else if (htmlLang.startsWith("ko")) {
    currentLang = "ko";
  } else if (htmlLang.startsWith("ja")) {
    currentLang = "ja";
  } else if (htmlLang.startsWith("zh")) {
    currentLang = "zh";
  }

  const localeConfig = locales[currentLang] || locales.en;

  function getDrops() {
    const rect = document.getElementById("arrivalDate").getBoundingClientRect();
    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $('input[name="arrivalDate"]').daterangepicker(
    {
      opens: "right",
      drops: "center",
      autoApply: true,
      singleDatePicker: true,
      minDate: moment().startOf("day"),
      startDate: defaultStart,
      locale: localeConfig
    },
    function (start) {
      $('input[name="arrivalDate"]').val(start.format("DD/MM/YYYY"));
    }
  );

  // ← Monkey-patch updateElement để picker không bao giờ tự ghi range vào input
  const picker = $('input[name="arrivalDate"]').data("daterangepicker");
  picker.updateElement = function () {
    $('input[name="arrivalDate"]').val(this.startDate.format("DD/MM/YYYY"));
  };

  // Set giá trị mặc định
  $('input[name="arrivalDate"]').val(defaultStart.format("DD/MM/YYYY"));

  // Re-calc drops khi focus
  $('input[name="arrivalDate"]').on("focus", function () {
    const picker = $('input[name="arrivalDate"]').data("daterangepicker");
    if (picker) picker.drops = getDrops();
  });

  // change step
  const form = $("#modalBookingEvents form");
  const btnNextStep = form.find(".btn-next");
  const btnBackStep = form.find(".btn-back");

  let currentStep = 1;

  btnNextStep.on("click", () => activeStep(2));
  btnBackStep.on("click", () => activeStep(1));

  function activeStep(step) {
    currentStep = step;

    form.find(".step").hide();
    form.find(`.step[data-step="${step}"]`).fadeIn(200);

    $("#modalBookingEvents .step-number .current").text(step);
  }
}

function uploadFile() {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const browseBtn = document.getElementById("browseBtn");
  const fileList = document.getElementById("fileList");

  if (!uploadArea || !fileInput || !browseBtn || !fileList) return;

  const MAX_FILES = 3;
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx"];

  browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;

    const dt = new DataTransfer();

    [...files].slice(0, MAX_FILES).forEach((file) => {
      dt.items.add(file);
    });

    fileInput.files = dt.files;

    handleFiles(dt.files);
  });

  function handleFiles(files) {
    if (!files.length) {
      resetFiles();
      return;
    }

    if (files.length > MAX_FILES) {
      alert(`You can upload a maximum of ${MAX_FILES} files.`);
      resetFiles();
      return;
    }

    const invalidFile = [...files].find((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return !ALLOWED_EXTENSIONS.includes(extension);
    });

    if (invalidFile) {
      alert("Only PDF, DOC, DOCX, XLS, and XLSX files are allowed.");
      resetFiles();
      return;
    }

    const oversizedFile = [...files].find((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFile) {
      alert(
        `${oversizedFile.name} exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`
      );
      resetFiles();
      return;
    }

    showFiles(files);
  }

  function showFiles(files) {
    fileList.textContent = [...files].map((file) => file.name).join(", ");

    fileList.classList.add("hasFile");
  }

  function resetFiles() {
    fileInput.value = "";
    fileList.textContent = "";
    fileList.classList.remove("hasFile");
  }
}

function panel() {
  if (window.innerWidth < 991) return;
  document.querySelectorAll(".panels.desktop ").forEach((element) => {
    if (element.dataset.scriptInitialized) return;
    element.dataset.scriptInitialized = "true";

    gsap.registerPlugin(ScrollTrigger);

    const panels = document.querySelectorAll(".panel");
    const headings = document.querySelectorAll(".panel-heading");
    const tl = gsap.timeline();
    const panelArray = Array.from(panels);

    panelArray.forEach((item, index) => {
      item.style.zIndex = panelArray.length - index;
    });

    panels.forEach((panel) => {
      gsap.set(
        panel.querySelectorAll(".panel-title, .panel-desc, .panel-btn"),
        { opacity: 0, y: 20, pointerEvents: "none" }
      );
    });

    function animateTextIn(panel) {
      gsap.fromTo(
        panel.querySelectorAll(".panel-title, .panel-desc, .panel-btn"),
        { opacity: 0, y: 20, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true
        }
      );
    }

    function animateTextOut(panel) {
      gsap.to(panel.querySelectorAll(".panel-title, .panel-desc, .panel-btn"), {
        opacity: 0,
        y: -20,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
        overwrite: true
      });
    }

    // Build timeline với labels
    panels.forEach((panel, index) => {
      if (index < panels.length - 1) {
        tl.addLabel(`fadeOut_${index}`)
          .to({}, { duration: 0.4 })
          .addLabel(`clipStart_${index}`)
          .fromTo(
            panel.querySelector(".panel-image"),
            { clipPath: "inset(0 0 0% 0)" },
            { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 }
          )
          .fromTo(
            panels[index + 1].querySelector("img"),
            { scale: 1.35 },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            "<"
          )
          .to({}, { duration: 0.6 }, "<+=0.5");
      }
    });

    // Đọc thời gian thực từ labels
    const triggerPoints = [];
    const clipEndPoints = [];
    const total = tl.totalDuration();

    panels.forEach((panel, index) => {
      if (index < panels.length - 1) {
        const fadeOutTime = tl.labels[`fadeOut_${index}`];
        const clipStartTime = tl.labels[`clipStart_${index}`];

        triggerPoints.push({
          type: "out",
          panelIndex: index,
          progress: (fadeOutTime + 0.25) / total
        });
        triggerPoints.push({
          type: "in",
          panelIndex: index + 1,
          progress: (clipStartTime + 0.5) / total
        });
        clipEndPoints.push((clipStartTime + 1) / total);
      }
    });

    let lastProgress = 0;

    ScrollTrigger.create({
      animation: tl,
      trigger: ".panels",
      start: "top top",
      end: () => `+=${tl.totalDuration() * innerHeight}`,
      scrub: 0.6,
      pin: true,
      // markers: true,
      onEnter: () => {
        animateTextIn(panels[0]);
      },
      onLeaveBack: () => {
        panels.forEach((panel) => {
          panel.style.pointerEvents = "auto";
        });
        panels.forEach((panel) => {
          gsap.set(
            panel.querySelectorAll(".panel-title, .panel-desc, .panel-btn"),
            { opacity: 0, y: 20, pointerEvents: "none" }
          );
        });
        animateTextIn(panels[0]);
        headings.forEach((h, i) => h.classList.toggle("active", i === 0));
        lastProgress = 0;
      },
      onUpdate: ({ progress }) => {
        const forward = progress > lastProgress;

        clipEndPoints.forEach((endPoint, index) => {
          panels[index].style.pointerEvents =
            progress >= endPoint ? "none" : "auto";
        });

        triggerPoints.forEach((point) => {
          const crossed = forward
            ? lastProgress < point.progress && progress >= point.progress
            : lastProgress >= point.progress && progress < point.progress;

          if (crossed) {
            if (point.type === "in" && forward)
              animateTextIn(panels[point.panelIndex]);
            else if (point.type === "out" && forward)
              animateTextOut(panels[point.panelIndex]);
            else if (point.type === "in" && !forward)
              animateTextOut(panels[point.panelIndex]);
            else if (point.type === "out" && !forward)
              animateTextIn(panels[point.panelIndex]);
          }
        });

        let currentIndex = 0;
        triggerPoints
          .filter((p) => p.type === "in")
          .forEach((point, i) => {
            if (progress >= point.progress) currentIndex = i + 1;
          });
        headings.forEach((h, i) =>
          h.classList.toggle("active", i === currentIndex)
        );

        lastProgress = progress;
      }
    });
  });
}

function modalBooking() {
  if ($(".modal-booking").length < 1) return;

  const form = $(".modal-booking form");

  form.on("submit", function (e) {
    e.preventDefault();

    const inputRequired = form.find(".field-item input.required");
    const selectRequired = form.find(
      ".field-item .dropdown-custom-select.required"
    );

    let isValid = true;

    form.find(".field-item").removeClass("error");

    inputRequired.each(function () {
      const thisInput = $(this);

      if (thisInput.val().trim() === "") {
        thisInput.closest(".field-item").addClass("error");
        isValid = false;
      }
    });

    selectRequired.each(function () {
      const thisSelect = $(this);

      if (!thisSelect.hasClass("selected")) {
        thisSelect.closest(".field-item").addClass("error");
        isValid = false;
      }
    });

    if (!isValid) return;

    const currentForm = $(this);

    // Form recruitment
    if (currentForm.data("form") === "recruitment") {
      const submitBtn = currentForm.find(".btn-submit");
      const note = currentForm.find(".note");

      const formData = new FormData();

      formData.append("action", "submit_recruitment");
      formData.append("name", currentForm.find('[name="name"]').val());
      formData.append("phone", currentForm.find('[name="phone"]').val());
      formData.append("email", currentForm.find('[name="email"]').val());
      formData.append(
        "portfolio",
        currentForm.find('[name="portfolio"]').val()
      );

      formData.append("email_recipient", submitBtn.attr("email-recipient"));

      formData.append("current_job", submitBtn.attr("current-job"));

      const files = document.getElementById("fileInput")?.files || [];

      for (let i = 0; i < files.length; i++) {
        formData.append("attachments[]", files[i]);
      }

      $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend() {
          submitBtn.addClass("aloading");
        },

        success(response) {
          if (response.success) {
            currentForm[0].reset();

            currentForm.find(".dropdown-custom-select").removeClass("selected");

            $("#fileList").empty();

            note.fadeIn();
          }
        },

        complete() {
          submitBtn.removeClass("aloading");
        }
      });
    }

    // Form Events
    if (currentForm.data("form") === "events") {
      const submitBtn = currentForm.find("button[type='submit']");
      const note = currentForm.find(".note");

      const formData = new FormData();

      formData.append("action", "submit_event");

      formData.append(
        "event_type",
        currentForm
          .find(".dropdown-custom-select.event_type")
          .find(".dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "arrival_date",
        currentForm.find('[name="arrivalDate"]').val()
      );

      formData.append(
        "event_duration",
        currentForm
          .find(".dropdown-custom-select.event_duration")
          .find(".dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "event_requirements",
        currentForm
          .find(".dropdown-custom-select.event_requirements")
          .find(".dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "room_type",
        currentForm
          .find(".dropdown-custom-select.room_type")
          .find(".dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "number_of_guests",
        currentForm.find('[name="numberofguests"]').val()
      );

      formData.append(
        "guest_rooms_per_night",
        currentForm.find('[name="numberofguestsNight"]').val()
      );

      // Contact Information
      formData.append(
        "title",
        currentForm
          .find(".dropdown-custom-select.title-name")
          .find(".dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "first_name",
        currentForm.find('[name="firstname"]').val()
      );

      formData.append("last_name", currentForm.find('[name="lastname"]').val());

      formData.append("email", currentForm.find('[name="email"]').val());

      formData.append(
        "country",
        currentForm
          .find(".select-region .dropdown-custom-text span")
          .text()
          .trim()
      );

      formData.append("phone", currentForm.find('[name="phone"]').val());

      formData.append("message", currentForm.find('[name="message"]').val());

      formData.append("email_recipient", submitBtn.attr("email-recipient"));

      $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend() {
          submitBtn.addClass("aloading");
        },

        success(response) {
          if (response.success) {
            currentForm[0].reset();

            currentForm.find(".dropdown-custom-select").removeClass("selected");

            currentForm
              .find(".dropdown-custom-text span")
              .text("Select option");

            note.fadeIn();

            submitBtn.prop("disabled", true);
          }
        },

        complete() {
          submitBtn.removeClass("aloading");
        }
      });
    }

    // Form Weddings
    if (currentForm.data("form") === "weddings") {
      const submitBtn = currentForm.find("button[type='submit']");
      const note = currentForm.find(".note");

      const formData = new FormData();

      formData.append("action", "submit_wedding");

      // Event Information
      formData.append(
        "event_type",
        currentForm
          .find(".dropdown-custom-select.event_type .dropdown-custom-text")
          .text()
          .trim()
      );

      formData.append(
        "attendees",
        currentForm.find('[name="attendees"]').val()
      );

      formData.append("bedroom", currentForm.find('[name="bedroom"]').val());

      formData.append(
        "arrival_date",
        currentForm.find('[name="arrivalDate"]').val()
      );

      formData.append(
        "departure_date",
        currentForm.find('[name="departureDate"]').val()
      );

      formData.append(
        "date_flexible",
        currentForm.find('[name="date_flexible"]:checked').val()
      );

      formData.append(
        "meeting_space",
        currentForm.find('[name="meeting_space"]:checked').val()
      );

      // Contact Information
      formData.append(
        "first_name",
        currentForm.find('[name="firstname"]').val()
      );

      formData.append("last_name", currentForm.find('[name="lastname"]').val());

      formData.append("email", currentForm.find('[name="email"]').val());

      formData.append("phone", currentForm.find('[name="phone"]').val());

      formData.append("company", currentForm.find('[name="company"]').val());

      formData.append("message", currentForm.find('[name="message"]').val());

      formData.append("email_recipient", submitBtn.attr("email-recipient"));

      // Upload files
      const files = $("#fileInput")[0]?.files || [];

      for (let i = 0; i < files.length; i++) {
        formData.append("attachments[]", files[i]);
      }

      $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend() {
          submitBtn.addClass("aloading");
        },

        success(response) {
          if (response.success) {
            currentForm[0].reset();

            $("#fileList").empty();

            currentForm.find(".dropdown-custom-select").removeClass("selected");

            note.fadeIn();

            submitBtn.prop("disabled", true);
          }
        },

        complete() {
          submitBtn.removeClass("aloading");
        }
      });
    }

    // Form Dining
    if (currentForm.data("form") === "dining") {
      const submitBtn = currentForm.find("button[type='submit']");
      const note = currentForm.find(".note");

      const formData = new FormData();

      formData.append("action", "submit_dining");

      formData.append(
        "restaurant_id",
        currentForm
          .find(".dropdown-custom-select.restaurant .dropdown-custom-text")
          .data("dining")
      );

      formData.append(
        "first_name",
        currentForm.find('[name="firstname"]').val()
      );

      formData.append("last_name", currentForm.find('[name="lastname"]').val());

      formData.append("phone", currentForm.find('[name="phone"]').val());

      formData.append("email", currentForm.find('[name="email"]').val());

      formData.append("adult", currentForm.find('[name="adult"]').val());

      formData.append("children", currentForm.find('[name="children"]').val());

      formData.append("date", currentForm.find('[name="date"]').val());

      formData.append(
        "time",
        currentForm
          .find(
            ".field-item .dropdown-custom-select.time .dropdown-custom-text"
          )
          .text()
          .trim()
      );

      formData.append("message", currentForm.find('[name="message"]').val());

      formData.append("email_recipient", submitBtn.attr("email-recipient"));

      $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend() {
          submitBtn.addClass("aloading");
        },

        success(response) {
          if (response.success) {
            currentForm[0].reset();

            note.fadeIn();

            submitBtn.prop("disabled", true);
          } else {
            console.error(response.data?.message);
          }
        },

        error(xhr, status, error) {
          console.error(error);
        },

        complete() {
          submitBtn.removeClass("aloading");
        }
      });
    }

    // Form Contact
    if (currentForm.data("form") === "contact") {
      const submitBtn = currentForm.find("button[type='submit']");
      const note = currentForm.find(".note");

      const formData = new FormData();

      formData.append("action", "submit_contact");

      formData.append("name", currentForm.find('[name="fullname"]').val());

      formData.append("phone", currentForm.find('[name="phone"]').val());

      formData.append("email", currentForm.find('[name="email"]').val());

      formData.append("message", currentForm.find('[name="message"]').val());

      formData.append("email_recipient", submitBtn.attr("email-recipient"));

      $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend() {
          submitBtn.addClass("aloading");
        },

        success(response) {
          if (response.success) {
            currentForm[0].reset();

            note.fadeIn();

            submitBtn.prop("disabled", true);
          } else {
            console.error(response.data?.message);
          }
        },

        error(xhr, status, error) {
          console.error(error);
        },

        complete() {
          submitBtn.removeClass("aloading");
        }
      });
    }
  });
}

function initEventCheckboxValidation() {
  const form = $(
    '.modal-booking form[data-form="events"], .modal-booking form[data-form="weddings"], .modal-booking form[data-form="dining"], .modal-booking form[data-form="contact"]'
  );

  if (!form.length) return;

  const submitBtn = form.find(".btn-submit");
  const checkboxes = form.find('.field-item.checkbox input[type="checkbox"]');

  submitBtn.prop("disabled", true);

  checkboxes.on("change", function () {
    const allChecked =
      checkboxes.filter(":checked").length === checkboxes.length;

    submitBtn.prop("disabled", !allChecked);
  });
}

function swiperDestination() {
  if ($(".swiper-destination").length < 1 || window.innerWidth > 992) return;
  const swiper = new Swiper(".swiper-destination", {
    slidesPerView: 1.15,
    spaceBetween: 24,
    slidesOffsetAfter: 16
  });
}
// function createFilterTabDropdown() {
//   document.querySelectorAll(".venus-filter").forEach((section) => {
//     let result;

//     const targetSelector = section.dataset.target;
//     if (targetSelector) {
//       result = document.querySelector(targetSelector);
//     } else {
//       result = section.querySelector(".filter-section-result");
//       if (!result) {
//         result = section.nextElementSibling;
//         if (!result?.classList.contains("filter-section-result")) return;
//       }
//     }

//     if (!result) return;

//     const normalButtons = section.querySelectorAll(".filter-button[data-type]");

//     // Sửa: .dropdown-custom-select.filter-tab thay vì .dropdown-custom.filter-tab
//     const dropdownFilterTab = section.querySelector(
//       ".dropdown-custom-select.filter-tab",
//     );
//     const dropdownItems = dropdownFilterTab
//       ? dropdownFilterTab.querySelectorAll(".dropdown-custom-item[data-type]")
//       : [];

//     const allButtons = [...normalButtons, ...dropdownItems];
//     if (!allButtons.length) return;

//     const activeBtn = section.querySelector(
//       ".filter-button.active[data-type], .dropdown-custom-item.active[data-type]",
//     );
//     if (activeBtn) {
//       const activeType = activeBtn.dataset.type;
//       if (activeType !== "all") {
//         result.querySelectorAll(".filter-item").forEach((item) => {
//           item.style.display = item.classList.contains(activeType)
//             ? ""
//             : "none";
//         });
//       }

//       if (dropdownFilterTab && dropdownFilterTab.contains(activeBtn)) {
//         const displayText = dropdownFilterTab.querySelector(
//           ".dropdown-custom-text span",
//         );
//         if (displayText) {
//           displayText.textContent =
//             activeBtn.querySelector("span")?.textContent.trim() ||
//             activeBtn.textContent.trim();
//         }
//       }
//     }

//     allButtons.forEach((btn) => {
//       btn.addEventListener("click", function () {
//         allButtons.forEach((b) => b.classList.remove("active"));
//         this.classList.add("active");

//         if (dropdownFilterTab && dropdownFilterTab.contains(this)) {
//           const displayText = dropdownFilterTab.querySelector(
//             ".dropdown-custom-text span",
//           );
//           const itemSpan = this.querySelector("span");

//           if (displayText) {
//             displayText.textContent = itemSpan
//               ? itemSpan.textContent.trim()
//               : this.textContent.trim();
//           }

//           const menu = dropdownFilterTab.querySelector(".dropdown-custom-menu");
//           const dropdownBtn = dropdownFilterTab.querySelector(
//             ".dropdown-custom-btn",
//           );
//           menu?.classList.remove("dropdown--active");
//           dropdownBtn?.classList.remove("--active");
//         }

//         const type = this.dataset.type;
//         const items = result.querySelectorAll(".filter-item");

//         gsap
//           .timeline()
//           .to(result, { autoAlpha: 0, duration: 0.3 })
//           .call(() => {
//             items.forEach((item) => {
//               if (type === "all") {
//                 item.style.display = "";
//               } else {
//                 item.style.display = item.classList.contains(type)
//                   ? ""
//                   : "none";
//               }
//             });
//           })
//           .to(result, { autoAlpha: 1, duration: 0.3 });
//       });
//     });
//   });
// }
function createFilterTabDropdown() {
  document.querySelectorAll(".venus-filter").forEach((section) => {
    let result;

    const targetSelector = section.dataset.target;
    if (targetSelector) {
      result = document.querySelector(targetSelector);
    } else {
      result = section.querySelector(".filter-section-result");
      if (!result) {
        result = section.nextElementSibling;
        if (!result?.classList.contains("filter-section-result")) return;
      }
    }

    if (!result) return;

    const normalButtons = section.querySelectorAll(".filter-button[data-type]");

    const dropdownFilterTab = section.querySelector(
      ".dropdown-custom-select.filter-tab"
    );
    const dropdownItems = dropdownFilterTab
      ? dropdownFilterTab.querySelectorAll(".dropdown-custom-item[data-type]")
      : [];

    const allButtons = [...normalButtons, ...dropdownItems];
    if (!allButtons.length) return;

    // Lấy .change-value-select trong cùng venus-container
    const venusContainer = section.closest(".venus-container");
    const changeValueEl = venusContainer?.querySelector(".change-value-select");

    function updateChangeValue(type) {
      if (!changeValueEl) return;
      const unitDropdown = venusContainer.querySelector(
        ".venus-td .filter-section .dropdown-custom-select.filter-tab"
      );
      const activeUnitItem = unitDropdown?.querySelector(
        `.dropdown-custom-item[data-type="${type}"]`
      );
      // Chỉ update nếu type khớp với unit (m2/feet), không phải filter level
      const activeUnit = unitDropdown?.querySelector(
        ".dropdown-custom-item.active[data-type]"
      );
      if (activeUnit) {
        changeValueEl.innerHTML =
          activeUnit.dataset.label || activeUnit.dataset.type;
      }
    }

    const activeBtn = section.querySelector(
      ".filter-button.active[data-type], .dropdown-custom-item.active[data-type]"
    );
    if (activeBtn) {
      const activeType = activeBtn.dataset.type;
      if (activeType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.classList.contains(activeType)
            ? ""
            : "none";
        });
      }

      if (dropdownFilterTab && dropdownFilterTab.contains(activeBtn)) {
        const displayText = dropdownFilterTab.querySelector(
          ".dropdown-custom-text span"
        );
        if (displayText) {
          displayText.innerHTML =
            activeBtn.querySelector("span")?.innerHTML.trim() ||
            activeBtn.innerHTML.trim();
        }
      }
    }

    allButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        allButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        if (dropdownFilterTab && dropdownFilterTab.contains(this)) {
          const displayText = dropdownFilterTab.querySelector(
            ".dropdown-custom-text span"
          );
          const itemSpan = this.querySelector("span");

          if (displayText) {
            displayText.innerHTML = itemSpan
              ? itemSpan.innerHTML.trim()
              : this.innerHTML.trim();
          }

          const menu = dropdownFilterTab.querySelector(".dropdown-custom-menu");
          const dropdownBtn = dropdownFilterTab.querySelector(
            ".dropdown-custom-btn"
          );
          menu?.classList.remove("dropdown--active");
          dropdownBtn?.classList.remove("--active");
        }

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              if (type === "all") {
                item.style.display = "";
              } else {
                item.style.display = item.classList.contains(type)
                  ? ""
                  : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 });
      });
    });
  });
}
function createUnitFilter() {
  const unitDropdown = document.querySelector(
    ".venus-td .filter-section .dropdown-custom-select.filter-tab"
  );
  if (!unitDropdown) return;

  const items = unitDropdown.querySelectorAll(
    ".dropdown-custom-item[data-type]"
  );
  const displayText = unitDropdown.querySelector(".dropdown-custom-text span");
  const menu = unitDropdown.querySelector(".dropdown-custom-menu");
  const btn = unitDropdown.querySelector(".dropdown-custom-btn");

  function getPairs() {
    const pairs = [];
    document.querySelectorAll(".venus-filter").forEach((el) => {
      const filterSection = el.querySelector(".filter-section");
      const targetSelector = filterSection?.dataset.target;
      const result = targetSelector
        ? document.querySelector(targetSelector)
        : null;
      pairs.push({
        type: el.classList.contains("m2") ? "m2" : "feet",
        el,
        result
      });
    });
    return pairs;
  }

  function showUnit(type) {
    const pairs = getPairs();
    const allEls = pairs.flatMap((p) => [p.el, p.result].filter(Boolean));

    gsap
      .timeline()
      .to(allEls, { autoAlpha: 0, duration: 0.2 })
      .call(() => {
        pairs.forEach(({ el, result, type: pType }) => {
          const show = pType === type;
          el.style.display = show ? "" : "none";
          if (result) result.style.display = show ? "" : "none";
        });
      })
      .to(
        allEls.filter((_, i) => true),
        { autoAlpha: 1, duration: 0.2 }
      )
      .invalidate(); // đảm bảo recalc display sau khi set inline
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("dropdown--active");
    btn.classList.toggle("--active");
  });

  document.addEventListener("click", function () {
    menu.classList.remove("dropdown--active");
    btn.classList.remove("--active");
  });

  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();

      items.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const itemSpan = this.querySelector("span");
      if (displayText) {
        displayText.textContent = itemSpan
          ? itemSpan.textContent.trim()
          : this.textContent.trim();
      }

      showUnit(this.dataset.type);

      menu.classList.remove("dropdown--active");
      btn.classList.remove("--active");
    });
  });

  const activeItem =
    unitDropdown.querySelector(".dropdown-custom-item.active[data-type]") ||
    items[0];
  if (activeItem) {
    // Init không cần animate, set trực tiếp
    const pairs = getPairs();
    pairs.forEach(({ el, result, type }) => {
      const show = type === activeItem.dataset.type;
      el.style.display = show ? "" : "none";
      if (result) result.style.display = show ? "" : "none";
    });
  }
}

function createVenueFilterDropdown() {
  document
    .querySelectorAll(".filter-section[data-target]")
    .forEach((filterSection) => {
      const targetSelector = filterSection.dataset.target;
      const result = document.querySelector(targetSelector);
      if (!result) return;

      const dropdownFilterTab = filterSection.querySelector(
        ".dropdown-custom-select.filter-tab"
      );
      if (!dropdownFilterTab) return;

      const items = dropdownFilterTab.querySelectorAll(
        ".dropdown-custom-item[data-type]"
      );
      if (!items.length) return;

      const displayText = dropdownFilterTab.querySelector(
        ".dropdown-custom-text span"
      );
      const menu = dropdownFilterTab.querySelector(".dropdown-custom-menu");
      const btn = dropdownFilterTab.querySelector(".dropdown-custom-btn");

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("dropdown--active");
        btn.classList.toggle("--active");
      });

      document.addEventListener("click", function () {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      });

      const activeItem =
        dropdownFilterTab.querySelector(
          ".dropdown-custom-item.active[data-type]"
        ) || items[0];

      if (activeItem) {
        const activeType = activeItem.dataset.type;
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.classList.contains(activeType)
            ? ""
            : "none";
        });

        const itemSpan = activeItem.querySelector("span");
        if (displayText) {
          displayText.textContent = itemSpan
            ? itemSpan.textContent.trim()
            : activeItem.textContent.trim();
        }
      }

      items.forEach((item) => {
        item.addEventListener("click", function (e) {
          e.stopPropagation();

          items.forEach((i) => i.classList.remove("active"));
          this.classList.add("active");

          const itemSpan = this.querySelector("span");
          if (displayText) {
            displayText.textContent = itemSpan
              ? itemSpan.textContent.trim()
              : this.textContent.trim();
          }

          const type = this.dataset.type;
          const filterItems = result.querySelectorAll(".filter-item");

          gsap
            .timeline()
            .to(result, { autoAlpha: 0, duration: 0.3 })
            .call(() => {
              filterItems.forEach((fItem) => {
                fItem.style.display = fItem.classList.contains(type)
                  ? ""
                  : "none";
              });
            })
            .to(result, { autoAlpha: 1, duration: 0.3 });

          menu.classList.remove("dropdown--active");
          btn.classList.remove("--active");
        });
      });
    });
}

function bookingFormRedirect() {
  const form = document.getElementById("bookingHotel");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingUrl = form.action || "";
    if (!bookingUrl) return;

    const checkInRaw = document.querySelector("#startDate")?.value || "";
    const checkOutRaw = document.querySelector("#endDate")?.value || "";

    if (!checkInRaw || !checkOutRaw) return;

    const checkIn = formatDateToMMDDYYYY(checkInRaw);
    const checkOut = formatDateToMMDDYYYY(checkOutRaw);

    const adults =
      document.querySelector(".adult .val")?.textContent.trim() || 1;
    const children =
      document.querySelector(".child .val")?.textContent.trim() || 0;

    const url = new URL(bookingUrl);

    url.searchParams.set("check_in", checkIn);
    url.searchParams.set("check_out", checkOut);
    url.searchParams.set("filter_adult", adults);
    url.searchParams.set("filter_child", children);

    window.location.href = url.toString();
  });

  function formatDateToMMDDYYYY(dateStr) {
    const [day, month, year] = dateStr.split("/");

    return `${month}/${day}/${year}`;
  }
}

function filterPositionHiring() {
  const positionList = document.querySelector(".position-list");
  const fieldSelect = document.querySelector(".dropdown-select-field");
  const locationSelect = document.querySelector(".dropdown-select-location");

  if (!positionList || !fieldSelect || !locationSelect) return;

  let field = "";
  let location = "";

  const fetchJobs = () => {
    const formData = new FormData();

    formData.append("action", "filter_position_hiring");
    formData.append("field", field);
    formData.append("location", location);

    const currentPostId = positionList.dataset.currentPost || 0;

    formData.append("current_post_id", currentPostId);

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,

      beforeSend() {
        positionList.classList.add("aloading");
      },

      success(response) {
        positionList.innerHTML = response;
      },

      complete() {
        positionList.classList.remove("aloading");
      }
    });
  };

  fieldSelect.querySelectorAll(".dropdown-custom-item").forEach((item) => {
    item.addEventListener("click", () => {
      field = item.dataset.field || "";
      fetchJobs();
    });
  });

  locationSelect.querySelectorAll(".dropdown-custom-item").forEach((item) => {
    item.addEventListener("click", () => {
      location = item.dataset.location || "";
      fetchJobs();
    });
  });
}
function formBookingWeddings() {
  if ($("#modalBookingWeddings").length < 1) return;

  const defaultStart = moment().startOf("day");

  const locales = {
    en: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      firstDay: 1
    },

    vi: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "Áp dụng",
      cancelLabel: "Huỷ",
      daysOfWeek: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ],
      firstDay: 1
    },

    ko: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "적용",
      cancelLabel: "취소",
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      firstDay: 1
    },

    ja: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "適用",
      cancelLabel: "キャンセル",
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      monthNames: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      firstDay: 1
    },

    zh: {
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "应用",
      cancelLabel: "取消",
      daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      firstDay: 1
    }
  };

  let currentLang = "en";
  const htmlLang = $("html").attr("lang") || "";

  if (htmlLang.startsWith("vi")) {
    currentLang = "vi";
  } else if (htmlLang.startsWith("ko")) {
    currentLang = "ko";
  } else if (htmlLang.startsWith("ja")) {
    currentLang = "ja";
  } else if (htmlLang.startsWith("zh")) {
    currentLang = "zh";
  }

  const localeConfig = locales[currentLang] || locales.en;

  function getDrops() {
    const rect = document.getElementById("arrivalDate").getBoundingClientRect();
    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $('input[name="arrivalDate"]').daterangepicker(
    {
      opens: "right",
      drops: "center",
      autoApply: true,
      singleDatePicker: true,
      minDate: moment().startOf("day"),
      startDate: defaultStart,
      locale: localeConfig
    },
    function (start) {
      $('input[name="arrivalDate"]').val(start.format("DD/MM/YYYY"));
    }
  );

  // ← Monkey-patch updateElement để picker không bao giờ tự ghi range vào input
  const picker = $('input[name="arrivalDate"]').data("daterangepicker");
  picker.updateElement = function () {
    $('input[name="arrivalDate"]').val(this.startDate.format("DD/MM/YYYY"));
  };

  // Set giá trị mặc định
  $('input[name="arrivalDate"]').val(defaultStart.format("DD/MM/YYYY"));

  // Re-calc drops khi focus
  $('input[name="arrivalDate"]').on("focus", function () {
    const picker = $('input[name="arrivalDate"]').data("daterangepicker");
    if (picker) picker.drops = getDrops();
  });

  // change step
  const form = $("#modalBookingWeddings form");
  const btnNextStep = form.find(".btn-next");
  const btnBackStep = form.find(".btn-back");

  let currentStep = 1;

  btnNextStep.on("click", () => activeStep(2));
  btnBackStep.on("click", () => activeStep(1));

  function activeStep(step) {
    currentStep = step;

    form.find(".step").hide();
    form.find(`.step[data-step="${step}"]`).fadeIn(200);

    $("#modalBookingWeddings .step-number .current").text(step);
  }

  $("a[data-bs-target='#modalBookingWeddings']").on("click", function (e) {
    e.preventDefault();

    const dataType = $(this).data("type");

    $("#modalBookingWeddings")
      .one("shown.bs.modal", function () {
        $(
          "form[data-form='weddings'] .event_type .dropdown-custom-item[data-type='" +
            dataType +
            "']"
        ).trigger("click");
      })
      .modal("show");
  });
}
function toolbarMobile() {
  if (!$(".toolbar-mobile").length || window.innerWidth > 992) return;

  const toolbar = document.querySelector(".toolbar-mobile");
  const bookingForm = document.querySelector(".hero .booking-form");
  const iconClose = document.querySelector(".booking-form .icon-close");

  toolbar.addEventListener("click", () => {
    bookingForm.classList.toggle("active");
  });

  // Kiểm tra null trước khi gắn event
  if (iconClose) {
    iconClose.addEventListener("click", (e) => {
      e.stopPropagation();
      bookingForm.classList.remove("active");
    });
  }
}

function activeModalBooking() {
  if ($(".modal-booking").length < 1) return;

  const params = new URLSearchParams(window.location.search);

  if (params.get("openmodal") === "true") {
    new bootstrap.Modal($(".modal-booking")[0]).show();
  }
}
function createUnitSwitcher() {
  const venusContainer = document.querySelector(".venus-container");
  if (!venusContainer) return;

  const unitDropdown = venusContainer.querySelector(
    ".venus-top .dropdown-custom-select.filter-tab"
  );
  if (!unitDropdown) return;

  const unitItems = unitDropdown.querySelectorAll(
    ".dropdown-custom-item[data-type]"
  );
  const changeValueEl = venusContainer.querySelector(".change-value-select");

  // Map unit -> HTML text
  const unitLabelMap = {
    m2: "m<sup>2</sup>",
    feet: "ft<sup>2</sup>"
  };

  const getFiltersByUnit = (unit) =>
    venusContainer.querySelectorAll(`.venus-filter.${unit}`);

  // Init
  const activeUnit = unitDropdown.querySelector(
    ".dropdown-custom-item.active[data-type]"
  );
  if (activeUnit) {
    const currentUnit = activeUnit.dataset.type;

    venusContainer.querySelectorAll(".venus-filter").forEach((f) => {
      f.style.display = "none";
    });
    venusContainer.querySelectorAll(".filter-section-result").forEach((r) => {
      r.style.display = "none";
    });

    getFiltersByUnit(currentUnit).forEach((f) => {
      f.style.display = "";
      const targetSelector = f.querySelector(".filter-section[data-target]")
        ?.dataset.target;
      if (targetSelector) {
        const result = document.querySelector(targetSelector);
        if (result) result.style.display = "";
      }
    });

    if (changeValueEl) {
      changeValueEl.innerHTML = unitLabelMap[currentUnit] || currentUnit;
    }
  }

  // Click
  unitItems.forEach((item) => {
    item.addEventListener("click", function () {
      const unit = this.dataset.type;

      unitItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      const displayText = unitDropdown.querySelector(
        ".dropdown-custom-text span"
      );
      if (displayText) {
        displayText.textContent =
          this.querySelector("span")?.textContent.trim() ||
          this.textContent.trim();
      }

      const menu = unitDropdown.querySelector(".dropdown-custom-menu");
      const dropdownBtn = unitDropdown.querySelector(".dropdown-custom-btn");
      menu?.classList.remove("dropdown--active");
      dropdownBtn?.classList.remove("--active");

      // Cập nhật .change-value-select với sup
      if (changeValueEl) {
        changeValueEl.innerHTML = unitLabelMap[unit] || unit;
      }

      venusContainer.querySelectorAll(".venus-filter").forEach((f) => {
        f.style.display = "none";
      });
      venusContainer.querySelectorAll(".filter-section-result").forEach((r) => {
        r.style.display = "none";
      });

      const filtersToShow = getFiltersByUnit(unit);
      filtersToShow.forEach((f) => {
        f.style.display = "";
        const targetSelector = f.querySelector(".filter-section[data-target]")
          ?.dataset.target;
        if (targetSelector) {
          const result = document.querySelector(targetSelector);
          if (result) {
            gsap
              .timeline()
              .set(result, { display: "" })
              .fromTo(
                result,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.4 }
              );
          }
        }
      });
    });
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);

  dropdownRegion();
  customDropdown();
  createFilterTab();
  headerScroll();
  heroSection();
  sliderParallax();
  getTime();
  initGuestSelector();
  readMore();
  imageZoom();
  sliderDining();
  // accommodationSlider();
  eventSlider();
  animationText();
  animationAccommodationCard();
  header();
  setOfferDescHeight();
  animationWeddingItem();
  animationItemsSection();
  animationItemRow();
  bookAtable();
  wonderGallery();
  swiperThreeCol();
  formBookingEvent();
  galleryLightbox();
  galleryTabLightbox();
  uploadFile();

  modalBooking();
  swiperDestination();
  createFilterTabDropdown();
  createUnitFilter();
  createVenueFilterDropdown();
  bookingFormRedirect();
  filterPositionHiring();
  formBookingWeddings();
  initEventCheckboxValidation();
  toolbarMobile();
  panel();
  activeModalBooking();
  formNewsletter();
  createUnitSwitcher();
};
document.addEventListener("DOMContentLoaded", () => {
  init();
});

// event click element a
let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});
