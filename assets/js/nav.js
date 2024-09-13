window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".site-navbar");
  if (window.scrollY > 50) {
    // Si la page est défilée de plus de 50px
    navbar.classList.add("sticky"); // Ajouter la classe 'sticky' pour rendre le navbar fixe
  } else {
    navbar.classList.remove("sticky"); // Supprimer la classe 'sticky' si on remonte en haut
  }
});
