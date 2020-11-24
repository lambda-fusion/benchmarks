const { readdirSync, lstatSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const filterDirectories = (source) =>
  lstatSync(source).isDirectory() &&
  !source.startsWith(".") &&
  source !== "visualization";

const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(filterDirectories);

const average = (fields) => (prev, curr, i) => {
  let output = {};
  fields.forEach((field) => {
    output[field] = (prev[field] * i + curr[field]) / (i + 1);
  });
  return output;
};

const dirs = getDirectories("./");

console.log(dirs);

dirs.forEach((dir) => {
  const files = readdirSync(dir);
  const resultFiles = files.filter((val) => val.startsWith("result"));

  const resultArray = resultFiles.map((fileName) => {
    const resultFileRaw = readFileSync(`${dir}/${fileName}`);
    const resultFile = JSON.parse(resultFileRaw);
    let lastIndex = resultFile[resultFile.length - 1].lambdasCount;
    let sumBilledDuration = 0;
    let sumMemoryAllocated = 0;

    let i = resultFile.length - 1;
    for (
      i = resultFile.length - 1;
      lastIndex === resultFile[i].lambdasCount;
      i--
    ) {
      const entry = resultFile[i];
      const { totalBilledDuration, totalMemoryAllocated, lambdasCount } = entry;
      sumBilledDuration += totalBilledDuration || 0;
      sumMemoryAllocated += totalMemoryAllocated || 0;
    }
    return {
      billedDuration: sumBilledDuration / (resultFile.length - i),
      memoryAllocated: sumMemoryAllocated / (resultFile.length - i),
    };
  });
  if (resultArray.length > 0) {
    const res = (resultArray || []).reduce(
      average(["billedDuration", "memoryAllocated"])
    );
    console.log(res);
    writeFileSync(`${dir}/output_result.json`, JSON.stringify(res));
  }
});
