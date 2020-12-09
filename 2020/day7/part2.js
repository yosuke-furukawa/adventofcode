const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split(".\n").filter(Boolean).map((line) => {
  const [keyBag, values] = line.split(" bags contain ");
  const vs = values.split(", ").map((bag) =>  {
    if (bag === "no other bags") {
      return null
    }
    var val = /(\d+) (\w+ \w+) bag/.exec(bag)
    var obj = [val[2], val[1]];
    return obj;
  });
  return [keyBag, vs];
});
console.log(data);


let target = "shiny gold";
var result = 0;

var root = new Map();

for (var d of data) {
  for (var v of d[1]) {
    if (v == null) {
      continue;
    }
    if (root.has(d[0])) {
      root.get(d[0]).set(v[0], +v[1]);
    } else {
      var m = new Map();
      m.set(v[0], +v[1]);
      root.set(d[0], m);
    }
  }
}

var result = 0;
var traverse = (key, map, prev) => {
  var mp = map.get(key);
  if (mp == null) {
    return;
  }
  for (var m of mp.entries()) {
    console.log(m, root.get(m[0]), prev, result);
    result += prev * m[1];
    var next = prev * m[1];
    traverse(m[0], root, next);
  }
};

traverse(target, root, 1);
console.log(result);
