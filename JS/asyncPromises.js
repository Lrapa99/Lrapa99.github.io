import getData from "./getFetch.js";

export default function asyncPromises(arr, { url, typesDoc }) {
  const chunkSize = Math.ceil(arr.length / 4);
  const processChunk = async (chunk) => {
    $(".spinner").show("slow");
    await $.when(...chunk.map((el) => getData(url, typesDoc, el)));
    $(".spinner").hide("slow");
  };

  const processChunks = async () => {
    for (let i = 0; i < 4; i++) {
      const startIdx = i * chunkSize;
      const endIdx = startIdx + chunkSize;
      const chunk = arr.slice(startIdx, endIdx);
      await processChunk(chunk);
      // console.log(`promise ${i + 1}: finished`);
    }
  };

  processChunks();
}
