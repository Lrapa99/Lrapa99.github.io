export default function toast(
  msg = "Agrega un mensaje",
  color = "primary",
  icon = "<i class='bx bxs-bell bx-tada' ></i>"
) {
  $(".toast-container").append(`
  <div class="toast align-items-center text-bg-${color} border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body">
      ${icon} ${msg}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>`);
  const toastElement = $(".toast:last");
  const toastInstance = new bootstrap.Toast(toastElement[0]);
  toastInstance.show();

  toastElement.on("hidden.bs.toast", function () {
    // Elimina el elemento del DOM después de que el toast se ha ocultado
    $(this).remove();
  });
}
