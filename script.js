const root = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("brian-theme");
    } catch (error) {
      console.warn("Preferensi tema tidak dapat dibaca.", error);
    }
    if (savedTheme === "dark") root.dataset.theme = "dark";
    themeToggle.textContent = root.dataset.theme === "dark" ? "☀" : "☾";

    themeToggle.addEventListener("click", function () {
      const isDark = root.dataset.theme !== "dark";
      root.dataset.theme = isDark ? "dark" : "light";
      themeToggle.textContent = isDark ? "☀" : "☾";
      try {
        localStorage.setItem("brian-theme", isDark ? "dark" : "light");
      } catch (error) {
        console.warn("Preferensi tema tidak dapat disimpan.", error);
      }
    });

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
      }
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver(function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (element) {
        observer.observe(element);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(function (element) {
        element.classList.add("is-visible");
      });
    }
