const d = document,
  $tbody = d.querySelector(".table tbody"),
  $template = d.getElementById("template-row-data").content,
  $fragment = d.createDocumentFragment(),
  $count = d.querySelector(".count"),
  $notSearch = d.getElementById("not-search");

export default function data(data) {
  // console.log("data", data);

  let SegundoApellido =
    data.segundo_apellido == null ? "" : data.segundo_apellido;
  let SegundoNombre = data.segundo_nombre == null ? "" : data.segundo_nombre;

  $template.getElementById("t-doc").textContent = data.tipo_identificacion;
  $template.getElementById("num-doc").textContent = data.numero_identificacion;
  $template.getElementById("name1").textContent = data.primer_nombre;
  $template.getElementById("name2").textContent = SegundoNombre;
  $template.getElementById("lastname1").textContent = data.primer_apellido;
  $template.getElementById("lastname2").textContent = SegundoApellido;
  $template.getElementById("f-nac").textContent = data.fecha_nacimiento;
  $template.getElementById("sexo").textContent = data.sexo;
  $template.getElementById("ciudad").textContent =
    data.nombreciudadafiliado == "" ? "VALLEDUPAR" : data.nombreciudadafiliado;
  $template.getElementById("depart").textContent =
    data.nombredepartamentoafiliado == ""
      ? "CESAR"
      : data.nombredepartamentoafiliado;
  $template.getElementById("ips").textContent =
    data.ips_primaria == "" ? "Sin ips" : data.ips_primaria;
  $template.getElementById("estado").textContent =
    data.estado == "AC" ? "ACTIVO" : "INACTIVO";

  if (data.estado !== "AC") {
    $template
      .getElementById("estado")
      .classList.add("text-decoration-line-through", "text-danger");
    $template
      .getElementById("num-doc")
      .classList.add("text-decoration-line-through", "text-danger");
  } else {
    $template
      .getElementById("estado")
      .classList.remove("text-decoration-line-through", "text-danger");
    $template
      .getElementById("num-doc")
      .classList.remove("text-decoration-line-through", "text-danger");
  }

  $template.getElementById("sisben").textContent =
    data.nivel_sisben == "" ? "Sin sisben" : data.nivel_sisben;
  $template.getElementById("regimen").textContent =
    data.regimen === "S" ? "SUBSIDIADO" : "CONTRIBUTIVO";
  $template.getElementById("direccion").textContent =
    data.direccion == "" ? "Sin dirección" : data.direccion;
  $template.getElementById("celular").textContent =
    data.celular == "" ? "Sin celular" : data.celular;

  let url = `https://portalautogestion.coosalud.com/certificadoext?tipoDoc=${data.tipo_identificacion}&numDoc=${data.numero_identificacion}`;

  let downCertification = `<a rel='link' title='Descargar certificado' href="${url}"><i class='bx bxs-file-doc fs-3 text-danger text-opacity-75'></i></a>`;

  $template.getElementById("certificado").innerHTML = downCertification;

  let $clone = d.importNode($template, true);

  $fragment.appendChild($clone);

  $notSearch.classList.add("d-none");

  $tbody.appendChild($fragment);

  const tbodyLength = new Array(d.querySelectorAll(".table tbody tr"))[0]
    .length;

  $count.textContent = tbodyLength;

  d.querySelector("#btn-clear-all").classList.replace(
    "loader-hidden",
    "loader-visible"
  );
  d.querySelector("#btnExportar").classList.replace(
    "loader-hidden",
    "loader-visible"
  );
}
