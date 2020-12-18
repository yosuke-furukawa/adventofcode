const fs = require('fs');

const expressions = fs.readFileSync("./sample.txt").toString().trim().split("\n");

var calculate = function(s) {
  s = s.replace(/\s/g, '');
  const len = s.length;
  let index = 0;

  const calculateHelper = () => {
    let num = 0;
    let stack = [];
    let op = "";
    while (index < len) {
      const char = s[index];
      index += 1;

      if('0' <= char && char <= '9') {
        num = (char - '0');
      } else if (char === '(') {
        num = calculateHelper();
      }
      if (op === "+") {
        op = "";
        stack.push(stack.pop() + num);
      } else if (op === "*") {
        op = "";
        stack.push(num);
      } else if (op === "") {
        stack.push(num);
      }
      if (char === ")") {
        break;
      }
      op = char;
    }
    var ans = stack.reduce((acc, cur) => acc * cur, 1);
    return ans;
  }

  return calculateHelper();
};
const results = expressions.map(calculate);
console.log(results);
console.log(results.reduce((acc, cur) => acc + cur));
//console.log(calculate("1 + (2 * 3) + (4 * (5 + 6))"));
//console.log(calculate("2 * 3 + (4 * 5)"));
//console.log(calculate("5 + (8 * 3 + 9 + 3 * 4 * 3)"));
//console.log(calculate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"));
//console.log(calculate("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"));

