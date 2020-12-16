const fs = require("fs");

const [attr, your, nearby] = fs.readFileSync("./sample.txt").toString().split("\n\n");

const keys = [];
const attributes = attr.split("\n").filter(Boolean).map((line) => {
  const [key, value] = line.split(": ");
  keys.push(key);
  const [matches] = Array.from(value.matchAll(/(\d+)-(\d+) or (\d+)-(\d+)/g));
  return [key, +matches[1], +matches[2], +matches[3], +matches[4]];
})

const yourTicket = your.split("\n")[1].split(",").map(Number);
const nearbyTickets = nearby.split("\n").slice(1).map((line) => line.split(",").map(Number));
const cols = yourTicket.length;

const newnearbyTickets = [];
for (const tickets of nearbyTickets) {
  var needDiscarded = false;
  for (const ticket of tickets) {
    var found = false;
    for (const [_, min1, max1, min2, max2] of attributes) {
      if (min1 <= ticket && ticket <= max1) {
        found = true;
        break;
      } else if (min2 <= ticket && ticket <= max2) {
        found = true;
        break;
      }
    }
    if (!found) {
      needDiscarded = true;
      break;
    }
  }
  if (!needDiscarded) {
    newnearbyTickets.push(tickets);
  }
}

const fields = [];
for (var c=0;c<cols;c++) {
  var ks = [];
  for (var r=0;r<newnearbyTickets.length;r++) {
    for (const [key, min1, max1, min2, max2] of attributes) {
      const value = newnearbyTickets[r][c];
      if ((min1 > value || value > max1) && (min2 > value || value > max2)) {
        if (ks.includes(key)) {
          break;
        }
        ks.push(key);
        break;
      }
    }
  }
  fields.push([c, ks]);
  //fields.push(keynames[0]);
}

const sorted = fields.sort(([ka,a], [kb,b]) => b.length - a.length);
console.log(sorted);
const resultFields = [];
for (var [c, invalids] of sorted) {
  var rest = [...keys];
  for (var k of invalids) {
    rest.splice(rest.indexOf(k), 1);
  }
  keys.splice(keys.indexOf(rest[0]), 1);
  resultFields[c] = rest[0];
}

console.log(resultFields);

var result = 1;
for (var i=0;i<resultFields.length;i++) {
  if (resultFields[i].startsWith("departure")) {
    console.log(resultFields[i], i);
    result *= yourTicket[i];
  }
}

console.log(result);
