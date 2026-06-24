import { reinitAccommodationSlider } from "../../main/js/slider.min.js";

export async function dropdownPhoneCode() {
  const phoneDropdown = document.querySelector(
    ".dropdown-custom-select.select-phone-code",
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
      "https://cdn.jsdelivr.net/npm/world-countries@5/dist/countries.json",
    );
    const data = await res.json();

    countries = data
      .map((c) => ({
        name: c.name?.common || "",
        code: c.cca2 || "",
        dialCode: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        flag: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : "",
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
    '.dropdown-custom-item[data-code="VN"]',
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
    ".dropdown-custom-select.select-region",
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
      "https://cdn.jsdelivr.net/npm/world-countries@5/dist/countries.json",
    );
    const data = await res.json();

    countries = data
      .map((c) => ({
        name: c.name?.common || "",
        code: c.cca2 || "",
        dialCode: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        flag: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : "",
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
    '.dropdown-custom-item[data-code="VN"]',
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
    ".dropdown-custom:not(.filter-tab), .dropdown-custom-select:not(.filter-tab)",
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
            reinitScrollAnimations(result);
          })
          .to(result, { autoAlpha: 1, duration: 0.3 })
          .call(() => {
            // ✅ Refresh sau khi fade in xong — DOM đã render đúng vị trí
            ScrollTrigger.refresh();
          });
      });
    });
  });
}

// ============================================================
// HELPER: check element có trong viewport không
// ============================================================
function isInViewport(el, threshold = 0.65) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * threshold;
}

// ============================================================
// REINIT ACCOMMODATION CARD ANIMATIONS
// ============================================================
function reinitCardAnimations(container) {
  const cards = container.querySelectorAll(
    ".filter-item:not([style*='display: none']) .accommodationCard",
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

    gsap.set(media, { y: 20, opacity: 0 });
    gsap.set(contentEls, { y: 20, opacity: 0 });

    const animateMedia = () => {
      gsap.to(media, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
    };

    const animateContent = () => {
      const tl = gsap.timeline();
      contentEls.forEach((el) => {
        tl.fromTo(
          el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );
      });
    };

    // ✅ Nếu đã trong viewport thì play ngay, không cần chờ scroll
    if (isInViewport(media)) {
      animateMedia();
    } else {
      ScrollTrigger.create({
        trigger: media,
        start: "top 65%",
        once: true,
        onEnter: animateMedia,
      });
    }

    if (contentEls.length) {
      const contentTrigger = card.querySelector(".card-content");
      if (isInViewport(contentTrigger)) {
        animateContent();
      } else {
        ScrollTrigger.create({
          trigger: contentTrigger,
          start: "top 65%",
          once: true,
          onEnter: animateContent,
        });
      }
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

    gsap.set(items, {
      y: MOVE_Y,
      opacity: 0,
      force3D: true,
      willChange: "transform, opacity",
    });

    const animateItems = (targets, stagger = 0) => {
      gsap
        .timeline()
        .to(
          targets,
          {
            y: 0,
            duration: TRANSFORM_DURATION,
            stagger,
            ease: "power3.out",
            force3D: true,
          },
          0,
        )
        .to(
          targets,
          {
            opacity: 1,
            duration: OPACITY_DURATION,
            stagger,
            ease: "power2.out",
            clearProps: "willChange",
          },
          0,
        );
    };

    if (isMobile) {
      items.forEach((item) => {
        // ✅ Check viewport
        if (isInViewport(item, 0.83)) {
          animateItems(item);
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 83%",
              toggleActions: "play none none none",
              once: true,
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
        }
      });

      return;
    }

    // ✅ Desktop: check section có trong viewport không
    if (isInViewport(section)) {
      animateItems(items, ITEM_STAGGER);
    } else {
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
    }
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
      dynamicMainBullets: 1,
    },

    autoplay: hasAutoplay
      ? {
          delay: 4000,
          disableOnInteraction: true,
        }
      : false,

    navigation: hasArrow
      ? {
          nextEl: nextBtn,
          prevEl: prevBtn,
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
      },
    },
  });

  function updateLabel(swiper) {
    const realIndex = swiper.realIndex;

    const realSlides = swiper.el.querySelectorAll(
      ".swiper-slide:not(.swiper-slide-duplicate)",
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
      ".footer-newsletter .form-message .success, .footer-newsletter .form-message .error",
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
        email: email,
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
      },
    });
  });
}
