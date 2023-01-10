import toasts from "./toasts.js";

const d = document,
  w = window,
  n = navigator;

export default function networkStatus() {
  const $btnToast = d.getElementById("liveToastBtn");
  const isOnline = () => {
    if (n.onLine) {
      toasts(
        "✅NetworkStatus",
        "ok network",
        "Se restableció la conexión a internet."
      );
      $btnToast.click();
    } else {
      toasts(
        "❌NetworkStatus",
        "fail network",
        "Se ha perdido la conexión a internet."
      );
      $btnToast.click();
    }
  };

  w.addEventListener("online", (e) => isOnline());

  w.addEventListener("offline", (e) => isOnline());
}
