const fs = require("fs");

let maxAddr = 0;
const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) =>{
  const [key, value] = line.split(" = ");
  if (key.includes("mem")) {
    var addr = /mem\[(\d+)\]/.exec(key)[1];
    maxAddr = Math.max(maxAddr, +addr);
    return ["mem", +(addr).toString(2).padStart(36, "0"), +value];
  }
  return [key, value];
});

var mask = [];
var memory = {};

for (var d of data) {
  if (d[0] === "mask") {
    mask = d[1]; 
  } else if (d[0] === "mem") {
    const [mem, addr, value] = d;
    var addresses = bitmask(mask, addr);
    for (const address of addresses) {
      const addr = parseInt(address, 2);
      memory[addr] = value;
    }
  }
}

console.log([...Object.values(memory)].reduce((a, c) => a+c));

function bitmask(mask, value) {
  var temp = new Array(mask.length).fill(0);
  var bitValue = value.toString(2).padStart(36, "0");
  var xCount = 0;
  for (var i=mask.length-1;i>=0;i--) {
    if (mask[i] === "X") {
      temp[i] = "X"
      xCount++;
      continue;
    }
    temp[i] = bitValue[i] === "1" ? "1" : mask[i];
  }
  var results = [];
  for (var i=0;i<2**xCount;i++) {
    var str = [...(i).toString(2)];
    var r = [];
    for (var s=temp.length-1;s>=0;s--) {
      if (temp[s] === "X") {
        r[s] = str.pop() ?? "0";
      } else {
        r[s] = temp[s];
      }
    }
    results.push(r.join(""));
  }
  return results;
}
