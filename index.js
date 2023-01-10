import clearData from "./JS/btnClearData.js";
import btnScrollTop from "./JS/btnScrollTop.js";
import networkStatus from "./JS/deteccion_red.js";
import exportTableExcel from "./JS/exportTableExcel.js";
import inactiveScroll from "./JS/inactiveScroll.js";
import initialLoading from "./JS/initialLoading.js";
import query from "./JS/query.js";
import showModalChangeVersions from "./JS/showModalChangeVersions.js";
import darkTheme from "./JS/tema_oscuro.js";

const d = document,
  w = window,
  url = "https://apiautogestion.coosalud.com/vAfiliado/GetByTipoDocAndDoc/",
  typesDoc = {
    1: "CC",
    2: "TI",
    3: "RC",
    4: "CE",
    5: "PE",
    6: "PT",
    7: "SC",
  };

w.addEventListener("load", (e) => {
  initialLoading();
});

d.addEventListener("DOMContentLoaded", (e) => {
  query(url, typesDoc);
  showModalChangeVersions();
  inactiveScroll(1);
  clearData();
  btnScrollTop();
  exportTableExcel();
});

darkTheme();
networkStatus();
