const fs = require("fs");
const [player1, player2] = fs.readFileSync("./sample.txt").toString().trim().split("\n\n").map((p) => p.split("\n").slice(1).map(Number));
console.log(player1, player2);

while (player1.length > 0 && player2.length > 0) {
  var p1 = player1.shift();
  var p2 = player2.shift();
  if (p1 < p2) {
    player2.push(p2, p1);
  } else {
    player1.push(p1, p2);
  }
}

const winner = player1.length > 0 ? player1 : player2;
console.log(winner);

var sum = 0;

for (var i=0;i<winner.length;i++) {
  sum += (winner[i] * (winner.length-i));
}
console.log(sum);
