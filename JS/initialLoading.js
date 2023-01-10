const d = document,
  w = window,
  $loading = d.getElementById("initial-loading"),
  $allContentApp = d.getElementById("all-content-app");

export default function initialLoading() {
  // console.log("loading...");
  setTimeout(() => {
    $loading.classList.add("d-none");
    $allContentApp.classList.remove("d-none");
    // console.log("loaded");
  }, 2000);
}
