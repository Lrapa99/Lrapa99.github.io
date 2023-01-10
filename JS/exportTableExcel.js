const d = document,
  $btnExportar = d.querySelector("#btnExportar"),
  $tabla = d.querySelector("#tabla"),
  $count = d.querySelector(".count");

export default function exportTableExcel() {
  d.addEventListener("click", (e) => {
    if (e.target === $btnExportar) {
      if ($count.textContent > 0) {
        e.preventDefault();
        const tableExport = new TableExport($tabla, {
          exportButtons: false,
          filename: "GetUsers_Data",
          sheetname: "TableUsers",
        });
        const datos = tableExport.getExportData();
        const preferenciasDocumento = datos.tabla.xlsx;
        tableExport.export2file(
          preferenciasDocumento.data,
          preferenciasDocumento.mimeType,
          preferenciasDocumento.filename,
          preferenciasDocumento.fileExtension,
          preferenciasDocumento.merges,
          preferenciasDocumento.RTL,
          preferenciasDocumento.sheetname
        );
      }
    }
  });
}
