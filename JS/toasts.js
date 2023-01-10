export default function toasts(
  strongTitle = "strongTitle",
  smallTitle = "smallTitle",
  msgBody = "messageBody"
) {
  const toastTrigger = document.getElementById("liveToastBtn"),
    toastLiveExample = document.getElementById("liveToast"),
    $toastStrongTitle = document.getElementById("toast-strong-title"),
    $toastSmallTitle = document.getElementById("toast-small-title"),
    $toastMsgBody = document.getElementById("toast-msg-body");

  if (toastTrigger) {
    toastTrigger.addEventListener("click", () => {
      const toast = new bootstrap.Toast(toastLiveExample);
      $toastStrongTitle.innerHTML = strongTitle;
      $toastSmallTitle.innerHTML = smallTitle;
      $toastMsgBody.innerHTML = msgBody;
      toast.show();
    });
  }
}
