const fs = require("fs");

let maxAddr = 0;
const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) =>{
  const [key, value] = line.split(" = ");
  if (key.includes("mem")) {
    var addr = /mem\[(\d+)\]/.exec(key)[1];
    maxAddr = Math.max(maxAddr, +addr);
    return ["mem", +addr, (+value).toString(2).padStart(36, "0")];
  }
  return [key, value];
});

var mask = [];
var memory = new Array(maxAddr).fill(0);

for (var d of data) {
  if (d[0] === "mask") {
    mask = d[1]; 
  } else if (d[0] === "mem") {
    const [mem, addr, value] = d;
    memory[addr] = parseInt(bitmask(mask, value).join(""), 2);
  }
}

console.log(memory);
console.log(memory.reduce((acc, cur) => acc + cur, 0));

function bitmask(mask, value) {
  var result = new Array(mask.length);
  var bitValue = value.toString(2);
  for (var i=mask.length-1;i>=0;i--) {
    if (mask[i] === "X") {
      result[i] = bitValue[i] ?? "0";
      continue;
    }
    result[i] = mask[i];
  }
  console.log(result);
  return result;
}
