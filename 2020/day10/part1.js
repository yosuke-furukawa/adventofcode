const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => +line); 
const sort = data.sort((a, b) => a-b);

var oneNum = 1;
var threeNum = 1;
console.log(sort);

for (var i=1;i<sort.length;i++) {
  var a = sort[i-1];
  var b = sort[i];
  var diff = b - a;
console.log({diff});
  if (diff === 1) {
    oneNum++;
  } else if (diff === 3) {
    threeNum++;
  }
}
console.log(oneNum, threeNum);
console.log(oneNum * threeNum);

