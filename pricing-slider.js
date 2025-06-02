document.addEventListener("DOMContentLoaded", function () {
  const pricingCardsWrap = document.querySelector(".pricing-cards-wrap-may-2025");
  if (!pricingCardsWrap) {
    console.error("Pricing cards wrap element not found.");
    return;
  }

  let isSliderActive = false;
  let touchstartX = 0;
  let touchendX = 0;
  let currentCardIndex = 0;
  let cards = [];
  let indicatorsContainer = null;
  let prevArrow = null;
  let nextArrow = null;

  function createControls() {
    // Create container for controls for easier management and styling
    const controlsWrapper = document.createElement("div");
    controlsWrapper.className = "pricing-slider-controls";
    controlsWrapper.style.textAlign = "center";
    controlsWrapper.style.marginTop = "10px";

    prevArrow = document.createElement("button");
    prevArrow.innerHTML = "&#9664;"; // Left arrow
    prevArrow.className = "slider-arrow prev-arrow";
    prevArrow.style.marginRight = "10px";
    prevArrow.style.padding = "5px 10px";
    prevArrow.style.cursor = "pointer";

    nextArrow = document.createElement("button");
    nextArrow.innerHTML = "&#9654;"; // Right arrow
    nextArrow.className = "slider-arrow next-arrow";
    nextArrow.style.marginLeft = "10px";
    nextArrow.style.padding = "5px 10px";
    nextArrow.style.cursor = "pointer";

    indicatorsContainer = document.createElement("div");
    indicatorsContainer.className = "slider-indicators";
    indicatorsContainer.style.display = "inline-block"; // Keep indicators between arrows

    prevArrow.addEventListener("click", showPrevCard);
    nextArrow.addEventListener("click", showNextCard);

    controlsWrapper.appendChild(prevArrow);
    controlsWrapper.appendChild(indicatorsContainer);
    controlsWrapper.appendChild(nextArrow);

    // Insert controls after the pricingCardsWrap element
    pricingCardsWrap.parentNode.insertBefore(controlsWrapper, pricingCardsWrap.nextSibling);

    updateArrowStates();
  }

  function createIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = ""; // Clear existing indicators
    cards.forEach((_, index) => {
      const indicator = document.createElement("span");
      indicator.className = "slider-indicator";
      indicator.style.height = "10px";
      indicator.style.width = "10px";
      indicator.style.backgroundColor = "#bbb";
      indicator.style.borderRadius = "50%";
      indicator.style.display = "inline-block";
      indicator.style.margin = "0 5px";
      indicator.style.cursor = "pointer";
      indicator.addEventListener("click", () => {
        currentCardIndex = index;
        updateCardVisibility();
      });
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateIndicators() {
    if (!indicatorsContainer || !isSliderActive) return;
    const allIndicators = indicatorsContainer.children;
    for (let i = 0; i < allIndicators.length; i++) {
      allIndicators[i].style.backgroundColor = i === currentCardIndex ? "#717171" : "#bbb";
    }
  }

  function updateArrowStates() {
    if (!prevArrow || !nextArrow || !isSliderActive) return;
    prevArrow.disabled = currentCardIndex === 0;
    nextArrow.disabled = currentCardIndex === cards.length - 1;
    prevArrow.style.opacity = prevArrow.disabled ? "0.5" : "1";
    nextArrow.style.opacity = nextArrow.disabled ? "0.5" : "1";
    prevArrow.style.cursor = prevArrow.disabled ? "default" : "pointer";
    nextArrow.style.cursor = nextArrow.disabled ? "default" : "pointer";
  }

  function initSlider() {
    cards = Array.from(pricingCardsWrap.children);
    if (cards.length <= 1) return; // No need for slider if 1 or 0 cards

    pricingCardsWrap.style.display = "block";
    pricingCardsWrap.style.overflowX = "hidden";
    pricingCardsWrap.style.scrollSnapType = "x mandatory"; // This might be less relevant if not truly scrolling
    pricingCardsWrap.style.webkitOverflowScrolling = "touch";

    cards.forEach((card, index) => {
      card.style.minWidth = "100%";
      card.style.scrollSnapAlign = "start"; // This might be less relevant
      card.style.display = index === 0 ? "flex" : "none"; // Active card is flex, others none
    });

    isSliderActive = true;
    currentCardIndex = 0;
    createControls(); // Create arrows and indicator container
    createIndicators(); // Populate indicators
    updateCardVisibility(); // Initial visibility and control state update
  }

  function destroySlider() {
    if (!pricingCardsWrap || !isSliderActive) return;

    // Reset styles applied by the slider
    pricingCardsWrap.style.display = ""; // Reset to original (or CSS defined)
    pricingCardsWrap.style.overflowX = "";
    pricingCardsWrap.style.scrollSnapType = "";
    pricingCardsWrap.style.webkitOverflowScrolling = "";

    cards.forEach((card) => {
      card.style.minWidth = "";
      card.style.scrollSnapAlign = "";
      card.style.display = ""; // Reset to original (or CSS defined)
    });

    // Remove controls
    const controlsWrapper = document.querySelector(".pricing-slider-controls");
    if (controlsWrapper) {
      controlsWrapper.remove();
    }
    indicatorsContainer = null;
    prevArrow = null;
    nextArrow = null;

    isSliderActive = false;
    cards = []; // Clear the cards array
  }

  function updateCardVisibility() {
    if (!isSliderActive || cards.length === 0) return;
    cards.forEach((card, index) => {
      card.style.display = index === currentCardIndex ? "flex" : "none"; // Active card is flex, others none
    });
    updateIndicators();
    updateArrowStates();
  }

  function showNextCard() {
    if (currentCardIndex < cards.length - 1) {
      currentCardIndex++;
      updateCardVisibility();
    }
  }

  function showPrevCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      updateCardVisibility();
    }
  }

  function handleGesture() {
    const threshold = 50; // Minimum swipe distance
    if (touchendX < touchstartX - threshold) {
      showNextCard();
    }
    if (touchendX > touchstartX + threshold) {
      showPrevCard();
    }
  }

  pricingCardsWrap.addEventListener(
    "touchstart",
    function (event) {
      if (!isSliderActive) return;
      touchstartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  pricingCardsWrap.addEventListener(
    "touchend",
    function (event) {
      if (!isSliderActive) return;
      touchendX = event.changedTouches[0].screenX;
      handleGesture();
    },
    { passive: true }
  );

  function checkBreakpoint() {
    const screenWidth = window.innerWidth;
    // Mobile portrait (240px - 479px) and Mobile landscape (480px - 767px)
    if (screenWidth >= 240 && screenWidth <= 767) {
      if (!isSliderActive) {
        initSlider();
      }
    } else {
      if (isSliderActive) {
        destroySlider();
      }
    }
  }

  // Initial check
  checkBreakpoint();

  // Listen for window resize events
  window.addEventListener("resize", checkBreakpoint);
});
