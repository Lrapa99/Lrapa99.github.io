import toasts from "./toasts.js";
import response from "./response.js";

const d = document,
  $btnToast = d.getElementById("liveToastBtn"),
  $showInfoUsers = d.getElementById("show-info-users");

export default async function getData(url, typesDoc, doc, options = {}) {
  try {
    //!abort controller
    for (let num in typesDoc) {
      const { timeout = 180000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => {
        // console.log("aborting");
        controller.abort();
      }, timeout);
      // console.log("inicialTimeOut", id);

      const res = await fetch(url + `${typesDoc[num]}/${doc}`, {
        ...options,
        signal: controller.signal,
      });
      const json = await res.json();
      clearTimeout(id);
      // console.log("clearTimeOut", id);

      if (json.codigo == 100 && num == 7) {
        // console.log(json.codigo, doc, num);
        throw {
          name: "user-not-found",
          id: doc,
        };
      }
      if (json.codigo == 200) {
        const result = JSON.parse(json.jsonObject);
        // console.log(result);
        response(result);
        new Set(result);
      }
    }
  } catch (error) {
    const userNotFound = error.name === "user-not-found",
      aborted = error.name === "AbortError";

    if (userNotFound) {
      toasts(
        "❌Failed",
        `${error.name}`,
        `No se encontraron datos para éste documento: <strong>${error.id}</strong>, por favor intente nuevamente.`
      );
      $btnToast.click();
    }

    if (aborted) {
      //!mostras alerta👇
      $showInfoUsers.innerHTML = `
                  <div
          class="alert alert-danger animate__animated animate__pulse alert-dismissible fade show"
          role="alert"
        >
          <span id="msg-info-users">¡<strong>Hola</strong>, En el momento presentamos inconvenientes para obtener los datos, ésto puede tardar unos minutos, <strong>si el inconveniente persiste</strong>, por favor inténtelo más tarde...!</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>`;
      //!mostrar alerta☝️
      setTimeout(() => {
        d.querySelector(".alert").classList.remove("animate__pulse");
      }, 1000);
    }
  }
}
