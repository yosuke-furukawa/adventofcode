const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n");
const busIds = data[1].split(",").map((n) => n === "x" ? n : BigInt(n));

const totalProd = busIds.filter((x) => x !== "x").reduce((acc, cur) => acc * cur, 1n)

var sum = 0n;
for (var i=0n;i<busIds.length;i++) {
  const busId = busIds[i];
  if (busId === "x") {
    continue;
  }
  
  const p = totalProd / busId;
  const r = p % busId;
  var x = mmi(p, busId);

  sum += (busId - i) * x * p;
}

function mmi(a, mod) {
  const b = a % mod;
  for (let x = 1n; x < mod; x++) {
    if ((b * x) % mod === 1n) {
      return x;
    }
  }
  return 1n;
}

console.log(sum % totalProd);

