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

// function getTime() {
//   const defaultStart = moment().startOf("day");
//   const defaultEnd = moment().startOf("day").add(1, "day");

//   // Set giá trị mặc định cho input
//   document.getElementById("startDate").value =
//     defaultStart.format("DD/MM/YYYY");
//   document.getElementById("endDate").value = defaultEnd.format("DD/MM/YYYY");

//   // Khởi tạo Lightpick
//   var picker = new Lightpick({
//     field: document.getElementById("startDate"),
//     secondField: document.getElementById("endDate"),
//     singleDate: false,
//     autoclose: true,
//     numberOfMonths: 2,
//     numberOfColumns: 2,
//     startDate: defaultStart,
//     endDate: defaultEnd,
//     minDate: moment().startOf("day"),
//     minDays: 2,
//     lang: "vi",
//     i18n: {
//       previousMonth: "Tháng trước",
//       nextMonth: "Tháng sau",
//       tooltip: {
//         one: "ngày",
//         other: "ngày",
//       },
//       button: {
//         prev: "&#8249;",
//         next: "&#8250;",
//         close: "&#10005;",
//         reset: "Xoá",
//         apply: "Áp dụng",
//       },
//     },
//     onSelect: function (start, end) {
//       if (start) {
//         document.getElementById("startDate").value = start.format("DD/MM/YYYY");
//       }
//       if (end) {
//         document.getElementById("endDate").value = end.format("DD/MM/YYYY");
//       }
//     },
//     onOpen: function () {
//       // Điều chỉnh vị trí picker (nếu cần)
//       const field = document.getElementById("startDate");
//       const rect = field.getBoundingClientRect();
//       const spaceBelow = window.innerHeight - rect.bottom;
//       const pickerEl = document.querySelector(".lightpick");

//       if (pickerEl) {
//         if (spaceBelow < 380) {
//           pickerEl.style.top =
//             rect.top + window.scrollY - pickerEl.offsetHeight - 8 + "px";
//         } else {
//           pickerEl.style.top = rect.bottom + window.scrollY + 8 + "px";
//         }
//       }
//     },
//   });

//   gsap.registerPlugin(ScrollTrigger);

//   const container = document.querySelector(".booking-form-container");
//   const selectBox = document.querySelector(".select-box");
//   if (!container || !selectBox) return;

//   ScrollTrigger.create({
//     trigger: container,
//     start: "bottom center", // bottom của container chạm center viewport
//     end: "top top", // top của container chạm top viewport

//     onEnter: () => selectBox.classList.add("is-bottom"), // scroll xuống vào vùng
//     onLeave: () => selectBox.classList.remove("is-bottom"), // scroll xuống qua vùng
//     onEnterBack: () => selectBox.classList.add("is-bottom"), // scroll lên vào vùng
//     onLeaveBack: () => selectBox.classList.remove("is-bottom"), // scroll lên khỏi vùng

//     // markers: true, // bật để debug
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   getTime();
// });
function getTime() {
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
  // titleService.forEach((el) => {
  //   const split = new SplitText(el, {
  //     type: "lines",
  //     linesClass: "line",
  //     mask: "lines",
  //   });
  //   allSplitLines.push(...split.lines);
  //   gsap.set(split.lines, { yPercent: 100 });
  // });

  // ScrollTrigger.create({
  //   trigger: ".amigo-service-wrapper",
  //   start: "top 70%",
  //   once: true,
  //   onEnter: () => {
  //     if (swiperEl) {
  //       gsap.to(swiperEl, {
  //         autoAlpha: 1,
  //         y: 0,
  //         ease: "power2.out",
  //         duration: 0.8,
  //       });
  //     }

  //     gsap.to(allSplitLines, {
  //       yPercent: 0,
  //       ease: "power3.out",
  //       duration: 0.8,
  //       stagger: 0.1,
  //       delay: 0.2,
  //     });
  //   },
  // });
}
function animationText() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".tl-text").forEach((el) => {
    const tlTextOne = el.querySelectorAll(".tl-text-one");
    const tlTextTwo = el.querySelectorAll(".tl-text-two");
    const tlTextThree = el.querySelectorAll(".tl-text-three");
    const tlTextFour = el.querySelectorAll(".tl-text-four");
    const tlTextFive = el.querySelectorAll(".tl-text-five");

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
      start: "top 65%",
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

    if (isMobile && !isFadeInMobile) return;

    gsap.set(items, {
      y: MOVE_Y,
      opacity: 0,
      force3D: true,
      willChange: "transform, opacity",
    });

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
    const boxSlider = item.querySelector(".list-detail-image");
    const listDOne = item.querySelector(".list-detail-one");
    const listDTwo = item.querySelector(".list-detail-two");
    const listDThree = item.querySelector(".list-detail-three");
    const listDFour = item.querySelector(".list-detail-four");

    const contentEls = [listDOne, listDTwo, listDThree, listDFour].filter(
      Boolean,
    );
    gsap.set(boxSlider, { y: 20, opacity: 0 });
    gsap.set(contentEls, { y: 20, opacity: 0 });
    ScrollTrigger.create({
      trigger: boxSlider,
      start: "top 60%",
      once: true,
      // markers: true,
      onEnter: () => {
        gsap.to(boxSlider, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      },
    });
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
