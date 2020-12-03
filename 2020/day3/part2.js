
const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map((line) => {
  return [...line];
});

var posxIncs = [1, 3, 5, 7, 1];
var posyIncs = [1, 1, 1, 1, 2];

var result = 1;
for (var i=0;i<posxIncs.length;i++) {
  var posx = 0;
  var posy = 0;
  var x = posxIncs[i];
  var y = posyIncs[i];
  var treeCount = 0;
  while(posy < data.length-1) {
    posx += x;
    posy += y;
    if (posy >= data.length) {
      posy = data.length-1;
    }
    if (data[posy][posx%data[posy].length] === "#") {
      treeCount++;
    }
  }
  console.log(treeCount);
  result *= treeCount;
}
console.log(result);

