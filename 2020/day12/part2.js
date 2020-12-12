const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => /(\w)(\d+)/.exec(line).slice(1,3)); 
console.log(data);

var position = [0, 0];
var waypoint = [-1, 10];

for (const [order, v] of data) {
  const value = +v;
  if (order === "F") {
    position[0] += value * waypoint[0];
    position[1] += value * waypoint[1];
  } else if (order === "N") {
    waypoint[0] -= value;
  } else if (order === "E") {
    waypoint[1] += value;
  } else if (order === "W") {
    waypoint[1] -= value;
  } else if (order === "S") {
    waypoint[0] += value;
  } else if (order === "R") {
    if (value === 90) {
      [waypoint[1], waypoint[0]] = [-1 * waypoint[0], waypoint[1]];
    } else if (value === 180) {
      [waypoint[0], waypoint[1]] = [-1 * waypoint[0], -1 * waypoint[1]];
    } else if (value === 270) {
      [waypoint[1], waypoint[0]] = [waypoint[0], -1 * waypoint[1]];
    }
  } else if (order === "L") {
    if (value === 90) {
      [waypoint[1], waypoint[0]] = [waypoint[0], -1 * waypoint[1]];
    } else if (value === 180) {
      [waypoint[0], waypoint[1]] = [-1 * waypoint[0], -1 * waypoint[1]];
    } else if (value === 270) {
      [waypoint[1], waypoint[0]] = [-1 * waypoint[0], waypoint[1]];
    }
  }
}

console.log(position[0], position[1]);
console.log(Math.abs(position[0]) + Math.abs(position[1]));


