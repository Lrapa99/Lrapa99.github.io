
$(document).ready(() => {

    //api coosalud
    let m = [];
    let dates = $("#dates");
    let baseUrl = "https://apiautogestion.coosalud.com/vAfiliado/GetByTipoDocAndDoc/";
    const tipDocumentos = {
        1: "CC",
        2: "TI",
        3: "RC",
        4: "CE",
        5: "PE",
        6: "PT",
        7: "SC"
    } //Add Otros TipDoc

    function copyContent(element) {
        seleccionaTexto(this);
        document.execCommand('copy');
    }

    function seleccionaTexto(element) {
        let doc = document,
            text = element,
            range,
            selection;
        if (doc.body.createTextRange) { //ms
            range = doc.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) { //all others
            selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }



    //enviar al DOM

    function respuesta(response) {
        //console.log(response);
        let SegundoApellido = response.segundo_apellido == null ? "" : response.segundo_apellido;
        let SegundoNombre = response.segundo_nombre == null ? "" : response.segundo_nombre;
        let reg = $(".table tbody tr").length + 1;
        //var nombreCompleto = response.primer_nombre + " " + SegundoNombre + " " + response.primer_apellido + " " + SegundoApellido
        let iconContributory = response.regimen === "C" ? '<i class="fa-solid fa-comment-dollar fa-fade" style="--fa-animation-duration: 2s; --fa-fade-opacity: 0.6"></i>' : '';

        $(".table tbody").append("<tr>" +
            "<th><span class='reg-tip-id'>" + response.tipo_identificacion + "</span></th>" +
            "<th><span class='reg-num-id'>" + response.numero_identificacion.trim() + "</span></th>" +
            "<td><span class='reg-name1'>" + response.primer_nombre + "</span></td>" +
            "<td><span class='reg-name2'>" + SegundoNombre + "</span></td>" +
            "<td><span class='reg-apellido1'>" + response.primer_apellido + "</span></td>" +
            "<td><span class='reg-apellido2'>" + SegundoApellido + "</span></td>" +
            //"<td><span class='reg-nombreCompleto'>" + nombreCompleto + "</span></td>" +
            "<td><span class='reg-fec-nac'>" + response.fecha_nacimiento + "</span></td>" +
            "<td><span class='reg-sexo'>" + response.sexo + "</span></td>" +
            "<td><span class='reg-ciudad'>" + response.nombreciudadafiliado + "</span></td>" +
            "<td><span class='reg-depart'>" + response.nombredepartamentoafiliado + "</span></td>" +
            "<td><span class='reg-ips'>" + response.ips_primaria + "</span></td>" +
            "<td><span class='reg-estado'>" + (response.estado == "AC" ? "ACTIVO" : "INACTIVO") + "</span></td>" +
            "<td><span class='reg-nivel_sisben'>" + response.nivel_sisben + "</span></td>" +
            "<td>" + iconContributory + "<span class='reg-regimen'>" + (response.regimen === "S" ? "SUBSIDIADO" : "CONTRIBUTIVO") + "</span></td>" +
            "<th><span class='reg-direccion'>" + response.direccion + "</span></th>" +
            "<th><span class='reg-celular'>" + response.celular + "</span></th>" +
            "<td><span>" + "<a target='_blank' class='link_certificate' href='" + "https://portalautogestion.coosalud.com/certificadoext?tipoDoc=" + response.tipo_identificacion + "&numDoc=" +
            response.numero_identificacion.trim() + "'><i class='fa-solid fa-file-arrow-down fa-beat-fade m-4'></i></a>" +
            "</tr>"
        );

        // Inicio Customization

        let regCesar = $(".table tbody tr td span.reg-depart:contains(CESAR)").parent().parent();

        let regValledupar = $("td span.reg-ciudad:contains(VALLEDUPAR)", regCesar).parent().parent();
        let regNotValledupar = $("td span.reg-ciudad", regCesar).parent().parent().not(regValledupar);

        let regCalidadMedica = $("td span.reg-ips:contains(CALIDAD MEDICA IPS)", regValledupar).parent().parent();
        let regNotCalidadMedica = $("td span.reg-ips", regValledupar).parent().parent().not(regCalidadMedica);

        let regRetired = $(".table tbody td span.reg-estado:contains(INACTIVO)").parent().parent();

        let regContributory = $(".table tbody td span.reg-regimen:contains(CONTRIBUTIVO)");
        // regContributory.addClass("badge text-bg-warning");
        regNotValledupar.addClass("reg-departament");
        regCalidadMedica.addClass("reg-allow");
        regNotCalidadMedica.addClass("reg-other");
        regRetired.addClass("reg-inactive");

        // Fin Customization


        // Contador de registros
        $('.search-section .count-register h5 span').text($(".table tbody tr").length);


        $(".reg-check").unbind("click");
        $(".reg-check").click(function () {
            let span = $(".reg-num-id", $(this).parent().parent().parent());
            span[0].click();
        });

        $("span[class^='reg-']").unbind("click");
        $("span[class^='reg-']").click(copyContent);

        if ($('#autodownload').prop('checked'))
            $(".table tbody td span a.link_certificate").last()[0].click();
    }

    $(".btn-remove-data").on("click", function () {

        m = [];

        $(".table tbody tr").fadeOut(500, function () {
            $(this).remove();
            $(window).scrollTop(0);
            $('.search-section .count-register h5  span').text($(".table tbody tr").length);
        });

        //remover animacion

        const removeanimateExportarExcel = $('.opciones #btnExportar i')

        const removeanimateBorrarTodo = $('.opciones #borrarTodo i')

        //console.log(removeanimateExportarExcel);

        //console.log(removeanimateBorrarTodo);

        removeanimateExportarExcel.removeClass("fa-bounce") && removeanimateBorrarTodo.removeClass("fa-bounce")


    });

    $(".btn-download-certificates").click(function () {
        let enlaces = $(".table tbody tr td a.link_certificate");

        $(enlaces).each(function (index, element) {
            element.click();
        });

        //   console.log(enlaces);

    });

    function consulta(doc, codtip) {

        let stt = new Object();
        stt.url = baseUrl + tipDocumentos[codtip] + "/" + doc;
        stt.async = true;
        stt.crossDomain = true;
        stt.method = "GET";


        $.ajax(stt).done(r => {
            //var dt = JSON.parse(r.jsonObject);
            //console.log(dt);

            /*
            console.log(dt.tipo_identificacion);
            console.log(dt.numero_identificacion);
            console.log(dt.primer_nombre);
            console.log(dt.primer_apellido);
            console.log(dt.fecha_nacimiento);
            console.log(dt.sexo);
            console.log(dt.regimen);
            console.log(dt.estado);*/

            //console.log(r.codigo);

            if (r.codigo == 100) {
                if (codtip < 7)
                    consulta(doc, codtip + 1);
            }
            else {
                let dt = JSON.parse(r.jsonObject);
                respuesta(dt);
                //console.log(dt);

                //agregar animaciones

                const animateExportarExcel = $('.opciones #btnExportar i')

                //console.log(animateExportarExcel);

                const animateBorrarTodo = $('.opciones #borrarTodo i')

                //console.log(animateBorrarTodo);

                r.codigo == 200 ? animateExportarExcel.addClass("fa-bounce") && animateBorrarTodo.addClass("fa-bounce") : ""


            }
        });
    }


    // boton buscar

    $(".btn-search").click(function (e) {

        if ($("#documento").val() == "") {
            e.preventDefault();
            // m = $("#documento").val().split("\t");

        } else {
            e.preventDefault();
            $('.search-section .count-register h5 span').text(0);

            m = $("#documento").val().split(" "); //separamos registros con un espacio

            $("#documento").val("");
            $(".table tbody").text("");
            for (var doc of m) {
                consulta(doc, 1);
            }



        }
    });



    //exportar excel

    const $btnExportar = document.querySelector("#btnExportar"),
        $tabla = document.querySelector("#tabla");
    $btnExportar.addEventListener("click", function (e) {

        if ($(".table tbody tr").length === 0) {
            e.preventDefault();
        } else {
            e.preventDefault();
            let tableExport = new TableExport($tabla, {
                exportButtons: false,
                filename: "ConsultaCoosalud",
                sheetname: "ResultadosConsultaMasiva",
            });
            let datos = tableExport.getExportData();
            let preferenciasDocumento = datos.tabla.xlsx;
            tableExport.export2file(preferenciasDocumento.data,
                preferenciasDocumento.mimeType,
                preferenciasDocumento.filename,
                preferenciasDocumento.fileExtension,
                preferenciasDocumento.merges,
                preferenciasDocumento.RTL,
                preferenciasDocumento.sheetname);
        }

    });



    //boton para ir arriba

    const btn_scrolltop = document.getElementById("btn_scrolltop")
    btn_scrolltop.addEventListener('click', () => {
        window.scrollTo(0, 0)
    })

    window.onscroll = () => {
        add_btn_scrolltop()
    }

    const add_btn_scrolltop = () => {
        if (window.scrollY < 300) {
            btn_scrolltop.classList.remove("btn-scrolltop-on")
        } else {
            btn_scrolltop.classList.add("btn-scrolltop-on")
        }
    }



    //boton dark mode

    const bdark = document.querySelector("#switch")
    const body = document.querySelector("body")

    const contadorRegistros = document.querySelector("#contador-registros")

    //console.log(contadorRegistros);


    load()


    bdark.addEventListener("click", e => {

        body.classList.toggle("dark-mode")

        bdark.classList.toggle("active")


        if (bdark.classList.contains("active")) {

            contadorRegistros.classList.remove("text-bg-primary")

            contadorRegistros.classList.add("text-bg-warning")

            //console.log(contadorRegistros);

        } else {

            contadorRegistros.classList.remove("text-bg-warning")

            contadorRegistros.classList.add("text-bg-primary")

            //console.log(contadorRegistros);
        }


        store(body.classList.contains("dark-mode"))



    })


    function load() {

        const darkMode = localStorage.getItem("dark-mode")

        if (!darkMode) {
            store("false")
        } else if (darkMode == "true") {
            body.classList.add("dark-mode")
            bdark.classList.toggle("active")

            contadorRegistros.classList.remove("text-bg-primary")

            contadorRegistros.classList.add("text-bg-warning")
        }

    }


    function store(value) {
        localStorage.setItem("dark-mode", value)
    }

    //console.log(bdark);
    //console.log(body);

});












