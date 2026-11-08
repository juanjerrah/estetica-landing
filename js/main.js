document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("revealed");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, observerInstance) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.12,
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  const tabletForm = document.getElementById("leadFormTablet");
  if (tabletForm) {
    tabletForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const fields = document.getElementById("formFieldsTablet");
      const successMsg = document.getElementById("formSuccessTablet");
      if (fields) fields.classList.add("hidden");
      if (successMsg) successMsg.classList.remove("hidden");
      tabletForm.reset();
    });
    const tabletReset = document.getElementById("formResetTablet");
    if (tabletReset) {
      tabletReset.addEventListener("click", function () {
        const fields = document.getElementById("formFieldsTablet");
        const successMsg = document.getElementById("formSuccessTablet");
        if (successMsg) successMsg.classList.add("hidden");
        if (fields) fields.classList.remove("hidden");
      });
    }
  }

  const mobileForm = document.getElementById("leadFormMobile");
  if (mobileForm) {
    mobileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const successMsg = document.getElementById("formSuccessMobile");
      if (successMsg) {
        successMsg.classList.remove("hidden");
        mobileForm.reset();
        setTimeout(function () {
          successMsg.classList.add("hidden");
        }, 5000);
      }
    });
  }
});
