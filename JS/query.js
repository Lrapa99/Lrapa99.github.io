import asyncPromises from "./asyncPromises.js";
import getData from "./getFetch.js";
import inactiveScroll from "./inactiveScroll.js";

const d = document,
  $inputDocs = d.getElementById("allDocuments"),
  $loader = d.getElementById("loader"),
  $showInfoUsers = d.getElementById("show-info-users");

export default function query(url, typesDoc) {
  d.addEventListener("click", (e) => {
    if (e.target.matches("#btn-buscar")) {
      let inputDocsValues = $inputDocs.value || null;
      if (inputDocsValues) {
        e.preventDefault();

        const allDoc = new Set(inputDocsValues.split(" ")); //!obtenemos valores unicos

        const arrSinDuplicado = Array.from(allDoc); //!convertimos en un array

        if (arrSinDuplicado.length > 3000) {
          arrSinDuplicado.splice(3000, arrSinDuplicado.length);
        }

        // console.log(arrSinDuplicado.length);

        if (arrSinDuplicado.length > 50) {
          //!mostras alerta👇
          $showInfoUsers.innerHTML = `
                  <div
          class="alert alert-warning animate__animated animate__fadeInDown alert-dismissible fade show"
          role="alert"
        >
          <span id="msg-info-users">¡<strong>Hola</strong>, Éste proceso   
puede tardar unos minutos,<strong> dependiendo de su velocidad de internet y   
de la cantidad de datos a consultar</strong>, por favor sea paciente...!</span>
          <button
          id="btn-close-alert"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>`;
          //!mostrar alerta☝️
        }
        setTimeout(() => {
          d.querySelector(".alert").classList.remove("animate__fadeInDown");
        }, 1000);

        $inputDocs.value = "";
        if (arrSinDuplicado.length <= 1000) {
          (async () => {
            $loader.classList.replace("loader-hidden", "loader-visible");
            const promise = await Promise.all(
              await arrSinDuplicado.map(async (el) => {
                await getData(url, typesDoc, el);
              })
            );
            // console.log("promise finished");
            $loader.classList.replace("loader-visible", "loader-hidden");
            inactiveScroll(0);
          })();
        }

        if (arrSinDuplicado.length > 1000 && arrSinDuplicado.length <= 3000) {
          //! async Promises
          asyncPromises(arrSinDuplicado, { url, typesDoc });
        }
      }
    }
  });
}
