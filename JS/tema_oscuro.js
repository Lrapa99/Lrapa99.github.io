const d = document,
  ls = localStorage;

export default function darkTheme() {
  const $contentIcons = d.getElementById("content-icons"),
    $selectors = d.querySelectorAll("[data-dark]"),
    $btnCloseModal = d.getElementById("btn-close-v");

  // console.log($selectors);

  const lightMode = () => {
    $selectors.forEach((el) => el.classList.remove("dark-mode"));
    $contentIcons.removeChild($contentIcons.firstElementChild);
    $contentIcons.insertAdjacentHTML(
      "afterbegin",
      `<a href="#" title="Modo oscuro" class="btn"><i id="btn-darkMode"     
         class="bx bx-moon fs-3"></i></a>`
    );
    $btnCloseModal.classList.remove("btn-close-white");

    ls.setItem("theme", "light");
  };

  const darkMode = () => {
    $selectors.forEach((el) => el.classList.add("dark-mode"));
    $contentIcons.removeChild($contentIcons.firstElementChild);
    $contentIcons.insertAdjacentHTML(
      "afterbegin",
      `<a href="#" title="Modo claro" class="btn btn-lightMode"><i id="btn-lightMode" 
         class="bx bx-sun fs-3"></i></a>`
    );

    $btnCloseModal.classList.add("btn-close-white");

    ls.setItem("theme", "dark");
  };

  d.addEventListener("click", (e) => {
    const $btnDarkMode = d.getElementById("btn-darkMode");
    if (e.target === $btnDarkMode) {
      // console.log(e.target);

      darkMode();
    }
    const $btnLightMode = d.getElementById("btn-lightMode");

    if (e.target === $btnLightMode) {
      // console.log(e.target);

      lightMode();
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
    if (ls.getItem("theme") === "light") lightMode();
    if (ls.getItem("theme") === "dark") darkMode();
  });
}
