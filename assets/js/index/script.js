import {
  customDropdown,
  createFilterTab,
  sliderParallax,
  initGuestSelector,
} from "../../main/js/global.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function getTime() {
  if ($(".booking-form").length < 1) return;

  const defaultStart = moment().startOf("day");
  const defaultEnd = moment().startOf("day").add(1, "day");

  const localeConfig = {
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
      "Tháng 12",
    ],
    firstDay: 1,
  };

  function getDrops() {
    const rect = document.getElementById("startDate").getBoundingClientRect();
    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $('input[name="startDate"]').daterangepicker(
    {
      opens: "right",
      drops: getDrops(),
      autoApply: true,
      singleDatePicker: false,
      linkedCalendars: true,
      minDate: moment().startOf("day"),
      minSpan: { days: 1 },
      startDate: defaultStart,
      endDate: defaultEnd,
      locale: localeConfig,
    },
    function (start, end) {
      $('input[name="startDate"]').val(start.format("DD/MM/YYYY"));
      $('input[name="endDate"]').val(end.format("DD/MM/YYYY"));
    },
  );

  // ← Monkey-patch updateElement để picker không bao giờ tự ghi range vào input
  const picker = $('input[name="startDate"]').data("daterangepicker");
  picker.updateElement = function () {
    $('input[name="startDate"]').val(this.startDate.format("DD/MM/YYYY"));
    $('input[name="endDate"]').val(this.endDate.format("DD/MM/YYYY"));
  };

  // Set giá trị mặc định
  $('input[name="startDate"]').val(defaultStart.format("DD/MM/YYYY"));
  $('input[name="endDate"]').val(defaultEnd.format("DD/MM/YYYY"));

  // Click endDate → mở picker của startDate
  $('input[name="endDate"]').on("click", function () {
    $('input[name="startDate"]').data("daterangepicker").show();
  });

  // Re-calc drops khi focus
  $('input[name="startDate"], input[name="endDate"]').on("focus", function () {
    const picker = $('input[name="startDate"]').data("daterangepicker");
    if (picker) picker.drops = getDrops();
  });
}

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
      onLeaveBack: () => header.classList.remove("header-theme-light-active"),
    },
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
        loadPrevNext: true,
      },
      allowTouchMove: false,
      simulateTouch: false,
      mousewheel: false,
      navigation: {
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev",
      },
      on: {
        init: function () {
          let $this = this;
          $($this.slides[$this.activeIndex]);
        },
      },
    });
  });
}
function readMore() {
  const btnViewMore = document.querySelector(".intro .btn-read-more");
  if (!btnViewMore) return;

  const moreContent = document.querySelector(".intro-description-more");
  if (!moreContent) return;

  const introRight = document.querySelector(".intro-right");

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
      // introRight?.classList.add("sticky-col");
      const fullHeight = moreContent.scrollHeight;
      moreContent.style.overflow = "hidden";
      moreContent.style.transition = `height ${duration}ms ease`;
      moreContent.style.height = fullHeight + "px";

      setTimeout(() => {
        moreContent.style.height = "auto";
      }, duration);

      btnViewMore.textContent = textLess;
    } else {
      // CLOSE
      // introRight?.classList.remove("sticky-col");
      const currentHeight = moreContent.scrollHeight;
      moreContent.style.height = currentHeight + "px";
      moreContent.offsetHeight;
      moreContent.style.transition = `height ${duration}ms ease`;
      moreContent.style.height = "0";

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
        end: "top 70%",
      },
    },
  );
}
function sliderDining() {
  if (!document.querySelector(".dining-swiper")) return;

  const titleService = document.querySelectorAll(
    ".dining-list-title .dining-title",
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
      },
    },
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
        once: true,
        // markers: true,
      },
    });

    const animFrom = { y: 20, opacity: 0 };
    const animTo = {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
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
        slide.querySelectorAll(".ac-text-five"),
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
  });
}
function eventSlider() {
  if (!document.querySelector(".event-swiper")) return;

  var swiperEvent = new Swiper(".event-swiper", {
    slidesPerView: 2,
    spaceBetween: 40,
    speed: 1000,
    pagination: {
      el: ".event-right .swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".event-right .swiper-button-next",
      prevEl: ".event-right .swiper-button-prev",
    },
    on: {
      init(swiper) {
        updateFraction(swiper);
      },
      slideChange(swiper) {
        updateFraction(swiper);
      },
    },
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
          ease: "power2.out",
        });
      },
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
      onEnter: () => tl.play(),
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
          ease: "power2.out",
        });
      },
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
          stagger: 0.15, // delay nhẹ giữa các el, không bị overlap cứng
        });
      },
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
    defaults: { ease: "power2.out" },
  });

  tl.from(".header-main--popup__top .logo", {
    x: -20,
    opacity: 0,
    duration: 0.3,
    delay: 0.1,
  })
    .from(".header-main--popup > ul > li", {
      x: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.4,
    })
    .from(
      ".header-main--popup__bottom",
      {
        x: -20,
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2",
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
      btn.contains(e.target),
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
      willChange: "transform, opacity",
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
            once: true,
            // markers: true,
          },
        });

        tl.to(
          item,
          {
            y: 0,
            duration: TRANSFORM_DURATION,
            ease: "power3.out",
            force3D: true,
          },
          0,
        ).to(
          item,
          {
            opacity: 1,
            duration: OPACITY_DURATION,
            ease: "power2.out",
            clearProps: "willChange",
          },
          0,
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
        once: true,
      },
    });

    tl.to(
      items,
      {
        y: 0,
        duration: TRANSFORM_DURATION,
        stagger: ITEM_STAGGER,
        ease: "power3.out",
        force3D: true,
      },
      0,
    ).to(
      items,
      {
        opacity: 1,
        duration: OPACITY_DURATION,
        stagger: ITEM_STAGGER,
        ease: "power2.out",
        clearProps: "willChange",
      },
      0,
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
      Boolean,
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
      onEnter: () => tl.play(),
    });
  });
}
function bookAtable() {
  if (!$("#dateBookTable").length) return;
  $("#dateBookTable").daterangepicker({
    singleDatePicker: true,
    showDropdowns: true, // hiện dropdown tháng/năm
    autoApply: true, // tự động apply khi chọn ngày
    drops: "up",
    locale: {
      format: "DD/MM/YYYY", // định dạng ngày hiển thị
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
        "Tháng 12",
      ],
      firstDay: 1,
    },
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
      ".wonderfulGallery .content-text .title",
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
        },
      },
    });

    tl.to(container, {
      "--line-height": "100%",
      ease: "none",
    });

    if (textContent) {
      tl.to(
        textContent,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<13%",
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
        once: true,
      },
    });

    tl.to(image, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }).to(
      text,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.4",
    );
  });
}
function swiperThreeCol() {
  if (!$(".swiper-three-col").length) return;

  const slides = $(".swiper-three-col .swiper-slide").length;
  const perView = $(".swiper-three-col").data("per-view") || 3;
  const spaceBetween = $(".swiper-three-col").data("space-between") || 30;

  let swiper;

  function initSwiper() {
    const isMobile = window.innerWidth <= 991;

    if (isMobile) {
      if (swiper) swiper.destroy(true, true);
      swiper = null;
      document
        .querySelector(".main-swiper .swiper-nav")
        ?.classList.add("hidden");
      return;
    }

    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".swiper-three-col", {
      slidesPerView: perView,
      spaceBetween: spaceBetween,
      pagination: {
        el: ".main-swiper .swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".main-swiper .swiper-button-next",
        prevEl: ".main-swiper .swiper-button-prev",
      },
      on: {
        init(swiper) {
          updateFraction(swiper);
          setOfferDescHeight();
        },
        slideChange(swiper) {
          updateFraction(swiper);
        },
      },
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
      ...(options.on || {}),
    },
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
        prevEl: lightbox.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: lightbox.querySelector(".swiper-fraction"),
        type: "fraction",
      },
      initialSlide: startIndex,
      on: {
        init(swiper) {
          updateTitle(swiper);
        },
        slideChange(swiper) {
          if (isInitializing) return;
          updateTitle(swiper);
        },
      },
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
    ".swiper-nav-inner .swiper-slide-title",
  );
  const fractionEl = lightbox.querySelector(".swiper-fraction");
  let swiperLightbox = null;

  function updateTitle(swiper) {
    if (!titleEl) return;
    const realSlides = swiperEl.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)",
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
        prevEl: lightbox.querySelector(".swiper-button-prev"),
      },
      pagination: {
        el: fractionEl,
        type: "fraction",
      },
      on: {
        init(swiper) {
          updateTitle(swiper);
        },
        slideChange(swiper) {
          updateTitle(swiper);
        },
      },
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
          ...section.querySelectorAll(`.filter-item.${activeType}`),
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
  const defaultEnd = moment().startOf("day").add(1, "day");

  const localeConfig = {
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
      "Tháng 12",
    ],
    firstDay: 1,
  };

  function getDrops() {
    const rect = document.getElementById("arrivalDate").getBoundingClientRect();
    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $('input[name="arrivalDate"]').daterangepicker(
    {
      opens: "right",
      drops: getDrops(),
      autoApply: true,
      singleDatePicker: false,
      linkedCalendars: true,
      minDate: moment().startOf("day"),
      minSpan: { days: 1 },
      startDate: defaultStart,
      endDate: defaultEnd,
      locale: localeConfig,
    },
    function (start, end) {
      $('input[name="arrivalDate"]').val(start.format("DD/MM/YYYY"));
      $('input[name="departureDate"]').val(end.format("DD/MM/YYYY"));
    },
  );

  // ← Monkey-patch updateElement để picker không bao giờ tự ghi range vào input
  const picker = $('input[name="arrivalDate"]').data("daterangepicker");
  picker.updateElement = function () {
    $('input[name="arrivalDate"]').val(this.startDate.format("DD/MM/YYYY"));
    $('input[name="departureDate"]').val(this.endDate.format("DD/MM/YYYY"));
  };

  // Set giá trị mặc định
  $('input[name="arrivalDate"]').val(defaultStart.format("DD/MM/YYYY"));
  $('input[name="departureDate"]').val(defaultEnd.format("DD/MM/YYYY"));

  // Click endDate → mở picker của startDate
  $('input[name="departureDate"]').on("click", function () {
    $('input[name="arrivalDate"]').data("daterangepicker").show();
  });

  // Re-calc drops khi focus
  $('input[name="arrivalDate"], input[name="departureDate"]').on(
    "focus",
    function () {
      const picker = $('input[name="arrivalDate"]').data("daterangepicker");
      if (picker) picker.drops = getDrops();
    },
  );

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
        `${oversizedFile.name} exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`,
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

function filterPostionHiring() {
  if ($(".position-hiring").length < 1) return;
}

function panel() {
  document.querySelectorAll(".panels").forEach((element) => {
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
        { opacity: 0, y: 20, pointerEvents: "none" },
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
          overwrite: true,
        },
      );
    }

    function animateTextOut(panel) {
      gsap.to(panel.querySelectorAll(".panel-title, .panel-desc, .panel-btn"), {
        opacity: 0,
        y: -20,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
        overwrite: true,
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
            { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 },
          )
          .fromTo(
            panels[index + 1].querySelector("img"),
            { scale: 1.35 },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            "<",
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
          progress: (fadeOutTime + 0.25) / total,
        });
        triggerPoints.push({
          type: "in",
          panelIndex: index + 1,
          progress: (clipStartTime + 0.5) / total,
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
            { opacity: 0, y: 20, pointerEvents: "none" },
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
          h.classList.toggle("active", i === currentIndex),
        );

        lastProgress = progress;
      },
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
      ".field-item .dropdown-custom-select.required",
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

    alert("hợp lệ");
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
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
  accommodationSlider();
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
  panel();
  modalBooking();
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
