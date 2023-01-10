import getData from "./getFetch.js";
import inactiveScroll from "./inactiveScroll.js";

const d = document,
  $loader = d.getElementById("loader");

export default function asyncPromises(arr, { url, typesDoc }) {
  //! dividimos el array en 4 partes
  const newArrP1 = arr.splice(0, arr.length / 2),
    newArrP1_1 = newArrP1.splice(0, newArrP1.length / 2),
    newArrP2 = arr.splice(0, arr.length),
    newArrP2_2 = newArrP2.splice(0, newArrP2.length / 2);

  //!async Promises

  const getUser = async () => {
    $loader.classList.replace("loader-hidden", "loader-visible");
    const promises1 = await Promise.all(
      await newArrP1.map(async (el) => {
        await getData(url, typesDoc, el);
      })
    );
    // console.log("promise 1: finished");
    const promises2 = await Promise.all(
      await newArrP1_1.map(async (el) => {
        await getData(url, typesDoc, el);
      })
    );
    // console.log("promise 2: finished");
    const promises3 = await Promise.all(
      await newArrP2.map(async (el) => {
        const res = await getData(url, typesDoc, el);
        return res;
      })
    );
    // console.log("promise 3: finished");
    const promises4 = await Promise.all(
      await newArrP2_2.map(async (el) => {
        const res = await getData(url, typesDoc, el);
        return res;
      })
    );
    // console.log("promise 4: finished");

    $loader.classList.replace("loader-visible", "loader-hidden");
    inactiveScroll(0);
  };

  getUser();
}
