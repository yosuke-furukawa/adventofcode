const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map((line) => +line); 

var target = 177777905;

for (var i=0;i<data.length;i++) {
  for (var j=i+1;j<data.length;j++) {
    var temp = data.slice(i, j);
    var sum = temp.reduce((acc, cur) => acc + cur);
    if (sum === target) {
      var min = Infinity;
      var max = 0;
      for (var k=0;k<temp.length;k++) {
        min = Math.min(temp[k], min);
        max = Math.max(temp[k], max);
      }
      console.log(min + max);
    }
  }
}
