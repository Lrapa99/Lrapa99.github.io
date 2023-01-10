const d = document,
  $btnOpenModal = d.getElementById("show-modal"),
  $versionApp = d.getElementById("btn-version");

export default function showModalChangeVersions() {
  d.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target === $versionApp) $btnOpenModal.click();
  });
}
