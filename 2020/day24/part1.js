const fs = require("fs");
const diagonals = ["se", "sw", "ne", "nw"];
const data = fs.readFileSync("./sample.txt").toString().trim().split("\n").map((line) => {
  var directions = [];
  for (var i=0;i<line.length;i++) {
    var c1 = line[i];
    var c2 = line[i+1];
    var dir = c1+c2;
    if (diagonals.includes(dir)) {
      directions.push(dir);
      i++;
    } else {
      directions.push(c1);
    }
  }
  return directions;
});
console.log(data);

const map = new Map();
for (var direction of data) {
  var position = [0,0];
  for (var d of direction) {
    if (d.includes("se")) {
      position[0] += 0.5;
      position[1] += 0.5;
    } else if (d.includes("sw")) {
      position[0] -= 0.5;
      position[1] += 0.5;
    } else if (d.includes("ne")) {
      position[0] += 0.5;
      position[1] -= 0.5;
    } else if (d.includes("nw")) {
      position[0] -= 0.5;
      position[1] -= 0.5;
    } else if (d.includes("e")) {
      position[0] += 1;
    } else if (d.includes("w")) {
      position[0] -= 1;
    }
  }
  var key = `${position[0]}:${position[1]}`;
  map.set(key, map.get(key) === "black" ? "white" : "black");
}

console.log(map);

var blackCount = 0;
for (var value of map.values()) {
  if (value === "black") {
    blackCount++;
  }
}

console.log(blackCount);
