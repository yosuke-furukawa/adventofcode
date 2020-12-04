const fs = require("fs");
const requiredList = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

const data = fs.readFileSync("./sample.txt").toString().split("\n\n").map((line) => line.split(/\n| /).map((item) => item.split(":")));

console.log(data);

var validCount = 0;

for (const one of data) {
  const set = new Set(requiredList);
  for (const item of one) {
    if (item[1] != null && set.has(item[0])) {
      set.delete(item[0]);
    }
  }

  if (set.size === 0) {
    validCount++;
    console.log("valid ", one);
  } else if (set.size === 1 && [...set][0] === "cid") {
    validCount++;
    console.log("valid ", one);
  } else {
    console.log("invalid", one, set);
  }
}

console.log(validCount);
