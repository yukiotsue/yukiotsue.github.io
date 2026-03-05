// ===== Scroll Progress Bar =====
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + "%";
}

// ===== Intersection Observer for Fade-In =====
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

// ===== Side Navigation Active State =====
const sideNavLinks = document.querySelectorAll(".side-nav a");
const sections = document.querySelectorAll("section, .hero");

function updateActiveNav() {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  let currentSection = "";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentSection = section.id;
    }
  });

  sideNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// ===== Event Listeners =====
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgress();
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial calls
updateProgress();
updateActiveNav();
