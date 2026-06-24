import { reinitAccommodationSlider } from "../../main/js/slider.min.js";

export async function dropdownPhoneCode() {
  const phoneDropdown = document.querySelector(
    ".dropdown-custom-select.select-phone-code"
  );
  if (!phoneDropdown) return;

  const phoneBtn = phoneDropdown.querySelector(".dropdown-custom-btn");
  const phoneMenu = phoneDropdown.querySelector(".dropdown-custom-menu");
  const phoneFlagIcon = phoneDropdown.querySelector(".flag-icon");
  const phoneDialText = phoneDropdown.querySelector(".dial-code");

  const phoneInput = document.querySelector('input[name="phone"]');

  let countries = [];

  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/world-countries@5/dist/countries.json"
    );
    const data = await res.json();

    countries = data
      .map((c) => ({
        name: c.name?.common || "",
        code: c.cca2 || "",
        dialCode: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        flag: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : ""
      }))
      .filter((c) => c.name && c.dialCode && c.flag)
      .sort((a, b) => a.name.localeCompare(b.name));

    phoneMenu.innerHTML = "";

    countries.forEach((country) => {
      const item = document.createElement("div");
      item.className = "dropdown-custom-item color-black";
      item.dataset.code = country.code;
      item.dataset.dial = country.dialCode;
      item.dataset.flag = country.flag;
      item.dataset.name = country.name;

      item.innerHTML = `
        <img src="${country.flag}" alt="${country.name}" class="item-flag" />
        <span class="hover-underline-black">${country.name}</span>
        <span class="item-dial">${country.dialCode}</span>
      `;
      phoneMenu.appendChild(item);
    });
  } catch (err) {
    console.error("Load countries failed:", err);
    return;
  }

  // Mặc định Vietnam
  const defaultItem = phoneMenu.querySelector(
    '.dropdown-custom-item[data-code="VN"]'
  );
  if (defaultItem) {
    selectCode(defaultItem, false);
  }

  phoneBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeDropdown();
    phoneMenu.classList.toggle("dropdown--active");
    phoneBtn.classList.toggle("--active");
  });

  document.addEventListener("click", function () {
    closeDropdown();
  });

  phoneMenu.addEventListener("click", function (e) {
    const item = e.target.closest(".dropdown-custom-item");
    if (!item) return;
    e.stopPropagation();
    selectCode(item, true);
    closeDropdown();
  });

  function selectCode(item, syncPhoneValue) {
    const name = item.dataset.name;
    const dial = item.dataset.dial;
    const flag = item.dataset.flag;

    phoneFlagIcon.src = flag;
    phoneFlagIcon.alt = name;
    phoneDialText.textContent = dial;
    phoneDropdown.classList.add("selected");

    if (syncPhoneValue) {
      const currentValue = phoneInput.value.replace(/^\+\d+\s?/, "");
      phoneInput.value = `${dial} ${currentValue}`.trim();
    }
  }

  function closeDropdown() {
    phoneMenu.classList.remove("dropdown--active");
    phoneBtn.classList.remove("--active");
  }
}
export async function dropdownRegion() {
  const dropdown = document.querySelector(
    ".dropdown-custom-select.select-region"
  );
  if (!dropdown) return;

  const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
  const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
  const displayText = dropdown.querySelector(".dropdown-custom-text");

  const phoneInputWrap = document
    .querySelector('input[name="phone"]')
    .closest(".field-item");
  const flagIcon = phoneInputWrap.querySelector(".flag-icon");
  const phoneInput = phoneInputWrap.querySelector('input[name="phone"]');

  let countries = [];

  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/world-countries@5/dist/countries.json"
    );
    const data = await res.json();

    countries = data
      .map((c) => ({
        name: c.name?.common || "",
        code: c.cca2 || "",
        dialCode: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        flag: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : ""
      }))
      .filter((c) => c.name && c.dialCode && c.flag)
      .sort((a, b) => a.name.localeCompare(b.name));

    dropdownMenu.innerHTML = "";

    countries.forEach((country) => {
      const item = document.createElement("div");
      item.className = "dropdown-custom-item color-black";
      item.dataset.code = country.code;
      item.dataset.dial = country.dialCode;
      item.dataset.flag = country.flag;

      const span = document.createElement("span");
      span.className = "hover-underline-black";
      span.textContent = country.name;

      item.appendChild(span);
      dropdownMenu.appendChild(item);
    });
  } catch (err) {
    console.error("Load countries failed:", err);
    return;
  }

  // Set mặc định: Vietnam
  const defaultItem = dropdownMenu.querySelector(
    '.dropdown-custom-item[data-code="VN"]'
  );
  if (defaultItem) {
    selectCountry(defaultItem);
  }

  btnDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    closeDropdown();
    dropdownMenu.classList.toggle("dropdown--active");
    btnDropdown.classList.toggle("--active");
  });

  document.addEventListener("click", function () {
    closeDropdown();
  });

  dropdownMenu.addEventListener("click", function (e) {
    const item = e.target.closest(".dropdown-custom-item");
    if (!item) return;

    e.stopPropagation();
    selectCountry(item);
    closeDropdown();
  });

  function selectCountry(item) {
    const optionText = item.querySelector("span").textContent.trim();
    const span = displayText.querySelector("span");

    if (span) {
      span.textContent = optionText;
    } else {
      displayText.textContent = optionText;
    }

    dropdown.classList.add("selected");

    const dial = item.dataset.dial;
    const flag = item.dataset.flag;

    flagIcon.src = flag;
    flagIcon.alt = optionText;

    const currentValue = phoneInput.value.replace(/^\+\d+\s?/, "");
    phoneInput.value = `${dial} ${currentValue}`.trim();
  }

  function closeDropdown() {
    dropdownMenu.classList.remove("dropdown--active");
    btnDropdown.classList.remove("--active");
  }
}
export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom:not(.filter-tab), .dropdown-custom-select:not(.filter-tab)"
  );
  if (!dropdowns.length) return;
  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          const optionText = item.textContent;
          dropdown.classList.add("selected");

          if (
            [...item.attributes].some((attr) => attr.name.startsWith("data-"))
          ) {
            displayText.textContent = optionText;

            [...item.attributes].forEach((attr) => {
              if (attr.name.startsWith("data-")) {
                displayText.setAttribute(attr.name, attr.value);
              }
            });
          } else {
            displayText.textContent = optionText;
          }
        } else {
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

// export function createFilterTab() {
//   document.querySelectorAll(".filter-section").forEach((section) => {
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

//     const isSelectTab = section.classList.contains("select-tab");
//     const buttons = section.querySelectorAll(".filter-button[data-type]");

//     const applyFilter = (type) => {
//       const items = result.querySelectorAll(".filter-item");

//       items.forEach((item) => {
//         let show;
//         if (type === "all") {
//           show = isSelectTab ? item.classList.contains("all") : true;
//         } else {
//           show = item.classList.contains(type);
//         }
//         item.style.display = show ? "" : "none";
//       });

//       // Reinit slider cho các filter-item đang hiện
//       items.forEach((item) => {
//         if (item.style.display === "none") return;

//         const sliderEl = item.querySelector(".accommodations-slider");
//         if (sliderEl) reinitAccommodationSlider(sliderEl);

//         // Reinit nested parallax slider bên trong item
//         item.querySelectorAll("[slider-parallax]").forEach((el) => {
//           reinitParallaxSlider(el);
//         });
//       });
//     };

//     // Filter lần đầu nếu có button active
//     const activeBtn = section.querySelector(".filter-button.active");
//     if (activeBtn) {
//       const activeType = activeBtn.dataset.type;
//       if (activeType !== "all" || isSelectTab) {
//         applyFilter(activeType);
//       }
//     }

//     buttons.forEach((btn) => {
//       btn.addEventListener("click", function () {
//         section
//           .querySelectorAll(".filter-button")
//           .forEach((b) => b.classList.remove("active"));
//         this.classList.add("active");

//         const type = this.dataset.type;

//         gsap
//           .timeline()
//           .to(result, { autoAlpha: 0, duration: 0.3 })
//           .call(() => {
//             applyFilter(type);
//           })
//           .to(result, { autoAlpha: 1, duration: 0.3 });
//       });
//     });
//   });
// }
// ============================================================
// FILTER TAB
// ============================================================
export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
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

    const isSelectTab = section.classList.contains("select-tab");
    const buttons = section.querySelectorAll(".filter-button[data-type]");

    const applyFilter = (type) => {
      const items = result.querySelectorAll(".filter-item");

      items.forEach((item) => {
        let show;
        if (type === "all") {
          show = isSelectTab ? item.classList.contains("all") : true;
        } else {
          show = item.classList.contains(type);
        }
        item.style.display = show ? "" : "none";
      });

      // Reinit slider cho các filter-item đang hiện
      items.forEach((item) => {
        if (item.style.display === "none") return;

        const sliderEl = item.querySelector(".accommodations-slider");
        if (sliderEl) reinitAccommodationSlider(sliderEl);

        item.querySelectorAll("[slider-parallax]").forEach((el) => {
          reinitParallaxSlider(el);
        });
      });
    };

    // Filter lần đầu nếu có button active
    const activeBtn = section.querySelector(".filter-button.active");
    if (activeBtn) {
      const activeType = activeBtn.dataset.type;
      if (activeType !== "all" || isSelectTab) {
        applyFilter(activeType);
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            applyFilter(type);
            reinitScrollAnimations(result); // ✅ reinit tất cả scroll animations
          })
          .to(result, { autoAlpha: 1, duration: 0.3 });
      });
    });
  });
}

// ============================================================
// REINIT SCROLL ANIMATIONS (entry point duy nhất)
// ============================================================
function reinitScrollAnimations(container) {
  // Kill tất cả ScrollTrigger đang gắn với các element bên trong container
  ScrollTrigger.getAll()
    .filter((st) => st.trigger && container.contains(st.trigger))
    .forEach((st) => st.kill());

  reinitCardAnimations(container);
  reinitItemsSectionAnimations(container);

  // Refresh 1 lần duy nhất sau khi đã reinit tất cả
  ScrollTrigger.refresh();
}

// ============================================================
// REINIT ACCOMMODATION CARD ANIMATIONS
// ============================================================
function reinitCardAnimations(container) {
  const cards = container.querySelectorAll(
    ".filter-item:not([style*='display: none']) .accommodationCard"
  );

  if (!cards.length) return;

  cards.forEach((card) => {
    const media = card.querySelector(".card-media");
    const title = card.querySelector(".card-content .title");
    const info = card.querySelector(".card-content .info");
    const desc = card.querySelector(".card-content .desc");
    const cta = card.querySelector(".card-content .cta");
    const contentEls = [title, info, desc, cta].filter(Boolean);

    if (!media) return;

    // Reset về trạng thái ban đầu
    gsap.set(media, { y: 20, opacity: 0 });
    gsap.set(contentEls, { y: 20, opacity: 0 });

    // Tạo lại ScrollTrigger cho media
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

    // Tạo lại ScrollTrigger cho content
    if (contentEls.length) {
      const tl = gsap.timeline({ paused: true });
      contentEls.forEach((el) => {
        tl.fromTo(
          el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      });

      ScrollTrigger.create({
        trigger: card.querySelector(".card-content"),
        start: "top 65%",
        once: true,
        onEnter: () => tl.play()
      });
    }
  });
}

// ============================================================
// REINIT ITEMS SECTION ANIMATIONS
// ============================================================
function reinitItemsSectionAnimations(container) {
  const isMobile = $(window).width() < 992;

  const MOVE_Y = 20;
  const TRANSFORM_DURATION = 0.8;
  const OPACITY_DURATION = 0.6;
  const ITEM_STAGGER = 0.2;

  const sections = container.querySelectorAll("[section-fade-each-item]");
  if (!sections.length) return;

  sections.forEach((section) => {
    const items = section.querySelectorAll("[data-fade-item]");
    if (!items.length) return;

    // Reset về trạng thái ban đầu
    gsap.set(items, {
      y: MOVE_Y,
      opacity: 0,
      force3D: true,
      willChange: "transform, opacity"
    });

    // ── Mobile: mỗi item tự trigger khi scroll tới ──
    if (isMobile) {
      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 83%",
            toggleActions: "play none none none",
            once: true
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

      return;
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

// ============================================================
// ANIMATION ACCOMMODATION CARD (lần đầu load trang)
// ============================================================

export function sliderParallax() {
  if ($("[slider-parallax]").length < 1) return;

  $("[slider-parallax]").each(function () {
    initOneParallaxSlider(this);
  });
}

function initOneParallaxSlider(swiperEl) {
  var interleaveOffset = 0.8;
  const $swiper = $(swiperEl);

  const hasAutoplay =
    window.innerWidth < 992 ? false : swiperEl.hasAttribute("slider-autoplay");

  const hasNoDrag = swiperEl.hasAttribute("slider-no-drag");
  const hasChangeLabel = swiperEl.hasAttribute("slider-change-label");

  const $wrapper = $swiper.closest(".wrapper-slider-parallax");
  const $sliderTitle = $wrapper.find(".slider-title");
  const nextBtn = $wrapper.find(".arrow-next")[0];
  const prevBtn = $wrapper.find(".arrow-prev")[0];
  const $pagination = $wrapper.find(".slider-pagination");

  const hasArrow = swiperEl.hasAttribute("slider-arrow") && nextBtn && prevBtn;

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    init: true,
    loop: true,
    speed: 1500,
    watchSlidesProgress: true,
    roundLengths: true,
    keyboard: !hasNoDrag,
    grabCursor: !hasNoDrag,
    allowTouchMove: hasNoDrag ? false : true,

    pagination: {
      el: $pagination[0],
      dynamicBullets: true,
      clickable: true,
      dynamicMainBullets: 1
    },

    autoplay: hasAutoplay
      ? {
          delay: 4000,
          disableOnInteraction: true
        }
      : false,

    navigation: hasArrow
      ? {
          nextEl: nextBtn,
          prevEl: prevBtn
        }
      : false,
    on: {
      init(swiper) {
        if (hasChangeLabel) updateLabel(swiper);
      },

      slideChange(swiper) {
        if (hasChangeLabel) updateLabel(swiper);
      },

      progress: function (swiper) {
        swiper.slides.forEach(function (slide) {
          const slideProgress = slide.progress || 0;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;

          if (!isNaN(innerTranslate)) {
            const slideInner = slide.querySelector(".image");
            if (slideInner) {
              slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          }
        });
      },

      touchStart: function (swiper) {
        swiper.slides.forEach(function (slide) {
          slide.style.transition = "";
        });
      },

      setTransition: function (swiper, speed) {
        const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

        swiper.slides.forEach(function (slide) {
          slide.style.transition = `${speed}ms ${easing}`;

          const slideInner = slide.querySelector(".image");
          if (slideInner) {
            slideInner.style.transition = `${speed}ms ${easing}`;
          }
        });
      }
    }
  });

  function updateLabel(swiper) {
    const realIndex = swiper.realIndex;

    const realSlides = swiper.el.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)"
    );

    const total = realSlides.length;
    const currentSlide = realSlides[realIndex];
    const title = currentSlide?.dataset?.title || "";

    if ($sliderTitle.length) {
      $sliderTitle.text(title);
    }
  }

  swiperEl.swiperInstance = swiper;
}

// Destroy + reinit 1 parallax slider cụ thể
export function reinitParallaxSlider(swiperEl) {
  if (swiperEl.swiperInstance) {
    swiperEl.swiperInstance.destroy(true, true);
    swiperEl.swiperInstance = null;
  }
  initOneParallaxSlider(swiperEl);
}

export function initGuestSelector() {
  document
    .querySelectorAll(".booking-form .select-people")
    .forEach((container) => {
      const adultDisplay = container.querySelector(".adult-value");
      const childDisplay = container.querySelector(".child-value");

      const selectBox = container.querySelector(".select-box");

      const adultValElem = selectBox.querySelector(".adult .val");
      const childValElem = selectBox.querySelector(".child .val");

      const adultMinus = selectBox.querySelector(".adult .min");
      const adultPlus = selectBox.querySelector(".adult .plus");
      const childMinus = selectBox.querySelector(".child .min");
      const childPlus = selectBox.querySelector(".child .plus");

      let adults = parseInt(adultValElem.textContent) || 1;
      let children = parseInt(childValElem.textContent) || 0;

      function updateDisplay() {
        adultValElem.textContent = adults;
        childValElem.textContent = children;

        adultDisplay.textContent = adults;
        childDisplay.textContent = children;

        adultMinus.style.opacity = adults <= 1 ? "0.4" : "1";
        adultMinus.style.pointerEvents = adults <= 1 ? "none" : "auto";

        childMinus.style.opacity = children <= 0 ? "0.4" : "1";
        childMinus.style.pointerEvents = children <= 0 ? "none" : "auto";
      }

      adultMinus.addEventListener("click", () => {
        if (adults > 1) {
          adults--;
          updateDisplay();
        }
      });

      adultPlus.addEventListener("click", () => {
        adults++;
        updateDisplay();
      });

      childMinus.addEventListener("click", () => {
        if (children > 0) {
          children--;
          updateDisplay();
        }
      });

      childPlus.addEventListener("click", () => {
        children++;
        updateDisplay();
      });

      updateDisplay();

      const displayArea = container.querySelector(".select-people-wrapper");
      if (displayArea) {
        displayArea.addEventListener("click", (e) => {
          if (!e.target.closest(".select-box")) {
            selectBox.classList.toggle("active");
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
          selectBox.classList.remove("active");
        }
      });
    });
}

export function formNewsletter() {
  if ($("#form-newsletter").length < 1) return;

  $("#form-newsletter").on("submit", function (e) {
    e.preventDefault();

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");
    const buttonSubmit = thisForm.find("button[type='submit']");

    thisForm.find(".field-item").removeClass("error");
    $(
      ".footer-newsletter .form-message .success, .footer-newsletter .form-message .error"
    ).hide();

    if (!emailField.length) {
      console.error("Không tìm thấy input email.");
      return;
    }

    const email = emailField.val()?.trim() || "";

    // Kiểm tra rỗng
    if (!email) {
      thisForm.find(".field-item").addClass("error");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      thisForm.find(".field-item").addClass("error");
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      dataType: "json",
      data: {
        action: "daewoo_receive_newsletter",
        email: email
      },

      beforeSend: function () {
        buttonSubmit.addClass("aloading").prop("disabled", true);
      },

      success: function (res) {
        if (res.success) {
          thisForm[0].reset();

          $(".footer-newsletter .form-message .success").fadeIn();

          setTimeout(() => {
            $(".footer-newsletter .form-message .success").fadeOut();
          }, 7000);
        } else {
          $(".footer-newsletter .form-message .error").fadeIn();

          setTimeout(() => {
            $(".footer-newsletter .form-message .error").fadeOut();
          }, 7000);
        }
      },

      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);

        $(".footer-newsletter .form-message .error").fadeIn();

        setTimeout(() => {
          $(".footer-newsletter .form-message .error").fadeOut();
        }, 7000);
      },

      complete: function () {
        buttonSubmit.removeClass("aloading").prop("disabled", false);
      }
    });
  });
}

export function getTime() {
  if ($(".booking-form").length < 1) return;

  const defaultStart = moment().startOf("day");
  const defaultEnd = moment().startOf("day").add(1, "day");

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
    const rect = document.getElementById("startDate").getBoundingClientRect();
    return window.innerHeight - rect.bottom < 350 ? "up" : "down";
  }

  $('input[name="startDate"]').daterangepicker(
    {
      opens: window.innerWidth <= 992 ? "left" : "right",
      drops: getDrops(),
      autoApply: true,
      singleDatePicker: false,
      linkedCalendars: true,
      minDate: moment().startOf("day"),
      minSpan: { days: 1 },
      startDate: defaultStart,
      endDate: defaultEnd,
      locale: localeConfig
    },
    function (start, end) {
      $('input[name="startDate"]').val(start.format("DD/MM/YYYY"));
      $('input[name="endDate"]').val(end.format("DD/MM/YYYY"));
    }
  );

  const picker = $('input[name="startDate"]').data("daterangepicker");

  picker.updateElement = function () {
    $('input[name="startDate"]').val(this.startDate.format("DD/MM/YYYY"));
    $('input[name="endDate"]').val(this.endDate.format("DD/MM/YYYY"));
  };

  const originalRender = picker.renderCalendar.bind(picker);

  picker.renderCalendar = function (side) {
    originalRender(side);

    if (window.innerWidth <= 992 && side === "right") {
      const $container = $(this.container);
      const $rightNext = $container.find(".drp-calendar.right th.next");

      $container
        .find(".drp-calendar.left .calendar-table thead tr:first-child")
        .find("th.next.mobile-next")
        .remove();

      $container
        .find(".drp-calendar.left .calendar-table thead tr:first-child")
        .append(
          $("<th>")
            .addClass("next available mobile-next")
            .html($rightNext.html())
            .on("click", function () {
              $rightNext.trigger("click");
            })
        );

      $container.find(".drp-calendar.right").hide();
    }
  };

  $('input[name="startDate"]').val(defaultStart.format("DD/MM/YYYY"));

  $('input[name="endDate"]').val(defaultEnd.format("DD/MM/YYYY"));

  $('input[name="endDate"]').on("click", function () {
    $('input[name="startDate"]').data("daterangepicker").show();
  });

  $('input[name="startDate"], input[name="endDate"]').on("focus", function () {
    const picker = $('input[name="startDate"]').data("daterangepicker");

    if (picker) {
      picker.drops = getDrops();
    }
  });
}
