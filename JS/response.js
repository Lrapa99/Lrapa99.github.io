export default function data(data) {
  const $tabla = $("#tableUsers").DataTable();

  // Crear una fila de DataTables

  $tabla.row
    .add([
      data.tipo_identificacion,
      data.estado !== "AC"
        ? `<span class='text-danger text-decoration-line-through'>${data.numero_identificacion}</span>`
        : data.numero_identificacion,
      data.primer_nombre,
      data.segundo_nombre || "",
      data.primer_apellido,
      data.segundo_apellido || "",
      data.fecha_nacimiento,
      data.sexo,
      data.nombreciudadafiliado || "VALLEDUPAR",
      data.nombredepartamentoafiliado || "CESAR",
      data.ips_primaria || "Sin ips",
      data.estado === "AC"
        ? "<span class='text-success'>ACTIVO</span>"
        : "<span class='text-danger text-decoration-line-through'>INACTIVO</span>",
      data.nivel_sisben || "Sin sisben",
      data.regimen === "S" ? "SUBSIDIADO" : "CONTRIBUTIVO",
      data.direccion || "Sin dirección",
      data.celular || "Sin celular",
      `<a rel='link' title='Descargar certificado' href='https://portalautogestion.coosalud.com/certificadoext?tipoDoc=${data.tipo_identificacion}&numDoc=${data.numero_identificacion}'><i class='bx bxs-file-pdf fs-3 text-primary'></i></a>`,
    ])
    .draw(false);
}
