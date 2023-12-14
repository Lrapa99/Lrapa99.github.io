import toast from "./toast.js";

export default function networkStatus() {
  const isOnline = () => {
    if (navigator.onLine) {
      toast(
        "Conectado a Internet",
        "primary",
        "<i class='bx bx-wifi bx-tada' ></i>"
      );
    } else {
      toast(
        "Desconectado de Internet",
        "danger",
        "<i class='bx bx-wifi-off bx-tada' ></i>"
      );
    }
  };

  $(window).on("online offline", (e) => isOnline());
}
