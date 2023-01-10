const d = document,
  w = window;

export default function inactiveScroll(value) {
  value === 1
    ? d.body.classList.add("stop-scrolling")
    : d.body.classList.remove("stop-scrolling");
}
