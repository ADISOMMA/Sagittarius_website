document.addEventListener("DOMContentLoaded", () => {
  const yearSlot = document.getElementById("currentYear");
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }

  const header = document.querySelector(".site-header");
  const toggleHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState);

  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((element) => observer.observe(element));

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
});
