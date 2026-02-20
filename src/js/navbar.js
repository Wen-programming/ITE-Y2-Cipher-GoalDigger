const menuBar = document.getElementById("menuBar");
const navBar = document.querySelector(".navbar");
const sideNavbar = document.querySelector(".side-navbar");

// Show sidebar and nav-links on hover over menu bar
menuBar.addEventListener("mouseenter", () => {
  sideNavbar.classList.add("active");
  // slide nav-links
});

// Hide sidebar and nav-links when leaving navbar
navBar.addEventListener("mouseleave", () => {
  sideNavbar.classList.remove("active");
});

// Optional: keep sidebar visible when hovering over it
sideNavbar.addEventListener("mouseenter", () => {
  sideNavbar.classList.add("active");
});

sideNavbar.addEventListener("mouseleave", () => {
  sideNavbar.classList.remove("active");
});

// Main image
