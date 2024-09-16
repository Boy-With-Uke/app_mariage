document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".js-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const xmark = document.querySelector(".xmark");

  // Fonction pour fermer le menu avec une animation
  function closeMenu() {
    mobileMenu.classList.remove("active"); // Retirer l'animation
    setTimeout(() => {
      mobileMenu.style.display = "none"; // Masquer après l'animation
    }, 300); // Délai correspondant à la durée de l'animation (0.3s)
  }

  // Fonction pour ouvrir le menu avec une animation
  function openMenu() {
    mobileMenu.style.display = "block"; // Afficher le menu
    setTimeout(() => {
      mobileMenu.classList.add("active"); // Lancer l'animation
    }, 10); // Légère attente pour permettre à "display" d'être pris en compte
  }

  // Ouvrir/fermer le menu avec le bouton hamburger
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function (e) {
      if (mobileMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Fermer le menu en cliquant sur le bouton Xmark
  if (xmark) {
    xmark.addEventListener("click", function () {
      closeMenu();
    });
  }

  // Fermer le menu en cliquant en dehors du menu
  document.addEventListener("click", function (e) {
    const isClickInside =
      mobileMenu.contains(e.target) || toggle.contains(e.target);

    if (!isClickInside && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
