document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".pricing-chart_toggle-container");

  const getPriceElements = () => document.querySelectorAll("[price-per-month][price-per-annual]");
  const getDetailElements = () => document.querySelectorAll("[monthly-details][annual-details]");
  const getHideIfMonthlyElements = () => document.querySelectorAll('[hide-if="monthly"]');
  const getPriceMonthElements = () => document.querySelectorAll(".price-month");
  const getTaxPackageValues = () => document.querySelectorAll(".tax-package-value");
  const getPlanBadges = () => document.querySelectorAll(".badge-tax-plan");

  let currentView = "annual"; // Initial view

  const setTextFromAttr = (elements, attributeName) => {
    elements.forEach((el) => {
      const value = el.getAttribute(attributeName);
      if (value !== null && value !== el.textContent) {
        el.textContent = value;
      }
    });
  };

  function updateView() {
    if (currentView === "annual") {
      setTextFromAttr(getPriceElements(), "price-per-annual");
      setTextFromAttr(getDetailElements(), "annual-details");
      getHideIfMonthlyElements().forEach((el) => {
        el.style.opacity = "1";
      });
      setTextFromAttr(getPriceMonthElements(), "ppm-annually");
      setTextFromAttr(getTaxPackageValues(), "a-value");
      setTextFromAttr(getPlanBadges(), "a-value");
    } else {
      // monthly view
      setTextFromAttr(getPriceElements(), "price-per-month");
      setTextFromAttr(getDetailElements(), "monthly-details");
      getHideIfMonthlyElements().forEach((el) => {
        el.style.opacity = "0";
      });
      setTextFromAttr(getPriceMonthElements(), "ppm-monthly");
      setTextFromAttr(getTaxPackageValues(), "m-value");
      setTextFromAttr(getPlanBadges(), "m-value");
    }
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      currentView = currentView === "annual" ? "monthly" : "annual";
      updateView();
    });
  } else {
    console.error('Pricing toggle button with class "pricing-chart_toggle-container" not found.');
  }

  // Initial setup
  updateView();
  window.addEventListener("load", updateView);
});
