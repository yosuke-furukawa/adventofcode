const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => +line); 
const sort = data.sort((a, b) => a-b);
sort.unshift(0);
sort.push(sort[sort.length-1]+3);

const dp = new Array(Math.max(...data) + 1).fill(0);
dp[0] = 1;
console.log(dp);

for (var i=1;i<dp.length;i++) {
  for (var x=1;x<4;x++) {
    console.log(i, i - x, sort.indexOf(i - x));
    if (sort.indexOf(i - x) >= 0) {
      dp[i] += dp[i - x];
    }
  }
}
console.log(dp);
console.log(dp[dp.length-1]);

