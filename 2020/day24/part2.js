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

var map = new Map();
for (var direction of data) {
  var position = [0,0];
  for (var d of direction) {
    if (d.includes("se")) {
      position[0] += 1;
      position[1] += 1;
    } else if (d.includes("sw")) {
      position[0] -= 1;
      position[1] += 1;
    } else if (d.includes("ne")) {
      position[0] += 1;
      position[1] -= 1;
    } else if (d.includes("nw")) {
      position[0] -= 1;
      position[1] -= 1;
    } else if (d.includes("e")) {
      position[0] += 2;
    } else if (d.includes("w")) {
      position[0] -= 2;
    }
  }
  var key = `${position[0]}:${position[1]}`;
  map.set(key, map.get(key) === "black" ? "white" : "black");
  if (map.get(key) === "black") {
    var adjacents = [ 
      [ position[0] + 1, position[1] + 1 ],  //se
      [ position[0] - 1, position[1] + 1 ],  //sw
      [ position[0] + 1, position[1] - 1 ],  //ne
      [ position[0] - 1, position[1] - 1 ],  //nw
      [ position[0] + 2, position[1] ],  //e
      [ position[0] - 2, position[1] ],  //w
    ].map((position) => {
      var key = `${position[0]}:${position[1]}`;
      if (map.get(key) !== "black") {
        map.set(key, "white");
      }
    });
  }
}

for (var days = 0;days<100;days++) {
  var newMap = new Map();
  for (var key of map.keys()) {
    var position = key.split(":").map(Number);
    var adjacents = [ 
      [ position[0] + 1, position[1] + 1 ],  //se
      [ position[0] - 1, position[1] + 1 ],  //sw
      [ position[0] + 1, position[1] - 1 ],  //ne
      [ position[0] - 1, position[1] - 1 ],  //nw
      [ position[0] + 2, position[1] ],  //e
      [ position[0] - 2, position[1]],  //w
    ];
    if (map.get(key) === "black") {
      var blacks = adjacents.map((position) => map.get(`${position[0]}:${position[1]}`) ?? "white").filter((tile) => tile === "black");
      if (blacks.length === 0 || blacks.length > 2) {
        newMap.set(key, "white");
      } else {
        newMap.set(key, "black");
      }
    } else {
      var blacks = adjacents.map((position) => map.get(`${position[0]}:${position[1]}`) ?? "white").filter((tile) => tile === "black");
      if (blacks.length === 2) {
        newMap.set(key, "black");
        adjacents.map((position) => {
          var key = `${position[0]}:${position[1]}`;
          if (newMap.get(key) !== "black") {
            newMap.set(key, "white");
          }
        });
      } else {
        newMap.set(key, "white");
      }
    }
  }
  map = newMap;
  var count = 0;
  for (var value of newMap.values()) {
    if (value === "black") {
      count++;
    }
  }
  console.log(count);
}
