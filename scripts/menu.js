const openBtn = document.getElementById("open");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu");
let isMenuOpen = false;

console.log(openBtn);
openBtn.onclick = function () {
  // mobileMenu.style.display = isMenuOpen ? "none" : "block";
  mobileMenu.classList.add("active");
};
closeMenuBtn.onclick = function () {
  mobileMenu.classList.remove("active");
};
