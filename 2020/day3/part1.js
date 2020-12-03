
const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map((line) => {
  return [...line];
});

console.log(data);

var posx = 0;
var posy = 0;

var treeCount = 0;

while(posy < data.length-1) {
  posx += 3;
  posy += 1;
console.log(data[posy], posy);
  if (data[posy][posx%data[posy].length] === "#") {
    treeCount++;
  }
}

console.log(treeCount);
