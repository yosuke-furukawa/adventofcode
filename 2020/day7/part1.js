const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split(".\n").filter(Boolean).map((line) => {
  const [keyBag, values] = line.split(" bags contain ");
  const vs = values.split(", ").map((bag) =>  bag === "no other bags" ? null : /\d+ (\w+ \w+) bag/.exec(bag)[1]);
  return [keyBag, vs];
});

const root = new Map();

for (var d of data) {
  for (var bag of d[1]) {
    if (bag && root.has(bag)) {
      root.get(bag).add(d[0]);
    } else {
      root.set(bag, new Set([d[0]]));
    }
  }
}

console.log(root);

const target = "shiny gold";
const result = new Set();
const queue = [...root.get(target)];
console.log(root.get(target))

while(queue.length > 0) {
  const q = queue.shift();
  result.add(q);
  const val = root.get(q);
  if (val == null) {
    continue;
  }
  for (var n of val) {
    if (!result.has(n)) {
      queue.push(n);
    }
  }
}

console.log(result);
