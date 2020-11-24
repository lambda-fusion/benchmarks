const fs = require("fs");

const dir = process.argv[2];

const files = fs.readdirSync(dir);
const configs = files.filter((val) => val.startsWith("config"));
console.log(configs);

const resultArray = configs.map((fileName) => {
  const configFileRaw = fs.readFileSync(`${dir}/${fileName}`);
  const configFile = JSON.parse(configFileRaw);
  const max = Math.max(
    ...configFile
      .filter((entry) => !!entry.averageDuration)
      .map((entry) => entry.averageDuration)
  );
  const min = Math.min(
    ...configFile
      .filter((entry) => !!entry.averageDuration)
      .map((entry) => entry.averageDuration)
  );
  const average = configFile[configFile.length - 1].averageDuration;
  return { min, max, average };
});
console.log(resultArray);

const result = resultArray.reduce((prev, curr, i) => {
  return {
    min: (prev.min * i + curr.min) / (i + 1),
    max: (prev.max * i + curr.max) / (i + 1),
    average: (prev.average * i + curr.average) / (i + 1),
  };
});
console.log(result);
