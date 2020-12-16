const fs = require("fs");

const [attr, your, nearby] = fs.readFileSync("./sample.txt").toString().split("\n\n");

const attributes = attr.split("\n").filter(Boolean).map((line) => {
  const [key, value] = line.split(": ");
  const [matches] = Array.from(value.matchAll(/(\d+)-(\d+) or (\d+)-(\d+)/g));
  return [key, +matches[1], +matches[2], +matches[3], +matches[4]];
})

const yourTicket = your.split("\n")[1].split(",").map(Number);
const nearbyTickets = nearby.split("\n").slice(1).map((line) => line.split(",").map(Number));
console.log(attributes, yourTicket, nearbyTickets);

var invalids = [];
for (const tickets of nearbyTickets) {
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
      invalids.push(ticket);
    }
  }
}

console.log(invalids.reduce((acc, cur) => acc + cur));
