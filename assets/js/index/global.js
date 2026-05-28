export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
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
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
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

    const buttons = section.querySelectorAll(".filter-button[data-type]");

    // Chỉ cần check và filter lần đầu nếu có button active
    const activeBtn = section.querySelector(".filter-button.active");
    if (activeBtn) {
      const activeType = activeBtn.dataset.type;
      if (activeType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.classList.contains(activeType)
            ? ""
            : "none";
        });
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active state
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        // Animate fade out -> filter -> fade in
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

export function sliderParallax() {
  if ($("[slider-parallax]").length < 1) return;

  var interleaveOffset = 0.8;

  $("[slider-parallax]").each(function () {
    const swiperEl = this;
    const $swiper = $(this);

    const hasAutoplay =
      window.innerWidth < 992
        ? false
        : swiperEl.hasAttribute("slider-autoplay");

    const hasNoDrag = swiperEl.hasAttribute("slider-no-drag");
    const hasChangeLabel = swiperEl.hasAttribute("slider-change-label");

    const $wrapper = $swiper.closest(".wrapper-slider-parallax");
    const $sliderTitle = $wrapper.find(".slider-title");
    const nextBtn = $wrapper.find(".arrow-next")[0];
    const prevBtn = $wrapper.find(".arrow-prev")[0];
    const $pagination = $wrapper.find(".slider-pagination");

    const hasArrow =
      swiperEl.hasAttribute("slider-arrow") && nextBtn && prevBtn;

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      init: true,
      loop: true,
      speed: 1500,
      watchSlidesProgress: true,

      keyboard: !hasNoDrag,
      // mousewheel: !hasNoDrag,
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

      // if ($pagination.length) {
      //   $pagination.text(`${realIndex + 1}/${total}`);
      // }
    }
  });
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
