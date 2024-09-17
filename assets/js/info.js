document.addEventListener("DOMContentLoaded", function () {
  const xmark = document.querySelector(".fa-regular.fa-circle-xmark.h2");

  xmark.addEventListener("mouseover", function () {
    xmark.classList.remove("fa-regular");
    xmark.classList.add("fa-solid");
  });

  xmark.addEventListener("mouseout", function () {
    xmark.classList.remove("fa-solid");
    xmark.classList.add("fa-regular");
  });
});
