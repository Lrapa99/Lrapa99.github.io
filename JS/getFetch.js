import response from "./response.js";
import toast from "./toast.js";

export default async function getData(url, typesDoc, doc, options = {}) {
  try {
    //!abort controller
    let abortedCount = 0;
    for (let num in typesDoc) {
      const { timeout = 8000 } = options;
      const controller = new AbortController();
      const id = setTimeout(() => {
        // console.log("aborting");
        controller.abort();
        abortedCount++;
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
          name: "usuario no encontrado",
          id: doc,
        };
      }
      if (json.codigo == 200) {
        const result = JSON.parse(json.jsonObject);
        // console.log(result);
        response(result);
        new Set(result);
      }

      // Mostrar la tostada solo si todas las solicitudes fueron abortadas
      if (abortedCount === Object.keys(typesDoc).length) {
        toast(
          `Todas las solicitudes fueron abortadas, por favor intenta nuevamente.`,
          "warning",
          "<i class='bx bxs-error bx-tada' ></i>"
        );
      }
    }
  } catch (error) {
    const userNotFound = error.name === "usuario no encontrado";
    if (userNotFound) {
      toast(
        `No se encontraron datos para éste documento: <strong>${error.id}</strong>, por favor intente nuevamente.`,
        "danger",
        "<i class='bx bxs-error bx-tada' ></i>"
      );
    }
  }
}
