const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n\n").map((line) => line.split("\n").filter(Boolean));

var result = 0;
for (var d of data) {
  var set = new Set([...d[0]]);
  for (var i=1;i<d.length;i++) {
    var ans = d[i];
    var set2 = new Set([...ans]);
    for (var a of set) {
      if (!set2.has(a)) {
        set.delete(a);
      }
    }
  }

  result += set.size;
}

console.log(result);
