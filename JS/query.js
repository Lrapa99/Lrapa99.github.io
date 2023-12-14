import asyncPromises from "./asyncPromises.js";
import getData from "./getFetch.js";

const $inputDocs = $("#allDocuments");

function isValidDocument(value) {
  return value.length >= 5 && /^[0-9]*$/.test(value);
}

function processDocuments(url, typesDoc, documents) {
  const uniqueDocuments = Array.from(new Set(documents));

  const validDocuments = uniqueDocuments.filter(isValidDocument);

  if (validDocuments.length > 3000) {
    validDocuments.splice(3000, validDocuments.length);
  }

  $inputDocs.val("");

  if (validDocuments.length <= 1000) {
    $(".spinner").show("slow");
    $.when(...validDocuments.map((el) => getData(url, typesDoc, el))).then(
      () => {
        // console.log("Promise finished");
        $(".spinner").hide("slow");
      }
    );
  } else if (validDocuments.length > 1000 && validDocuments.length <= 3000) {
    asyncPromises(validDocuments, { url, typesDoc });
  }
}

export default function query(url, typesDoc) {
  $(document).on("click", "#btn-buscar", function (e) {
    if ($(this).is(e.target) || $(e.target).closest(this).length > 0) {
      let inputDocsValues = $inputDocs.val() || null;
      if (inputDocsValues) {
        e.preventDefault();

        const documents = inputDocsValues.split(" ");
        // console.log(documents);

        processDocuments(url, typesDoc, documents);
      }
    }
  });
}
