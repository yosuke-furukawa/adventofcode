const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n");
const timestamp = +data[0];
const busIds = data[1].split(",").filter((x) => x !== "x").map((n) => +n);

var minTime = Infinity;
var resId = 0;
for (const id of busIds) {
  var busTime = parseInt(timestamp / id) * id + id;
  if (minTime > busTime - timestamp) {
    minTime = busTime - timestamp;
    resId = id;
  }
}

console.log(minTime * resId);
