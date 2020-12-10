const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map((line) => +line); 

const begin = 25;

for (var i=begin;i<data.length;i++) {
  var target = data[i];
  var array = data.slice(i-begin, i);
  var found = false;
  for (var j=0;j<array.length;j++) {
    for (var k=j+1;k<array.length;k++) {
      if (target === array[j] + array[k]) {
        found = true;
        break;
      }
    }
  }
  if (found === false) {
    console.log(target);
    break;
  }
}
