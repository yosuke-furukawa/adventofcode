const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((l) => {
  const reg = /(\d+)-(\d+) (\w): (\w+)/g;
  const r = Array.from(l.matchAll(reg))[0];
  return {
    pos1: r[1],
    pos2: r[2],
    char: r[3],
    str: r[4]
  };
});

var validCount = 0;

for (const d of data) {
  var count = 0;
  var p1 = d.str[d.pos1-1];
  var p2 = d.str[d.pos2-1];
  if (p1 !== d.char && p2 === d.char) {
    validCount++;
  } else if (p1 === d.char && p2 !== d.char) {
    validCount++;
  }
}

console.log(validCount);
