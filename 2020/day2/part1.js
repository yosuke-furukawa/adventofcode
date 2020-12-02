const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((l) => {
  const reg = /(\d+)-(\d+) (\w): (\w+)/g;
  const r = Array.from(l.matchAll(reg))[0];
  return {
    min: r[1],
    max: r[2],
    char: r[3],
    str: r[4]
  };
});

var validCount = 0;

for (const d of data) {
  var count = 0;
  for (const c of d.str) {
    if (c === d.char) {
      count++;
    }
  }

  console.log(count, d.min, d.max, d.char, d.str);
  if (count >= d.min && d.max >= count) {
    console.log("valid", validCount);
    validCount++;
  }
}

console.log(validCount);
