const fs = require("fs");
const requiredList = {
  byr: /^(\d+)$/, 
  iyr: /^(\d+)$/,
  eyr: /^(\d+)$/,
  hgt: /^(\d+)(cm|in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^(\d){9}$/,
  cid: /.*/
};

const data = fs.readFileSync("./sample.txt").toString().split("\n\n").map((line) => line.split(/\n| /).map((item) => item.split(":")));

console.log(data);

var validCount = 0;

for (const one of data) {
  const set = new Set(Object.keys(requiredList));
  for (const item of one) {
    if (item[1] != null && set.has(item[0])) {
      if (requiredList[item[0]].test(item[1])) {
        if (item[0] === "byr") {
          var byr = +item[1];
          if (byr >= 1920 && byr <= 2002)  {
            set.delete(item[0]);
          }
        } else if (item[0] === "iyr") {
          var iyr = +item[1];
          if (iyr >= 2010 && iyr <= 2020)  {
            set.delete(item[0]);
          }
        } else if (item[0] === "eyr") {
          var eyr = +item[1];
          if (eyr >= 2020 && eyr <= 2030)  {
            set.delete(item[0]);
          }
        } else if (item[0] === "hgt") {
          var [_, n, u] = /(\d+)(\w+)/.exec(item[1]);
          if (u === "cm" && n >= 150 && n <= 193)  {
            set.delete(item[0]);
          } else if (u === "in" && n >= 59 && n <= 76)  {
            set.delete(item[0]);
          }
        } else {
          set.delete(item[0]);
        }
      }
    }
  }

  if (set.size === 0) {
    validCount++;
  } else if (set.size === 1 && [...set][0] === "cid") {
    validCount++;
  } else {
    console.log("invalid", one, set);
  }
}

console.log(validCount);
