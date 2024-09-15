document.addEventListener("DOMContentLoaded", () => {
    // Sélectionner tous les éléments avec la classe 'hearts'
    const heartsContainers = document.querySelectorAll(".hearts");

    const createHeart = (container) => {
      const heart = document.createElement("span");
      const size = Math.random() * 30 + 26; // Taille aléatoire entre 26px et 56px
      const delay = Math.random() * 5; // Délai aléatoire entre 0s et 5s
      const duration = Math.random() * 10 + 5; // Durée aléatoire de 5s à 15s
      const leftPosition = Math.random() * 100; // Position aléatoire sur l'axe horizontal

      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.left = `${leftPosition}%`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.animationDuration = `${duration}s`;

      container.appendChild(heart);

      // Supprimer le cœur une fois l'animation terminée
      setTimeout(() => {
        heart.remove();
      }, (duration + delay) * 1000); // Supprimer après que l'animation est complète
    };

    // Pour chaque conteneur avec la classe 'hearts', créer un cœur toutes les 500 millisecondes
    heartsContainers.forEach((container) => {
      setInterval(() => createHeart(container), 500);
    });
  });