const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => /(\w)(\d+)/.exec(line).slice(1,3)); 
console.log(data);

var direction = 0;
var position = [0, 0];

for (const [order, v] of data) {
  const value = +v;
  if (order === "F") {
    if (direction === 90) {
      position[0] -= value;
    } else if (direction === 0) {
      position[1] += value;
    } else if (direction === 180) {
      position[1] -= value;
    } else if (direction === 270) {
      position[0] += value;
    }
  } else if (order === "N") {
    position[0] -= value;
  } else if (order === "E") {
    position[1] += value;
  } else if (order === "W") {
    position[1] -= value;
  } else if (order === "S") {
    position[0] += value;
  } else if (order === "R") {
    direction -= value;
    if (direction < 0) {
      direction += 360;
    }
    direction %= 360;
  } else if (order === "L") {
    direction += value;
    direction %= 360;
  }
}

console.log(position[0], position[1]);
console.log(Math.abs(position[0]) + Math.abs(position[1]));

