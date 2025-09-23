document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".pricing-chart_toggle-container");
  const priceElements = document.querySelectorAll("[price-per-month][price-per-annual]");
  const detailElements = document.querySelectorAll("[monthly-details][annual-details]");
  const hideIfMonthlyElements = document.querySelectorAll('[hide-if="monthly"]');
  const priceMonthElements = document.querySelectorAll(".price-month");

  let currentView = "annual"; // Initial view

  function updateView() {
    if (currentView === "annual") {
      priceElements.forEach((el) => {
        el.textContent = el.getAttribute("price-per-annual");
      });
      detailElements.forEach((el) => {
        el.textContent = el.getAttribute("annual-details");
      });
      hideIfMonthlyElements.forEach((el) => {
        el.style.opacity = "1";
      });
      priceMonthElements.forEach((el) => {
        el.textContent = el.getAttribute("ppm-annually");
      });
    } else {
      // monthly view
      priceElements.forEach((el) => {
        el.textContent = el.getAttribute("price-per-month");
      });
      detailElements.forEach((el) => {
        el.textContent = el.getAttribute("monthly-details");
      });
      hideIfMonthlyElements.forEach((el) => {
        el.style.opacity = "0";
      });
      priceMonthElements.forEach((el) => {
        el.textContent = el.getAttribute("ppm-monthly");
      });
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
});
