const d = document,
  $tbody = d.querySelector(".table tbody"),
  $count = d.querySelector(".count"),
  $notSearch = d.getElementById("not-search");

export default function clearData() {
  d.addEventListener("click", (e) => {
    if (
      e.target.matches("#btn-clear-all") ||
      e.target.matches("#btn-clear-all *")
    ) {
      if ($count.textContent > 0) {
        const del = confirm("Se eliminarán todos los datos...");
        if (del) {
          $tbody.textContent = "";
          $count.textContent = 0;
          $notSearch.classList.remove("d-none");
          d.querySelector("#btn-clear-all").classList.replace(
            "loader-visible",
            "loader-hidden"
          );
          d.querySelector("#btnExportar").classList.replace(
            "loader-visible",
            "loader-hidden"
          );
        }
      }
    }
  });
}
