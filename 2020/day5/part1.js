const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean);

const rows = 128;
const rowby = 8;
const columns = 8;

console.log(data);

var max = 0;
for (var line of data) {
  var row = [0, rows - 1];
  var col = [0, columns - 1];
  for (var char of line) {
    if (char === "F") {
      row = [row[0], Math.floor((row[0] + row[1])/2)];
    } else if (char === "B") {
      row = [Math.ceil((row[0] + row[1])/2), row[1]];
    } else if (char === "L") {
      col = [col[0], Math.floor((col[0] + col[1])/2)];
    } else if (char === "R") {
      col = [Math.ceil((col[0] + col[1])/2), col[1]];
    }
  }
  var res = row[0] * rowby + col[0];
  max = Math.max(max, res);
}

console.log(max);
