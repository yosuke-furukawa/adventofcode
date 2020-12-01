const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map(Number);
const num = 2020;

for (var i=0;i<data.length;i++) {
  const target = num - data[i];
  const targetIndex = data.indexOf(target);
  if (targetIndex >= 0 && targetIndex !== i) {
    console.log(data[targetIndex] * data[i]);
  }
}
