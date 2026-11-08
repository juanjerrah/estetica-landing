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
