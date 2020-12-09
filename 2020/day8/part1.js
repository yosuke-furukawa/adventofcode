const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").map((line) => line.split(" "));

var set = new Set();
var cursor = 0;
var variable = 0;

while(!set.has(cursor)) {
  console.log(cursor);
  set.add(cursor);

  var order = data[cursor];

  if (order[0] === "nop") {
    cursor++;
  } else if (order[0] === "acc") {
    variable += Number(order[1]);
    cursor++;
  } else if (order[0] === "jmp") {
    cursor += Number(order[1]);
  }
}

console.log("result ", variable);
