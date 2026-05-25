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
  const defaultStart = moment().startOf("day");
  const defaultEnd = moment().startOf("day").add(1, "day");

  // Set giá trị mặc định cho input
  document.getElementById("startDate").value =
    defaultStart.format("DD/MM/YYYY");
  document.getElementById("endDate").value = defaultEnd.format("DD/MM/YYYY");

  // Khởi tạo Lightpick
  var picker = new Lightpick({
    field: document.getElementById("startDate"),
    secondField: document.getElementById("endDate"),
    singleDate: false,
    autoclose: true,
    numberOfMonths: 2,
    numberOfColumns: 2,
    startDate: defaultStart,
    endDate: defaultEnd,
    minDate: moment().startOf("day"),
    minDays: 2,
    lang: "vi",
    i18n: {
      previousMonth: "Tháng trước",
      nextMonth: "Tháng sau",
      tooltip: {
        one: "ngày",
        other: "ngày",
      },
      button: {
        prev: "&#8249;",
        next: "&#8250;",
        close: "&#10005;",
        reset: "Xoá",
        apply: "Áp dụng",
      },
    },
    onSelect: function (start, end) {
      if (start) {
        document.getElementById("startDate").value = start.format("DD/MM/YYYY");
      }
      if (end) {
        document.getElementById("endDate").value = end.format("DD/MM/YYYY");
      }
    },
    onOpen: function () {
      // Điều chỉnh vị trí picker (nếu cần)
      const field = document.getElementById("startDate");
      const rect = field.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const pickerEl = document.querySelector(".lightpick");

      if (pickerEl) {
        if (spaceBelow < 380) {
          pickerEl.style.top =
            rect.top + window.scrollY - pickerEl.offsetHeight - 8 + "px";
        } else {
          pickerEl.style.top = rect.bottom + window.scrollY + 8 + "px";
        }
      }
    },
  });

  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector(".booking-form-container");
  const selectBox = document.querySelector(".select-box");
  if (!container || !selectBox) return;

  ScrollTrigger.create({
    trigger: container,
    start: "bottom center", // bottom của container chạm center viewport
    end: "top top", // top của container chạm top viewport

    onEnter: () => selectBox.classList.add("is-bottom"), // scroll xuống vào vùng
    onLeave: () => selectBox.classList.remove("is-bottom"), // scroll xuống qua vùng
    onEnterBack: () => selectBox.classList.add("is-bottom"), // scroll lên vào vùng
    onLeaveBack: () => selectBox.classList.remove("is-bottom"), // scroll lên khỏi vùng

    // markers: true, // bật để debug
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   getTime();
// });
// function getTime() {
//   if (!$("#search_checkin, #search_checkout").length) return;

//   const defaultStart = moment().startOf("day");
//   const defaultEnd = moment().startOf("day").add(1, "day");

//   $("#search_checkin, #search_checkout").daterangepicker(
//     {
//       locale: {
//         format: "DD-MM-YYYY",
//         applyLabel: "Áp dụng",
//         cancelLabel: "Huỷ",
//       },
//       alwaysShowCalendars: true,
//       minDate: moment().startOf("day"),
//       maxDate: moment().add("months", 1),
//       autoApply: true,
//       autoUpdateInput: false,

//       // Thêm các config mặc định quan trọng
//       startDate: defaultStart,
//       endDate: defaultEnd,
//       linkedCalendars: false, // Khuyến nghị tắt để tránh highlight ngày 31 cả 2 bên
//       drops: "down",
//       opens: "right",
//     },
//     function (start, end, label) {
//       const selectedStartDate = start.format("DD-MM-YYYY");
//       const selectedEndDate = end.format("DD-MM-YYYY");

//       $("#search_checkin").val(selectedStartDate);
//       $("#search_checkout").val(selectedEndDate);

//       // Đồng bộ lại cả 2 picker
//       const checkInPicker = $("#search_checkin").data("daterangepicker");
//       const checkOutPicker = $("#search_checkout").data("daterangepicker");

//       if (checkInPicker) {
//         checkInPicker.setStartDate(start);
//         checkInPicker.setEndDate(end);
//       }
//       if (checkOutPicker) {
//         checkOutPicker.setStartDate(start);
//         checkOutPicker.setEndDate(end);
//       }
//     },
//   );

//   // === ĐẶT GIÁ TRỊ MẶC ĐỊNH NGAY SAU KHI INIT ===
//   const startStr = defaultStart.format("DD-MM-YYYY");
//   const endStr = defaultEnd.format("DD-MM-YYYY");

//   $("#search_checkin").val(startStr);
//   $("#search_checkout").val(endStr);

//   // Đồng bộ giá trị vào picker (rất quan trọng)
//   setTimeout(() => {
//     const checkInPicker = $("#search_checkin").data("daterangepicker");
//     const checkOutPicker = $("#search_checkout").data("daterangepicker");

//     if (checkInPicker) {
//       checkInPicker.setStartDate(defaultStart);
//       checkInPicker.setEndDate(defaultEnd);
//     }
//     if (checkOutPicker) {
//       checkOutPicker.setStartDate(defaultStart);
//       checkOutPicker.setEndDate(defaultEnd);
//     }
//   }, 100);
// }
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
  if (!document.querySelector(".swiper-hero")) return;

  var interleaveOffset = 0.9;

  var swiperBanner = new Swiper(".swiper-hero", {
    loop: true,
    speed: 1500,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      progress: function (swiper) {
        if (!swiper?.slides?.length) return;

        swiper.slides.forEach(function (slide) {
          var slideProgress = slide.progress || 0;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          if (!isNaN(innerTranslate)) {
            var slideInner = slide.querySelector(".hero-slider-image");
            if (slideInner) {
              slideInner.style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          }
        });
      },
      touchStart: function (swiper) {
        if (!swiper?.slides?.length) return; // ← thêm

        swiper.slides.forEach(function (slide) {
          slide.style.transition = "";
        });
      },
      setTransition: function (swiper, speed) {
        if (!swiper?.slides?.length) return;

        var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach(function (slide) {
          slide.style.transition = speed + "ms " + easing;
          var slideInner = slide.querySelector(".hero-slider-image");
          if (slideInner) {
            slideInner.style.transition = speed + "ms " + easing;
          }
        });
      },
    },
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

    [tlTextOne, tlTextTwo, tlTextThree, tlTextFour, tlTextFive].forEach(
      (group) => {
        if (group.length) gsap.set(group, { y: 20, opacity: 0 });
      },
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 65%",
        once: true,
        markers: true,
      },
    });

    const animFrom = { y: 20, opacity: 0 };
    const animTo = {
      y: 0,
      opacity: 1,
      duration: 0.8,
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

    new Swiper(this, {
      slidesPerView: 1,
      effect: "fade",
      allowTouchMove: false,

      fadeEffect: {
        crossFade: true,
      },

      pagination: {
        el: pagination,
        type: "fraction",
      },

      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
    });
  });
}
function eventSlider() {
  if (!document.querySelector(".event-swiper")) return;

  var swiperEvent = new Swiper(".event-swiper", {
    slidesPerView: 1.8,
    spaceBetween: 40,
    slidesOffsetAfter: 40,
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
      reachEnd(swiper) {
        updateFraction(swiper);
      },
    },
  });

  function updateFraction(swiper) {
    const el = document.querySelector(".event-right .swiper-fraction");
    if (!el) return;

    const current = swiper.isEnd ? swiper.slides.length : swiper.realIndex + 1;
    el.textContent = `${current} / ${swiper.slides.length}`;
  }
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
