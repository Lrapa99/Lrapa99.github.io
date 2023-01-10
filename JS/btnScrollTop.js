const d = document,
  w = window;

export default function btnScrollTop() {
  const $btn_scrolltop = d.getElementById("btn_scrolltop");
  d.addEventListener("click", (e) => {
    if (e.target === $btn_scrolltop || e.target.matches("#btn_scrolltop *")) {
      w.scrollTo(0, 0);
    }
  });

  w.onscroll = () => {
    add_btn_scrolltop();
  };

  const add_btn_scrolltop = () => {
    if (w.scrollY < 300) {
      $btn_scrolltop.classList.remove("btn-scrolltop-on");
    } else {
      $btn_scrolltop.classList.add("btn-scrolltop-on");
    }
  };
}
