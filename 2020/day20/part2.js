const fs = require('fs');
var tileMap = {};
const data = fs.readFileSync("./sample.txt").toString().trim().split("\n\n").forEach((tile) => {
  let [tileId, ...tiles] = tile.split("\n");
  const id = +tileId.match(/(\d+)/)[0];
  tiles = tiles.map((line) => [...line]);
  tileMap[id] = tiles;
});

console.log(tileMap);

var edgeMap = {};

for (var key of Object.keys(tileMap)) {
  var tiles = tileMap[key];
  var n = tiles.length;
  var north = [];
  var south = [];
  var west = [];
  var east = [];
  for (var i=0;i<n;i++) {
    north[i] = tiles[i][0];
    south[i] = tiles[i][n-1];
    west[i] = tiles[0][i];
    east[i] = tiles[n-1][i];
  }
  edgeMap[key] = [north, south, west, east];
}

console.log(edgeMap);

var results = new Set();
var corner;
for (var i=0;i<Object.keys(edgeMap).length;i++) {
  var key = Object.keys(edgeMap)[i];
  var [north, south, west, east] = edgeMap[key].map((n) => n.join(""));
  var count = 0;
  var northwest = 0;
  if (check(key, north)) {
    count++;
    northwest++;
  }
  if (check(key, south)) {
    count++;
  }
  if (check(key, west)) {
    count++;
    northwest++;
  }
  if (check(key, east)) {
    count++;
  }
  if (count < 3) {
    if (northwest >= 2) {
      corner = key;
    }
    results.add(key);
  }
}

console.log(corner);

var queue = [[0,0,corner]];

var fullTile = [[corner]];
var set = new Set();
set.add(corner);
while(queue.length > 0) {
  var [tilePos1, tilePos2, key] = queue.shift();
  var [north, south, west, east] = edgeMap[key].map((n) => n.join(""));

  var northKey = check(key, north);
  var southKey = check(key, south);
  var westKey = check(key, west);
  var eastKey = check(key, east);
  if (northKey != false) {
  }
}

function getNeighbor(key, edge) {
  for (var j=0;j<Object.keys(edgeMap).length;j++) {
    var key2 = Object.keys(edgeMap)[j];
    if (key !== key2) {
      continue;
    }
    var straights = edgeMap[key2].map((n) => n.join(""));
    var reverses = edgeMap[key2].map((n) => n.reverse().join(""));
    straights.push(...reverses);
    if (straights.includes(edge)) {
      return key2;
    }
  }
  return false;
}

function check(key, edge) {
  for (var j=0;j<Object.keys(edgeMap).length;j++) {
    var key2 = Object.keys(edgeMap)[j];
    if (key === key2) {
      continue;
    }
    var straights = edgeMap[key2].map((n) => n.join(""));
    var reverses = edgeMap[key2].map((n) => n.reverse().join(""));
    straights.push(...reverses);
    if (straights.includes(edge)) {
      return true;
    }
  }
  return false;
}

console.log(results);
console.log(Array.from(results).reduce((acc, cur) => acc*(+cur), 1));
