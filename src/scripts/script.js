const menuBtn = document.getElementById("menuBtn");
const navigationMenu = document.getElementById("navigationMenu");
const menuIcon = menuBtn.querySelector("i");

function updateMenuState(isOpen) {
  navigationMenu.classList.toggle("hidden", !isOpen);
  navigationMenu.classList.toggle("flex", isOpen);

  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação",
  );

  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
}

menuBtn.addEventListener("click", () => {
  const isCurrentlyExpanded = menuBtn.getAttribute("aria-expanded") === "true";
  updateMenuState(!isCurrentlyExpanded);
});

// Fecha o menu ao clicar em algum link
navigationMenu.addEventListener("click", (event) => {
  const isNavLink = event.target.closest("a");
  if (isNavLink) updateMenuState(false);
});

// Fecha o menu usando a tecla Esc
document.addEventListener("keydown", (event) => {
  const isMenuOpen = menuBtn.getAttribute("aria-expanded") === "true";

  if (event.key === "Escape" && isMenuOpen) {
    updateMenuState(false);
    menuBtn.focus();
  }
});

// Fecha o menu ao clicar fora
document.addEventListener("click", (event) => {
  const isMenuOpen = menuBtn.getAttribute("aria-expanded") === "true";
  if (!isMenuOpen) return;

  const clickedInsideMenu = navigationMenu.contains(event.target);
  const clickedOnButton = menuBtn.contains(event.target);

  if (!clickedInsideMenu && !clickedOnButton) {
    updateMenuState(false);
  }
});
