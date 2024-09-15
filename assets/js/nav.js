(function () {
  const navbar = document.querySelector(".site-navbar");

  if (navbar && navbar.classList.contains("always-sticky")) {
    navbar.classList.add("sticky");
  }

  // Toujours écouter le défilement pour mettre à jour la classe sticky si nécessaire
  window.addEventListener("scroll", function () {
    if (!navbar.classList.contains("always-sticky")) {
      if (window.scrollY > 50) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  });
})();
