document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Anno nel footer
  // -----------------------------
  const yearSlot = document.getElementById("currentYear");
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }

  // -----------------------------
  // Header che cambia stile allo scroll
  // -----------------------------
  const header = document.querySelector(".site-header");
  const toggleHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState);

  // -----------------------------
  // FADE-IN / REVEAL CON SCROLL
  // -----------------------------
  const revealElements = document.querySelectorAll(".reveal");

  const handleReveal = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach((el) => {
      if (el.classList.contains("visible")) return; // già animato
      const rect = el.getBoundingClientRect();
      // quando la parte alta dell'elemento entra nell'80% dello schermo, attiva il fade
      if (rect.top < windowHeight * 0.8) {
        el.classList.add("visible");
      }
    });
  };

  // chiamiamo subito e ad ogni scroll/resize
  handleReveal();
  window.addEventListener("scroll", handleReveal);
  window.addEventListener("resize", handleReveal);

  // -----------------------------
  // Menu mobile & smooth scroll
  // -----------------------------
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  const navToggle = document.querySelector(".nav-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  // Smooth scroll per tutti i link interni
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const offsetTop =
        targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Chiudi il menu mobile dopo il click
      closeMenu();
    });
  });

  // -----------------------------
  // Cookie Consent
  // -----------------------------
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept-btn");
  const declineBtn = document.getElementById("cookie-decline-btn");

  const setCookie = (name, value, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  };

  const getCookie = (name) => {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  };

  if (getCookie("cookie_consent") !== "true" && sessionStorage.getItem("cookie_consent_dismissed") !== "true") {
    if (cookieBanner) {
      cookieBanner.classList.add("visible");
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      setCookie("cookie_consent", "true", 365);
      if (cookieBanner) {
        cookieBanner.classList.remove("visible");
      }
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      sessionStorage.setItem("cookie_consent_dismissed", "true");
      if (cookieBanner) {
        cookieBanner.classList.remove("visible");
      }
    });
  }
});
