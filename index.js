import networkStatus from "./JS/deteccionRed.js";
import query from "./JS/query.js";

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

$(d).ready(function () {
  let currentYearElement = $("#currentYear"),
    currentYear = new Date().getFullYear();
  currentYearElement.text(currentYear);
  $(w).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });
  networkStatus();
  $(".spinner").hide("slow");
  query(url, typesDoc);
  $("#tableUsers").DataTable({
    // responsive: false,
    scrollX: true,
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
      buttons: {
        copyTitle: "Copiar al portapapeles",
        copySuccess: {
          _: "%d filas copiadas",
          1: "1 fila copiada",
        },
      },
    },
    dom: "<B<'d-flex justify-content-between my-3 flex-wrap gap-2'lf>rtip>",
    buttons: {
      buttons: [
        {
          extend: "copy",
          text: "<i class='bx bx-copy'></i>",
          titleAttr: "Copiar",
          className: "btn btn-primary",
        },
        {
          extend: "excel",
          text: "<i class='bx bxs-file-export'></i>",
          titleAttr: "Excel",
          className: "btn btn-success",
        },
        {
          extend: "colvis",
          text: "Filtrar columnas",
        },
      ],
    },
    columnDefs: [
      {
        /* índices de las columnas que deseas filtrar */
        targets: [3, 5, 14, 15],
        visible: false,
      },
    ],
  });
  // Agregar animación a la tabla después de la inicialización de DataTables
  $("#tableUsers").parent().addClass("animate__animated animate__fadeInDown");
});
