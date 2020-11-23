const fs = require("fs");

const config1_Raw = fs.readFileSync(
  "./configurations_hillclimbing_parallel_sync_1024MB_1.json"
);
const config2_Raw = fs.readFileSync(
  "./configurations_hillclimbing_parallel_sync_1024MB_2.json"
);
const config3_Raw = fs.readFileSync(
  "./configurations_hillclimbing_parallel_sync_1024MB_3.json"
);

const config1 = JSON.parse(config1_Raw);
const config2 = JSON.parse(config2_Raw);
const config3 = JSON.parse(config3_Raw);
const max1 = Math.max(
  ...config1
    .filter((entry) => !!entry.averageDuration)
    .map((entry) => entry.averageDuration)
);
const max2 = Math.max(
  ...config2
    .filter((entry) => !!entry.averageDuration)
    .map((entry) => entry.averageDuration)
);
const max3 = Math.max(
  ...config3
    .filter((entry) => !!entry.averageDuration)
    .map((entry) => entry.averageDuration)
);

console.log(max1, max2, max3);

const last1 = config1[config1.length - 1];
const last2 = config2[config2.length - 1];
const last3 = config3[config3.length - 1];

const averageRuntime = Math.round(
  (last1.averageDuration + last2.averageDuration + last3.averageDuration) / 3
);
console.log("average runtime", averageRuntime);
console.log("max runtime", (max1 + max2 + max3) / 3);
console.log(
  "average iterations",
  (config1.length + config2.length + config3.length) / 3
);
