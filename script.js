/* =========================
   AHAD JUS DUX WEBSITE JS
   ========================= */

const introScreen = document.getElementById("introScreen");
const introVideo = document.getElementById("introVideo");
const website = document.getElementById("website");
const skipIntro = document.getElementById("skipIntro");
const soundButton = document.getElementById("soundButton");

let websiteShown = false;

function showWebsite() {
  if (websiteShown) return;
  websiteShown = true;

  if (introScreen) {
    introScreen.style.opacity = "0";
    introScreen.style.transition = "opacity 0.7s ease";
  }

  setTimeout(() => {
    if (introScreen) introScreen.style.display = "none";
    if (website) website.classList.remove("hidden");
    document.body.classList.remove("no-scroll");
    revealVisibleSections();
  }, 700);
}

if (introScreen) {
  document.body.classList.add("no-scroll");
}

if (introVideo) {
  introVideo.addEventListener("ended", showWebsite);
}

if (skipIntro) {
  skipIntro.addEventListener("click", showWebsite);
}

if (soundButton && introVideo) {
  soundButton.addEventListener("click", () => {
    introVideo.muted = false;
    introVideo.play();
    soundButton.textContent = "Sound On";
  });
}

setTimeout(showWebsite, 9000);

const openMenu = document.getElementById("openMenu");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
}

if (openMenu && mobileMenu) {
  openMenu.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", closeMobileMenu);
}

if (mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

const revealElements = document.querySelectorAll(".reveal");

function revealVisibleSections() {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) {
      element.classList.add("visible");
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  window.addEventListener("scroll", revealVisibleSections, { passive: true });
  revealVisibleSections();
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".desktop-menu a[href^='#']");

function updateActiveNavigation() {
  let currentId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${currentId}`);
  });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("load", () => {
  revealVisibleSections();
  updateActiveNavigation();
});

const matterForm = document.getElementById("matterForm");

if (matterForm) {
  matterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();
    const location = document.getElementById("location").value.trim();
    const matterType = document.getElementById("matterType").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("New trade matter enquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nLocation: ${location}\nMatter type: ${matterType}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:contact@ahadjusdux.com?subject=${subject}&body=${body}`;
  });
}
