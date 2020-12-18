const fs = require('fs');

const expressions = fs.readFileSync("./sample.txt").toString().trim().split("\n");

var calculate = function(s) {
  s = s.replace(/\s/g, '');
  const len = s.length;
  let index = 0;

  const calculateHelper = () => {
    let num = 0;
    let stack = [];
    while (index < len) {
      const char = s[index];
      index += 1;

      if('0' <= char && char <= '9') {
        num = (char - '0');
        if (stack.length > 0) {
          var op = stack.pop();
          var pre = stack.pop();
          if (op === "+") {
            num = pre + num;
          } else {
            num = pre * num;
          }
        }
      } else if (char === '(') {
        num = calculateHelper();
        if (stack.length > 0) {
          var op = stack.pop();
          var pre = stack.pop();
          if (op === "+") {
            num = pre + num;
          } else {
            num = pre * num;
          }
        }
      } else {
        stack.push(num);
        stack.push(char);
        if(char === ')') {
          break;
        }
      }
    }
    return num;
  }

  return calculateHelper();
};
const results = expressions.map(calculate);
console.log(results.reduce((acc, cur) => acc + cur));

