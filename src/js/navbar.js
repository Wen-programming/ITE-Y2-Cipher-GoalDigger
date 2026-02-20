const menuBar = document.getElementById("menuBar");
const navBar = document.querySelector(".navbar");
const sideNavbar = document.querySelector(".side-navbar");

// --- MOBILE & DESKTOP CLICK TOGGLE ---
menuBar.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents the click from immediately closing the sidebar
  sideNavbar.classList.toggle("active");
});

// Close sidebar when clicking anywhere else on the screen (Good for mobile)
document.addEventListener("click", (event) => {
  const isClickInsideSidebar = sideNavbar.contains(event.target);
  const isClickOnButton = menuBar.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnButton) {
    sideNavbar.classList.remove("active");
  }
});

// --- DESKTOP HOVER (Optional) ---
// We keep this so it still feels snappy on PC
menuBar.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    // Only trigger hover on larger screens
    sideNavbar.classList.add("active");
  }
});

// Hide sidebar when leaving the navbar/sidebar area
const hideArea = [navBar, sideNavbar];
hideArea.forEach((element) => {
  element.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      sideNavbar.classList.remove("active");
    }
  });
});

// Close sidebar when a link inside it is clicked (Useful for mobile navigation)
const navLinks = document.querySelectorAll(".content-outline a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sideNavbar.classList.remove("active");
  });
});
