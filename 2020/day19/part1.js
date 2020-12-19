const fs = require('fs');

const [rulestxt, messagestxt] = fs.readFileSync("./sample.txt").toString().split("\n\n");

const messages = messagestxt.trim().split("\n");

let rules = {};
rulestxt.split("\n").forEach((line) => {
  var [id, condition] = line.split(": ");
  var result;
  if (condition.includes("|")) {
    result = {
      type: "or",
    };
    var [a, b] = condition.split(" | ");
    var as = a.split(" ").map((s) => +s);
    var bs = b.split(" ").map((s) => +s);
    result[0] = as;
    result[1] = bs;
  } else if (condition.includes("\"")) {
    result = {
      type: "char",
    };
    var char = /\w/.exec(condition)[0];
    result[0] = char;
  } else {
    result = {
      type: "nums",
    }
    var nums = condition.split(" ").map((n) => +n);
    result[0] = nums;
  }
  rules[id] = result;
});

console.log(rules);
console.log(messages);

function createRegexp() {
  var regex = createRegexpInner(0);
  return new RegExp(`^${regex}$`);
}

function createRegexpInner(key) {
  var rule = rules[key];
  if (rule.type === "char") {
    return rule[0];
  }

  if (rule.type === "nums") {
    return rule[0].map((n) => createRegexpInner(n)).join("");
  }

  if (rule.type === "or") {
    var left = rule[0].map((l) => createRegexpInner(l)).join("");
    var right = rule[1].map((r) => createRegexpInner(r)).join("");
    return `(${left}|${right})`;
  }
}

const regexp = createRegexp();
console.log(messages.filter((message) => regexp.test(message)).length);
