const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n\n").map((line) => [...line].filter((x) => !/\W/.test(x)));

var result = 0;
for (var d of data) {
  var set = new Set(d);
  result += set.size;
}

console.log(result);
