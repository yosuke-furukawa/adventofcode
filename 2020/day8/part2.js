const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => line.split(" "));

var answer = false;
for (var i=0;i<data.length;i++) {
  if (data[i][0] === "jmp") {
    data[i][0] = "nop";
  } else if (data[i][0] === "nop") {
    data[i][0] = "jmp";
  } else {
    continue;
  }
  answer = check(data);
  if (answer === false) {
    data[i][0] = data[i][0] === "jmp" ? "nop" : "jmp";
    continue;
  } else {
    break;
  }
}

console.log(answer);

function check(data) {
  var set = new Set();
  var cursor = 0;
  var variable = 0;

  while(!set.has(cursor) && data[cursor] != null) {
    console.log("cursor", cursor);
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
  if (data[cursor] == null) {
    return variable;
  } else {
    return false;
  }
}
