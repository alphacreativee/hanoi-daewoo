import {
  customDropdown,
  createFilterTab,
  sliderParallax,
  initGuestSelector
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
        other: "ngày"
      },
      button: {
        prev: "&#8249;",
        next: "&#8250;",
        close: "&#10005;",
        reset: "Xoá",
        apply: "Áp dụng"
      }
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
    }
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

  // if (header.classList.contains("header-theme-light-first")) return;

  gsap.to(header, {
    scrollTrigger: {
      trigger: "body",
      start: "top -10px",
      end: "+=100",
      onEnter: () => header.classList.add("header-theme-light-active"),
      onLeaveBack: () => header.classList.remove("header-theme-light-active")
    }
  });
  // let lastScroll = 0;

  // const trigger = ScrollTrigger.create({
  //   start: "top top",
  //   end: 9999,
  //   onUpdate: (self) => {
  //     const currentScroll = self.scroll();

  //     if (currentScroll <= 0) {
  //       header.classList.remove("scrolled");
  //     } else if (currentScroll > lastScroll) {
  //       // Scroll down
  //       header.classList.add("scrolled");
  //     } else {
  //       // Scroll up
  //       header.classList.remove("scrolled");
  //     }

  //     lastScroll = currentScroll;
  //   },
  // });

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
      prevEl: ".swiper-button-prev"
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
      }
    }
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
