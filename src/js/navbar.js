const menuBar = document.getElementById("menuBar");
const navBar = document.querySelector(".navbar");
const sideNavbar = document.querySelector(".side-navbar");

// ===============================
// MOBILE CLICK TOGGLE
// ===============================
menuBar.addEventListener("click", (e) => {
  e.stopPropagation();
  sideNavbar.classList.toggle("active");
});

// Close sidebar when clicking outside (mobile + desktop)
document.addEventListener("click", (event) => {
  const isInsideNavbar = navBar.contains(event.target);
  const isInsideSidebar = sideNavbar.contains(event.target);

  if (!isInsideNavbar && !isInsideSidebar) {
    sideNavbar.classList.remove("active");
  }
});

// ===============================
// DESKTOP HOVER OPEN
// ===============================
menuBar.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideNavbar.classList.add("active");
  }
});

sideNavbar.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideNavbar.classList.add("active");
  }
});

// ===============================
// DESKTOP AUTO CLOSE WHEN LEAVING
// ===============================
document.addEventListener("mousemove", (event) => {
  if (window.innerWidth > 768) {
    const isInsideNavbar = navBar.contains(event.target);
    const isInsideSidebar = sideNavbar.contains(event.target);

    if (!isInsideNavbar && !isInsideSidebar) {
      sideNavbar.classList.remove("active");
    }
  }
});

// ===============================
// CLOSE WHEN CLICKING LINK (MOBILE)
// ===============================
const navLinks = document.querySelectorAll(".content-outline a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sideNavbar.classList.remove("active");
  });
});
